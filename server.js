'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.listen(PORT,(err) => {
    if(err){
        console.log(err)
    }else{
        console.log('server started')
    }
})

const mainRouter = require('./routes/mainRoute')

app.use('/',mainRouter)