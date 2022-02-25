const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

exports.signup = (request, response) => {
  
    //Validate Request
    if (!request.body.email || !request.body.password || !request.body.firstName || !request.body.lastName || !request.body.contact) {
        response.status(400).send({
            message: "Please provide email, password, first name, last name and contact number"
        });
        return;
    }

    const filter = { email: request.body.email };

    User.findOne(filter, (err, userData) => {
        if (err || userData !== null) {
            response.status(400).send({
                message: "Try any other email, this email is already registered!"
            })
        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(request.body.email)){
            response.status(400).send({
                message: "Invalid email-id format!"
            })
        }
        else if(!/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/.test(request.body.contact)){
            response.status(400).send({
                message: "Invalid contact number!"
            })
        }
        else {
            const salt = bcrypt.genSaltSync(10);//10 salting rounds
            const hash = bcrypt.hashSync(request.body.password, salt);            
            const user = new User({
                password: hash,
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                contactNumber: request.body.contact,                
                role: request.body.role ? request.body.role : 'user',                
            });
            user.save(user)
                .then(data => {
                    response.status(200).send(data);
                }).catch(err => {
                    response.status(500).send({
                        message: "Some error occured, please try again later"
                    })
                })
        }
    })
};

exports.login = (request, response) => {
    //Validate Request
    if (!request.body.email && !request.body.password) {
        response.status(400).send({
            message: "Please provide email and password to continue"
        });
        return;
    }
    const filter = { email: request.body.email };
    User.findOne(filter, (err, userData) => {
        if (err || userData == null) {
            response.status(401).send({
                message: "This email has not been registered!",
            })
        }
        else {            
            if (bcrypt.compareSync(request.body.password, userData.password)) {
                userData.isLoggedIn = true;
                User.findOneAndUpdate(filter, userData)
                .then(
                    data => {
                        const token = jwt.sign({_id: data._id}, "myPrivateKey");
                        // console.log(token)
                        data.x_auth_token = token;
                        data.isAuthenticated = true;
                        response.json(
                             data
                            // message: "Logged In Successfully",
                        );
                    }
                ).catch(err => {
                    response.status(500).send({
                        message: "Error updating..."
                    });
                });               
            }
            else {
                response.status(401).send({
                    message: "Invalid Credentials!",
                })
            }
        }
    });
}

exports.logout = (request, response) => {
    if (!request.body.id) {
        response.status(400).send({
            message: "Please provide user ID",
        });
        return;
    }
    const update = { isLoggedIn: false };
    User.findByIdAndUpdate(request.body.id, update).then(
        data => {
            response.json({
                userD: data,
                message: "Logged Out Successfully",
            })
        }
    ).catch(err => {
        response.status(500).send({
            message: "Error updating..."
        });
    });
};