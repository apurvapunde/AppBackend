var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('Common Module TDD with valid input', function () {
    this.timeout(20000);
    it('Get category', function (done) {
        request(app)
            .post('/api/getCategory')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
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


describe('Common Module TDD with invalid input', function () {
    this.timeout(20000);
    it('Get category', function (done) {
        request(app)
            .post('/api/getCategory')
            .send({
                "companyId": 'whdfwehg',
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


describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Company List By Alphabet with valid input', function (done) {

        request(app)
            .post('/api/getCompanyListByAlphabet')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
                "companyName": 'smartData',
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


describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Company List By Alphabet with invalid input', function (done) {

        request(app)
            .post('/api/getCompanyListByAlphabet')
            .send({
                "companyId": 'dgwukedyut3t76878',
                "companyName": 'smartData',
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


describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Item List By Alphabet with valid input', function (done) {

        request(app)
            .post('/api/getItemListByAlphabet')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
                "itemName": 'item1',
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

describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Opportunity List By Alphabet with valid input', function (done) {

        request(app)
            .post('/api/getOpportunityListByAlphabet')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
                "title": 'sdn',
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

describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Opportunity List By Alphabet with invalid input', function (done) {

        request(app)
            .post('/api/getOpportunityListByAlphabet')
            .send({
                "companyId": '5jkadgh287eg',
                "title": 'sdn',
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


describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Sales Representative By Company Id', function (done) {
        request(app)
            .post('/api/salesrep')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
                "firstname": 'hemant',
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

describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get List Of Individual with valid input', function (done) {
        request(app)
            .post('/api/getIndividual')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
                "contactId": '59686627c2b1b015fbd5d63c',
                "firstname": 'hemant',
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


describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get List Of Individual with invalid input', function (done) {
        request(app)
            .post('/api/getIndividual')
            .send({
                "companyId": '593e02b4ad2f',
                "contactId": '59686d63c',
                "firstname": 'hemant',
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

describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Estimate By Alphabet with valid input', function (done) {
        request(app)
            .post('/api/getEstimateByAlphabet')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
                "estimateNumber": 'DC3E56A',
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

describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Estimate By Alphabet with invalid input', function (done) {
        request(app)
            .post('/api/getEstimateByAlphabet')
            .send({
                "companyId": 'jgft76',
                "estimateNumber": 'DC3E56A',
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


describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Email Template By Code', function (done) {
        request(app)
            .post('/api/getEmailTemplate')
            .send({
                "code": 'proposal',
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


describe('Common Module TDD', function () {
    this.timeout(20000);
    it('Get Email Template By Code', function (done) {
        request(app)
            .post('/api/getEmailTemplate')
            .send({
                "code": 'proposal',
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
describe('Common Module TDD', function () {
    this.timeout(20000);
    it('add labor rate', function (done) {
        request(app)
                .post('/api/addlaborRate')
                .send({
                    "companyId": "5936895125da631546bfb13e",
                    "laborType": "PROGRAMMER",
                    "displayName": "PGRM",
                    "rate":123
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
describe('Common Module TDD', function () {
    this.timeout(20000);
    it('get labor rate', function (done) {
        request(app)
                .post('/api/getlaborRate')
                .send({
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
describe('Common Module TDD', function () {
    this.timeout(20000);
    it('get Industry List', function (done) {
        request(app)
                .post('/api/getIndustryList')
                .send({"companyId": "5936895125da631546bfb13e",
                    "moduleType": 2,
                    "statusName": "Active"})
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










