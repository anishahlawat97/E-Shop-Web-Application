let chai = require('chai'), spies = require('chai-spies');

let chaiHttp = require('chai-http');
let server = require('../server');
const jsonwebtoken = require('jsonwebtoken');



chai.use(chaiHttp);
chai.use(spies);

chai.spy.on(jsonwebtoken, "verify", returns => ({id: '60be6b9af265c52f18c6c718',
isAdmin: true,
iat: 1646052852,
exp: 1646139252}))

//Assertion Style
chai.should();

describe('Address API', () => {
    describe('POST /api/addresses', () => {
        it("It should add address", (done) => {            
            chai
            .request(server)
            .post("/api/addresses")
                .send({name:"Rahul",
                city:"Bangalore Urban",
                state:"Karnataka",
                zipCode:"682004",
                street:"house no 20",
                contactNumber:"9874563210",
                userid:"6218c7ba96a868fc122a0714"})
                .set("x_auth_token", "asdfsdfsadfsdf")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                done();
            });
        });
    });
});