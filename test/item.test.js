var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Add Item Type', function (done) {
        request(app)
                .post('/api/addItemType')
                .send({
                    "companyId": '5936895125da631546bfb13e',
                    "itemType": 'Material'
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

describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Update Item Type', function (done) {
        request(app)
                .post('/api/updateItemType')
                .send({
                    "itemTypeId": '5936895125da631546bfb13e',
                    "itemType": 'Material'
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

describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Add Item Category', function (done) {
        request(app)
                .post('/api/additemcategory')
                .send({
                    "companyId": '5936895125da631546bfb13e',
                    "categoryType": 'Cabling'
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

describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Update Item Category', function (done) {
        request(app)
                .post('/api/updateItemCategory')
                .send({
                    "itemCategoryId": '5953495b8fbbdf1f32419696',
                    "categoryType": 'Cabling'
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

describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Get item  list', function (done) {
        request(app)
                .post('/api/getItem')
                .send({"companyId": "5936895125da631546bfb13e",
                    "per_page": 20,
                    "page": 1,
                    "searchText": ""
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
describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Get item  type', function (done) {
        request(app)
                .post('/api/getItemType')
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

describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Get item Category list', function (done) {
        request(app)
                .post('/api/getItemCategory')
                .send({
                    "companyId": '5953495b8fbbdf1f32419696',
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


describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Get item individual item', function (done) {
        request(app)
                .post('/api/getIndividualItem')
                .send({
                    "itemId": '59686d12ee11331e9dc3e569',
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

describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Add Item', function (done) {
        request(app)
                .post('/api/additem')
                .send({"companyId":"5936895125da631546bfb13e","itemName":"item test","modal":"item test","partNumber":"123456"
,"itemCategory":"item test","itemTypeId":"597ebbce8de38c074d35be95","series":"item test","manufacturer"
:"item test","description":"item test","notes":"item test","labourHours":"25","itemStatus":"Active","suppliers"
:[{"supplierName":"item test","listPrice":"5","dealerPrice":"3","demoPrice":"","leadTimedays":null,"source"
:"Reseller","priceDate":"","schedule":[{"startQty":"34","endQty":"43","price":"34"}]}],"manufactureWarranty"
:"item test","priceDate":"","mfgUrl":"itemtesttest.com","createdBy":"test user1"})
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



describe('Item Module TDD', function () {
    this.timeout(20000);
    it('Update Item', function (done) {
        request(app)
                .post('/api/updateItem')
                .send({"companyId": "5936895125da631546bfb13e", "itemId": "59a04961303de00004e52235", "itemName": "Zum� Net Wireless Gateway", "modal": "ZUMNET-GATEWAY", "partNumber": "6508255", "itemCategory": "Material", "itemTypeId": "597ebbd88de38c074d35be96", "series": "", "manufacturer": "Crestron", "description": "", "notes": "", "labourHours": "0", "itemStatus": "Upcoming", "suppliers": [{"_id": "5a0023e37b57e00004a65a20", "updatedAt": "2017-11-06T08:57:07.533Z", "createdAt": "2017-11-06T08:57:07.533Z", "supplierName": "Crestron", "demoPrice": 1, "listPrice": "22", "dealerPrice": "22", "priceDate": "", "leadTimeDays": null, "supplySource": "Retail", "itemId": "59a04961303de00004e52235", "__v": 0, "deleted"
                                    : false, "priceSchedule": []}], "mfgUrl": "", "manufactureWarranty": "3 Years", "relatedItems": "", "alternativeItems"
                            : "", "replacementItems": "", "modifiedBy": "test user1"})
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




















