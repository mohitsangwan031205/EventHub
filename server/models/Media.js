const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    visibility: {
      type: String,

      enum: ["public", "private"],

      default: "public",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Media", mediaSchema);
