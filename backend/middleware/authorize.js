const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = process.env;

const authorize = (accessRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied, no token provided" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!accessRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied, insufficient permissions" });
      }
      const { password, ...userObj } = user.toObject();
      req.user = userObj;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = authorize;
