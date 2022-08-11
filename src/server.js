const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const cors = require("cors");

//to load enviromental variablse or constants form .env file to process.env
env.config()

//routes
const routes = require('./routes/index')

// mongodb connection
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@private-school-cluster.lttmsqh.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
mongoose.connect(uri)
.catch( function(error) {
    console.log('Unable to connect to the mongodb instance. Error: ', error)
})
.then( () => {
    console.log('Database Connected')
})

const app = express()
//mention the json format by using bodyParser
app.use(express.json());
//routes
app.use('/api', routes)

app.listen( process.env.PORT, () => {
    console.log(`Server running of PORT ${process.env.PORT}`)
})