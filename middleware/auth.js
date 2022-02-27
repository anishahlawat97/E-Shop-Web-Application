const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
    const token = request.headers['x_auth_token'];

    if (!token) {
        return response.status(401).send({
            message: "Please Login first to access this endpoint!"
        })
    }
    try {
        const verified = jwt.verify(token, "myPrivateKey");
        request.user = verified;
        console.log(request.user)
        console.log('Am i admin?', request.user.isAdmin);
        next();
    }
    catch (exception) {
        response.status(401).send("Invalid Token")
    }
}

module.exports = (req, res, next) => {
    const token = req.headers['x_auth_token'];
    const verified = jwt.verify(token, "myPrivateKey");
    req.user = verified;
    console.log(req.user)
    if (!req.user.isAdmin)
        return res.status(401).send({ msg: "You are not authorized to access this endpoint!" });
    next();
};

