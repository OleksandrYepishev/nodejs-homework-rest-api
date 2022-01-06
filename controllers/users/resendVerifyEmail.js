const { NotFound } = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      message: "missing required field email",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }

  if (user.verify) {
    res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verifyToken}">Click to confirm Email</a>`,
  };
  await sendEmail(mail);
  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
