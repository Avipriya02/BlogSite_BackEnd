const express = require('express');

const bcrypt = require('bcrypt');

const authRouter = express.Router();

const { validateSignUpdata, validateLoginData } = require('../utils/validateData');

const User = require('../models/user');



authRouter.post('/signup', async (req, res) => {
    try {

        //Validate the data
        validateSignUpdata(req);

        const { firstName, lastName, emailId, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: encryptedPassword });

        const savedUser = await user.save();

        res.status(200).json({ message: "Account Created Successfully!", data: savedUser });

    }
    catch (err) {
        res.status(400).send("Something Went Wrong!" + err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        validateLoginData(req);
        const { email, pass } = req.body;
        const userDetails = await User.findOne({ emailId: email });

        if (!userDetails) {
            throw new Error("Invalid Credentials!");
        }

        const isPassWordMatch = await userDetails.checkPassword(pass);

        if(!isPassWordMatch){
            throw new Error("Invalid Credentials!");
        }
        else{
            const token = await userDetails.createToken();
            res.cookie("token",token,{httpOnly:true});
            res.status(200).json({message:"Logged In Successfully!"});
        }

    }
    catch (err) {
        res.status(400).send("Something Went Wrong!" + err.message);
    }
})

authRouter.post('/logout',async(req, res)=>{
    res.cookie('token','',{expires:new Date(0)});
    res.status(200).send("Logged Out Successfully!");

})
module.exports = authRouter;