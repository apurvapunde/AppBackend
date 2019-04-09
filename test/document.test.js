var should = require('should');
var app = require('../app');
var request = require('supertest');


describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get document with valid input', function (done) {
        request(app)
            .post('/api/getDocument')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
                "contactId": '593f86685a0b456eb427a482'
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


describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get document with invalid input', function (done) {
        request(app)
            .post('/api/getDocument')
            .send({
                "companyId": '593e7384hfu67fg87',
                "contactId": '593f86685a0b456eb427a482'
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




describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Add Document', function (done) {
        request(app)
            .post('/api/addDocument')
            .send({

                "companyId": '593e77681048655d02b4ad2f',
                "contactId": '593f86685a0b456eb427a482',
                "clientId": '5936895125da631546bfb13e',
                "projectId": '5956221f01976b13be126993',
                "opportunityId": '5943bd532bdc5f4617cf7331',
                "estimateId": '595204f07f913026cb257720',
                "poId": '595621bc01976b13be12698f',
                "description": 'sjfgsjh r3r3 r r3ir387r iferif',
                "documentCategoryId": '5954f71adcfb92709265bacb',
                "referenceNumber": 'sder34567fdr45677',
                "version": 'q76evgdv',
                "location": 'india',
                "fileName": 'doc.xml',
                "author": 'hive',
                "pages": 2,
                "keyword": 'xtsd3',
                "documentTitle": 'title',
                "createdBy": 'hive'
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

describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Update Document', function (done) {
        request(app)
            .post('/api/updateDocument')
            .send({
                "documentId": '5956063c91f3b83e1d665837',
                "companyId": '593e77681048655d02b4ad2f',
                "contactId": '593f86685a0b456eb427a482',
                "clientId": '5936895125da631546bfb13e',
                "projectId": '5956221f01976b13be126993',
                "opportunityId": '5943bd532bdc5f4617cf7331',
                "estimateId": '595204f07f913026cb257720',
                "poId": '595621bc01976b13be12698f',
                "description": 'sjfgsjh r3r3 r r3ir387r iferif',
                "documentCategoryId": '5954f71adcfb92709265bacb',
                "referenceNumber": 'sder34567fdr45677',
                "version": 'q76evgdv',
                "location": 'india',
                "fileName": 'doc.xml',
                "author": 'hive',
                "pages": 2,
                "keyword": 'xtsd3',
                "documentTitle": 'title',
                "createdBy": 'hive'
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


describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get Individual Document', function (done) {
        request(app)
            .post('/api/getIndividualDocument')
            .send({
                "documentId": '5956063c91f3b83e1d665837',
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



describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Add Document Category', function (done) {
        request(app)
            .post('/api/addDocumentCategory')
            .send({
                "companyId": '593e77681048655d02b4ad2f',
                "categoryType": 'New Category',
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

describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get Document Category', function (done) {
        request(app)
            .post('/api/getDocumentCategory')
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

describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get Project List By Alphabet', function (done) {
        request(app)
            .post('/api/getProjectListByAlphabet')
            .send({
                "title": 'ster',
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


describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get Estimate List By Alphabet', function (done) {
        request(app)
            .post('/api/getEstimateListByAlphabet')
            .send({
                "title": 'ster',
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


describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get Order List By Alphabet', function (done) {
        request(app)
            .post('/api/getOrderListByAlphabet')
            .send({
                "title": 'ster',
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

describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get Purchase Order List By Alphabet', function (done) {
        request(app)
            .post('/api/getPoListByAlphabet')
            .send({
                "title": 'ster',
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


describe('Document Module TDD', function () {
    this.timeout(20000);
    it('Get Client  List By Alphabet', function (done) {
        request(app)
            .post('/api/getClientListByAlphabet')
            .send({
                "name": 'hive',
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




