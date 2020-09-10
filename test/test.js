/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chatHttp from 'chai-http';
import { createUser } from '../controller/user/userController.js';

chai.use(chatHttp);
const baseUrl = 'http://localhost:3000/api/users';

const expect = chai.expect;
const should = chai.should();

// const addTwo = (num1, num2) => num1 + num2;

let token;
let userId;
let resetToken;
// Login API
it('request a token', (done) => {
  chai
    .request(baseUrl)
    .post('/login')
    .send({ username: 'DoNgoc', password: '12345678' })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      token = res.body.data;
      done();
    });
});

//User APIs
describe('Test for User routes - correct input', () => {

  // POST /users/
  it('It should create a new user', (done) => {
    const req = {
      'userName': 'ChuNguyenHoangAnh',
      'password': '12345678',
      'fullName': 'Chu Nguyen Hoang Anh',
      'address': 'Xuan Thuy',
      'phoneNumber': '0976684194',
      'email': 'hoanganhchunguyen@gmail.com',
    };
    chai
      .request(baseUrl)
      .post('/')
      .send(req)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        userId = res.body.data;
        done();
      });
  });


  // GET /users/reset/
  it('It should get a reset password token', (done) => {
    chai
      .request(baseUrl)
      .get('/reset')
      .send({ 'username': 'DoNgoc' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        resetToken = res.body.data.resetToken;
        done();
      });
  });

  // POST /users/reset/:id
  it('It should resets password', (done) => {
    const req = {
      'resetToken': resetToken,
      'password': '12345678',
    };
    chai
      .request(baseUrl)
      .post(`/reset/${userId}`)
      .send(req)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        // console.log(userId, req, res.body);
        expect(res.body.error).to.be.false;
        done();
      });
  });

  //GET /users/search
  it('It should get a list of users', (done) => {
    chai
      .request(baseUrl)
      .get('/search')
      .set('authorization', 'Bearer: '+token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

  // GET /users/:id
  it('It should get user detail', (done) => {
    chai
      .request(baseUrl)
      .get(`/${userId}`)
      .set('authorization', 'Bearer: '+token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

  // PUT /users/:id
  it('It should update user detail', (done) => {
    const req = {
      'userName': 'ChuNguyenHoangAnh',
      'fullName': 'Chu Nguyen Hoang Anh',
      'address': 'Xuan Thuy',
      'phoneNumber': '0976684194',
      'email': 'hoanganhchunguyen@gmail.com',
    };
    chai
      .request(baseUrl)
      .put(`/${userId}`)
      .set('authorization', 'Bearer: '+token)
      .send(req)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

  // DELETE /users/:id
  it('It should delete user', (done) => {
    chai
      .request(baseUrl)
      .delete(`/${userId}`)
      .set('authorization', 'Bearer: '+token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

});
