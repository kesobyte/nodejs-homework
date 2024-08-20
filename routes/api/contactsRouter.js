import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
//prettier-ignore
import { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } from "../../controllers/contactsController.js";

const router = express.Router();

router.get("/", ctrlWrapper(listContacts));
router.get("/:contactId", ctrlWrapper(getContactById));
router.post("/", ctrlWrapper(addContact));
router.delete("/:contactId", ctrlWrapper(removeContact));
router.put("/:contactId", ctrlWrapper(updateContact));
router.patch("/:contactId/favorite", ctrlWrapper(updateStatusContact));

export { router };
