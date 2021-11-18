const Character = require('../../character/character.model')

let legolasId = '';
let  gimliId = '';
let aragornId = '';
let frodoId = '';
let samId = '';
let merryId = '';
let pipinId = '';
let bilboId = '';
let gandalfId = '';
let boromirId = '';


const getIdCharacterByName = async (name) => {
    try {
        const character = await Character.findOne({name:name})
        if(character){
            return character._id
        }
        return null
    } catch (error) {
        return next(error)
    }
}

const setCharLockedId = async () =>{
    legolasId = await getIdCharacterByName('Legolas')
    gimliId = await getIdCharacterByName('Gimli')
    aragornId = await getIdCharacterByName('Aragorn')
    frodoId = await getIdCharacterByName('Frodo Bolson')
    samId = await getIdCharacterByName('Sam')
    merryId = await getIdCharacterByName('Meriadoc Brandigamo')
    pipinId = await getIdCharacterByName('Peregrin Tuk')
    bilboId = await getIdCharacterByName('Bilbo Bolson')
    gandalfId = await getIdCharacterByName('Gandalf')
    boromirId = await getIdCharacterByName('Boromir')
    //console.log(legolasId.toString())
}

setCharLockedId()

const charactersLocked = (id) => {
    if(id==legolasId.toString())  return true
    if(id==gimliId.toString())  return true
    if(id==aragornId.toString())  return true
    if(id==frodoId.toString())  return true
    if(id==samId.toString())  return true
    if(id==merryId.toString())  return true
    if(id==pipinId.toString())  return true
    if(id==bilboId.toString())  return true
    if(id==gandalfId.toString())  return true
    if(id==boromirId.toString())  return true
    
    return false
}

module.exports = {
    charactersLocked
}