require('dotenv').config()
const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY

const createToken = (username) => {
    return jwt.sign({ username: username }, TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
};

const create = (username) => {
    auth = {
        token : createToken(username),
        expiresIn : '24 hour'
    }
    return auth
}

const authentication = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        res.send({
            status: 'unauthorized',
            msg : "session has been ended"
        })
    }else{
        jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
            if (err) return res.send({
                status: 'unauthorized',
                msg : "session has been ended"
            });
            req.user = user;
            next();   
        }); 
    }
}

const checkUserAndSaveOdo = async(username,password,odometer) => {
    const isChecked = await checkUser(username,password)
    if(isChecked){
        const isSaved = await saveOdometer(odometer)
        if(isSaved){
            return 'done'
        }else{
            return 'could not save odometer'
        }
    }else{
        return 'could not check user'
    }
}

const checkUser = async(username,password) => {
    return true
}

const saveOdometer = async(odometer) => {
    return true
}

module.exports = {
    create,
    authentication,
    checkUserAndSaveOdo
}