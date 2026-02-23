const  mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    loginAttemps:{
        type: Number,
        default: 0
    },
    isLockUntil:{
        type: Date
    }
});

userSchema.methods.isLocked = function(){
    return this.isLockUntil && this.isLockUntil > Date.now()
}

module.exports = mongoose.model("User", userSchema)