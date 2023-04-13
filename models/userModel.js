const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const auth = require('../authentication/auth')


exports.createUser = (req, res) => {
    //hämtar email och lösenord från bodyn som skickas in
    const { email, password } = req.body;

    //kort felhantering
    if(!email || !password) {
        res.status(400).json({
            message: "All fields need to be entered"
        })
    }
  
    //sparar saltning i en variabel
    const salt = bcrypt.genSaltSync();

    //hashar lösenordet med hjälp av saltningen
    //felhantering och skapandet av en user
    bcrypt.hash(password, salt, (err, hash) => {
        if(err) {
            return res.status(500).json({
                message: "failed in encrypting password"
            })
        }

        //user sparas med email samt hashat lösenord
        //returnerar ett promise, .then för att returnera en token
        User.create({ email, password: hash })
        .then(user => {
            res.status(201).json({
                token: auth.generateToken(user),
                id: user._id
            })
        })
    })
}

exports.loginUser = (req, res) => {
const { email, password } = req.body;

if(!email || !password) {
    res.status(400).json({
        message: "All fields need to be entered"
    })
}

User.findOne({ email })
.then(user => {
    //här kollar vi att email stämmer
    if(!user) {
        //gör en return inne i if-satsen för att avsluta den, vill inte gå vidare.
        return res.status(401).json({
            message: "email and/or password is incorrect"
        })
    }

    //kollar att password (som skickas in i body) matchar det hashade lösenordet på databasen (som är kopplat till mailen vi sökte på)
    bcrypt.compare(password, user.password, (err, result) => {
        if(err){
            return res.status(500).json({
                message: "something went wrong when decrypting the password",
                err: err.message
            })
        }
        //ett false result, alltså lösenordet stämmer ej
        if(!result){
            return res.status(401).json({
                message: "email and/or password is incorrect"
            })
        }

        //det stämde, topp!
        res.status(200).json({
            token: auth.generateToken(user),
            id: user._id
        })
    });

})

}