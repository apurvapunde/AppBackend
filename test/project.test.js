var should = require('should');
var app = require('../app');
var request = require('supertest');

//Get Project details
describe('Project Module TDD.Test with valid input', function () {
    this.timeout(20000);
    it('Get Project', function (done) {
        request(app)
            .post('/api/getProject')
            .send({
                "companyId": '59367bce6c8b0712003e5ec6',
                "contactId": '593f8e8a5a0b456eb427a48a'
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

describe('Project Module TDD. Test with Invalid objectId', function () {
    this.timeout(20000);
    it('Get Project', function (done) {
        request(app)
            .post('/api/getProject')
            .send({
                "companyId": '59367bce6c8b0712',
                "contactId": '593f8e8a5a0'
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

describe('Project Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Add Project', function (done) {

        request(app)
            .post('/api/addProject')
            .send({"companyId":"5936895125da631546bfb13e","individualId":"597eb6b98de38c074d35be87","customerId":"597c3639bd11600004c4bde4"
,"title":"aa","description":"aa","categoryId":"597ebcec8de38c074d35be9b","priorityId":"3","stageId":1
,"startDate":"08/10/2017","endDate":"08/09/2017","percentComplete":33,"departmentId":"597c4770789b4a21ca9aa219"
,"projectRate":22,"role":[{"contactId":"597eb6b98de38c074d35be87","firstname":"Tanuj","lastname":"Upreti"
,"roleType":1}],"createdBy":"test user1"})
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



describe('Project Module TDD. Test with valid objectId', function () {
    this.timeout(20000);
    it('Get Project Details', function (done) {

        request(app)
            .post('/api/getProjectDetail')
            .send({
                "projectId":'5956221f01976b13be126993',
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



// update project details

describe('Project Module TDD. Test with valid params', function () {
    this.timeout(20000);

    it('Update Project Details', function (done) {

        request(app)
            .post('/api/updateProjectDetail')
            .send({"companyId":"5936895125da631546bfb13e","projectId":"59883d5754371f7b76b13658","individualId":"597eb6b98de38c074d35be87"
,"customerId":"597c3639bd11600004c4bde4","title":"aa","description":"aa","categoryId":"597ebcec8de38c074d35be9b"
,"priorityId":"3","stageId":1,"startDate":"08/10/2017","endDate":"08/09/2017","percentComplete":33,
"departmentId":"597c4770789b4a21ca9aa219",
"projectRate":22,"role":[{"_id":"59883d5754371f7b76b13659","updatedAt":"2017-08-07T10:13:43.606Z","createdAt":"2017-08-07T10:13:43.606Z","contactId":"597eb6b98de38c074d35be87","firstname"
:"Tanuj","lastname":"Upreti","roleType":1,"projectId":"59883d5754371f7b76b13658","__v":0,"deleted":false
}],"modifiedBy":"test user1"})
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




describe('Project Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Delete Project', function (done) {

        request(app)
            .post('/api/deleteProject')
            .send({
                "projectId": '5956221f01976b13be126993',
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

describe('Project Module TDD. Test with invalid params', function () {
    this.timeout(20000);
    it('Delete Project', function (done) {

        request(app)
            .post('/api/deleteProject')
            .send({
                "projectId": '5956221f01976b13be',
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
//addProjectCategory
describe('Project Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Add Project Category', function (done) {

        request(app)
            .post('/api/addProjectCategory')
            .send({
                "projectId": '5956221f01976b13be126993',
                "companyId": '593e77681048655d02b4ad2f',
                "noteDetailId": '595e545d11255a3c6c822bfe',
                "userId": '5936895125da631546bfb13d',
                "categoryName": 'category1'
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

describe('Project Module TDD. Test with invalid params', function () {
    this.timeout(20000);
    it('Add Project Category', function (done) {
        request(app)
            .post('/api/addProjectCategory')
            .send({
                "projectId": '5956221f01976b',
                "companyId": '',
                "noteDetailId": '595e545d11255a3c6c8',
                "userId": '',
                "categoryName": 'category1'
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

describe('Project Module TDD. Test with valid params', function () {
    this.timeout(20000);
    it('Add Project Dropdownlist Value', function (done) {
        request(app)
            .post('/api/getProjectDropdownList')
            .send({
                "projectId": '5956221f01976b13be126993',
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

describe('Project Module TDD. Test with invalid params', function () {
    this.timeout(20000);
    it('Add Project Dropdownlist Value', function (done) {
        request(app)
            .post('/api/getProjectDropdownList')
            .send({
                "projectId": '5956221f01976b',
                "companyId": '593e77681048',
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














