//import everything I need
const app = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config()


//saving the port in i variable
const PORT = process.env.PORT || 9998;


//creating server
app.listen(PORT, () => {
    console.log('server is running on ' + PORT)
});

//connecting to the database with help of mongoose and uri
mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        console.log('connected to database')
    })
    .catch(err => console.log(err))

