const express = require("express");
const router = express.Router();

const admin_pannel_route = require("./admin-panel-route");
const user_route = require("./user-route");
const complete_verification_route = require("./complete-verification");
const event_route = require("./event-route");

const auth_route = require("./authentication-route");

const request_route = require("./request-route");

router.use("/event", event_route);
console.log("done 1");
router.use("/auth", auth_route);
console.log("done 2");

console.log("done 3");
router.use("/verification", complete_verification_route);
console.log("done 4");
// route.use("/user-pannel", user_pannel_route);
// router.use("/admin-pannel", admin_pannel_route);
console.log("done 5");
// route.use("/payment", payment_route);

console.log("done 6");
router.use("/request", request_route);
router.use("/user", user_route);

module.exports = router;
