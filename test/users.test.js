var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('User Module TDD.', function () {
    this.timeout(20000);
    it('Get all user', function (done) {

        request(app)
            .post('/api/getAllUsers')
            .send({"userId":"593fd7afd9e17f2a62d6739f","companyId":"5936895125da631546bfb13e"})
            .set('Content-Type', 'application/json') //set header for this test
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                should.not.exist(err);
                console.log(res.body.message);
                res.body.should.be.instanceof(Object);
                done();
            });
    });
});
describe('User Module TDD.', function () {
    this.timeout(20000);
    it('Get user detail', function (done) {

        request(app)
            .post('/api/getUserById')
            .send({"companyUserId":"59804335789b4a312f9436bb"})
            .set('Content-Type', 'application/json') //set header for this test
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                should.not.exist(err);
                console.log(res.body.message);
                res.body.should.be.instanceof(Object);
                done();
            });
    });
});
describe('User Module TDD.', function () {
    this.timeout(20000);
    it('Get user detail', function (done) {

        request(app)
            .post('/api/getUserById')
            .send({"companyUserId":"59804335789b4a312f9436bb"})
            .set('Content-Type', 'application/json') //set header for this test
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                should.not.exist(err);
                console.log(res.body.message);
                res.body.should.be.instanceof(Object);
                done();
            });
    });
});
describe('User Module TDD.', function () {
    this.timeout(20000);
    it('Update user detail', function (done) {

        request(app)
            .post('/api/updateUserDetail')
            .send({"userId":"59804335789b4a312f9436bb","firstName":"Test","lastName":"","name":"Test "})
            .set('Content-Type', 'application/json') //set header for this test
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                should.not.exist(err);
                console.log(res.body.message);
                res.body.should.be.instanceof(Object);
                done();
            });
    });
});
describe('User Module TDD.', function () {
    this.timeout(20000);
    it('Get role', function (done) {

        request(app)
            .post('/api/getRole')
            .send({"companyId":"5936895125da631546bfb13e"})
            .set('Content-Type', 'application/json') //set header for this test
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                should.not.exist(err);
                console.log(res.body.message);
                res.body.should.be.instanceof(Object);
                done();
            });
    });
});
describe('User Module TDD.', function () {
    this.timeout(20000);
    it('checkToken', function (done) {

        request(app)
            .post('/api/checkToken')
            .send({"bearerToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5M2ZkN2FkZDllMTdmMmE2MmQ2NzM5ZSIsImlhdCI6MTUxMDgxNDc5OCwiZXhwIjoxNTExMDczOTk4fQ.-wSEc_1ZJCTdcEsBeIrrq1CZHdFHurwx-Fy17k_VR-s"})
            .set('Content-Type', 'application/json') //set header for this test
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                should.not.exist(err);
                console.log(res.body.message);
                res.body.should.be.instanceof(Object);
                done();
            });
    });
});