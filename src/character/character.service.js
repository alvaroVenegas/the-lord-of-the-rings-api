const Character = require('./character.model')
const { setError } = require('../utils/error/error.utils');
const cloudinary = require('cloudinary').v2


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
        console.log(req.file)
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

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });

   try {
        const { id } = req.params
        //cloudinary.uploader.destroy("development/svgw7qk2ak2nrtsciicr", (err) => {
            

        const character = await Character.findById(id)
        if (character.img) {
        
            const imgSplited = character.img.split('/')
            console.log(imgSplited)
            //console.log(imgSplited[imgSplited.length -1])
            const nameSplited = imgSplited[imgSplited.length -1].split('.')
            const folderSplited = imgSplited[imgSplited.length -2]
            console.log(nameSplited[0])
            console.log(folderSplited)
            const public_id= `${folderSplited}/${nameSplited[0]}`;
            console.log('public_id-->', public_id) 
            
            
        
            cloudinary.uploader.destroy(public_id, (err) => {
                console.log(err);
                //console.log(character.img, ' deleted');
            }); 
        
           
        }
        //aqui me traigo el personahe con find
        //busco si tiene img
        /*  cloudinary.uploader.destroy(oldPublicId.public_id, (err) => {
             console.log(err);
             console.log(oldPublicId, ' deleted');
         }); */
        //tiene que ser un codigo parecido a este de arriba 

        const deletedCharacter = await Character.findByIdAndDelete(id)
        if (!deletedCharacter) {
            return next(setError(404, 'Character not found'))
        }
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