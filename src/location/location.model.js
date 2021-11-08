const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        residents: { type: String, trim: true },
        img: { type: String, trim: true }
    },
    {
        timestamps: true
    }
);

const Location = mongoose.model('locations', locationSchema)
module.exports = Location