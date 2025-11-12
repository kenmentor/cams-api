const express = require("express");
const router = express.Router();
const { user_controller } = require("../../controllers");
const { event_controller } = require("../../controllers");
const { user_middleware } = require("../../middle-ware");
/**
 * delet user
 * get all user
 * delete post
 * get all post
 *
 */
router.delete(
  "/user",
  user_middleware.user_delete,
  user_controller.delete_user
);
router.put("/users", user_controller.edit_user_detail);
// router.get("/users", user_controller.get_users);
//v1/admin/event
router.get("/events", event_controller.get_event);
router.get("/events/:id", event_controller.get_event_detail);
router.delete("/events", event_controller.delete_event);
router.post("");

module.exports = router;
