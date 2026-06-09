const express = require("express");

const router = express.Router();

const {
  uploadMedia,
  getEventMedia,
  deleteMedia,
  bulkDeleteMedia,
} = require("../controllers/mediaController");

const { allowRoles } = require("../middleware/roleMiddleware");

const { protect } = require("../middleware/authMiddleware");
const { downloadMedia } = require("../controllers/mediaController");

const upload = require("../middleware/uploadMiddleware");

router.get("/event/:eventId", protect, getEventMedia);

router.post(
  "/upload",
  protect,
  allowRoles("admin", "photographer", "clubMember"),
  upload.array("images", 20),
  uploadMedia,
);

router.delete("/bulk-delete", protect, bulkDeleteMedia);

router.delete("/:id", protect, deleteMedia);

module.exports = router;
