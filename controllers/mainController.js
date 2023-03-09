const functions = require('../utils/functions')

const login = async(req,res) => {
    try{
        const {username,password,odometer} = req.body
        const msg = await functions.checkUserAndSaveOdo(username,password,odometer)
        if(msg == 'logged'){
            const auth = functions.create(username)
            res.send({
                status:"success",
                msg,
                auth
            })
        }else{
            res.send({
                status:"failed",
                msg
            })
        }
    }catch(err){
        console.log(err)
        res.send({
            status:"failed",
            msg:"خطا داخلي اثناء عملية الدخول الرجاء المحاولة مرة اخرى"
        })
    }
}

const getOrdersInfo = async(req,res) => {
    try{
        const user = req.user
        const orderInfo = await functions.getOrderInfo(user.username)
        res.send(orderInfo)
    }catch(err){
        console.log(err)
        res.send({
            status:"failed",
            msg:"internal error"
        })
    }
}

const saveStatus = async(req,res) => {
    try{
        const {value} = req.params
        const {tripName,orderNo} = req.body
        const user = req.user
        const msg = await functions.save(user.username,value,tripName,orderNo)
        res.send(msg)
    }catch(err){
        console.log(err)
        res.send({
            status:"failed",
            msg:"internal error"
        })
    }
}

const location = async(req,res) => {
    try{
        const {tripName,location,orderNo} = req.body
        const user = req.user
        const msg = await functions.saveLocation(user.username,location,tripName,orderNo)
        res.send(msg)
    }catch(err){
        console.log(err)
        res.send({
            status:"failed",
            msg:"internal error"
        })
    }
}

module.exports = {
    login,
    getOrdersInfo,
    saveStatus,
    location
}