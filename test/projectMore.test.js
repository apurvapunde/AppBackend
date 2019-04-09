var should = require('should');
var app = require('../app');
var request = require('supertest');
var ObjectId = require('mongoose').Types.ObjectId;


//Get Project details
describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get document details by project', function (done) {
        request(app)
                .post('/api/getDocumentDetailByProject')
                .send({
                    "companyId": '59367bce6c8b0712003e5ec6',
                    "projectId": '593f8e8a5a0b456eb427a48a'

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

//Get Project details
describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Get document details by project', function (done) {
        request(app)
                .post('/api/getDocumentDetailByProject')
                .send({
                    "companyId": '',
                    "projectId": ''
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


describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get timer details by project', function (done) {
        request(app)
                .post('/api/getTimerDetailByProject')
                .send({
                    "companyId": '59367bce6c8b0712003e5ec6',
                    "projectId": '593f8e8a5a0b456eb427a48a'

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

describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Get timer details by project', function (done) {
        request(app)
                .post('/api/getTimerDetailByProject')
                .send({
                    "companyId": '',
                    "projectId": ''

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


describe('Project More Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get timer details by project', function (done) {
        request(app)
                .post('/api/getTimerDetailByProject')
                .send({
                    "companyId": 'hjfasyjtrdtfdetdfsjfg',
                    "projectId": 'jdefsudfyewusjfgjhg'

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


describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get invoice details by project', function (done) {
        request(app)
                .post('/api/getInvoiceDetailByProject')
                .send({
                    "companyId": '59367bce6c8b0712003e5ec6',
                    "projectId": '593f8e8a5a0b456eb427a48a'

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

describe('Project More Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get invoice details by project', function (done) {
        request(app)
                .post('/api/getInvoiceDetailByProject')
                .send({
                    "companyId": 'hjfasyjtrdtfdetdfsjfg',
                    "projectId": 'jdefsudfyewusjfgjhg'
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

describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);

    it('Get invoice details by project', function (done) {
        request(app)
                .post('/api/getInvoiceDetailByProject')
                .send({
                    "companyId": '',
                    "projectId": ''
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





describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get activity details by project', function (done) {
        request(app)
                .post('/api/getActivityDetailByProject')
                .send({
                    "companyId": '5936895125da631546bfb13e',
                    "projectId": '593f8e8a5a0b456eb427a48a'
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



describe('Project More Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get activity details by project', function (done) {
        request(app)
                .post('/api/getActivityDetailByProject')
                .send({
                    "companyId": '59367bce',
                    "projectId": '593f8e8'
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


describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Get activity details by project', function (done) {
        request(app)
                .post('/api/getActivityDetailByProject')
                .send({
                    "companyId": '',
                    "projectId": ''
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


describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add project task', function (done) {
        request(app)
                .post('/api/addProjecttask')
                .send({"companyId": "5936895125da631546bfb13e", "itemId": "", "projectId": "598da481c888c9477f900616", "itemName"
                            : "test", "description": "ghj", "start": "09-28-2017", "end": "09-30-2017", "duration": 2, "dailyAverage": 0})
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




describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add project task', function (done) {
        request(app)
                .post('/api/getProjecttask')
                .send({
                    "projectId": "593f8e8a5a0b456eb427a48a",
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





describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get project expenses', function (done) {

        request(app)
                .post('/api/getProjectExpenses')
                .send({
                    "projectId": "5956221f01976b13be126993",
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

describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get project estimation', function (done) {

        request(app)
                .post('/api/getProjectestimate')
                .send({
                    "projectId": "593f8e8a5a0b456eb427a48a",
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



describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get project purchase order', function (done) {

        request(app)
                .post('/api/getProjectpo')
                .send({
                    "projectId": "597733a2c8ff185363fff1f4",
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


// addDailyReport

describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Add daily report', function (done) {

        request(app)
                .post('/api/addDailyReport')
                .send({
                    "projectId": "59883d5754371f7b76b13658", "companyId": "5936895125da631546bfb13e", "customerId": "597c3639bd11600004c4bde4"
                    , "problems": "sd", "date": "08/07/2017", "projectNumber": "6B13658", "daysOfWeek": "Monday", "attention": "597eb6b98de38c074d35be87"
                    , "projectManager": "Tanuj Upreti", "leadTech": "", "projectTitle": "aa", "dailyProduction": "sd", "resolution"
                            : "sd", "workPlan": "sd", "onSiteTeamMember": "ds", "notes": "sd", "preparedBy": "test user1"
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




describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Delete daily report', function (done) {

        request(app)
                .post('/api/deleteDailyReport')
                .send({
                    "dailyReportId": "593f8e8a5a0b456eb427a48a",
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

describe('Project More Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Delete daily report', function (done) {

        request(app)
                .post('/api/deleteDailyReport')
                .send({
                    "dailyReportId": "593f8e8a",
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

describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Delete daily report', function (done) {

        request(app)
                .post('/api/deleteDailyReport')
                .send({
                    "dailyReportId": "",
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

describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get daily report details', function (done) {

        request(app)
                .post('/api/getDailyReportDetails')
                .send({
                    "projectId": "593f8e8a5a0b456eb427a48a",
                    "dailyReportId": "593f860e5a0b456eb427a47d"
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


describe('Project More Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get daily report details', function (done) {

        request(app)
                .post('/api/getDailyReportDetails')
                .send({
                    "projectId": "593f8e8a5a0b45",
                    "dailyReportId": "593a47d"
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



describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Get daily report details', function (done) {

        request(app)
                .post('/api/getDailyReportDetails')
                .send({
                    "projectId": "",
                    "dailyReportId": ""
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

describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get individual daily report', function (done) {

        request(app)
                .post('/api/newDailyReport')
                .send({
                    "projectId": "593f8e8a5a0b456eb427a48a",
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


describe('Project More Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get individual daily report', function (done) {

        request(app)
                .post('/api/newDailyReport')
                .send({
                    "projectId": "593f8e8a",
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


describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Get individual daily report', function (done) {

        request(app)
                .post('/api/newDailyReport')
                .send({
                    "projectId": "",
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



describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get tools for project', function (done) {

        request(app)
                .post('/api/getTools')
                .send({
                    "toolsId": "593f8e8a5a0b456eb427a48a",
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

describe('Project More Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Get tools for project', function (done) {

        request(app)
                .post('/api/getTools')
                .send({
                    "toolsId": "593",
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



describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Get tools for project', function (done) {

        request(app)
                .post('/api/getTools')
                .send({
                    "toolsId": "",
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

describe('Project More Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Update tools for project', function (done) {

        request(app)
                .post('/api/updateTools')
                .send({
                    "toolsId": "593f8e8a5a0b456eb427a48a",
                    "itemId": "593f8e8a5a0b456eb426a47a"
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



describe('Project More Module TDD.Test with invalid input', function () {
    this.timeout(20000);
    it('Update tools for project', function (done) {

        request(app)
                .post('/api/updateTools')
                .send({
                    "toolsId": "593f8e8a5a0b456eb",
                    "itemId": "593f8e8a5a0b4526a47a"
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

describe('Project More Module TDD.Test with blank input', function () {
    this.timeout(20000);
    it('Update tools for project', function (done) {

        request(app)
                .post('/api/updateTools')
                .send({
                    "toolsId": "",
                    "itemId": ""
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














