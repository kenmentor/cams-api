const express = require("express");
const router = express.Router();
const { event_controller } = require("../../controllers");
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const { event_middleware, upload_molter } = require("../../middle-ware");
//v1/request/user id (sign attendance )
router.put("/request/:id", event_controller.request);
//v1/event/ (get list of events)
router.get("/", event_controller.get_event);
//v1/event_deatail (for getting event details with id )
router.get("/detail/:id", event_controller.get_event_detail);
// router.put("/attend/:id", event_controller.attend);
// (update view per click )
router.put("/", event_controller.update_event_view);
// update event
router.put("/:id", event_controller.update_event);
//v1/upload  (upload files and it details)
router.post("/", upload_molter, event_controller.upload_event);

module.exports = router;
