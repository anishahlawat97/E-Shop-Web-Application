
const db = require('../models');
const Address = db.address;

exports.addAddress = (req, res) => {
    if( !req.headers.authorization || !req.body.zipCode || !req.body.state || !req.body.street || !req.body.city || !req.body.contactNumber || !req.body.name){
        res.status(400).send({
            message: "Please provide all the neccessary details!"
        })
    }

    if(req.body.isAuthenticated !== true){
        res.status(400).send({
            message: "Please Login first to access this endpoint!"
        })
    }

    if(!/^[1-9][0-9]{5}$/.test(req.body.zipCode)){
        res.status(400).send({
            message: "Invalid zip code!"
        })
    }

    if(!/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/.test(req.body.contactNumber)){
        res.status(400).send({
            message: "Invalid contact number!"
        })
    }

    else{        
        const address = new Address({
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            street: req.body.street,
            landmark: req.body.landmark ? req.body.landmark : "",
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
        });
        address.save(address)
        .then(data => {
            data.user = req.body.user
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: "Some error occured while saving the address, please try again later"
            })
        })
    }
}