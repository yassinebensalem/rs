const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email:{
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 50,
    required: true
    //match:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  },
  
  password:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){// we can't replace function with an arrow function 
    //because arrow functions don't have their own this, this in an arrow function references the calling fucntion
    const token = jwt.sign({ _id: this._id, name: this.name, isAdmin: this.idAdmin }, config.get('jwtPrivateKey') );// jwt.sign({payload}, privateKey)
    //in custom-environment-variables.json we specify the mappings between our app settings and env variables
    return token;
}


const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean()
  };

  return Joi.validate(user, schema);
}


exports.User = User; 
exports.validate = validateUser;