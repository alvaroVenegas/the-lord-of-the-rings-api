const mongoose = require('mongoose')
const Character = require('../../character/character.model')

require('dotenv').config()

const urlDb = process.env.MONGO_DB_URL
console.log(urlDb)

const characters = [
    {
        name: "Legolas",
        race: "Elfo",
        origin: "Bosque Negro",
        father: "Thranduil",
        img: ""
    },
    {
        name: "Gimli",
        race: "Enano",
        origin: "Erebor",
        father: "Gloin",
        img: ""
    },
    {
        name: "Aragorn",
        race: "Humano",
        origin: "Gondor",
        father: "Arathorn",
        img: ""
    },
    {
        name: "Frodo Bolson",
        race: "Hobbit",
        origin: "La Comarca",
        father: "Drogo Bolson",
        img: ""
    },
    {
        name: "Sam",
        race: "Hobbit",
        origin: "La Comarca",
        father: "Hamfast Gamyi",
        img: ""
    },
    {
        name: "Meriadoc Brandigamo",
        race: "Hobbit",
        origin: "La Comarca",
        father: "Saradoc Brandigamo",
        img: ""
    },
    {
        name: "Peregrin Tuk",
        race: "Hobbit",
        origin: "La Comarca",
        father: "Paladin Tuk",
        img: ""
    },
    {
        name: "Bilbo Bolson",
        race: "Hobbit",
        origin: "La Comarca",
        father: "Bungo Bolson",
        img: ""
    },
    {
        name: "Gandalf",
        race: "Istar",
        origin: "Desconocido",
        father: "Desconocido",
        img: ""
    },
    {
        name: "Boromir",
        race: "Humano",
        origin: "Gondor",
        father: "Denethor II",
        img: ""
    }
]

mongoose
    .connect(urlDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allCharacters = await Character.find();
        if (allCharacters.length) {
            await Character.collection.drop();
            console.info('Deleted database')
        }
    })
    .catch((err) => console.error(`Error deleting data: ${err}`))
    .then(async () => {
        await Character.insertMany(characters);
        console.info('Created database')
    })
    .catch((err) => console.error(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());