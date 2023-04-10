const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.generateToken = (user) => {
    //tänk "assign" ny token till en användare
    //skickar med objekt till payload, secretkey samt objekt expires in
    return jwt.sign({_id: user._id}, secretKey, {expiresIn: '1d'})
}



exports.verifyToken = (req, res, next) => {
 
    try {
    //token är samma som det vi skickar med i headern i postman
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secretKey)
    //next här betyder att den går vidare till nästa funktion (se controller)
    next()
    }
    catch {
        return res.status(401).json({
            message: "You need to log in"
        })
    }
}