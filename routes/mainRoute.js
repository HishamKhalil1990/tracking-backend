require('dotenv').config()
const express = require('express')
const router = express.Router()
const controller = require('../controllers/mainController')
const functions = require('../utils/functions')

const authentication = functions.authentication

router.post('/login',controller.login)
router.get('/orders-info',authentication,controller.getOrdersInfo)
router.post('/status/:value',authentication,controller.saveStatus)
router.post('/location',authentication,controller.location)

module.exports = router