var should = require('should');
var app = require('../app');
var request = require('supertest');

//addOpportunity
describe('Opportunity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add Opportunity', function (done) {
        request(app)
                .post('/api/addOpportunity')
                .send({"companyId": "5936895125da631546bfb13e", "contactId": "597c3639bd11600004c4bde4", "title": "DTILE", "opportunityNumber"
                            : 5, "estCloseDate": "09/23/2017", "estStartDate": "09/22/2017", "individualId": "597c3688bd11600004c4bde8"
                    , "industryId": "59a69398c73a562495320f42", "salesRep": "59c0f100c9ae451c1d6f0d20", "priorityId": 2, "probabilityId"
                            : 3, "description": "xyz", "weightedValue": 22, "stageId": 3, "value": 12, "createdBy": "test user1", "tags": ["ccc"
                                        , "ddd"], "source": "2", "endUser": "5993dce671ac4311a9986a74"})
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

//updateopportunity


describe('Opportunity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Update Opportunity', function (done) {
        request(app)
                .post('/api/updateopportunity')
                .send({"opportunityId":"59e7d3712eedc30004ff1b57",
            "userId":"593fd7add9e17f2a62d6739e",
            "companyId":"5936895125da631546bfb13e",
            "contactId":"59e7d2d82eedc30004ff1b51",
            "endUser":"59e7d2d82eedc30004ff1b51",
            "title":"St Junipero Serra Catholic School Digital Signage","opportunityNumber":12,"estCloseDate":"11/03/2017","actCloseDate":""
,"actStartDate":"","estStartDate":"11/01/2017","individualId":"59e7d3632eedc30004ff1b54","industryId"
:"59afbb099844330004fbf0ee","salesRep":"59e7cc6e2eedc30004ff1b3d","priorityId":1,"probabilityId":5,"description"
:"Install and furnish a outdoor and indoor digital signage soluntion","stageId":2,"value":8909,"modifiedBy"
:"test user1","source":"1","sourceDetails":"","tags":[]})
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

describe('Opportunity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Opportunity List', function (done) {
        request(app)
                .post('/api/getOpportunitiesByCompany')
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
describe('Opportunity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Opportunity Detail', function (done) {
        request(app)
                .post('/api/getOpportunitiesData')
                .send({"opportunityId":"59e7d3712eedc30004ff1b57"})
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
describe('Opportunity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Opportunity Detail', function (done) {
        request(app)
                .post('/api/getOpportunitiesEstimates')
                .send({"companyId":"5936895125da631546bfb13e","opportunityId":"59e7d3712eedc30004ff1b57"})
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