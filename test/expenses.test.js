var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('Expenses Module TDD', function () {
    this.timeout(20000);
    it('Add Expenses with valid input', function (done) {

        request(app)
            .post('/api/addExpenses')
            .send({
                
                "enteredOn": '593e77681048655d02b4ad2f',
                "createdBy": '593e77681048655d02b4ad2f',
                "projectId": '596d9b004a62761589b6af79',
                "description": 'new description',
                "type": "new expenses",
                "purchasedAt": 'xyz',
                "ccLast": 'xyz',
                "type": '1',
                "notes": 'new notes for expenses',
                "estimateImage": 'xyzhrfhrj',
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

describe('Expenses Module TDD', function () {
    this.timeout(20000);
    it('Add Expenses with invalid input', function (done) {

        request(app)
            .post('/api/addExpenses')
            .send({

                "enteredOn": '593e7768104',
                "createdBy": '593e77681048',
                "projectId": '596d9b004',
                "description": 'new description',
                "type": "new expenses",
                "purchasedAt": 'xyz',
                "ccLast": 'xyz',
                "type": '1',
                "notes": 'new notes for expenses',
                "estimateImage": 'xyzhrfhrj',
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



describe('Expenses Module TDD', function () {
    this.timeout(20000);
    it('Update Expenses with valid input', function (done) {

        request(app)
            .post('/api/updateExpenses')
            .send({
                "enteredOn": '593e77681048655d02b4ad2f',
                "createdBy": '593e77681048655d02b4ad2f',
                "projectId": '596d9b004a62761589b6af79',
                "description": 'new description',
                "type": "new expenses",
                "purchasedAt": 'xyz',
                "ccLast": 'xyz',
                "type": '1',
                "notes": 'new notes for expenses',
                "estimateImage": 'xyzhrfhrj',
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


describe('Expenses Module TDD', function () {
    this.timeout(20000);
    it('Update Expenses with invalid input', function (done) {

        request(app)
            .post('/api/updateExpenses')
            .send({
                "enteredOn": '58655d02b4ad2f',
                "createdBy": '593e7768104',
                "projectId": '596d9b004a62761589b6af79',
                "description": 'new description',
                "type": "new expenses",
                "purchasedAt": 'xyz',
                "ccLast": 'xyz',
                "type": '1',
                "notes": 'new notes for expenses',
                "estimateImage": 'xyzhrfhrj',
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


describe('Expenses Module TDD', function () {
    this.timeout(20000);
    //get expense list
    it('Get Expenses List', function (done) {

        request(app)
            .post('/api/getExpensesList')
            .send({
                "companyId": '5936895125da631546bfb13e',
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



describe('Expenses Module TDD with valid input', function () {
    this.timeout(20000);
    it('Get Individual Expenses', function (done) {
        request(app)
            .post('/api/getIndividualExpenses')
            .send({
                "expenseId": '593f86685a0b456eb427a482',
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


describe('Expenses Module TDD with invalid input', function () {
    this.timeout(20000);
    it('Get Individual Expenses', function (done) {
        request(app)
            .post('/api/getIndividualExpenses')
            .send({
                "expenseId": 'wjgweruig',
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
















