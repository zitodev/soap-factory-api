const jwt = require('jsonwebtoken')
const auth = (req, res, next)=>{
    const tokenHeader = req.headers['authorization'];
    if(!tokenHeader){
        return res.status(404).json({
            message: "no token found"
        });
    }
    const token = tokenHeader.split(' ')[1];
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userInfo = decodedToken;
        next();
    }catch(err){
        console.log(err.message)
    }
}

module.exports = auth