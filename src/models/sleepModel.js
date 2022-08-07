const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const sleepDataSchema = new mongoose.Schema(
    {

        userID: {
            type: ObjectId,
            required : true,
            ref: "user"

        },
        sleepStruggle: {
            required : true,
           type : String,
           enum : [ 'Less than 2 weeks' , '2 to 8 weeks' , 'More than 8 weeks' ]
        },
        bedTime: {
            type : String,
            required : true,
            required : true
        },
        wakeTime: {
            type : String,
            
            required : true
        },
        sleepDuration: {
            required : true,
            type: Number,
            min: 0,
            max: 24
        },
    },
    { timestamps: true },

);
module.exports = mongoose.model('sleepData', sleepDataSchema);