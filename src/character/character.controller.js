const CharacterController = require('express').Router();
const { getAllCharacters, postNewCharacter, patchCharacter,deleteCharacter, getCharacter } = require('./character.service');
const upload = require('../middlewares/file.middleware')



CharacterController.get('/', getAllCharacters)
CharacterController.get('/:id', getCharacter)
CharacterController.post('/', upload.single('img'), postNewCharacter)
CharacterController.patch('/:id',upload.single('img'),patchCharacter)
CharacterController.delete('/:id',deleteCharacter)


module.exports = CharacterController