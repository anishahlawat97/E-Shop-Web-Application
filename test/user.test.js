let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

chai.use(chaiHttp);

//Assertion Style
chai.should();

describe('User API', () => {
    describe('POST /api/auth', () => {
        it("It should login user", (done) => {            
            chai
            .request(server)
            .post("/api/auth")       
            .send({email: "admin@upgrad.com",
        password: "password"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                done();
            });
        });
    });
    describe('POST /api/users', () => {
        it("It should signup user", (done) => {            
            chai
            .request(server)
            .post("/api/users")       
            .send({email:"anish3@gmail.com",
                password:"test@123",
                firstName:"Anish",
                lastName:"Ahlawat",
                contactNumber:"1234567890"})                
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                done();
            });
        });
    });
    describe('POST /api/logout', () => {
        it("It should logout user", (done) => {            
            chai
            .request(server)
            .post("/api/logout")       
            .send({id: "60be6b9af265c52f18c6c718"})                
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                done();
            });
        });
    });
});