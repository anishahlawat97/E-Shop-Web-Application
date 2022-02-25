module.exports = (app) => {

    const users = require('../controllers/user.controller');
    var router = require('express').Router();
    
    //Login
    router.post("/auth", users.login);

    //Register or SignUp
    router.post("/users", users.signup);

    //Logout
    router.post("/logout", users.logout);    

    app.use("/api", router);
}