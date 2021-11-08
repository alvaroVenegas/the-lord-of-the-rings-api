const mongoose = require('mongoose')
const Item = require('../../item/item.model')

require('dotenv').config()

const urlDb = process.env.MONGO_DB_URL

const items =  [
    {
        name: "Anillo Único",
        img:""
    },
    {
        name: "Mithril",
        img:""
    },
    {
        name: "Palantír",
        img:""
    },
    {
        name: "Piedra del Arca",
        img:""
    }
]

mongoose
    .connect(urlDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allItems = await Item.find();
        if (allItems.length) {
            await Item.collection.drop();
            console.info('Deleted database')
        }
    })
    .catch((err) => console.error(`Error deleting data: ${err}`))
    .then(async () => {
        await Item.insertMany(items);
        console.info('Created database')
    })
    .catch((err) => console.error(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());