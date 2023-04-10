//importing everything i need and initializing app
const express = require('express');
const app = express();
const cors = require('cors');
// const router = require('./controllers/productController');

//Middleware
//methods/functions/operations that are called BETWEEN processing the Request and sending the Response in the application method
app.use(cors());
app.use(express.urlencoded ({ extended: false }));
//method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json())

//Controllers
app.use('/api/products', require('./controllers/productController'))



//exporting app so I can use it in creating servers
module.exports = app;