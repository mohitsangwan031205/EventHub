const express = require("express");

const router = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");

const { allowRoles } = require("../middleware/roleMiddleware");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", protect, allowRoles("admin", "clubMember"), createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
