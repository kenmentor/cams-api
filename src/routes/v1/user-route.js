const express = require("express");
const router = express.Router();
const { user_controller } = require("../../controllers");
const { user_middleware } = require("../../middle-ware");
const { profile_multer } = require("../../middle-ware");

// Update user (with optional profile image)
router.put(
  "/:id",
  profile_multer.single("profileImage"), // multer handles file
  // user_middleware.user_update,
  user_controller.edit_user_detail
);

router.get("/pioneer", user_controller.pioneer);
router.get("/:id", user_controller.get_user);
router.get("/", user_controller.find_users);
router.post("/admin-login", (req, res) => {
  const { password } = req.body;

  // Simple demo password check (replace with secure hash in production)
  if (password === "admin123") {
    return res.status(200).json({ success: true, message: "Access granted" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }
});
module.exports = router;
