var should = require('should');
var app = require('../app');
var request = require('supertest');


//addCompanyEmailTemplate

describe('Contact Link Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add Company Email Template', function (done) {

        request(app)
            .post('/api/addCompanyEmailTemplate')
            .send({
                "subject": "email for product description",
                "title": "product description",
                "description": "product",
                "code": "2WE45"
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


//getCompanyEmailTemplateDetails

describe('Contact Link Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Company Email Template Details', function (done) {

        request(app)
            .post('/api/getCompanyEmailTemplateDetails')
            .send({
                "emailtemplateId": "595f57bd67254052b990e563",
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


//getCompanyEmailTemplateDetails

describe('Contact Link Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get Company Email Template Details', function (done) {

        request(app)
            .post('/api/getCompanyEmailTemplateDetails')
            .send({
                "emailtemplateId": "59563",
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

//updateCompanyEmailTemplate

describe('Contact Link Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Company Email Template Details', function (done) {

        request(app)
            .post('/api/updateCompanyEmailTemplate')
            .send({

                "emailtemplateId": "595f57bd67254052b990e563",
                "subject": "email for product description",
                "title": "product description",
                "description": "product",
                "code": "2WE45"
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
    it('Get Company Email Templates', function (done) {

        request(app)
            .get('/api/getCompanyEmailTemplates')
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

