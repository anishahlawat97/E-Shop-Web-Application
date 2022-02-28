const db = require('../models');
const Address = db.address;
const User = db.user;

exports.addAddress = async (req, res) => {
    
    if (!req.body.zipCode || !req.body.state || !req.body.street || !req.body.city || !req.body.contactNumber || !req.body.name) {
        res.status(400).send({
            message: "Please provide all the neccessary details!"
        })
    }

    //zip code validation
    if (!/^[1-9][0-9]{5}$/.test(req.body.zipCode)) {
        res.status(400).send({
            message: "Invalid zip code!"
        })
    }

    //contact number validation
    if (!/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/.test(req.body.contactNumber)) {
        res.status(400).send({
            message: "Invalid contact number!"
        })
    }
    else {
        User.find({ _id: req.body.userid })
            .then(data => {                
                const address = new Address({
                    name: req.body.name,
                    contactNumber: req.body.contactNumber,
                    street: req.body.street,
                    landmark: req.body.landmark ? req.body.landmark : "",
                    city: req.body.city,
                    state: req.body.state,
                    zipCode: req.body.zipCode,
                    user: req.user._id
                });                
                address.save()
                    .then(data => {                        
                        data.populate("user")
                            .then(populatedAddress => {
                                res.status(200).send(populatedAddress);
                            });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({
                            message: "Some error occured while saving the address, please try again later"
                        });
                    });
            });
    }
}