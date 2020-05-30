const Joi = require("@hapi/joi");

//register validation

const registerValidation = async (input) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  try {
    const { error } = await schema.validateAsync(input);
    return error;
  } catch (error) {
    return error;
  }
};

const loginValidation = async (input) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  try {
    const { error } = await schema.validateAsync(input);
    return error;
  } catch (error) {
    return error;
  }
};

module.exports = { registerValidation, loginValidation };
