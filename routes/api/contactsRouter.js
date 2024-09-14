import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
//prettier-ignore
import { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } from "../../controllers/contactsController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";

const router = express.Router();

/* GET: // http://localhost:3000/api/contacts */
router.get("/", authenticateToken, ctrlWrapper(listContacts));

/* GET: // http://localhost:3000/api/contacts/:contactId */
router.get("/:contactId", authenticateToken, ctrlWrapper(getContactById));

/* POST: // http://localhost:3000/api/contacts/ 
{
    "name": "Kim Alvarez",
    "email": "kimangeloalvarez@gmail.com",
    "phone": "(639) 123-4567"
} 
*/
router.post("/", authenticateToken, ctrlWrapper(addContact));

/* DELETE: // http://localhost:3000/api/contacts/:contactId */
router.delete("/:contactId", authenticateToken, ctrlWrapper(removeContact));

/* PUT: // http://localhost:3000/api/contacts/:contactId 
{
    "name": "Pau Alvarez"
    "email": "pau@email.com",
    "phone": "(639) 7645-321"
} 
*/
router.put("/:contactId", authenticateToken, ctrlWrapper(updateContact));

/* PATCH: // http://localhost:3000/api/contacts/:contactId/favorite
{
    "favorite": true,
}
*/
router.patch(
  "/:contactId/favorite",
  authenticateToken,
  ctrlWrapper(updateStatusContact)
);

export { router };
