const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { toggleLike, getMediaLikes } = require("../controllers/likeController");

router.post("/toggle", protect, toggleLike);

router.get("/:mediaId", protect, getMediaLikes);

module.exports = router;
