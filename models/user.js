const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength: 4,
        maxLength: 50,
    },
    lastName:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("The email id is not valid!");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be strong!");
                
            }
        }
    }
},{timestamps:true});

userSchema.methods.checkPassword = async function (passwordInputByUser) {
    const user = this;
    const passwordOfUser = user.password;
    const isPassWordMatch = await bcrypt.compare(passwordInputByUser, passwordOfUser);
    return isPassWordMatch;
};

userSchema.methods.createToken = async function () {
    const user = this;
    const token = await jwt.sign({id: user._id}, 'secret', { expiresIn: '7d' });
    return token;
}

module.exports = mongoose.model("User",userSchema);