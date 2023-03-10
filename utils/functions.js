require("dotenv").config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const createToken = (username) => {
  return jwt.sign({ username: username }, TOKEN_SECRET_KEY, {
    expiresIn: "24h",
  });
};

const create = (username) => {
  auth = {
    token: createToken(username),
    expiresIn: "24 hour",
  };
  return auth;
};

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.send({
      status: "unauthorized",
      msg: "session has been ended",
    });
  } else {
    jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
      if (err)
        return res.send({
          status: "unauthorized",
          msg: "session has been ended",
        });
      req.user = user;
      next();
    });
  }
};

const checkUserAndSaveOdo = async (username, password, odometer) => {
  const isChecked = await checkUser(username, password);
  if (isChecked) {
    const isSaved = await saveOdometer(odometer);
    if (isSaved) {
      return "logged";
    } else {
      return "لم يتم حفظ رقم العداد الرجاء المحاولة مرة اخرى";
    }
  } else {
    return "الرجاء التاكد من اسم المستخدم او كلمة المرور";
  }
};

const checkUser = async (username, password) => {
  return true;
};

const saveOdometer = async (odometer) => {
  return true;
};

const getOrderInfo = async (username) => {
  ///////////////////////////////////////// for testing /////////////////////////////////////////
  return {
    status:"success",
    data: [
      {
        id:0,
        status:'',
        tripName:'',
        phone:'0799999999',
        name: "شركة محمد ابو زهيري",
        no:'1111111',
        region:"السابع",
        qty:50,
        price:500,
        description:
          "بضاعة بقوليات (عدس وعدس مجروش) بالاضافة الى ارز مندي ومنتجات الباشا",
        destination: {
          lat: "31.824128",
          long: "36.014328",
        },
        timeInterval:10000, // 10 seconds
      },
      {
        id:1,
        status:'started',
        tripName:'zaid-999',
        phone:'0798888888',
        name: "شركة محمد ابو زهيري",
        no:'2222222',
        region:"السابع",
        qty:50,
        price:500,
        description:
          "بضاعة بقوليات (عدس وعدس مجروش) بالاضافة الى ارز مندي ومنتجات الباشا",
        destination: {
          lat: "36.014328",
          long: "31.824128",
        },
        timeInterval:10000, // 10 seconds
      },
      {
        id:2,
        status:'arrived',
        tripName:'yousef-789',
        phone:'0797777777',
        name: "شركة محمد ابو زهيري",
        no:'3333333',
        region:"السابع",
        qty:50,
        price:500,
        description:
          "بضاعة بقوليات (عدس وعدس مجروش) بالاضافة الى ارز مندي ومنتجات الباشا",
        destination: {
          lat: "31.824128",
          long: "36.014328",
        },
        timeInterval:10000, // 10 seconds
      },
      {
        id:3,
        status:'canceled',
        tripName:'ahmad-456',
        phone:'0796666666',
        name: "شركة محمد ابو زهيري",
        no:'4444444',
        region:"السابع",
        qty:50,
        price:500,
        description:
          "بضاعة بقوليات (عدس وعدس مجروش) بالاضافة الى ارز مندي ومنتجات الباشا",
        destination: {
          lat: "31.824128",
          long: "36.014328",
        },
        timeInterval:10000, // 10 seconds
      },
    ],
  };
  ///////////////////////////////////////// for testing /////////////////////////////////////////
};

const save = async(username,status,tripName,orderNo,location) => {
  console.log(status,tripName,orderNo,location)
  switch(status){
    case 'started':
      return {
        status:'success',
        tripName:'hisham-123'
      }
    case 'arrived':
      return {
        status:'success',
        msg:'لقد تم حفظ الوصول'
      }
    case 'finished':
      return {
        status:'success',
        msg:'لقد تم حفظ الانتهاء'
      }
    case 'canceled':
      return {
        status:'success',
      }
  }
}

const saveLocation = async (username,location,tripName,orderNo) => {
  console.log(username,location,tripName,orderNo)
}

module.exports = {
  create,
  authentication,
  checkUserAndSaveOdo,
  getOrderInfo,
  save,
  saveLocation
};
