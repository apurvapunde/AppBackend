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