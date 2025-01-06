const mongoose = require("mongoose");

const KYCRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    idDocument: { url: String, fileId: String },
    timeline: [
      {
        status: String,
        remarks: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("KYCRequest", KYCRequestSchema);
