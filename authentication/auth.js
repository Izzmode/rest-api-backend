const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.generateToken = (user) => {
    //tänk sign/"assign" ny token till en användare
    //skickar med objekt till payload, secretkey samt objekt expires in
    //det är denna objekt som sen används för att hämta användarens grejsimojser
    return jwt.sign({_id: user._id}, secretKey, {expiresIn: '1h'})
}



exports.verifyToken = (req, res, next) => {
 
    try {
    //token är samma som det vi skickar med i headern/authorisation i postman
    const token = req.headers.authorization.split(' ')[1];
    //använder detta sedan för att hitta ordrar kopplade till just denna verifierade jwt
    req.userData = jwt.verify(token, secretKey)
    //next här betyder att den går vidare till nästa funktion (se controller)
    next()
    }
    catch {
        return res.status(401).json({
            message: "You need to log in"
        })
    }
}