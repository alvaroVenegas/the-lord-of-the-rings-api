const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {validationPassword} = require('../utils/validators/validations')
const {setError} = require ('../utils/error/error.utils')

const userSchema = new mongoose.Schema(
    {
       name:{type:String, trim:true, required:true},
       alias: {type:String, trim:true, unique:true, required:true},
       password:{type:String, trim:true,required:true}
       
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", function (next) {
    if(!validationPassword(this.password)){
        return next(setError(400, 'La contraseña no tiene los minimos requeridos'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema)
module.exports = User