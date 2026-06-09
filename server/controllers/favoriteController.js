const Favorite = require("../models/Favorite");

const toggleFavorite = async (req, res) => {
  try {
    const { mediaId } = req.body;

    const existing = await Favorite.findOne({
      media: mediaId,
      user: req.user._id,
    });

    if (existing) {
      await existing.deleteOne();

      return res.status(200).json({
        favorited: false,
      });
    }

    await Favorite.create({
      media: mediaId,
      user: req.user._id,
    });

    res.status(201).json({
      favorited: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getFavoriteStatus = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      media: req.params.mediaId,

      user: req.user._id,
    });

    res.status(200).json({
      favorited: !!favorite,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getMyFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user._id,
    }).populate("media");

    res.status(200).json(favorites);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  toggleFavorite,
  getFavoriteStatus,
  getMyFavorites,
};
