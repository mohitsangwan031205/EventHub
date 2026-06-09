const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  toggleFavorite,
  getFavoriteStatus,
  getMyFavorites,
} = require("../controllers/favoriteController");

router.post("/toggle", protect, toggleFavorite);

router.get("/my-favorites", protect, getMyFavorites);

router.get("/:mediaId", protect, getFavoriteStatus);

module.exports = router;
