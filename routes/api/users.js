const express = require("express");
const { auth, upload, validation, ctrlWrapper } = require("../../middlewares");
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
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;
