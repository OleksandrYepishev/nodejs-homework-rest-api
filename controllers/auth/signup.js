const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");
// const mail = require("@sendgrid/mail");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm Email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "created",
    code: 201,
    data: {
      user: {
        email,
        subscription: newUser.subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
