const { MongoClient } = require('mongodb')
require('dotenv').config()


const client = new MongoClient(process.env.ATLAS_URI)

async function start() {
    await client.connect()
    console.log("Connected")
    module.exports = client.db()
}

start()