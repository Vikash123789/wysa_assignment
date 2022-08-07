let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {

        nickName: {
            type: String,
            required : true,
            maxlength: 10
        },
        // lastName: {
        //     type: String,
        //     maxlength: 32
        // },
        // emailID: {
        //     type: String,
        //     required : true,
        //     trim: true,
        //     required: true
        // },
        password: {
            type: String,
            required : true,
        },
        // phoneNumber: {
        //     type: String,
        //     required : true,
        // },
    },
    { timestamps: true },

);

module.exports = mongoose.model('user', UserSchema);
