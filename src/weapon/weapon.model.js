const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        type:{ type: String, required: true, trim: true },
        owner:{  type: mongoose.Types.ObjectId, ref: 'characters' },
        img:{ type: String, trim: true }
    },
    {
        timestamps: true
    }
);

const Weapon = mongoose.model('weapons', weaponSchema)
module.exports = Weapon