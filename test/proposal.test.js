var should = require('should');
var app = require('../app');
var request = require('supertest');

//Get Project details
describe('Proposal Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Proposal', function (done) {
        request(app)
            .post('/api/getProposal')
            .send({
                "companyId": '5936895125da631546bfb13e',
                "contactId": '593e77681048655d02b4ad2f'
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

describe('Proposal Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Add Proposal', function (done) {
        request(app)
            .post('/api/addProposal')
            .send({"companyId":"5936895125da631546bfb13e","customerId":"597c3639bd11600004c4bde4","companyName":"SmartData"
,"address":"Sez mihan,Fuji tower","city":"Nagpur","state":"Maharashtra","zip":"44001","individualId"
:"597c3688bd11600004c4bde8","firstname":"Sarvesh","lastname":"Dwivedi","estimateId":"5984620969ef767aa5446062"
,"title":"Drones","opportunityId":"597eba578de38c074d35be8c","description":"abc"})
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

describe('Proposal Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Get Proposal Details', function (done) {
        request(app)
            .post('/api/getProposalDetail')
            .send({
                "proposalId": '597733a2c8ff185363fff1f4',
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

describe('Proposal Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Update Proposal', function (done) {
        request(app)
            .post('/api/updateProposalDetail')
            .send({"proposalId":"5988426e54371f7b76b1365f","companyId":"5936895125da631546bfb13e","proposalNumber":"6B1365F"
,"customerId":"597c3639bd11600004c4bde4","companyName":"SmartData","address":"Sez mihan,Fuji tower","city"
:"Nagpur","state":"Maharashtra","zip":"44001","individualId":"597c3688bd11600004c4bde8","firstname":"John"
,"lastname":"miller","estimateId":"5984620969ef767aa5446062","title":"Drones","opportunityId":"597eba578de38c074d35be8c"
,"description":"abc"})
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



describe('Proposal Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Delete Proposal', function (done) {
        request(app)
            .post('/api/deleteProposal')
            .send({
                "proposalId": '5940efad729fa923726af8b7',
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
describe('Proposal Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('get Proposal list', function (done) {
        request(app)
            .post('/api/getProposalList')
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

