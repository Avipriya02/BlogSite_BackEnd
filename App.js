const express = require('express');
const { connectDB } = require('./config/database');

const app = express();

app.get("/",(req,res)=>{
    res.status(200).send("Hello Wrold!");
})

connectDB().then(()=>{
    console.log("Database Connected Successfully!")
    app.listen(7000,(req,res)=>{
        console.log("Server is lisening to the port 7000!");
    })
}).catch((err) = () =>{
    console.log("Database Cannot be connected!");
})
