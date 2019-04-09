var should = require('should');
var app = require('../app');
var request = require('supertest');



describe('Activity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add fax details', function (done) {

        request(app)
            .post('/api/addFaxDetails')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "contactId": ["597c3579bd11600004c4bddc"],
                "projectId": ["5981ca75f770e3421f8b3d76"],
                "opportunityId": ["597eba578de38c074d35be8c"],
                "subject": "todo",
                "template": "5982b0f68606e3c811000001",
                "pages": 12,
                "from": "test user1",
                "createdDate": "08/07/2017",
                "description": "hii"
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
    it('Add call details', function (done) {
        request(app)
            .post('/api/addCallDetails')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "contactId": ["597c3579bd11600004c4bddc"],
                "projectId": ["5981ca75f770e3421f8b3d76"],
                "opportunityId": ["5987fd25c741ad18791f0afb"],
                "subject": "sub",
                "from": "test user1",
                "date": "08/07/2017",
                "startTime": "02:48:42 pm",
                "endTime": "02:48:00 pm",
                "description": "dec",
                "duration": 360,
                "result": "445",
                "createdBy": "test user1"
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
    it('Add letter details', function (done) {
        request(app)
            .post('/api/addLetterDetails')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "contactId": ["597c3579bd11600004c4bddc"],
                "projectId": ["5981ca75f770e3421f8b3d76"],
                "opportunityId": ["5987fd25c741ad18791f0afb"],
                "description": "asas",
                "subject": "saas",
                "template": "59521ac15b94261b5983b7a7",
                "createdBy": "test user1"
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
    it('Add email details', function (done) {
        request(app)
            .post('/api/addEmailDetails')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "contactId": ["597c3579bd11600004c4bddc"],
                "projectId": ["5981ca75f770e3421f8b3d76"],
                "opportunityId": ["5987fd25c741ad18791f0afb"],
                "subject": "dslr",
                "template": "5982b0f68606e3c811000001",
                "from": "test user1",
                "to": "hem@yopmail.com",
                "cc": "hem@yopmail.com",
                "bcc": "hem@yopmail.com",
                "description": "hhk"
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
    it('Add email details', function (done) {
        request(app)
            .post('/api/addTaskDetails')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "contactId": ["597c3579bd11600004c4bddc"],
                "projectId": ["5981ca75f770e3421f8b3d76"],
                "opportunityId": ["5987fd25c741ad18791f0afb", "597eba578de38c074d35be8c"],
                "subject": "hkl",
                "categoryId": "597eb6ac8de38c074d35be86",
                "startdate": "08/07/2017",
                "duedate": "08/23/2017",
                "assignedTo": "597c3688bd11600004c4bde8",
                "assignedBy": "test user1",
                "priority": "2",
                "description": "jnu",
                "reminderDate": "08/11/2017",
                "reminderTime": "03:03:00 pm",
                "createdBy": "test user1"
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
    it('Add event details', function (done) {
        request(app)
            .post('/api/addEventDetails')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "contactId": ["597c3579bd11600004c4bddc"],
                "projectId": ["5981ca75f770e3421f8b3d76"],
                "opportunityId": ["5987fd25c741ad18791f0afb"],
                "categoryId": "597ebad68de38c074d35be8f",
                "eventNotes": "ddd",
                "isAllDay": false,
                "isComplete": false,
                "isRepeat": false,
                "isCalendarEvent": false,
                "startDate": "08/08/2017",
                "endDate": "08/10/2017",
                "startTime": "03:11:00 pm",
                "endTime": "03:11:00 pm",
                "eventName": "fiss",
                "subject": "fiss",
                "createdBy": "test user1"
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
    it('Add note details', function (done) {
        request(app)
            .post('/api/addNoteDetails')
            .send({
                "companyId": "5936895125da631546bfb13e",
                "contactId": ["597c3579bd11600004c4bddc", "5987fcb4c741ad18791f0af7"],
                "projectId": ["5981ca75f770e3421f8b3d76"],
                "opportunityId": ["5987fd25c741ad18791f0afb"],
                "subject": "kim",
                "categoryId": "597eb6ac8de38c074d35be86",
                "createdDate": "08/07/2017",
                "createdTime": "03:12:54 pm",
                "description": "kopl",
                "createdBy": "test user1"
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
    it('Add activity details', function (done) {
        request(app)
            .post('/api/getActivityDetails')
            .send({
                "activityId": "595f2a80c52482253f9e60b7",
                "activityType": 2

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
    it('Add activity details', function (done) {
        request(app)
            .post('/api/getActivityList')
            .send({
                "activityId": "595f2a80c52482253f9e60b7",
                "activityType": 2
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
    it('Delete activity ', function (done) {
        request(app)
            .post('/api/deleteActivity')
            .send({
                "activityId": "595f2a80c52482253f9e60b7",
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

// addActivityCategory
describe('Activity Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Delete activity ', function (done) {
        request(app)
            .post('/api/addActivityCategory')
            .send({
                "companyId": "595f2a80c52482253f9e60b7",
                "userId": "595f2a80c52482253f9e60b7",
                "categoryName": "category1"
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





















