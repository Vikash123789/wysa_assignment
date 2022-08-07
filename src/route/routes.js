const express = require("express");
const router = express.Router();
// const auth = require("../middleWare/auth");
const userController = require('../controller/userController')
const sleepController = require('../controller/sleepController')
const Auth = require('../middleware/auth')



router.get("/test",(req,res)=>{
    res.send("welcome to wysa sleep server")
})

router.post("/userRegister" ,userController.userRegistration)
router.post("/userLogin" ,userController.userLogin)


router.post("/sleepRegister" ,Auth.authentication, sleepController.sleepData)

module.exports = router;