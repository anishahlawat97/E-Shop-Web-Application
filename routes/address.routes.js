const auth = require("../middleware/auth");

module.exports = (app) => {
    
    const address = require('../controllers/address.controller');
    var router = require('express').Router();

    //Add address
    router.post("/addresses", address.addAddress);

    app.use("/api", router);

}