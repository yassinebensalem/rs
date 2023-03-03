const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength:20
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).max(20).required()
    }
    return Joi.validate(genre, schema);
};

module.exports.Genre = Genre;
exports.validate = validateGenre; 
module.exports.genreSchema= genreSchema;

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JhNzkwMTNiNzIwODFmOTg5NDZlYjgiLCJuYW1lIjoidGVzdDQiLCJpYXQiOjE2NzMxNjUwNTd9.pP5kLEBUCQqhfRlGmpxAoTjJOSZ-l4pbqEIjjgYSWtE