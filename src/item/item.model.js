const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        img: { type: String, trim: true }
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model('items', itemSchema)
module.exports = Item