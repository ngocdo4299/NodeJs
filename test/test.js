let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const baseUrl = "http://localhost:3000/api";
let token;
it("request a token", function (done) {
  chai
    .request(baseUrl)
    .post("/login")
    .send({ username: "username", password: "12345678" })
    .end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("token");
      token = res.body.token;
      console.log("Token: "+token)
      done();
    });
});

//Test for get list of user
describe("Get All user list test", function () {
  it("It should get all users", function (done) {
    chai
      .request(baseUrl)
      .get("/users")
      .set('authorization','Bearer: '+token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.length).to.be.gt(1);
        expect(res.body[0]).to.have.property("Fullname");
        expect(res.body[0]).to.have.property("role");
        done();
      });
  });
});

describe("Get user detail by id", function () {
    it("It should return user fullname and role", function (done) {
      chai
        .request(baseUrl)
        .get("/user/1")
        .set('authorization','Bearer: '+token)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property("Fullname");
          expect(res.body).to.have.property("role");
          done();
        });
    });
  });

  describe("Create new user", function () {
    it("It should return an object contain user id", function (done) {
        this.timeout(10000);
      chai
        .request(baseUrl)
        .post("/users")
        .set('authorization','Bearer: '+token)
        .send(
            { 
                "id": 4, 
                "username": "hieple4", 
                "password": "1234567810", 
                "firstName": "Le", 
                "lastName": "Hiep", 
                "role": "member" }
        )
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property("_id");
          done();
        });
    });
  });

describe("Update user by id", function () {
    it("It should return user fullname and role", function (done) {
      chai
        .request(baseUrl)
        .put("/user/2")
        .set('authorization','Bearer: '+token)
        .send({ username: "username3", password: "1234567810", firstName: "Le", lastName: "Hiep", role: 'member' })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property("Fullname");
          expect(res.body).to.have.property("role");
          if(!err)
            done();
        });
    });
  });

  describe("Delete user by id", function () {
    it("It delete and then return deleted user _id", function (done) {
        this.timeout(10000);
      chai
        .request(baseUrl)
        .delete("/user/4")
        .set('authorization','Bearer: '+token)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property("_id");
          done();
        });
    });
  });