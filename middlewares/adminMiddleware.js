const adminOnly = (req, res, next)=>{
    if(req.userInfo && req.userInfo.role === 'admin'){
        next();
    } else{
        res.status(403).json({
            message: "Admin Only"
        })
    }
}
module.exports = adminOnly