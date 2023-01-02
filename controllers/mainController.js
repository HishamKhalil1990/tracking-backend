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
            msg:"internal error"
        })
    }
}

const getOrdersInfo = async(req,res) => {
    const user = req.user
    try{
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

module.exports = {
    login,
    getOrdersInfo
}