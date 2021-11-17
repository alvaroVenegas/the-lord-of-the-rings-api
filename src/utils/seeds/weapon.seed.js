const mongoose = require('mongoose')
const Weapon = require('../../weapon/weapon.model')

require('dotenv').config()

const urlDb = process.env.MONGO_DB_URL

const weapons = [
    {
        name:"Andúril",
        type:"Espada",
        owner:"6193ad3ce9d97d31fbb1bc52",
        img:""
    },
    {
        name:"Dardo",
        type:"Daga",
        owner:"6193ad3ce9d97d31fbb1bc53",
        img:""
    },
    {
        name:"Orcrist",
        type:"Espada",
        owner:"Thorin",
        img:""
    },
    {
        name:"Glamdring",
        type:"Espada",
        owner:"6193ad3ce9d97d31fbb1bc58",
        img:""
    },
    {
        name:"Puñal de Morgul",
        type:"Daga",
        owner:"Rey Brujo",
        img:""
    },
    {
        name:"Gúthwinë",
        type:"Espada",
        owner:"Eomer",
        img:""
    },
]

mongoose
    .connect(urlDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allWeapons = await Weapon.find();
        if (allWeapons.length) {
            await Weapon.collection.drop();
            console.info('Deleted database')
        }
    })
    .catch((err) => console.error(`Error deleting data: ${err}`))
    .then(async () => {
        await Weapon.insertMany(weapons);
        console.info('Created database')
    })
    .catch((err) => console.error(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());