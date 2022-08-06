const userController = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("../utilities/validator");
const userModel = require("../models/userModel");

//*********************************************USER REGISTRATION******************************************** */

const userRegistration = async function(req, res) {
    try {
        const requestBody = req.body;
        const queryParams = req.query;
     

        //no data is required from query params
        if (Validator.isValidInputBody(queryParams)) {
            return res.status(404).send({ status: false, message: "Page not found" });
        }

        if (!Validator.isValidInputBody(requestBody)) {
            return res.status(400).send({
                status: false,
                message: "User data is required for registration",
            });
        }

        //using destructuring
        let { firstName, lastName, emailID, phoneNumber, password } = requestBody;

    


        // each key validation starts here
        if (!Validator.isValidInputValue(firstName)) {
            return res.status(400).send({
                status: false,
                message: "First name is required like : Vikash.",
            });
        }

        if (!Validator.isValidOnlyCharacters(firstName)) {
            return res.status(400).send({
                status: false,
                message: "Only alphabets allowed in first name",
            });
        }

        if (!Validator.isValidInputValue(lastName)) {
            return res
                .status(400)
                .send({ status: false, message: "last name is required like: DOE" });
        }

        if (!Validator.isValidOnlyCharacters(lastName)) {
            return res.status(400).send({
                status: false,
                message: "Only alphabets allowed in last name",
            });
        }

        if (!Validator.isValidInputValue(emailID)) {
            return res
                .status(400)
                .send({ status: false, message: "emailID address is required" });
        }

        if (!Validator.isValidEmail(emailID)) {
            return res.status(400).send({
                status: false,
                message: "Please enter a valid emailID address like : xyz@gmail.com",
            });
        }

        const isUniqueEmailID = await userModel.findOne({ emailID });

        if (isUniqueEmailID) {
            return res
                .status(400)
                .send({ status: false, message: "emailID address already exist" });
        }

        if (!Validator.isValidInputValue(phoneNumber)) {
            return res
                .status(400)
                .send({ status: false, message: "phoneNumber number is required" });
        }

        if (!Validator.isValidPhone(phoneNumber)) {
            return res.status(400).send({
                status: false,
                message: "Please enter a valid phoneNumber number like : 9638527410",
            });
        }

        const isUniquephoneNumber = await userModel.findOne({ phoneNumber });

        if (isUniquephoneNumber) {
            return res
                .status(400)
                .send({ status: false, message: "phoneNumber number already exist" });
        }

        if (!Validator.isValidInputValue(password)) {
            return res
                .status(400)
                .send({ status: false, message: "password is required" });
        }

        if (!Validator.isValidPassword(password)) {
            return res.status(400).send({
                status: false,
                message: "password should be of 8 to 15 characters and  must have 1 letter and 1 number",
            });
        }

        // password encryption
        const salt_round = await bcrypt.genSalt(10);
        const encryptedpassword = await bcrypt.hash(password, salt_round);

        const userData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            emailID: emailID.trim(),
            phoneNumber: phoneNumber.trim(),
            password: encryptedpassword,
        };

        const newUser = await userModel.create(userData);

        res.status(201).send({
            status: true,
            message: "User successfully registered",
            data: newUser,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

//**********************************************USER LOGIN*************************************************** */

const userLogin = async function(req, res) {
    try {
        const queryParams = req.query;
        const requestBody = req.body;

        //no data is required from query params
        if (Validator.isValidInputBody(queryParams)) {
            return res.status(404).send({ status: false, message: "Page not found" });
        }

        if (!Validator.isValidInputBody(requestBody)) {
            return res.status(400).send({
                status: false,
                message: "User data is required for login",
            });
        }

        const userName = requestBody.emailID;
        const password = requestBody.password;

        if (!Validator.isValidInputValue(userName)) {
            return res
                .status(400)
                .send({ status: false, message: "emailID is required" });
        }

        if (!Validator.isValidEmail(userName)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid emailID " });
        }

        if (!Validator.isValidInputValue(password)) {
            return res
                .status(400)
                .send({ status: false, message: "password is required" });
        }

        if (!Validator.isValidPassword(password)) {
            return res.status(400).send({
                status: false,
                message: "Enter password of 8 to 15 characters and must contain one letter and digit ",
            });
        }
        // finding user by given emailID
        const userDetails = await userModel.findOne({ emailID: userName });

        if (!userDetails) {
            return res
                .status(404)
                .send({ status: false, message: "No user found by emailID" });
        }
        // comparing hashed password and login password
        const ispasswordMatching = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!ispasswordMatching) {
            return res
                .status(400)
                .send({ status: false, message: "incorrect password" });
        }

        // creating JWT token
        const payload = { userId: userDetails._id };
        const expiry = { expiresIn: "2h" };
        const secretKey = "123451214654132466ASDFGwnweruhkwerbjhiHJKL!@#$%^&";

        const token = jwt.sign(payload, secretKey, expiry);

        // setting bearer token in response header
        res.header("Authorization", "Bearer " + token);

        const data = { userId: userDetails._id, token: token };

        res
            .status(200)
            .send({ status: true, message: "login successful", data: data });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

/*******************************************EXPORTING ALL HANDLERS OF USER************************************** */

module.exports = {
    userRegistration,
    userLogin
  }
