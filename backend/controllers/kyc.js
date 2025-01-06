const imagekit = require("../utils/imageKit");
const KYCRequest = require("../models/kycRequest");

exports.postUpdateKYC = async (req, res, next) => {
  try {
    const user = req.user;
    const { documentType } = req.body;
    const file = req.file;

    if (!file) {
      return next(new Error("Please upload a file"));
    }

    const kycRequest = await KYCRequest.findOne({ user: user._id });

    if (kycRequest && kycRequest.status !== "rejected") {
      return res.status(400).send({
        message: `KYC request already exists and the current status is [${kycRequest.status}]`,
      });
    }

    const kycDoc = new KYCRequest({
      user: user._id,
      status: "pending",
      documentType: documentType,
      timeline: [
        {
          status: "pending",
          updatedBy: user._id,
          time: Date.now(),
          remarks: "KYC request initiated",
        },
      ],
    });

    const uploadResponse = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: `/KYC/${user._id}`,
      tags: [documentType],
    });

    kycDoc.file = {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };

    await kycDoc.save();

    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: uploadResponse.url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error uploading file" });
  }
};

exports.getKYCStatus = async (req, res, next) => {
  try {
    const status = await KYCRequest.findOne({ user: req.user._id });
    res.status(200).json(status);
  } catch (error) {
    error.message = "Error fetching KYC status";
    next(error);
  }
};
