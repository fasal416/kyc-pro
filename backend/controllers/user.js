const User = require("../models/user");

exports.getUser = (req, res, next) => {
  res.send(req.user);
};

exports.getAllUserDetails = async (req, res, next) => {
  try {
    const result = await User.aggregate([
      { $match: { role: "user" } },
      {
        $addFields: {
          sortOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$KYCStatus", "pending"] }, then: 1 },
                { case: { $eq: ["$KYCStatus", "approved"] }, then: 2 },
                { case: { $eq: ["$KYCStatus", "rejected"] }, then: 3 },
              ],
              default: 4,
            },
          },
        },
      },
      // Sort users by sortOrder and then by name
      {
        $sort: {
          sortOrder: 1,
          name: 1, // Optional: Sort alphabetically within the same KYCStatus
        },
      },
      // Lookup KYCRequest data
      {
        $lookup: {
          from: "kycrequests", // Collection name for KYCRequest
          localField: "_id", // Field in the User collection
          foreignField: "user", // Field in the KYCRequest collection
          as: "kyc", // Name of the field to add in the output
        },
      },
      {
        $unwind: {
          path: "$kyc",
          preserveNullAndEmptyArrays: true, // If no KYC document, set as null
        },
      },
      // Group to calculate counts and prepare the final result
      {
        $facet: {
          counts: [
            {
              $group: {
                _id: "$KYCStatus",
                count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: null,
                totalUsers: { $sum: "$count" },
                pending: {
                  $sum: {
                    $cond: [{ $eq: ["$_id", "pending"] }, "$count", 0],
                  },
                },
                approved: {
                  $sum: {
                    $cond: [{ $eq: ["$_id", "approved"] }, "$count", 0],
                  },
                },
                rejected: {
                  $sum: {
                    $cond: [{ $eq: ["$_id", "rejected"] }, "$count", 0],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                totalUsers: 1,
                pending: 1,
                approved: 1,
                rejected: 1,
              },
            },
          ],
          users: [{ $project: { sortOrder: 0 } }], // Remove the sortOrder field
        },
      },
    ]);
    res.send({
      totalUsers: result[0]?.counts?.[0]?.totalUsers || 0,
      pending: result[0]?.counts?.[0]?.pending || 0,
      approved: result[0]?.counts?.[0]?.approved || 0,
      rejected: result[0]?.counts?.[0]?.rejected || 0,
      users: result[0]?.users || [],
    });
  } catch (error) {
    error.message = "Something went wrong while fetching the user details.";
    next(error);
  }
};
