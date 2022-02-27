const auth = require("../middleware/auth");

module.exports = (app) => {
    
    const order = require('../controllers/order.controller');
    var router = require('express').Router();

    //Create Order
    router.post("/orders",  order.createOrder);

    app.use("/api", router);

}