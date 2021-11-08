const ItemController = require('express').Router();
const { getAllItems, postNewItem, patchItem,deleteItem, getItem } = require('./item.service');
const upload = require('../middlewares/file.middleware')



ItemController.get('/', getAllItems)
ItemController.get('/:id', getItem)
ItemController.post('/', upload.single('img'), postNewItem)
ItemController.patch('/:id',upload.single('img'),patchItem)
ItemController.delete('/:id',deleteItem)


module.exports = ItemController