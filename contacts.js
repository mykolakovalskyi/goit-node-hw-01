const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      console.log("List of contacts: ");
      console.table(contacts);
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((contact) => {
        if (contact.id === contactId) {
          console.log(`Get contact by ID ${contactId}:`);
          console.table(contact);
          return contact;
        }
      });

      if (contact == null) {
        console.log(`Contact with ID "${contactId}" not found!`);
      }
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );

      if (newContacts.length === contacts.length) {
        console.log(`Contact with ID "${contactId}" not found!`);
        return;
      }

      console.log("Contact deleted successfully! New list of contacts: ");
      console.table(newContacts);

      fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
        if (error) {
          return console.log("error :", error);
        }
      });
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);

      contacts.push({
        id: `${contacts.length + 1}`,
        name: name,
        email: email,
        phone: phone,
      });

      console.log("Contacts added successfully! New lists of contacts: ");
      console.table(contacts);

      fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
        if (error) {
          return console.log(error);
        }
      });
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
