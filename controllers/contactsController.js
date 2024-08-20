import { httpError } from "../helpers/httpError.js";
import {
  contactValidation,
  favoriteValidation,
} from "../validations/validation.js";
import { Contact } from "../models/contactsModel.js";
import mongoose from "mongoose";

// GET ALL CONTACTS
const listContacts = async (_req, res) => {
  //Model.find()
  const result = await Contact.find();
  res.json(result);
};

// GET CONTACT BY ID
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  // Validate the format of contactId
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw httpError(400, "Invalid Contact ID format");
  }

  // Model.findById()
  const result = await Contact.findById(contactId);

  if (!result) {
    throw httpError(404, "Contact ID not found");
  }

  res.json(result);
};

// ADD CONTACT
const addContact = async (req, res) => {
  // Validate the incoming data using Joi
  const { error } = contactValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing required name field" });
  }

  const { name, email } = req.body;

  // Check if a contact with the same name or email already exists
  const existingContact = await Contact.findOne({
    $or: [{ name }, { email }],
  });

  if (existingContact) {
    throw httpError(409, "Contact with this name and email already exists");
  }

  // Create a new contact
  const result = await Contact.create(req.body);

  // Respond with the newly added contact
  res.status(201).json(result);
};

// DELETE CONTACT
const removeContact = async (req, res) => {
  // Extract the contactId from request parameters
  const { contactId } = req.params;

  // Validate the format of contactId
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw httpError(400, "Invalid Contact ID format");
  }

  // Model.findByIdAndDelete()
  const result = await Contact.findByIdAndDelete(contactId);

  // If the contact is not found, throw a 404 error
  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json({
    message: "Contact has been deleted",
  });
};

// UPDATE CONTACT
const updateContact = async (req, res) => {
  // Validate the incoming data using Joi
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "Missing fields");
  }

  // Find the contact by ID
  const { contactId } = req.params;

  // Validate the format of contactId
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw httpError(400, "Invalid Contact ID format");
  }

  // Model.findByIdAndUpdate()
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    // Return the updated version
    new: true,
  });

  if (!result) {
    throw httpError(404, "ID not found");
  }

  res.json(result);
};

// UPDATE STATUS CONTACT
const updateStatusContact = async (req, res) => {
  // Validate the incoming data using Joi
  const { error } = favoriteValidation.validate(req.body);
  if (error) {
    throw httpError(400, "Missing favorite field");
  }

  const { contactId } = req.params;

  // Validate the format of contactId
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw httpError(400, "Invalid Contact ID format");
  }

  //Model.findByIdAndUpdate()
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "ID not found");
  }

  res.json(result);
};

export {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
