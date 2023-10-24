const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const signupRoute = require('./routes/business')
const app = express();
require('dotenv').config();

mongoose.connect(`mongodb+srv://emmy12:${process.env.MONGO_DB_PASSWORD}@cluster0.ip3c79z.mongodb.net/social_pulse_main?retryWrites=true&w=majority`)
.then(() => {
    console.log("Connection to Database successful")
})
.catch(err => console.log(err))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/business', signupRoute)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Not found"
    })
})



module.exports = app