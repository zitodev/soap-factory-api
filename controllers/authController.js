const User =  require('../models/userModel');
const Staff = require('../models/staffModel');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//admin registration controller
const  adminRegister = async (req, res)=>{
    try{
        const {name, email, password, role} =  req.body;
        const existingUser =  await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "Admin already exist"
            })
        }
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password, salt);

        const newUser  = new User({
            name,
            email,
            password: hashedPassword,
            role
        })
        await newUser.save();

        if(!newUser){
            return res.status(400).json({
                message: "Registration Failed"
            })
        }

        res.status(200).json({
            success: true,
            message: "Registration Completed Successfully"
        })

    }catch(err){
         res.status(500).json({
            message: err.message
        })
    }
}

//admin login controller
const adminLogin = async (req, res)=>{
    try{
        const MAX_LOGIN_ATTEMPTS = 5;
        const LOCK_TIME = 20 * 60 * 1000; // 20 minutes

        const {email, password} = req.body
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        // Check if the account is locked
        if(user.isLocked()){
            return res.status(403).json({
                message: "Account is locked. Please try again later."
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            user.loginAttemps += 1;
            if(user.loginAttemps >= MAX_LOGIN_ATTEMPTS){
                user.isLockUntil = new Date(Date.now() + LOCK_TIME);
            }
            await user.save();
            return res.status(403).json({
                message: "incorrect password"
            })
        }

        const token  = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: "1d"});

        user.loginAttemps = 0;
        user.isLockUntil = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Admin Login Successful",
            token
        })

    }catch(err){
         res.status(500).json({
            message: err.message
        })
    }
}



//staff adding controller
const  addStaff = async (req, res)=>{
    try{
        const {name, email, position, role} =  req.body;
        const existingUser =  await Staff.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "Staff already exist"
            })
        }
        
        const newUser  = new Staff({
            name,
            email,
            position,
            role,
            passport: req.file ? `/uploads/${req.file.filename}` : null
        })
        await newUser.save();

        if(!newUser){
            return res.status(400).json({
                message: "Adding Staff Details Failed"
            })
        }

        res.status(200).json({
            success: true,
            message: "You have Successfully added a staff"
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


//get all users
const getStaff = async (req, res)=>{
    const staff = await Staff.find({});
    if(!staff){
        return res.status(404).json({
            message: "No user found!"
        });
    }
    res.status(201).json({
        data: staff
    })
}


//paginations
const searchStaffs = async(req, res)=>{
    try{
        const{page = 1, limit = 10} = req.query;

        const staffs = await Staff.find()
        .skip((page - 1) * limit)
        .limit(Number(limit))

        const  totalStaffs = await Staff.countDocuments();
        res.status(201).json({
            courrentPage: Number(page),
            totalPages: Math.ceil(totalStaffs / limit),
            totalStaffs,
            staffs
        })

    }catch(err){
        console.log(err.message)

    }
}



module.exports = {
    adminRegister,
    adminLogin,
    addStaff,
    searchStaffs,
    getStaff
}