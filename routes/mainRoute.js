require('dotenv').config()
const express = require('express')
const router = express.Router()
const controller = require('../controllers/mainController')

router.post('/login',controller.login)