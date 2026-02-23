const User = require('../models/userModel');

const loginLimiter = (req, res, next) => {
    const { email } = req.body; 
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    User.findOne({ email }).then(user => {
        if (user && user.isLocked()) {
            return res.status(403).json({ message: "Account is locked due to multiple failed login attempts. Please try again later." });
        }
        next();
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
}

module.exports = loginLimiter;