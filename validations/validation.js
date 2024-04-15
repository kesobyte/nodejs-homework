import Joi from "joi";

// Define validation for adding a contact
const contactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

// Bundle validations  into a single object
const validations = {
  validateContacts: contactValidation,
};

export { validations };
