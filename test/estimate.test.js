var should = require('should');
var app = require('../app');
var request = require('supertest');

//Get Estimation details
describe('Estimate Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Estimate Details', function (done) {
        request(app)
                .post('/api/getEstimateDetail')
                .send({
                    "estimateId": '595204f07f913026cb257720',
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

describe('Estimate Module TDD. Test with invalid params(invalid object id)', function () {
    this.timeout(20000);
    it('Get Estimate Details', function (done) {
        request(app)
                .post('/api/getEstimateDetail')
                .send({
                    "estimateId": '12tqfwhd5r3646r3847r3tgfrt678647',
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


describe('Estimate Module TDD. Test with invalid params(null value/required field missing)', function () {
    this.timeout(20000);
    it('Get Estimate Details', function (done) {
        request(app)
                .post('/api/getEstimateDetail')
                .send({
                    "estimateId": '',
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
describe('Estimate Module TDD.', function () {
    this.timeout(20000);
    it('Get Estimate List', function (done) {
        request(app)
                .post('/api/getEstimate')
                .send({"companyId": "5936895125da631546bfb13e"})
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


//Add Estimation

describe('Estimate Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add Estimatation', function (done) {
        request(app)
                .post('/api/addEstimate')
                .send({
                    "companyId": "5936895125da631546bfb13e",
                    "customerId": "597c3639bd11600004c4bde4",
                    "opportunityId": "59c26220aac4961a7becb610",
                    "individualId": "59c10961aac4961a7becb5f7",
                    "proposalId": "",
                    "projectId": "",
                    "billingAddress1": "Sez mihan",
                    "billingAddress2": "Fuji tower",
                    "billingcity": "Nagpur",
                    "billingstate": "Maharashtra",
                    "billingzip": "44001",
                    "shippingAddress1": "xyz",
                    "shippingAddress2": "xyz",
                    "shippingcity": "xyz",
                    "shippingstate": "xyz",
                    "shippingzip": "12345",
                    "salesRep": "59b23a9c3ece9813578a6b34",
                    "stage": 2,
                    "createdBy": "test user1",
                    "item": [{"itemId": "59a653042ff29c178564631d", "itemMfg": "Crestron",
                            "partNo": "8503559", "itemName": "Vector™ Performance Loudspeaker – Dual 15” Bi-Amplified 3-Way Coaxial 60° x 45°", "Qty": 1, "mTaxable": true, "mOurCost": 25, "mMarkup": 30, "mCost": 32.5, "mExtended"
                                    : 32.5, "mTax": 2.925, "mTaxExtended": 35.425, "lType": "59b8c2c69edc9e1509407321", "lHours": 0, "lExtended": 0
                            , "lHoursExtended": 0, "lRate": 95, "rowTotal": 35.425}], "totalEstimate": 35.425, "taxRate": 9, "markUp": 9})
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
describe('Estimate Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add Estimate Name', function (done) {
        request(app)
                .post('/api/addEstimate')
                .send({
                    "companyId": "5936895125da631546bfb13e",
                    "estimateName": "sample",
                    "estimateNumber": "ES-123456"
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
describe('Estimate Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Update Estimatation', function (done) {
        request(app)
                .post('/api/updateEstimateDetail')
                .send({"estimateId": "5a0150237b57e00004a65a28", "companyId": "5936895125da631546bfb13e", "customerId": "59cc06362d293c0004c029ad"
                    , "opportunityId": "59de58c3a8d8610004e700b2", "individualId": "59de58b9a8d8610004e700af", "proposalId": ""
                    , "projectId": "", "billingAddress1": "27202 West Turnberry Lane Suite 100", "billingAddress2": "", "billingcity"
                            : "Valencia", "billingstate": "California", "billingzip": "91355", "shippingAddress1": "", "shippingAddress2"
                            : "", "shippingcity": "", "shippingstate": "", "shippingzip": "", "salesRep": "597c3579bd11600004c4bddc", "stage"
                            : 1, "modifiedBy": "test user1"})
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

describe('Estimate Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Update Estimatation Inline', function (done) {
        request(app)
                .post('/api/updateEstimateDetailInline')
                .send({
                "estimateId":"5b8fa630de5f6b21c79434dd",
                "customerId":"597c3520bd11600004c4bdd8",
                "salesRep":"59ccbc20ecfc6241209f8639",
                "estimateName": "Dummy",
                "billingcity": "Mumbai"
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

describe('Estimate Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get revision list', function (done) {
        request(app)
                .post('/api/getRevisionList')
                .send({"estimateId": "5a0150237b57e00004a65a28"})
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
describe('Estimate Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Update item revision', function (done) {
        request(app)
                .post('/api/updateItemRevision')
                .send({"revisionId": "5a0150237b57e00004a65a29",
                    "revisionName": "Rev0", "item": [{"_id": "5a0150237b57e00004a65a2a", "itemTypeId": 1, "header": "", "rowTotal": 1487.85, "lRate": 115, "lHoursExtended": 0, "lExtended": 0, "lHours"
                                    : 0, "lType": "59bbbb7149c59800045d09af", "laborTypeName": "General Senior Tech", "mTaxExtended": 1487.85, "mTax"
                                    : 122.85, "mExtended": 1365, "mCost": 1365, "mMarkup": 30, "mOurCostExtended": 1050, "mOurCost": 1050, "mTaxable"
                                    : true, "quantity": 1, "itemName": "AIRDual 8\"\" In-Ground Subwoofer, Bronze Textured, Single", "modelNo"
                                    : "AIR IGS82T-BRZ-T-EACH", "partNo": "6506857", "itemMfg": "Crestron", "itemId": "59a004bc303de00004e51059"
                            , "deleted": false}, {"itemId": "59a004bc303de00004e51054", "itemMfg": "Crestron", "partNo": "6501755", "modelNo"
                                    : "ABAR-1", "itemName": "Crestron HomeCAT5 Balanced Audio Receiver, US/North America [Limited Supply]", "quantity"
                                    : 1, "mTaxable": true, "mOurCost": 75, "mOurCostExtended": 75, "mMarkup": "30.0", "mCost": 97.5, "mExtended": 97.5
                            , "mTax": 8.775, "mTaxExtended": 106.275, "laborTypeName": "General Tech", "lType": "59bbbb0a49c59800045d09ae"
                            , "lHours": 0, "lExtended": 0, "lHoursExtended": 0, "lRate": 95, "rowTotal": 106.275, "header": "", "itemTypeId": 1
                        }], "laborCost": 0, "materialCost": 1594.125, "itemsTotal": 1594.125, "ourCostTotal": 1125, "materialExtendedTotal"
                            : 1462.5, "taxTotal": 131.625, "taxExtendedTotal": 1594.125, "hoursExtendedTotal": 0, "rateTotal": 210, "laborExtendedTotal"
                            : 0, "materialCostTotal": 1594.125, "shippingTotal": 0, "markUpPercent": 333.33333333333337, "markUpTotal": 337.5, "totalEstimate": 1594.125, "modifiedBy": "test user1", "taxRate": 9, "markUp": 30})
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



