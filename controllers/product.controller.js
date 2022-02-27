const db = require("../models");
const Product = db.product;

exports.displayProducts = (req, res) => {
    //creating the query object to filter data
    let queryObj = {};
    if (req.query.category) {
        queryObj.category = req.query.category;
        console.log(queryObj.category)
    }
    else {
        queryObj.category = "";
    }
    if (req.query.direction == "ASC") {
        var direction = 1;
    }
    else {
        direction = -1;
    }
    if (req.query.name) {
        queryObj.name = req.query.name;
    }
    else {
        queryObj.name = "";
    }
    if (req.query.sortBy) {
        queryObj.sortBy = req.query.sortBy;
    }
    // else{
    //     queryObj.sortBy = 
    // }
    
    Product.find({ $or: [{ category: queryObj.category }, { name: queryObj.name }] }).sort({ price: direction })
        .then(productsData => {
            res.status(200).send({
                products: productsData,
                message: "All products fetched successfully"
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error while fetching the products"
            })
        });
}

exports.getCategories = (req, res) => {
    Product.find({})
        .select('category')
        .distinct("category")
        .then(data => {
            res.status(200).send({
                categories: data,
                message: "Categories fetched succesfully"
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while fetching the categories"
            })
        })
}

exports.getProductByID = (req, res) => {
    const id = req.params.id;
    console.log(id)

    Product.findById(id)
    .then(data => {
        res.status(200).send({
            product: data,
            message: "Product fetched succesfully"
        })
    }).catch(err => {
            res.status(500).send({
                message: `No Product found for ID - ${id}!`
            })
        })
}

exports.addProducts = (req,res) => {
       if(!req.body.name || !req.body.availableItems || !req.body.price || !req.body.category || !req.body.description || !req.body.imageURL || !req.body.manufacturer){
        res.status(400).send({
            message: "Please provide all the details for the product to be added to the inventory"
        })
    }

    else{
        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            price: req.body.price,
            imageURL: req.body.imageURL,
            description: req.body.description
        });

        product.save()
        .then(data => {
            res.status(200).send({
                product: data,
                message: "Product added successfully"
            });
        })
        .catch(err => {
            res.status(400).send({
                message: "Some error occured while adding the product to the inventory"
            })
        })
    }
}

exports.updateProductByID = (req, res) => {
    const id = req.params.id;
    //validate request
    if(!id){
        res.status(400).send({
            message: "ID is required"
        });
        return;
    }

    if(!req.body){
        res.status(400).send({
            message: "Product data is required"
        });
        return;
    }

    Product.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
        res.status(200).send({ 
            updatedProduct: data,        
            message: "Product updated successfully"
        })
    }).catch(err => {
            res.status(500).send({
                message: `No Product found for ID - ${id}`
            })
        })
}

exports.deleteProductByID = (req, res) => {

    const id = req.params.id;

    if(!id){
        res.status(400).send({
            message: "ID is required"
        });
        return;
    } 

    Product.findByIdAndDelete(id)
    .then(data => {
        res.status(200).send({
            product: data,
            message: `Product with ID - ${id} deleted successfully!`
        })
    }).catch(err => {
            res.status(500).send({
                message: `No Product found for ID - ${id}`
            })
        })
}
