const validator = require('validator');

const validateSignUpdata = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("First Name & Last name are required for signing up!");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email Id is not vaild!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Password must be strong!");
    }
};

const validateLoginData = (req) => {
    const {email, pass} = req.body;
    if(!email || !pass){
        throw new Error("Email and Password are required to login!");
    }
}

module.exports = {validateSignUpdata, validateLoginData};