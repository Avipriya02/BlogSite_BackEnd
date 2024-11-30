const mongoose = require('mongoose');

const connectDB = async(req, res)=>{
    await mongoose.connect("mongodb+srv://avipriyapal2000:FzBaBRj1yGY9hzSl@cluster0.4ommffj.mongodb.net/blogDatabase");
}

module.exports = { connectDB };
