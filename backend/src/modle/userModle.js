const bcryptjs = require("bcryptjs")
const { Schema, model } = require('mongoose');
const { defualtImagePath } = require("../secret");


const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is require'],
        trim: true,
        minlength: [3, 'The length of user name can be minimum 3 characters.'],
        mxlangth: [31, 'The length of user name can be mixmum 31 characters.']
    },
    email: {
        type: String,
        require: [true, 'Email is require'],
        trim: true,
        unique: [true, 'This email alredy exit'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        require: [true, 'Password is require'],
        trim: true,
        minlength: [6, 'The length of password can be minimum 6 characters.'],
        set: (v) => bcryptjs.hashSync(v, bcryptjs.genSaltSync(10))
    },
    phone: {
        type: Number,
        require: [true, 'Phone is require'],
    },
    address: {
        type: String,

    },

    image: {
        type: String,
        default: defualtImagePath
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;