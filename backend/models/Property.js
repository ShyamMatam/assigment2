const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Residential', 'Commercial', 'Land'],
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    description: String,
    amenities: [String],
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Property', propertySchema);