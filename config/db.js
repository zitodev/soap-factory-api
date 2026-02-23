const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://azuama69_db_user:azuama69_db_userked@cluster0.vodazaf.mongodb.net/sofyne");
        console.log("Database connected");
        
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

module.exports = connectDB