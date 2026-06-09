const Comment = require("../models/Comment");

const Notification = require("../models/Notification");

const Media = require("../models/Media");

const addComment = async (req, res) => {
  try {
    const { mediaId, text } = req.body;

    const comment = await Comment.create({
      media: mediaId,

      user: req.user._id,

      text,
    });

    const media = await Media.findById(mediaId);

    if (media.uploadedBy.toString() !== req.user._id.toString()) {
      await Notification.create({
        recipient: media.uploadedBy,

        sender: req.user._id,

        type: "comment",

        message: "commented on your photo",
      });
    }

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      media: req.params.mediaId,
    })
      .populate("user", "name")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addComment,
  getComments,
};
