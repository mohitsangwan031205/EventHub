const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    media: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Media",

      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },
  {
    timestamps: true,
  },
);

favoriteSchema.index(
  {
    media: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Favorite", favoriteSchema);
