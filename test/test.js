/* eslint-disable no-undef */
import chai from 'chai';
import chatHttp from 'chai-http';
chai.use(chatHttp);
const baseUrl = 'http://localhost:3000/api/users';

const expect = chai.expect;

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
    .end((_err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      token = res.body.data;
      done();
    });
});

//User APIs
describe('Test for User', () => {

  // POST /users/
  it('POST /users/: It should create a new user', (done) => {
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
      .end(function (_err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        userId = res.body.data;
        done();
      });
  });


  // GET /users/reset/
  it('GET /users/reset/ : It should get a reset password token', (done) => {
    chai
      .request(baseUrl)
      .get('/reset')
      .send({ 'username': 'ChuNguyenHoangAnh' })
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        resetToken = res.body.data.resetToken;
        done();
      });
  });

  // POST /users/reset/:id
  it('POST /users/reset/:id : It should resets password', (done) => {
    const req = {
      'resetToken': resetToken,
      'password': '12345678',
    };
    chai
      .request(baseUrl)
      .post(`/reset/${userId}`)
      .send(req)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

  //GET /users/search
  it('GET /users/search : It should get a list of users', (done) => {
    chai
      .request(baseUrl)
      .get('/search')
      .set('authorization', 'Bearer: '+token)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

  // GET /users/:id
  it('GET /users/:id : It should get user detail', (done) => {
    chai
      .request(baseUrl)
      .get(`/${userId}`)
      .set('authorization', 'Bearer: '+token)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

  // PUT /users/:id
  it('PUT /users/:id : It should update user detail', (done) => {
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
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

  // DELETE /users/:id
  it('DELETE /users/:id : It should delete user', (done) => {
    chai
      .request(baseUrl)
      .delete(`/${userId}`)
      .set('authorization', 'Bearer: '+token)
      .end((_err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('status', 'code', 'error', 'message', 'data');
        expect(res.body.error).to.be.false;
        done();
      });
  });

});
