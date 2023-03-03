const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require('mongoose');


const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name:{
                type:String,
                minLength: 3,
                maxLength: 50,
                required: true
            },
            isGold:{
                type: Boolean,
                default: false
            },
            phone:{
                type: String,
                minLength: 5,
                maxLength: 50,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true, 
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type:Date,

    },
    rentalFee:{
        type:Number,
        min: 0
    }
}));

function validateRental(rental){
    const schema= {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };
    return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;