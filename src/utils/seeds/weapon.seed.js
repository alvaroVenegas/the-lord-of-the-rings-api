const mongoose = require('mongoose')
const Weapon = require('../../weapon/weapon.model')

require('dotenv').config()

const urlDb = process.env.MONGO_DB_URL

const weapons = [
    {
        name:"Andúril",
        type:"Espada",
        owner:"Aragorn",
        img:""
    },
    {
        name:"Dardo",
        type:"Daga",
        owner:"Frodo Bolson",
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
        owner:"Gandalf",
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