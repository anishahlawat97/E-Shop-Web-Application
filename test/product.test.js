let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

chai.use(chaiHttp);

//Assertion Style
chai.should();

describe('Products API', () => {
    describe('GET /api/products', () => {
        it("It should fetch products", (done) => {            
            chai
            .request(server)
            .get("/api/products")                
            .set("x_auth_token", "asdfsdfsadfsdf")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                done();
            });
        });
    });
    describe('GET /api/products/categories', () => {
        it("It should fetch product categories", (done) => {            
            chai
            .request(server)
            .get("/api/products/categories")           
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                done();
            });
        });
    });
});