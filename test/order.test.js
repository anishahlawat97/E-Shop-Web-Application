let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

chai.use(chaiHttp);

//Assertion Style
chai.should();

describe('Orders API', () => {
    describe('POST /api/orders', () => {
        it("It should create an order", (done) => {            
            chai
            .request(server)
            .post("/api/orders")
                .send({productID:"60bd4af2d1bbe10224740025",
                    addressID:"6219155f2708cc8639d6af12",
                    quantity:"2",
                    userID:"6219f730e7ebbb5e3513ae2a"})
                .set("x_auth_token", "asdfsdfsadfsdf")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                done();
            });
        });
    });
});