var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('Contact Module TDD.Test by get contact list of a company', function () {
    this.timeout(20000);
    it('Get Company Contact', function (done) {
        request(app)
                .post('/api/getContactList')
                .send({"companyId": "5936895125da631546bfb13e",
                    "userType": 1,
                    "per_page": 20,
                    "page": 1,
                    "companySearchText": ""
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
describe('Contact Module TDD.Test by get associated contact list of a company', function () {
    this.timeout(20000);
    it('Get associate Company Contact', function (done) {
        request(app)
                .post('/api/getAssociateContactList')
                .send({"companyId": "5936895125da631546bfb13e",
                    "companyContactId": "59e7d2d82eedc30004ff1b51",
                    "userType": 2
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
describe('Contact Module TDD.Test by get associated contact list of a company by not giving required field', function () {
    this.timeout(20000);
    it('Get associate Company Contact', function (done) {
        request(app)
                .post('/api/getAssociateContactList')
                .send({"companyId": "5936895125da631546bfb13e",
                    "userType": 2
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
describe('Contact Module TDD.Test by adding contact as a company', function () {
    this.timeout(20000);
    it('Add Company Contact', function (done) {
        request(app)
                .post('/api/addcompanycontact')
                .send({"userId": "593fd7add9e17f2a62d6739e", "companyId": "5936895125da631546bfb13e", "phone": [{"phonetype": "Work"
                            , "phone": "(880) 000-0000", "isPrimary": true}], "address": [{"addressType": "Work", "mapAddress1": "sdn", "mapAddress2"
                                    : "sdn", "city": "sdn", "state": "sdn", "zip": "23323", "countryId": "2", "isPrimary": true}], "internet": [{"internetType"
                                    : "Work", "internetvalue": "smartdatainc.@yopmail.com", "isPrimary": true}], "companyName": "HPTL", "webAddress"
                            : "www.smartdatainc.com", "userType": 1, "statusId": "59686e6cee11331e9dc3e570", "createdBy": "test user1", "modifiedBy"
                            : "test user1"})
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
describe('Contact Module TDD.Test by adding contact as a companycontact', function () {
    this.timeout(20000);
    it('Add Company Contact', function (done) {
        request(app)
                .post('/api/addcompanycontact')
                .send({"userId": "593fd7add9e17f2a62d6739e", "companyId": "5936895125da631546bfb13e",
                    "phone": [{"phonetype": "Mobile", "phone": "(788) 878-7877", "isPrimary": true}],
                    "address": [{"addressType": "Work", "mapAddress1": "A1", "mapAddress2": "A2", "city": "sds", "state": "sd", "zip": "21115", "countryId": "2", "isPrimary": true}],
                    "internet": [{"internetType": "Work", "internetvalue": "s@yopmail.com", "isPrimary": true}],
                    "companyName": "HPTL",
                    "companyContactId": "59c234ccaac4961a7becb5fa",
                    "isSalesRep": false,
                    "webAddress": "www.google.com",
                    "userType": 2,
                    "firstname": "TL",
                    "lastname": "HP",
                    "title": "",
                    "nickName": "TP",
                    "typeId": "0",
                    "statusId": "59686e37ee11331e9dc3e56f",
                    "sourceId": "0",
                    "createdBy": "test user1",
                    "modifiedBy": "test user1"})
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

describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Add Company Contact More info', function (done) {
        request(app)
                .post('/api/addcompanycontactmoreinfo')
                .send({"contactId": "59c2365eaac4961a7becb5fe",
                    "departmentId": "597c4770789b4a21ca9aa219",
                    "industryId": "59c25fdcaac4961a7becb60e",
                    "referredBy": "597c3579bd11600004c4bddc",
                    "birthday": "09-15-2017",
                    "spouse": "s",
                    "children": "s",
                    "branch": "ss",
                    "notes": "s",
                    "keyword": ["597084f109e50328d2469668"],
                    "age": 0,
                    "modifiedBy": "test user1"})
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

describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Get Contact Dropdownlist value', function (done) {
        request(app)
                .post('/api/getcontactDropdown')
                .send({
                    "companyId": '5936895125da631546bfb13e'
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
describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Get Contact Dropdownlist value empty value', function (done) {
        request(app)
                .post('/api/getcontactDropdown')
                .send({
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
describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Get parent company list while add company', function (done) {
        request(app)
                .post('/api/getCompanyContactList')
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
describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Get parent company list while edit company', function (done) {
        request(app)
                .post('/api/getCompanyContactList')
                .send({"companyId": "5936895125da631546bfb13e",
                    "companyContactId": "59e5e7deffb23014959886d0"})
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


describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Add Contact Type', function (done) {
        request(app)
                .post('/api/addcontactType')
                .send({
                    "companyId": '5936895125da631546bfb13e',
                    "userId": '5936895125da631546bfb13d',
                    "typeName": 'Internet',
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


describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Add Contact Status', function (done) {
        request(app)
                .post('/api/addcontactStatus')
                .send({
                    "companyId": '5936895125da631546bfb13e',
                    "userId": '5936895125da631546bfb13d',
                    "statusName": 'Active',
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



describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Add Contact Source', function (done) {
        request(app)
                .post('/api/addcontactSource')
                .send({
                    "companyId": '5936895125da631546bfb13e',
                    "userId": '5936895125da631546bfb13d',
                    "sourceName": 'Relationship',
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

describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Add Contact Department', function (done) {
        request(app)
                .post('/api/addcontactDepartment')
                .send({
                    "companyId": '5936895125da631546bfb13e',
                    "userId": '5936895125da631546bfb13d',
                    "departmentName": 'IT',
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


describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Add Contact Industry', function (done) {
        request(app)
                .post('/api/addcontactIndustry')
                .send({
                    "companyId": '5936895125da631546bfb13e',
                    "userId": '5936895125da631546bfb13d',
                    "industryName": 'IT',
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


describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Get Contact Detail', function (done) {
        request(app)
                .post('/api/getContactDetail')
                .send({
                    "contactId": '593f86685a0b456eb427a482',
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


describe('Contact Module TDD.Test by updating company as a contact', function () {
    this.timeout(20000);
    it('Update Company Contact', function (done) {
        request(app)
                .post('/api/updateCompanyContact')
                .send({"contactId": "59c234ccaac4961a7becb5fa",
                    "userId": "593fd7add9e17f2a62d6739e",
                    "companyId": "5936895125da631546bfb13e",
                    "phone": [{"_id": "59c23914aac4961a7becb603",
                            "updatedAt": "2017-09-20T09:47:00.163Z",
                            "createdAt": "2017-09-20T09:47:00.163Z",
                            "contactId": "59c234ccaac4961a7becb5fa",
                            "userId": "593fd7add9e17f2a62d6739e",
                            "phonetype": "Work",
                            "phone": "(880) 000-0000",
                            "isPrimary": true,
                            "deleted": false,
                            "__v": 0}],
                    "address": [{"_id": "59c23914aac4961a7becb604", "updatedAt": "2017-09-20T09:47:00.251Z", "createdAt": "2017-09-20T09:47:00.251Z", "deleted": false, "isPrimary"
                                    : true, "countryId": 2, "state": "sdn", "city": "sdn", "zip": "23323", "mapAddress2": "sdn", "mapAddress1": "sdn"
                            , "addressType": "Work", "contactId": "59c234ccaac4961a7becb5fa", "userId": "593fd7add9e17f2a62d6739e", "__v"
                                    : 0}],
                    "internet": [{"_id": "59c23914aac4961a7becb605", "updatedAt": "2017-09-20T09:47:00.345Z", "createdAt"
                                    : "2017-09-20T09:47:00.345Z", "contactId": "59c234ccaac4961a7becb5fa", "userId": "593fd7add9e17f2a62d6739e"
                            , "internetType": "Work", "internetvalue": "smartdatainc.@yopmail.com", "deleted": false, "isPrimary": true, "__v"
                                    : 0}],
                    "companyName": "HPTL",
                    "contactCompanyId": "59c234ccaac4961a7becb5fa",
                    "webAddress": "www.smartdatainc.com",
                    "userType": 1,
                    "statusId": "59686e37ee11331e9dc3e56f",
                    "modifiedBy": "test user1"})
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
describe('Contact Module TDD.Test by updating contact of a company', function () {
    this.timeout(20000);
    it('Update Company Contact', function (done) {
        request(app)
                .post('/api/updateCompanyContact')
                .send({"contactId": "59c2365eaac4961a7becb5fe",
                    "userId": "593fd7add9e17f2a62d6739e",
                    "companyId": "5936895125da631546bfb13e",
                    "phone": [{"_id": "59c2365eaac4961a7becb5ff", "updatedAt": "2017-09-20T09:35:26.259Z", "createdAt": "2017-09-20T09:35:26.259Z", "contactId": "59c2365eaac4961a7becb5fe", "userId": "593fd7add9e17f2a62d6739e", "phonetype": "Mobile",
                            "phone": "(788) 878-7877", "isPrimary": true, "deleted": false, "__v": 0}],
                    "address": [{"_id": "59c2365eaac4961a7becb600", "updatedAt": "2017-09-20T09:35:26.334Z", "createdAt": "2017-09-20T09:35:26.334Z", "deleted": false, "isPrimary"
                                    : true, "countryId": 2, "state": "sd", "city": "sds", "zip": "21115", "mapAddress2": "A2", "mapAddress1": "A1", "addressType"
                                    : "Work", "contactId": "59c2365eaac4961a7becb5fe", "userId": "593fd7add9e17f2a62d6739e", "__v": 0}],
                    "internet": [{"_id": "59c2365eaac4961a7becb601", "updatedAt": "2017-09-20T09:35:26.416Z", "createdAt": "2017-09-20T09:35:26.416Z", "contactId": "59c2365eaac4961a7becb5fe", "userId": "593fd7add9e17f2a62d6739e", "internetType"
                                    : "Work", "internetvalue": "s@yopmail.com", "deleted": false, "isPrimary": true, "__v": 0}], "companyName": "HPTL"
                    , "contactCompanyId": "59c234ccaac4961a7becb5fa", "isSalesRep": false, "webAddress": "www.google.com", "userType"
                            : 2, "firstname": "TL", "lastname": "HP", "title": "hpt", "nickName": "TP", "typeId": "0", "statusId": "59686e37ee11331e9dc3e56f"
                    , "sourceId": "0", "modifiedBy": "test user1"})
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



describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Delete Contact', function (done) {
        request(app)
                .post('/api/deletecontact')
                .send({
                    "contactId": '593f86685a0b456eb427a482',
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

describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Add New Keywords', function (done) {
        request(app)
                .post('/api/addNewkeywords')
                .send({
                    "keyword": 'Keyword New',
                    "companyId": '593e77681048655d02b4ad2f',
                    "userId": '5936895125da631546bfb13d',
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

describe('Contact Module TDD', function () {
    this.timeout(20000);
    it('Get Individual List', function (done) {

        request(app)
                .post('/api/getIndividualList')
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




















