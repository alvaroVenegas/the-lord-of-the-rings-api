const Item = require('./item.model')
const { setError } = require('../utils/error/error.utils');
const { deleteImgCloudinary } = require('../middlewares/deleteFile.middleware');


const getAllItems = async (req, res, next) => {
    try {
        const allItems = await Item.find()
        res.status(200).json(allItems)
    } catch (error) {
        return next(error)
    }
}

const getItem = async (req, res, next) => {
    try{
        const {id} = req.params
        const item = await Item.findById(id)
        if (!item) {
            return next(setError(404, 'Item not found'))
        }
        return res.status(200).json(item)

    }catch(error){
        return next(error)
    }
}

const postNewItem = async (req, res, next) => {
    try {
        const newItem = new Item()
        newItem.name = req.body.name
        if(req.file){
            newItem.img= req.file.path      
        }
        const itemInBd = await newItem.save()
        return res.status(201).json(itemInBd)
    } catch (error) {
        return next(error)
    }
}

const patchItem = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchItem = new Item(req.body);
        patchItem._id = id;
        if(req.file){
            patchItem.img = req.file.path
        }
        const updatedItem = await Item.findByIdAndUpdate(id, patchItem)
        if (!updatedItem) {
            return next(setError(404, 'Item not found'))
        }
        return res.status(200).json(updatedItem)
    } catch (error) {
        return next(error)
    }
}

const deleteItem = async (req, res, next) => {
    try{
        const {id} = req.params
        const deletedItem = await Item.findByIdAndDelete(id)
        if (!deletedItem) {
            return next(setError(404, 'Item not found'))
        }
        if (deletedItem.img) deleteImgCloudinary(deletedItem.img)
        return res.status(200).json(deletedItem)

    }catch(error){
        return next(error)
    }
}


module.exports = {
    getAllItems,
    postNewItem,
    patchItem,
    deleteItem,
    getItem


}