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
        select: false,
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
    },
    otp: {
        type: String
    },
    resetOtp: {
        type: String,
        select: false,
    },
    resetExpires: {
        type: Date,
        select: false,
    },

}, { timestamps: true });


userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

const User = model('User', userSchema);

module.exports = User;