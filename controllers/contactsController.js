import { httpError } from "../helpers/httpError.js";
import { nanoid } from "nanoid";
import { contactValidation } from "../validations/validation.js";
import fs from "fs/promises";
import path from "path";

// Model Path
const contactsPath = path.join("models", "contacts.json");

// GET ALL CONTACTS
const listContacts = async (_req, res, next) => {
  try {
    // Read the contacts from the JSON file
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    // Return all contacts
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// GET CONTACT BY ID
const getContactById = async (req, res, next) => {
  try {
    // Read the contacts from the JSON file
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    // Extract the contactId from request parameters
    const { contactId } = req.params;

    // Find the contact by ID
    const contact = contacts.find((contact) => contact.id === contactId);

    // If the contact is not found, throw a 404 error
    if (!contact) {
      throw httpError(404, "Not found");
    }

    // Respond with the contact data
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// ADD CONTACT
const addContact = async (req, res, next) => {
  try {
    // Read the current contacts
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    // Validate the incoming data using Joi
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "Missing required name field");
    }

    // Destructure the request body
    const { name, email, phone } = req.body;
    const newContact = { id: nanoid(), name, email, phone };

    // Add new contact to the list
    contacts.push(newContact);

    // Write the updated contacts to the file
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    // Respond with the newly added contact
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// DELETE CONTACT
const removeContact = async (req, res, next) => {
  try {
    // Read the current contacts
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    // Extract the contactId from request parameters
    const { contactId } = req.params;

    // Find the index of the contact by ID
    const index = contacts.findIndex((contact) => contact.id === contactId);

    // If the contact is not found, throw a 404 error
    if (index === -1) {
      return next(httpError(404, "Not found"));
    }

    // Remove the contact from the array
    contacts.splice(index, 1);

    // Write the updated contacts array back to the file
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    // Respond with a success message
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

// UPDATE CONTACT
const updateContact = async (req, res, next) => {
  try {
    // Read the current contacts
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    // Validate the incoming data using Joi
    const { error } = contactValidation.validate(req.body);
    if (error) {
      throw httpError(400, "Missing fields");
    }

    // Find the contact by ID
    const { contactId } = req.params;
    const index = contacts.findIndex((contact) => contact.id === contactId);

    // If the contact is not found, throw a 404 error
    if (index === -1) {
      return next(httpError(404, "Not found"));
    }

    // Update the contact details
    const { name, email, phone } = req.body;
    contacts[index] = { ...contacts[index], name, email, phone };

    // Write the updated contacts array back to the file
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    // Respond with the updated contact
    res.json(contacts[index]);
  } catch (error) {
    next(error);
  }
};

export {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
