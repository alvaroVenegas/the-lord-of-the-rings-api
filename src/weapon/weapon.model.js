const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        type:{ type: String, required: true, trim: true },
        owner:{ type: String, trim: true },
        img:{ type: String, trim: true }
    },
    {
        timestamps: true
    }
);

const Weapon = mongoose.model('weapons', weaponSchema)
module.exports = Weapon