const Order = require('../schemas/orderSchema');

exports.createOrder = (req, res) => {

    const { orderRow, user } = req.body;

    if(!orderRow || !user){
        return res.status(400).json({
            message: "You need to enter an all fields"
        })
    }

    Order.create({ orderRow, user })
    .then (order => {
        return res.status(201).json(order)
    })
}

exports.findOrder = (req, res) => {

    //hittar order med hjälp av middlewaren (jwt)
    Order.find({ user: req.userData._id })
    .populate({
        path: "orderRow.product",
        select: "name amount"
    })
    .exec()
    .then(order => {
        res.status(200).json(order)
    })
}

