const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 5);

const updateContact = require("./updateContact");
const getAll = require("./listContacts");

const addContact = async (data) => {
  const contacts = await getAll();
  const newContact = { ...data, id: nanoid() };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};

module.exports = addContact;
