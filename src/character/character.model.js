const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        race: { type: String, required: true, trim: true },
        origin: { type: String, trim: true },
        father: { type: String, trim: true },
        img: { type: String, trim: true }
    },
    {
        timestamps: true
    }
);

const Character = mongoose.model('characters', characterSchema)
module.exports = Character