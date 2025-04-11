const joi = require("joi");

const userRegistrationSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().pattern(/^[0-9]{10}$/).required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});

const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

module.exports = {
    userRegistrationSchema,
    userLoginSchema
};
