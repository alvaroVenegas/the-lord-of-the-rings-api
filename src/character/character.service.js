const Character = require('./character.model')
const { setError } = require('../utils/error/error.utils');
const {deleteImgCloudinary} = require('../middlewares/deleteFile.middleware')


const getAllCharacters = async (req, res, next) => {
    try {
        const allCharacters = await Character.find()
        res.status(200).json(allCharacters)
    } catch (error) {
        return next(error)
    }
}

const getCharacter = async (req, res, next) => {
    try {
        const { id } = req.params
        const character = await Character.findById(id)
        if (!character) {
            return next(setError(404, 'Character not found'))
        }
        return res.status(200).json(character)

    } catch (error) {
        return next(error)
    }
}

const postNewCharacter = async (req, res, next) => {
    try {
        const newCharacter = new Character()
        newCharacter.name = req.body.name
        newCharacter.race = req.body.race
        newCharacter.origin = req.body.origin
        newCharacter.father = req.body.father
        if (req.file) {
            newCharacter.img = req.file.path
        }
        const characterInBd = await newCharacter.save()
        return res.status(201).json(characterInBd)
    } catch (error) {
        return next(error)
    }
}

const patchCharacter = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchCharacter = new Character(req.body);
        patchCharacter._id = id;
        if (req.file) {
            patchCharacter.img = req.file.path
        }
        const updatedCharacter = await Character.findByIdAndUpdate(id, patchCharacter)
        if (!updatedCharacter) {
            return next(setError(404, 'Character not found'))
        }
        return res.status(200).json(updatedCharacter)
    } catch (error) {
        return next(error)
    }
}

const deleteCharacter = async (req, res, next) => {

  try {
        const { id } = req.params
        const deletedCharacter = await Character.findByIdAndDelete(id)
        if (!deletedCharacter) return next(setError(404, 'Character not found'))
        if (deletedCharacter.img) deleteImgCloudinary(deletedCharacter.img)
        return res.status(200).json(deletedCharacter)
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    getAllCharacters,
    postNewCharacter,
    patchCharacter,
    deleteCharacter,
    getCharacter


}