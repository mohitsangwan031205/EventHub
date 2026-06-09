const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { allowRoles } = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  updateUserRole,
} = require("../controllers/userController");

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

router.get("/", protect, allowRoles("admin"), getAllUsers);

router.put("/:id/role", protect, allowRoles("admin"), updateUserRole);

module.exports = router;
