const mongoose = require('mongoose')
const Location = require('../../location/location.model')

require('dotenv').config()

const urlDb = process.env.MONGO_DB_URL

const locations = [
    {
        name: 'La Comarca',
        residents: 'Hobbits',
        img:""
    },
    {
        name: 'Minas Tirith',
        residents: 'Humanos',
        img:""
    },
    {
        name: 'Rohan',
        residents: 'Humanos',
        img:""
    },
    {
        name: 'Gondor',
        residents: 'Humanos',
        img:""
    },
    {
        name: "Rivendel",
        residents: "Elfos",
        img:""
    },
    {
        name: 'El Bosque Negro',
        residents: "Elfos",
        img:""
    },
    {
        name: 'Erebor',
        residents: 'Enanos',
        img:""
    }
]


mongoose
    .connect(urlDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allLocations = await Location.find();
        if (allLocations.length) {
            await Location.collection.drop();
            console.info('Deleted database')
        }
    })
    .catch((err) => console.error(`Error deleting data: ${err}`))
    .then(async () => {
        await Location.insertMany(locations);
        console.info('Created database')
    })
    .catch((err) => console.error(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());