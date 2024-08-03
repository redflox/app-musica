const jwt = require('jsonwebtoken');
const { User } = require('../models');

const checkToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).json({message: "Token not provided"});
    }
    const token = req.headers.authorization;
    let payload = null;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(error){
        return res.status(403).json({message: "Invalid token"});
    }

    try{
        const user = await User.findByPk(payload.id);
        req.user = user;
    }catch(error){
        return res.status(403).json({message: "User not found"});
    }
    next();
}

module.exports = { checkToken };