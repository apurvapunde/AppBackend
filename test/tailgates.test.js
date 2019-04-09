var should = require('should');
var app = require('../app');
var request = require('supertest');


describe('Tailgates Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add New TailGate', function (done) {

        request(app)
            .post('/api/addNewTailGate')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "dateEffective": "xyz",
                "dateExpire": "22-09-2014",
                "topic": "str",
                "content": "content1"
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

describe('Tailgates Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('update TailGate', function (done) {

        request(app)
            .post('/api/updateTailGateInfo')
            .send({
                "tailgatesId": "5936895125da631546bfb13e",
                "dateEffective": "22-09-2013",
                "dateExpire": "23-09-2015",
                "topic": "24-09-2016",
                "content": "content1"
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


describe('Tailgates Module TDD.Test with valid input', function () {
    this.timeout(20000);

    it('Get TailGate Details', function (done) {
        request(app)
            .post('/api/getTailGateDetails')
            .send({
                "tailgatesId": "5936895125da631546bfb13e",
                "companyId": "5936895125da631546bfb13e",
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


describe('Tailgates Module TDD.Test with invalid input', function () {
    this.timeout(20000);

    it('Get TailGate Details', function (done) {
        request(app)
            .post('/api/getTailGateDetails')
            .send({
                "tailgatesId": "5936895113e",
                "companyId": "593689546bfb13e",
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



describe('Tailgates Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get TailGate List', function (done) {
        request(app)
            .post('/api/getTailGateList')
            .send({
                "tailgatesId": "5936895125da631546bfb13e",
                "companyId": "5936895125da631546bfb13e",
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


describe('Tailgates Module TDD.Test with invalid input', function () {
    this.timeout(20000);

    it('Get TailGate List', function (done) {
        request(app)
            .post('/api/getTailGateList')
            .send({
                "tailgatesId": "5936895113e",
                "companyId": "593689546bfb13e",
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

describe('Tailgates Module TDD.Test with blank input', function () {
    this.timeout(20000);

    it('Get TailGate List', function (done) {
        request(app)
            .post('/api/getTailGateList')
            .send({
                "tailgatesId": "",
                "companyId": "",
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



