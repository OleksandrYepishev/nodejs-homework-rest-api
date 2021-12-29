const express = require("express");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { subscriptionJoiSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateUserSubscription)
);

module.exports = router;
