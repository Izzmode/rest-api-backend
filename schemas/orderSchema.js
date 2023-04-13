const mongoose = require('mongoose');
const Product = require('../schemas/productSchema');


const orderRowSchema = mongoose.Schema({

    // detta ger mig products _id
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' },

    amount: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const orderSchema = mongoose.Schema({

    orderRow: { type: [orderRowSchema] },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);