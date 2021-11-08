const WeaponController = require('express').Router();
const { getAllWeapons, postNewWeapon, patchWeapon,deleteWeapon, getWeapon } = require('./weapon.service');
const upload = require('../middlewares/file.middleware')



WeaponController.get('/', getAllWeapons)
WeaponController.get('/:id', getWeapon)
WeaponController.post('/', upload.single('img'), postNewWeapon)
WeaponController.patch('/:id',upload.single('img'),patchWeapon)
WeaponController.delete('/:id',deleteWeapon)


module.exports = WeaponController