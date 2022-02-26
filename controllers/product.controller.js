const db = require("../models");
const Product = db.product;

exports.displayProducts = (req, res) => {
    let queryObj = {};
    if(req.query.category){
        queryObj.category = req.query.category;
        console.log(queryObj.category)
    }
    else{
        queryObj.category = "";
    }
    if(req.query.direction == "ASC"){
        var direction = 1;
    }
    else{
         direction = -1;
    }
    if(req.query.name){
        queryObj.name = req.query.name;
    }
    else{
        queryObj.name = "";
    }
    if(req.query.sortBy){
        queryObj.sortBy = req.query.sortBy;
    }git 
    // else{
    //     queryObj.sortBy = 
    // }
    console.log({$or: [{category: queryObj.category}, {name: queryObj.name}, {$sort: {availableItems:-1}}]})
    Product.find({$or: [{category: queryObj.category}, {name: queryObj.name}]}).sort({price: direction})
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