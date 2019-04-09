var should = require('should');
var app = require('../app');
var request = require('supertest');
// describe('Purchase Order Module TDD. Test with valid params', function () {
//     this.timeout(20000);
//     it('Add Purchase Order', function (done) {
//         request(app)
//             .post('/api/addPurchaseOrder')
//             .send({
//                 "companyId": "593e77681048655d02b4ad2f",
//                 "contactId": "593f8e8a5a0b456eb427a48a",
//                 "customerId": "593f860e5a0b456eb427a47d",
//                 "projectId": "594388d2eb16602b1461415b",
//                 "vendor": "new vendor",
//                 "vendorAddress1": "address1",
//                 "vendorAddress2": "address2",
//                 "vendorState": "state1",
//                 "vendorCity": "city1",
//                 "vendorZip": "7876787",
//                 "shippingAddress1": "shippingadddress1",
//                 "shippingAddress2": "shippingadddress2",
//                 "shippingState": "shippingstate",
//                 "shippingCity": "shippingcity",
//                 "shippingZip": "67656789",
//                 "requestedBy": "593f8e8a5a0b456eb427a48a",
//                 "approvedBy": "hive",
//                 "shipVia": "xyz",
//                 "statusId": 2,
//                 "approvalStatusId": 2,
//                 "createdDate": "22-09-2015",
//                 "approvedDate": "23-09-2017",
//                 "uponReceipt": "xyz",
//                 "title": "title1",
//                 "trackingNumber": "zyz123",
//                 "shipDate": "23-09-30278",
//                 "notes": "sajdg"
//             })
//             .set('Content-Type', 'application/json') //set header for this test
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .end(function (err, res) {
//                 should.not.exist(err);
//                 console.log(res.body.message);
//                 res.body.should.be.instanceof(Object);
//                 done();
//             });
//     });
// });



// describe('Purchase Order Module TDD. Test with valid params', function () {
//     this.timeout(20000);
//     it('Update Purchase Order', function (done) {
//         request(app)
//             .post('/api/updatePurchaseOrder')
//             .send({
//                 "poId": "595621bc01976b13be12698f",
//                 "companyId": "593e77681048655d02b4ad2f",
//                 "contactId": "593f8e8a5a0b456eb427a48a",
//                 "customerId": "593f860e5a0b456eb427a47d",
//                 "projectId": "594388d2eb16602b1461415b",
//                 "vendor": "new vendor",
//                 "vendorAddress1": "address1",
//                 "vendorAddress2": "address2",
//                 "vendorState": "state1",
//                 "vendorCity": "city1",
//                 "vendorZip": "7876787",
//                 "shippingAddress1": "shippingadddress1",
//                 "shippingAddress2": "shippingadddress2",
//                 "shippingState": "shippingstate",
//                 "shippingCity": "shippingcity",
//                 "shippingZip": "67656789",
//                 "requestedBy": "593f8e8a5a0b456eb427a48a",
//                 "approvedBy": "hive",
//                 "shipVia": "xyz",
//                 "statusId": 2,
//                 "approvalStatusId": 2,
//                 "createdDate": "22-09-2015",
//                 "approvedDate": "23-09-2017",
//                 "uponReceipt": "xyz",
//                 "title": "title1",
//                 "trackingNumber": "zyz123",
//                 "shipDate": "23-09-30278",
//                 "notes": "sajdg"
//             })
//             .set('Content-Type', 'application/json') //set header for this test
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .end(function (err, res) {
//                 should.not.exist(err);
//                 console.log(res.body.message);
//                 res.body.should.be.instanceof(Object);
//                 done();
//             });
//     });
// });



describe('Purchase Order Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Get Purchase Order Detail', function (done) {
        request(app)
            .post('/api/getPODetail')
            .send({
                "poId": "5936895125da631546bfb13e",
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



describe('Purchase Order Module TDD. Test with valid params', function () {

    this.timeout(20000);
    it('Get Purchase Order List', function (done) {
        request(app)
            .post('/api/getPOlist')
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



describe('Purchase Order Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Delete Purchase Order', function (done) {
        request(app)
            .post('/api/deletePO')
            .send({
                "poId": "5936895125da631546bfb13e",
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

describe('Purchase Order Module TDD. Test with valid params', function () {

    this.timeout(20000);
    it('Delete PO Attach', function (done) {
        request(app)
            .post('/api/deletePO')
            .send({
                "attachmentId": "5936895125da631546bfb13e",
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






