const Product = require('../schemas/productSchema');

//Create

//Skapar en produkt
exports.createProduct = (req, res) => {
    const { name, description, price, imgURL } = req.body;
    if(!name || !description || !price || !imgURL){
        return res.status(400).json({
            message: "You need to enter something in all of the fields"
        })
    }

    Product.create({
        name,
        description,
        price,
        imgURL
    })
    .then(data => {
        res.status(201).json(data)
    })
    .catch(err => {
        res.status(500).json({
            message: "something went wrong when creating your product",
            err: err.message
        })
        return
    })

}

//Read

//Hämtar alla produkter
exports.getAllProducts = (req, res) => {

    Product.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: "Something went wrong when getting products"
            })
            
        })

}

//Hämtar produkt med ID
exports.getProductById = (req, res) => {

    Product.findById(req.params.id)
        .then(data => {

            if(!data) {
                res.status(404).json({
                    message: "Could not find product"
                })
            }

            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: "Something went wrong when getting the product",
                err: err.message
            })
            
        })

}

//Update


exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then (data => {
        if(!data) {
            res.status(404).json({
                message: "Could not find product to update"
            })
            return
        }
        res.status(200).json(data);

    })
    .catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            err: err.message
        })
    })
}

//Delete

exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then (data => {
        if(!data) {
            res.status(404).json({
                message: "Could not find product to delete"
            })
            return
        }

        res.status(200).json({ id: data._id})
    })
    .catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            err: err.message
        })
    })


}
