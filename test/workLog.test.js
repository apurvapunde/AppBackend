var assert = require('assert');
var chai = require('chai');
var expect = require('chai').expect;
var should = require('chai').should();
// var app = require('../app');
var chaiHttp = require('chai-http');
var test_data = require('./constant/constant.js');
chai.use(chaiHttp);

describe('Test cases - 1. workLog_ctrl.js - worklog controller - Add worklog', function () {
    // this.timeout(20000);

    let workLogObj =
        {
            "companyEmployeeId": "593fd7afd9e17f2a62d6739f",
            "technicianName": "Ramiz Kasid",
            "companyId": "5936895125da631546bfb13e",
            "currentDate": "Mon, Dec 17, 2018 12:47 pm",
            "status": 1,
            "project": {
                "_id": "5b2392e7eb7dd3726cfa3ef7",
                "orderNumber": "SO-100004"
            }
        }

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/addNewWorkLog?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(workLogObj)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {    
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.instanceof(Object);
                done();
            });
    });

    it('It should return status 401 - Send invalid id', (done) => {
        console.log("INSIDE TEST CASE 2")
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/addNewWorkLog?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                companyEmployeeId: 'String'
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Provided objectId is not valid', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        console.log("INSIDE TEST CASE 3")
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/addNewWorkLog?api_key=`) //define on which api you perform an opeartion and which method
            .send({ workLogObj })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                assert.equal(403, res.body.code, 'Status should be 401.');
                assert.equal('Invalid Token!', res.body.message, 'message should be properly defined.');
                done();
            });
    });
});

describe('Test cases - 2. workLog_ctrl.js - worklog controller - Get Project And ServiceOrder List', function () {
    // this.timeout(20000);

    let obj =
        {
            "companyId": "5936895125da631546bfb13e"
        }

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getProjectAndServiceOrderList?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(obj)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {    
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.instanceof(Object);
                done();
            });
    });

    it('It should return status 401 - Send invalid id', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getProjectAndServiceOrderList?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                companyId: '342354235423'
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Provided objectId is not valid', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getProjectAndServiceOrderList?api_key=`) //define on which api you perform an opeartion and which method
            .send({ obj })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                assert.equal(403, res.body.code, 'Status should be 401.');
                assert.equal('Invalid Token!', res.body.message, 'message should be properly defined.');
                done();
            });
    });
});

describe('Test case - 3. workLog_ctrl.js - worklog controller - Get Work Log Details', function () {
    // this.timeout(20000);

    let obj =
        {
            "companyId": "5936895125da631546bfb13e",
            "workLogId": "5c13918c437ad327157b1213"
        }

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getWorkLogDetails?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(obj)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {    
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.instanceof(Object);
                done();
            });
    });

    it('It should return status 401 - Send invalid id', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getWorkLogDetails?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                companyId: '342354235423'
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Provided objectId is not valid', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getWorkLogDetails?api_key=`) //define on which api you perform an opeartion and which method
            .send({ obj })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                assert.equal(403, res.body.code, 'Status should be 401.');
                assert.equal('Invalid Token!', res.body.message, 'message should be properly defined.');
                done();
            });
    });
});

describe('Test case - 4. workLog_ctrl.js - worklog controller - Update Work Log', function () {
    // this.timeout(20000);

    let obj =
        {
            "companyId": "5936895125da631546bfb13e",
            "companyEmployeeId": "593fd7afd9e17f2a62d6739f"
        }

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateWorkLogInfo?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(obj)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {    
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.instanceof(Object);
                done();
            });
    });

    it('It should return status 401 - Send invalid id', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateWorkLogInfo?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                companyId: '342354235423'
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Provided objectId is not valid', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateWorkLogInfo?api_key=`) //define on which api you perform an opeartion and which method
            .send({ obj })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                assert.equal(403, res.body.code, 'Status should be 401.');
                assert.equal('Invalid Token!', res.body.message, 'message should be properly defined.');
                done();
            });
    });
});

describe('Test case - 5. workLog_ctrl.js - worklog controller - Get Work Log List', function () {
    // this.timeout(20000);

    let obj =
        {
            "companyId": "5936895125da631546bfb13e"
        }

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getWorkLogList?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(obj)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {    
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.instanceof(Object);
                done();
            });
    });

    it('It should return status 401 - Send invalid id', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getWorkLogList?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                companyId: '342354235423'
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Provided objectId is not valid', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getWorkLogList?api_key=`) //define on which api you perform an opeartion and which method
            .send({ obj })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body);
                assert.equal(403, res.body.code, 'Status should be 401.');
                assert.equal('Invalid Token!', res.body.message, 'message should be properly defined.');
                done();
            });
    });
});

// describe('Test case - 6. workLog_ctrl.js - worklog controller - Delete Work Log', function () {
//     // this.timeout(20000);

//     let obj =
//         {
//             "workLogId": "5936895125da631546bfb13e"
//         }

//     it('It should return status 200 - All parameters provided', (done) => {
//         chai.request(test_data.url_prefix) //started server - connected with db
//             .post(`/api/getProjectAndServiceOrderList?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
//             .send(obj)
//             .set('Content-Type', 'application/json') //set header for this test
//             .end((err, res) => {    
//                 res.should.have.status(200);
//                 res.should.be.json;
//                 res.should.be.instanceof(Object);
//                 done();
//             });
//     });

//     it('It should return status 401 - Send invalid id', (done) => {
//         chai.request(test_data.url_prefix) //started server - connected with db
//             .post(`/api/getProjectAndServiceOrderList?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
//             .send({
//                 workLogId: '342354235423'
//             })
//             .set('Content-Type', 'application/json') //set header for this test
//             .end((err, res) => {
//                 // console.log(res);    
//                 res.should.have.status(200);
//                 res.should.be.json;
//                 assert.equal(401, res.body.code, 'Status should be 401.');
//                 assert.equal('Provided objectId is not valid', res.body.message, 'message should be properly defined.');
//                 done();
//             });
//     });

//     it('It should return status 403 - Api token is not provided', (done) => {
//         chai.request(test_data.url_prefix) //started server - connected with db
//             .post(`/api/getProjectAndServiceOrderList?api_key=`) //define on which api you perform an opeartion and which method
//             .send({ obj })
//             .set('Content-Type', 'application/json') //set header for this test
//             .end((err, res) => {
//                 // console.log(res);    
//                 res.should.have.status(200);
//                 res.should.be.json;
//                 // console.log(res.body);
//                 assert.equal(403, res.body.code, 'Status should be 401.');
//                 assert.equal('Invalid Token!', res.body.message, 'message should be properly defined.');
//                 done();
//             });
//     });
// });