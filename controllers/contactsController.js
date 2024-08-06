import contacts from "../models/contacts.json" assert { type: "json" };
import { httpError } from "../helpers/httpError.js";
import { nanoid } from "nanoid";
import { contactValidation } from "../validations/validation.js";

import fs from "fs/promises";
import path from "path";

const contactsPath = path.join("models", "contacts.json");

// Get All Contacts
const listContacts = async (_req, res, next) => {
  try {
    // Read file contents
    const data = await fs.readFile(contactsPath, "utf8");
    // Parse the JSON data
    const contacts = JSON.parse(data);
    // Send the response
    res.json(contacts);
  } catch (error) {
    // Handle errors
    next(error);
  }
};

// Get Contact By Id
const getContactById = (req, res) => {
  const { contactId } = req.params;
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw httpError(404, "Not found");
  }

  res.json(contact);
};

// Add Contact
const addContact = (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "Missing required name field");
  }

  const { name, email, phone } = req.body;
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  res.status(201).json(newContact);
};

// Delete Contact
const removeContact = (req, res) => {
  const { contactId } = req.params;
  //contacts.filter((contact) => contact.id !== contactId);
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw httpError(404, "Not found");
  }

  res.status(200).json({ message: "Contact deleted" });
};

// Update Contact
const updateContact = (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "Missing fields");
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    throw httpError(404, "Not found");
  }
  contacts[index] = { ...contacts[index], name, email, phone };
  res.json(contacts[index]);
};

export {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
