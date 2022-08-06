const { find } = require('../models/sleepModel');
const sleepModel = require('../models/sleepModel')
const Validator = require("../utilities/validator");



const sleepData = async (req, res) => {
    try {
        const data = req.body;
        const decodedToken = req.decodedToken
        const queryParams = req.query;

        
        //no data is required from query params
        if (Validator.isValidInputBody(queryParams)) {
            return res.status(404).send({ status: false, message: "Page not found" });
        }
        
        if (!Validator.isValidInputBody(data)) {
            return res.status(400).send({ status: false, message: "User data is required for registration", });
        }
        
        //Using Destructuring
        const { userID, sleepStruggle, bedTime, wakeTime, sleepDuration } = data
        let checkAlReadyExist = await sleepModel.findOne({_id : userID})
        if(checkAlReadyExist){
            return res.status(400).send({ status: false, message: "Data Already Exist", });

        }

        
        console.log(decodedToken.userId ,userID )
        if (decodedToken.userId != userID) {
            return res.status(403).send({ msg: "unAuthorized Person" })
        }

        if (!Validator.isValidInputValue(userID)) {
            return res.status(400).send({ status: false, message: "userId is Required" });
        }
        if (!sleepStruggle) {
            return res.status(400).send({ status: false, message: "sleepStruggle is Required" });
        }
        let sleepStruggleFrom = ['', 'Less than 2 weeks', '2 to 8 weeks', 'More than 8 weeks']
        let sleepStruggleDuration = sleepStruggleFrom[sleepStruggle]
        if (sleepStruggleDuration == undefined || sleepStruggleDuration == '') {
            return res.status(404).send({ msg: "Please give the Input from only (1,2,3) | 1 => Less than 2 weeks | 2 => 2 to 8 weeks | 3 => More than 8 weeks" })
        }


        if (!Validator.isValidInputValue(bedTime)) {
            return res.status(400).send({ status: false, message: "bedTime is Required" });

        }
        if (!Validator.isValidTime(bedTime)) {
            return res.status(404).send({ status: false, message: "Please use that format for time  HH:MM " });
        }

        if (!Validator.isValidInputValue(wakeTime)) {
            return res.status(400).send({ status: false, message: "wakeTime is Required" });
        }
        if (!Validator.isValidTime(wakeTime)) {
            return res.status(404).send({ status: false, message: "Please use that format for time  HH:MM " });
        }

        if (!(sleepDuration)) {
            return res.status(400).send({ status: false, message: "sleepDuration is Required" });
        }
        if (!(sleepDuration >= 0 || sleepDuration <= 24)) {
            return res.status(400).send({ status: false, message: "sleepDuration is between 0-24  " });
        }


        let finalData = {
            userID: userID.trim(),
            sleepStruggle: sleepStruggleDuration,
            bedTime: bedTime.trim(),
            wakeTime: wakeTime.trim(),
            sleepDuration: sleepDuration

        }
        const sleeData = await sleepModel.create(finalData)
        return res.status(201).send({ status: true, data: sleeData })

    }
    catch (err) {
        return res.status(500).send({ err: err.message })
    }

}



module.exports.sleepData = sleepData