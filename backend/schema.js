const Joi = require("joi");

module.exports.foodSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required(),
        category: Joi.string().required(),
});


module.exports.userSchema = Joi.object({
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
});