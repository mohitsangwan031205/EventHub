const cloudinary = require("../config/cloudinary");

const Media = require("../models/Media");

const uploadMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    const uploadedMedia = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "eventhub",
            },
            (error, result) => {
              if (error) reject(error);

              resolve(result);
            },
          )
          .end(file.buffer);
      });

      const media = await Media.create({
        event: req.body.eventId,

        uploadedBy: req.user._id,

        mediaUrl: result.secure_url,

        publicId: result.public_id,

        mediaType: "image",

        visibility: req.body.visibility || "public",
      });

      uploadedMedia.push(media);
    }

    res.status(201).json({
      message: "Files uploaded successfully",

      count: uploadedMedia.length,

      media: uploadedMedia,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getEventMedia = async (req, res) => {
  try {
    let query = {
      event: req.params.eventId,
    };

    const role = req.user?.role;

    const canViewPrivate = ["admin", "photographer", "clubMember"].includes(
      role,
    );

    if (!canViewPrivate) {
      query.visibility = "public";
    }

    const media = await Media.find(query).populate("uploadedBy", "name").sort({
      createdAt: -1,
    });

    res.status(200).json(media);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    if (
      media.uploadedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await cloudinary.uploader.destroy(media.publicId);

    await media.deleteOne();

    res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const bulkDeleteMedia = async (req, res) => {
  try {
    const { mediaIds } = req.body;

    if (!mediaIds || mediaIds.length === 0) {
      return res.status(400).json({
        message: "No images selected",
      });
    }

    const mediaFiles = await Media.find({
      _id: {
        $in: mediaIds,
      },
    });

    for (const media of mediaFiles) {
      if (
        media.uploadedBy.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      await cloudinary.uploader.destroy(media.publicId);

      await media.deleteOne();
    }

    res.status(200).json({
      message: "Images deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadMedia,
  getEventMedia,
  deleteMedia,
  bulkDeleteMedia,
};
