import Joi from "joi";

// Define a validation for adding a contact
const contactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

export { contactValidation };
