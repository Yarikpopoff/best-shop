const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    img_name: Joi.string().required(),
    description: Joi.string().required()
});

module.exports = {
    productSchema
};