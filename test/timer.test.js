var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('Activity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add new timer', function (done) {

        request(app)
            .post('/api/addNewTimer')
            .send({"companyEmployeeId":"593fd7afd9e17f2a62d6739f",
        "companyId":"5936895125da631546bfb13e",
        "contactId":"597c3688bd11600004c4bde8",
        "projectId":"59883d5754371f7b76b13658",
        "projectItemId":"59883d5754371f7b76b13658",
        "startDate":"08-31-2017",
        "startTime":"3:55:00 pm","endDate":"08-08-2017","endTime":"3:55:00 pm","totalHours":"","description":"23223","wageRate"
:"33","hoursDt":"","hoursRt":"8","hoursOt":"","createdBy":"test user1"})
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
//describe('Activity Module TDD.Test with valid input', function () {
//    this.timeout(20000);
//    it('Add new timer', function (done) {
//        request(app)
//            .post('/api/addNewTimer')
//            .send({
//
//                "companyId": "593e776810486552f",
//                "companyEmployeeId": "593fd7afd2d6739f",
//                "projectId": "595c755a2a190d62e49",
//                "contactId": "59522f8bfdcc1df95901",
//                "projectItemId": "5954a27099b00763c",
//                "startDate": "22-09-2012",
//                "endDate": "23-09-2015",
//                "startTime": "12",
//                "endTime": "09",
//                "totalHours": "3",
//                "description": "timer",
//                "wageRate": "33",
//                "employeeApproved": "false",
//                "createdBy": "hive",
//                "hoursDt": "8",
//                "hoursRt": "9",
//                "hoursOt": "0"
//                
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

// updateTimerInfo
describe('Activity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Update timer info', function (done) {
        request(app)
            .post('/api/updateTimerInfo')
            .send({

                "timerId": "595cb36e430a261c20cbc679",
                "contactId": "595c755a2a190d1313162e49",
                "companyId": "593e77681048655d02b4ad2f",
                "companyEmployeeId": "593fd7afd9e17f2a62d6739f",
                "projectItemId": "595c755a2a190d1313162e49",
                "startDate": "22-09-2013",
                "endDate": "23-09-2016",
                "startTime": "23",
                "endTime": "24",
                "totalHours": "3",
                "description": "update info",
                "wageRate": "32",
                "employeeApproved": "true",
                "modifiedBy": "hive",
                "hoursDt": "23",
                "hoursRt": "78",
                "hoursOt": "45"
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



// updateTimerInfo
describe('Activity Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Update timer info', function (done) {
        request(app)
            .post('/api/updateTimerInfo')
            .send({

                "timerId": "595b36e430a261cbc679",
                "contactId": "59755a2a190d131e49",
                "companyId": "593e5d02b4ad2f",
                "companyEmployeeId": "593fd72d6739f",
                "projectItemId": "595c755a2a190d1313162e49",
                "startDate": "22-09-2013",
                "endDate": "23-09-2016",
                "startTime": "23",
                "endTime": "24",
                "totalHours": "3",
                "description": "update info",
                "wageRate": "32",
                "employeeApproved": "true",
                "modifiedBy": "hive",
                "hoursDt": "gadf",
                "hoursRt": "78",
                "hoursOt": "45"

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


describe('Activity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Timer Details', function (done) {
        request(app)
            .post('/api/getTimerDetails')
            .send({
                "timerId": "595cb36e430a261c20cbc679",
                "companyId": "593e77681048655d02b4ad2f",
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


describe('Activity Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get Timer Details', function (done) {
        request(app)
            .post('/api/getTimerDetails')
            .send({
                "timerId": "595cb36e9",
                "companyId": "593b4ad2f",
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

describe('Activity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get timer list', function (done) {
        request(app)
            .post('/api/getTimersList')
            .send({
                "companyId": "593e77681048655d02b4ad2f",
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



describe('Activity Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get timer list', function (done) {
        request(app)
            .post('/api/getTimersList')
            .send({
                "companyId": "ad2f",
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



describe('Activity Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Get timer list', function (done) {
        request(app)
            .post('/api/getTimersList')
            .send({
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

describe('Activity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Delete timer info', function (done) {
        request(app)
            .post('/api/deleteTimerInfo')
            .send({
                "timerId": "595cb36e430a261c20cbc679",
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

describe('Activity Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Delete timer info', function (done) {
        request(app)
            .post('/api/deleteTimerInfo')
            .send({
                "timerId": "59579",
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




describe('Activity Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Delete timer info', function (done) {
        request(app)
            .post('/api/deleteTimerInfo')
            .send({
                "timerId": "",
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








