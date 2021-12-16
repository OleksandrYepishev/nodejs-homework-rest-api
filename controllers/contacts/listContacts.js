const contactsOperations = require("../../model/contacts/");

const listContacts = async (req, res) => {
  const contactList = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactList,
    },
  });
};

module.exports = listContacts;
