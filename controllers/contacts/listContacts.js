const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const contactList = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactList,
    },
  });
};

module.exports = listContacts;
