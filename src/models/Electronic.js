const mongoose = require('mongoose');

const electronicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [10, 'Name should be at least 10 characters long!'],
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        minLength: [2, 'Type should be at least 2 characters long!'],
    },
    damages: {
        type: String,
        required: [true, 'Damages is required!'],
        minLength: [10, 'Damages should be at least 10 characters long!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image should start with http:// or https://!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be between 10 and 200 characters!'],
        maxLength: [200, 'Description should be between 10 and 200 characters!'],
    },
    production: {
        type: Number,
        required: [true, 'Production is required!'],
        min: [1900, 'Production should be between 1900 and 2023!'],
        max: [2023, 'Production should be between 1900 and 2023!'],
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation  is required!'],
        min: [0, 'Exploitation should be a positive number!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0, 'Price should be a positive number!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

const Electronic = mongoose.model('Electronic', electronicSchema);

module.exports = Electronic;