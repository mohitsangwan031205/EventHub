const Like = require("../models/Like");

const Notification = require("../models/Notification");

const Media = require("../models/Media");

const toggleLike = async (req, res) => {
  try {
    const { mediaId } = req.body;

    const existingLike = await Like.findOne({
      media: mediaId,
      user: req.user._id,
    });

    if (existingLike) {
      await existingLike.deleteOne();

      return res.status(200).json({
        liked: false,
      });
    }

    await Like.create({
      media: mediaId,
      user: req.user._id,
    });

    const media = await Media.findById(mediaId);

    if (media.uploadedBy.toString() !== req.user._id.toString()) {
      await Notification.create({
        recipient: media.uploadedBy,

        sender: req.user._id,

        type: "like",

        message: "liked your photo",
      });
    }

    res.status(201).json({
      liked: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMediaLikes = async (req, res) => {
  try {
    const likes = await Like.find({
      media: req.params.mediaId,
    });

    res.status(200).json({
      count: likes.length,

      likedByUser: likes.some(
        (like) => like.user.toString() === req.user._id.toString(),
      ),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  toggleLike,
  getMediaLikes,
};
