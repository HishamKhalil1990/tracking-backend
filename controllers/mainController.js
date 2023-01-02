const functions = require('../utils/functions')

const login = async(req,res) => {
    try{
        const {username,password,odometer} = req.body
        const msg = functions.checkUserAndSaveOdo(username,password,odometer)
        if(msg == 'done'){
            const token = functions.create(username)
            res.send({
                status:"success",
                msg:"logged",
                token
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

module.exports = {
    login
}