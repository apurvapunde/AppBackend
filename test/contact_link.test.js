var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('Contact Link Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add Contact Links', function (done) {

        request(app)
            .post('/api/addContactLinks')
            .send({
                "companyId": "59367bce6c8b0712003e5ec6",
                "contactId": "59368bce6c8b0712004e5ec9",
                "linkContactId": "59367bce6c8b0712007e5ec7"
            })
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

describe('Contact Link Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Add Contact Links', function (done) {

        request(app)
            .post('/api/addContactLinks')
            .send({
                "companyId": "59367bce6c8b0716",
                "contactId": "59368bce62004e5ec9",
                "linkContactId": "5936e6c8b0712007e5ec7"
            })
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

//get getContactLinks
describe('Contact Link Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Contact Links', function (done) {
        request(app)
            .post('/api/getContactLinks')
            .send({
                "companyId": "59367bce6c8b0712003e5ec6",
                "contactId": "59368bce6c8b0712004e5ec9",
            })
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

describe('Contact Link Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get Contact Links', function (done) {

        request(app)
            .post('/api/getContactLinks')
            .send({
                "companyId": "59367bce6cec6",
                "contactId": "5932004e5ec9",
            })
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


describe('Contact Link Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Remove Contact Links', function (done) {

        request(app)
            .post('/api/removeContactLinks')
            .send({

                "companyId": "59367bce6c8b0712003e5ec6",
                "contactId": "59368bce6c8b0712004e5ec9",
                "linkContactId": "59367bce6c8b0712007e5ec7"

            })
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



describe('Contact Link Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Remove Contact Links', function (done) {

        request(app)
            .post('/api/removeContactLinks')
            .send({

                "companyId": "59367bce6c8b0712c6",
                "contactId": "59368bce",
                "linkContactId": "5936"

            })
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





describe('Contact Link Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Contact Lists', function (done) {

        request(app)
            .post('/api/getContactLists')
            .send({

                "companyId": "59367bce6c8b0712003e5ec6",
                "contactId": "59368bce6c8b0712004e5ec9",

            })
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



describe('Contact Link Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get Contact Lists', function (done) {

        request(app)
            .post('/api/removeContactLinks')
            .send({

                "companyId": "59367bce6c8b0716",
                "contactId": "59368bce6c8b0ec9",

            })
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