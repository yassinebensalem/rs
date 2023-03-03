const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    phone:{
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
    };
    return Joi.validate(customer, schema);
};

module.exports.Customer = Customer;
module.exports.validate= validateCustomer;