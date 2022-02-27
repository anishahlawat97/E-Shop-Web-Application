const db = require("../models");
const Order = db.order;
const Product = db.product;
const Address = db.address;

exports.createOrder = (req, res) => {

    if (req.body.productID && req.body.addressID && req.body.quantity) {
        const filter1 = { _id: req.body.productID };
        const filter2 = { _id: req.body.addressID };
        Promise.all([Product.findOne(filter1), Address.findOne(filter2)]).then(([productInfo, addressInfo]) => {
            if (!productInfo) {
                res.status(400).send({
                    message: `No Product found for ID - ${req.body.productID}!`
                });
            }
            else if (productInfo.availableItems <= 0) {
                res.status(200).send({
                    message: `Product with ID - ${req.body.productID} is currently out of stock!`
                });
            }
            else if (!addressInfo) {
                res.status(400).send({
                    message: `No Address found for ID - ${req.body.addressID}!`
                });
            }
            else {
                const newOrder = new Order({
                    product: req.body.productID,
                    address: req.body.addressID,
                    user: req.body.userID, //change later
                    quantity: req.body.quantity
                });
                newOrder.save()
                    .then(order => {                         
                        if (order !== null) {                           
                            // populate the order document with respective docs
                            order.populate([
                                {
                                    path: "user"
                                },
                                {
                                    path: "address",
                                    populate: { path: "user" }
                                },
                                {
                                    path: "product"
                                }
                            ]).then(orderPopulated => {
                                res.status(200).json({
                                    order: orderPopulated,
                                    message: "Order created successfully!"
                                });
                            })
                                .catch(err => {
                                    res.status(500).send({
                                        message: err.message
                                    })
                                })
                        }

                    })

            }
        })
    }
}
