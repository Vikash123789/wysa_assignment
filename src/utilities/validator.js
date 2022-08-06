const mongoose = require('mongoose')


const isValidInputBody = function (object) {
    return Object.keys(object).length > 0
}


const isValidInputValue = function (value) {
    if (typeof (value) === 'undefined' || value === null || value === 0) return false
    if (typeof (value) === 'string' && value.trim().length > 0) return true
    return false
}

const isValidOnlyCharacters = function (value) {
    return /^[A-Za-z]+$/.test(value)
}



const isValidEmail = function (email) {
    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexForEmail.test(email);
};

const isValidPhone = function (phone) {
    const regexForMobile = /^[6-9]\d{9}$/;
    return regexForMobile.test(phone);
};

const isValidPassword = function (password) {
    const regexForPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    return regexForPass.test(password);
};

const isValidTime = function (time){
    const regexForTime = 	/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/
    return regexForTime
}

const isValidNumber = function (value) {
    if (typeof (value) === "undefined" || value === null) return false;
    if (typeof (value) === "string" && value.trim().length > 0 && Number(value) !== NaN) return true
    if (typeof (value) === "number") return true;
    return false;
};



const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};





module.exports = {
    isValidInputBody,
    isValidInputValue,
    isValidOnlyCharacters,
    isValidEmail,
    isValidPhone,
    isValidPassword,
    isValidNumber,
    isValidObjectId,
    isValidTime
}