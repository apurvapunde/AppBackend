var should = require('should');
var app = require('../app');
var request = require('supertest');

//addgroup
describe('Contact Group Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add Contact Group', function (done) {
        request(app)
            .post('/api/addgroup')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "userId": "5936895125da631546bfb13d",
                "groupName": "Admin"
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
//
//describe('Contact Group Module TDD.Test with invalid input', function () {
//    this.timeout(20000);
//    it('Add Contact Group', function (done) {
//        request(app)
//            .post('/api/addgroup')
//            .send({
//                "companyId": "593689512513e",
//                "userId": "593631546bfb13d",
//                "groupName": "Admin"
//            })
//            .set('Content-Type', 'application/json') //set header for this test
//            .expect(200)
//            .expect('Content-Type', /json/)
//            .end(function (err, res) {
//                should.not.exist(err);
//                console.log(res.body.message);
//                res.body.should.be.instanceof(Object);
//                done();
//            });
//    });
//});

//deletecontactGroup

describe('Contact Group Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Delete Contact Group', function (done) {

        request(app)
            .post('/api/deletecontactGroup')
            .send({
                "groupId": "5940e3119dc0fa6c8a0222e5",
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
//
//describe('Contact Group Module TDD.Test with invalid input', function () {
//    this.timeout(20000);
//    it('Delete Contact Group', function (done) {
//        request(app)
//            .post('/api/deletecontactGroup')
//            .send({
//                "groupId": "5940e3119dc2e5",
//            })
//            .set('Content-Type', 'application/json') //set header for this test
//            .expect(200)
//            .expect('Content-Type', /json/)
//            .end(function (err, res) {
//                should.not.exist(err);
//                console.log(res.body.message);
//                res.body.should.be.instanceof(Object);
//                done();
//            });
//    });
//});

describe('Contact Group Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Delete Contact Group', function (done) {

        request(app)
            .post('/api/deletecontactGroup')
            .send({
                "groupId": "",
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

//addcontacttoGroup

describe('Contact Group Module TDD.Test with valid input', function () {
    this.timeout(20000);

    it('Add Contact to Group', function (done) {
        request(app)
            .post('/api/addcontacttoGroup')
            .send({
                "groupId": "5940e3119dc0fa6c8a0222e5",
                "contactId": "5936895125da631546bfb13d"
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

describe('Contact Group Module TDD.Test with valid input', function () {
    this.timeout(20000);

    it('Remove Contact from Group', function (done) {
        request(app)
            .post('/api/removecontactfromGroup')
            .send({
                "groupId": "5940e3119dc0fa6c8a0222e5",
                "contactId": "5936895125da631546bfb13d"
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

//getcontactGroup

describe('Contact Group Module TDD.Test with valid input', function () {
    this.timeout(20000);    
    it('Remove Contact from Group', function (done) {
        request(app)
            .post('/api/getcontactGroup')
            .send({
                "companyId": "5940e3119dc0fa6c8a0222e5",
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

//describe('Contact Group Module TDD.Test with invalid input', function () {
//    this.timeout(20000);
//    it('Remove Contact from Group', function (done) {
//        request(app)
//            .post('/api/getcontactGroup')
//            .send({
//                "companyId": "5940e3119dc0fa6c8a5",
//            })
//            .set('Content-Type', 'application/json') //set header for this test
//            .expect(200)
//            .expect('Content-Type', /json/)
//            .end(function (err, res) {
//                should.not.exist(err);
//                console.log(res.body.message);
//                res.body.should.be.instanceof(Object);
//                done();
//            });
//    });
//});