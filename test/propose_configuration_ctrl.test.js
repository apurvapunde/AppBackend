var assert = require('assert');
var chai = require('chai');
var expect = require('chai').expect;
// var should = require('chai').should();
// var app = require('../app');
var chaiHttp = require('chai-http');
var test_data = require('./constant/constant.js');
chai.use(chaiHttp);

// console.log('Const_data == >', `${test_data.url_prefix}/api/generateProposalPdf?api_key=${test_data.api_token}`)

//Generate PDF Function
describe('Test cases - 1. propose_configuation_ctrl.js - propose configuration controller - Generate PDF on proposal', function () {
    this.timeout(20000);

    let propose_configuration_ctrl_inputs = { //define parameters send inside body
        "proposalId": "5b5721f5c696b83ffdce5a99",
        "htmlContent": "<div style='width: 100%;color: #616262;font-family: sans-serif;background: #fff;cursor: default;font-style: normal;font-weight: normal;line-height: 1;margin: 0;padding: 0;position: relative;font-size: 100%;height: 100%;'><div style='max-width: 1200px; width: 100%; margin: 0px auto; float: none;'><div style='width: 100%; max-width: 1200px; min-width: 768px; float: none; margin: 0px auto; overflow: hidden;'><div style='float: left; box-sizing: border-box; max-width: 1200px; margin: 0px auto; width: 100%; padding: 0px;'><div style='margin-top: 20px; max-width: 50%; float: left; position: relative; box-sizing: border-box; width: calc(100% - 480px);'><img src='http://52.34.207.5:5058/pdfImages/logo-telpro.png' style='display: inline-block; vertical-align: middle; height: auto; border: 0px none; max-width: 100%; width: 342px;'></div><div style='float: left; width: 480px;'><div style='border-bottom: 1px solid rgb(227, 226, 226); box-sizing: border-box; min-height: 130px; padding-left: 0px; margin-top: 20px; float: left; padding-right: 0.9375rem; position: relative; width: 176px;'><div style='float: left; width: 100%; box-sizing: border-box; border-right: 1px solid rgb(227, 226, 226); min-height: 100px; margin: 0px; padding: 0px;'><img src='http://52.34.207.5:5058/pdfImages/mail.png' style='margin-bottom: 13px; max-width: 30px; width: 14%; display: inline-block; vertical-align: middle;'><p style='color: rgb(171, 171, 171); font-size: 10px; line-height: 16px; margin-bottom: 0px; margin-top: 0px;'><!-- react-text: 39 -->1139 Westminster Ave, Suite N<!-- /react-text --><br><!-- react-text: 41 -->Alhambra, California 91803<!-- /react-text --><br><br><!-- react-text: 44 -->410 E Ave K-12, Suite 105<!-- /react-text --><br><!-- react-text: 46 -->Lancaster, CA 91354<!-- /react-text --></p></div></div><div style='box-sizing: border-box; border-bottom: 1px solid rgb(227, 226, 226); min-height: 130px; padding-left: 0px; margin-top: 20px; float: left; position: relative; width: 161px; padding-right: 0.9375rem;'><div style='box-sizing: border-box; border-right: 1px solid rgb(227, 226, 226); min-height: 100px; margin: 0px; padding: 0px;'><img src='http://52.34.207.5:5058/pdfImages/phone.png' style='box-sizing: border-box; margin-bottom: 5px; max-width: 30px; width: 12%; display: inline-block; vertical-align: middle;'><p style='margin: 2px 0px 0px; box-sizing: border-box; color: rgb(171, 171, 171); font-size: 10px; line-height: 16px; padding: 0px;'><!-- react-text: 51 -->(800) 335-2720<!-- /react-text --><br><!-- react-text: 53 -->Fax 323 531 5998<!-- /react-text --><br><br><!-- react-text: 56 -->Monday to Friday<!-- /react-text --><br><!-- react-text: 58 -->8:30am to 4:30pm<!-- /react-text --></p></div></div><div style='box-sizing: border-box; border-bottom: 1px solid rgb(227, 226, 226); min-height: 130px; padding-left: 0px; margin-top: 20px; padding-right: 0.9375rem; position: relative; float: left; width: 131px;'><div style='border-right: none; box-sizing: border-box; min-height: 100px; margin: 0px; padding: 0px;'><img src='http://52.34.207.5:5058/pdfImages/world.png' style='box-sizing: border-box; max-width: 30px; width: 12%; display: inline-block; vertical-align: middle;'><p style='margin-top: 5px; box-sizing: border-box; color: rgb(171, 171, 171); font-size: 10px; line-height: 16px;'><!-- react-text: 63 -->www.tel-pro.net<!-- /react-text --><br><!-- react-text: 65 -->contact@tel-pro.net<!-- /react-text --><br><!-- react-text: 67 -->support@tel-pro.net<!-- /react-text --><br><br><!-- react-text: 70 -->C-7 License #773094<!-- /react-text --></p></div></div></div></div></div><div style='box-sizing: border-box; max-width: 1200px; width: 100%; min-width: 768px; overflow: hidden;'><div style='box-sizing: border-box; max-width: 1200px; margin: 40px auto -5px; width: 100%; min-width: 768px; overflow: hidden;'><div style='box-sizing: border-box; margin-top: 18px; width: 50%; float: left; position: relative;'><h3 style='color: rgb(114, 116, 120); font-size: 18px; line-height: 1.4; font-weight: normal; margin-bottom: 0.5rem; margin-top: 0.2rem;'><img src='http://52.34.207.5:5058/pdfImages/invoice.png' style='box-sizing: border-box; min-width: 22px; width: 5%; display: inline-block; vertical-align: middle; max-width: 100%;'><!-- react-text: 76 -->&nbsp;ESTIMATE FOR<!-- /react-text --></h3><h2 style='color: rgb(114, 116, 120); font-size: 26px; font-weight: bold; margin: 0px;'>SmartData</h2><p style='margin-bottom: 10px; margin-top: 0px; line-height: 22px; color: rgb(114, 116, 120); font-family: inherit; font-weight: normal; font-size: 16px;'><!-- react-text: 79 -->Attn: <!-- /react-text --><!-- react-text: 80 -->asfsdfds sdfdsfd<!-- /react-text --><br></p><p style='margin-bottom: 10px; margin-top: 0px; color: rgb(114, 116, 120); line-height: 16px; font-family: inherit; font-weight: normal; font-size: 17px;'><img class='icon-mail' src='http://52.34.207.5:5058/pdfImages/mail.png' style='line-height: 16px; margin-right: 10px; min-width: 22px; width: 4%;'><!-- react-text: 298 -->sdfs@yopmail.com<!-- /react-text --></p><p style='margin-bottom: 0px; margin-top: 0px; color: rgb(114, 116, 120); line-height: 16px; font-family: inherit; font-weight: normal; font-size: 17px;'><img class='icon-mobile' src='http://52.34.207.5:5058/pdfImages/mobile.png' style='line-height: 16px; margin-right: 16px; min-width: 12px; width: 2%; margin-left: 5px;'><!-- react-text: 84 -->(153) 245-4545  x45454<!-- /react-text --></p></div><div style='box-sizing: border-box; float: right; position: relative; margin: 0px; width: 50%;'><h1 style='color: rgb(175, 175, 176); font-family: sans-serif; font-size: 72px; font-style: normal; font-weight: normal; margin-bottom: 0.5rem; margin-top: 0.2rem;'>Estimate</h1><table style='border-spacing: 0px; border: medium none; width: 100%; background: rgb(255, 255, 255); margin-bottom: 1.25rem;'><thead><tr><td style='background: rgb(255, 255, 255); padding: 0px 0px 10px 8px; vertical-align: bottom; color: rgb(34, 34, 34); font-size: 0.875rem; font-weight: bold; text-align: left; display: table-cell; line-height: 1.125rem;'><div style='box-sizing: border-box; background: url(&quot;http://52.34.207.5:5058/pdfImages/circle.png&quot;) 0px 0px / 100% no-repeat scroll; height: 60px; padding: 16px 3px; text-align: center; width: 60px;'><img src='http://52.34.207.5:5058/pdfImages/dollar.png' style='width: 16px;'></div></td><td style='background: rgb(255, 255, 255); padding: 0px 0px 10px 8px; vertical-align: bottom; color: rgb(34, 34, 34); font-size: 0.875rem; font-weight: bold; text-align: left; display: table-cell; line-height: 1.125rem;'><div style='box-sizing: border-box; background: url(&quot;http://52.34.207.5:5058/pdfImages/circle.png&quot;) 0px 0px / 100% no-repeat scroll; height: 60px; padding: 16px 3px; text-align: center; width: 60px;'><img src='http://52.34.207.5:5058/pdfImages/calendar.png' style='width: 26px;'></div></td><td style='background: rgb(255, 255, 255); padding: 0px 0px 10px 8px; vertical-align: bottom; color: rgb(34, 34, 34); font-size: 0.875rem; font-weight: bold; text-align: left; display: table-cell; line-height: 1.125rem;'><div style='box-sizing: border-box; background: url(&quot;http://52.34.207.5:5058/pdfImages/circle.png&quot;) 0px 0px / 100% no-repeat scroll; height: 60px; padding: 16px 3px; text-align: center; width: 60px;'><img src='http://52.34.207.5:5058/pdfImages/barcode.png' style='width: 32px;'></div></td></tr></thead><tbody><tr><td style='background: url(&quot;http://52.34.207.5:5058/pdfImages/arrow.png&quot;) 20px top no-repeat scroll rgb(99, 191, 225); color: rgb(255, 255, 255); font-size: 16px; padding: 20px;'><!-- react-text: 102 -->Amount:<!-- /react-text --><br><strong><!-- react-text: 105 -->$ <!-- /react-text --><!-- react-text: 106 -->381.17<!-- /react-text --></strong></td><td style='background: url(&quot;http://52.34.207.5:5058/pdfImages/arrow.png&quot;) 20px top no-repeat scroll rgb(99, 191, 225); color: rgb(255, 255, 255); font-size: 16px; padding: 20px;'><!-- react-text: 108 -->Date:<!-- /react-text --><br><strong>August 8, 2018</strong></td><td style='background: url(&quot;http://52.34.207.5:5058/pdfImages/arrow.png&quot;) 20px top no-repeat scroll rgb(99, 191, 225); color: rgb(255, 255, 255); font-size: 16px; padding: 20px;'><!-- react-text: 112 -->Estimate #:<!-- /react-text --><br><strong>ES-100169</strong></td></tr></tbody></table></div></div><div style='width: 100%; max-width: 1200px; float: none; margin: 0px auto; min-width: 768px; overflow: hidden;'><div style='box-sizing: border-box; width: 100%; float: left; position: relative; margin: 0px;'><table style='break-inside: auto; background: rgb(255, 255, 255); border: medium none; margin-bottom: 0px; margin-top: 20px; width: 100%; box-sizing: border-box;'><thead style='background: rgb(245, 245, 245);'><tr><th style='padding: 5px; text-align: center; background: rgb(255, 255, 255); font-size: 12px; color: rgb(99, 191, 225);'>#</th><th style='padding: 5px; text-align: center; background: rgb(255, 255, 255); font-size: 12px; color: rgb(99, 191, 225);'>Item Description</th><th style='padding: 5px; text-align: center; background: rgb(255, 255, 255); font-size: 12px; color: rgb(99, 191, 225);'>Qty</th><th style='padding: 5px; text-align: center; background: rgb(255, 255, 255); font-size: 12px; color: rgb(99, 191, 225);'>Cost</th><th style='padding: 5px; text-align: center; background: rgb(255, 255, 255); font-size: 12px; color: rgb(99, 191, 225);'>Cost Ext</th><th style='padding: 5px; text-align: center; background: rgb(255, 255, 255); font-size: 12px; color: rgb(99, 191, 225);'>Labor Extended</th></tr></thead><tbody><tr><td style='background: rgb(232, 232, 233); text-align: center; padding: 5px; vertical-align: middle; color: rgb(97, 98, 98);'><div style='break-inside: avoid; margin: 4px 0px;'>1</div></td><td style='background: rgb(232, 232, 233); text-align: left; padding: 5px; vertical-align: middle; color: rgb(97, 98, 98);'><div style='break-inside: avoid; margin: 4px 0px;'><h5 style='margin: 0px; font-weight: bold; font-size: 11px; color: rgb(97, 98, 98);'><!-- react-text: 309 -->Chief RPMA163<!-- /react-text --><!-- react-text: 310 --> <!-- /react-text --><!-- react-text: 311 -->(841872094281)<!-- /react-text --></h5><p style='font-size: 11px; margin: 0px;'>RPA ELITE KEY A INCL SLM163 BLK</p></div></td><td style='background: rgb(232, 232, 233); text-align: center; padding: 5px; vertical-align: middle; color: rgb(97, 98, 98);'><div style='break-inside: avoid; margin: 4px 0px;'>1</div></td><td style='background: rgb(232, 232, 233); text-align: center; padding: 5px; vertical-align: middle; color: rgb(97, 98, 98);'><div style='break-inside: avoid; margin: 4px 0px;'>$349.70</div></td><td style='background: rgb(232, 232, 233); text-align: center; padding: 5px; vertical-align: middle; color: rgb(97, 98, 98);'><div style='break-inside: avoid; margin: 4px 0px;'>$349.70</div></td><td style='background: rgb(232, 232, 233); text-align: center; padding: 5px; vertical-align: middle; color: rgb(97, 98, 98);'><div style='break-inside: avoid; margin: 4px 0px;'>$0.00</div></td><!-- react-text: 321 --> <!-- /react-text --></tr></tbody></table></div></div><div style='width: 100%; max-width: 1200px; float: none; margin: 0px auto; min-width: 768px; overflow: hidden;'><div style='box-sizing: border-box; font-size: 12px; width: 41.6667%; float: left; position: relative;'><table style='margin-bottom: 1.25rem;'><tbody><tr><td style='background: rgb(255, 255, 255); color: rgb(143, 143, 143); font-size: 18px; padding-bottom: 0px; padding-top: 30px; line-height: 1.125rem;'><p style='font-size: 12px; line-height: 14px; margin: 0px;'><strong style='font-weight: bold; line-height: inherit;'>Proposed Services</strong></p><p style='white-space: pre-line; font-size: 12px; line-height: 14px; margin: 0px; box-sizing: border-box;'><p><br></p></p></td></tr></tbody></table></div><div style='box-sizing: border-box; float: right; width: 33.3333%; position: relative;'><table style='width: 100%; border: none;'><tbody><tr><td style='background: rgb(255, 255, 255); font-size: 18px; text-align: right;'><span><!-- react-text: 325 -->MATERIAL<!-- /react-text --><!-- react-text: 326 -->:<!-- /react-text --></span></td><td style='background: rgb(255, 255, 255); font-size: 18px; text-align: right; padding-right: 20px;'><span><!-- react-text: 329 -->$<!-- /react-text --><!-- react-text: 330 -->349.70<!-- /react-text --></span></td></tr><tr><td style='background: rgb(255, 255, 255); font-size: 18px; text-align: right;'><span><!-- react-text: 334 -->LABOR<!-- /react-text --><!-- react-text: 335 -->:<!-- /react-text --></span></td><td style='background: rgb(255, 255, 255); font-size: 18px; text-align: right; padding-right: 20px;'><span><!-- react-text: 338 -->$<!-- /react-text --><!-- react-text: 339 -->0.00<!-- /react-text --></span></td></tr><tr><td style='background: rgb(255, 255, 255); font-size: 18px; text-align: right;'><span><!-- react-text: 343 -->SHIPPING<!-- /react-text --><!-- react-text: 344 -->:<!-- /react-text --></span></td><td style='background: rgb(255, 255, 255); font-size: 18px; text-align: right; padding-right: 20px;'><span><!-- react-text: 347 -->$<!-- /react-text --><!-- react-text: 348 -->0.00<!-- /react-text --></span></td></tr><tr><td style='background: rgb(255, 255, 255); font-size: 18px; text-align: right;'><span><!-- react-text: 352 -->TAX<!-- /react-text --><!-- react-text: 353 -->:<!-- /react-text --></span></td><td style='background: rgb(255, 255, 255); font-size: 18px; text-align: right; padding-right: 20px;'><span><!-- react-text: 356 -->$<!-- /react-text --><!-- react-text: 357 -->31.47<!-- /react-text --></span></td></tr></tbody><tfoot style='background: rgb(245, 245, 245);'><tr><td style='padding: 16px 10px; background: rgb(99, 191, 225); color: rgb(255, 255, 255); font-size: 24px; text-align: right;'>Total:</td><td style='padding: 16px 20px 16px 10px; background: rgb(99, 191, 225); color: rgb(255, 255, 255); font-size: 24px; text-align: right;'><!-- react-text: 139 -->$ <!-- /react-text --><!-- react-text: 140 -->381.17<!-- /react-text --></td></tr></tfoot></table><p style='font-size: 12px; text-align: center;'>Grand Total includes labor, materials, and applicable taxes</p><div style='text-align: center;'><p style='margin: 0px;'>Sales Person:</p><p style='margin: 0px;'><strong style='font-weight: bold; line-height: inherit;'>Namit Bisht</strong></p></div></div></div><div style='font-size: 12px; max-width: 1200px; width: 100%; float: none; margin: 0px auto; min-width: 768px; overflow: hidden;'><div style='box-sizing: border-box; width: 100%; float: left; position: relative; margin: 0px;'><p style='font-family: inherit; font-size: 16px; font-weight: normal; line-height: 1.6; margin-bottom: 1.25rem; margin-top: 6px;'>There’s a one-year warranty on installation.  All installation and programming is performed in accordance with established industry and manufacturer’s standard practices and procedures. </p></div></div></div><div id='removableFooter' style='min-width: 768px; float: none; overflow: hidden; margin: 0px auto; max-width: 1200px; width: 100%; box-sizing: border-box; background: url(&quot;http://52.34.207.5:5058/pdfImages/footer.png&quot;) center top no-repeat scroll; color: rgb(171, 171, 171); font-size: 14px; padding: 22px 0px 27px 11px;'><div style='box-sizing: border-box; width: 41.6667%; float: left; position: relative;'><img src='http://52.34.207.5:5058/pdfImages/footer-logo-telpro.png' style='width: 60px; display: inline-block; vertical-align: middle;'></div><div style='box-sizing: border-box; width: 16.6667%; float: left; padding-left: 0.9375rem; padding-right: 0px; position: relative;'><p style='border-right: 1px solid rgb(212, 210, 210); font-size: 11px; height: 50px; line-height: 14px;'><!-- react-text: 150 -->1139 Westminster Ave, Suite N<!-- /react-text --><br><!-- react-text: 152 -->Alhambra, California 91803<!-- /react-text --><br><br><!-- react-text: 155 -->410 E Ave K-12, Suite 105<!-- /react-text --><br><!-- react-text: 157 -->Lancaster, CA 91354<!-- /react-text --></p></div><div style='width: 16.6667%; float: left; box-sizing: border-box; padding-left: 0.9375rem; padding-right: 0.9375rem; position: relative;'><p style='border-right: 1px solid rgb(212, 210, 210); font-size: 11px; height: 50px; line-height: 14px; margin-bottom: 1.25rem;'><!-- react-text: 160 -->(800) 335-2720<!-- /react-text --><br><!-- react-text: 162 -->Fax 323 531 5998<!-- /react-text --><br><br><!-- react-text: 165 -->Monday to Friday<!-- /react-text --><br><!-- react-text: 167 -->8:30am to 4:30pm<!-- /react-text --></p></div><div style='float: left; width: 16.6667%; box-sizing: border-box; padding-left: 0.9375rem; padding-right: 0.9375rem; position: relative;'><p style='border: none; font-size: 11px; height: 50px; line-height: 14px;'><!-- react-text: 170 -->www.tel-pro.net<!-- /react-text --><br><br><!-- react-text: 173 -->contact@tel-pro.net<!-- /react-text --><br><!-- react-text: 175 -->accounting@tel-pro.net<!-- /react-text --><br><!-- react-text: 177 -->support@tel-pro.net<!-- /react-text --></p></div></div></div></div>",
        "configId": "59c0f100c9ae451c1d6f0d20",
        "pdfName": "testPdf-7-testCases"
    };

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/generateProposalPdf?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(propose_configuration_ctrl_inputs)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                assert.equal('Pdf genrated successfully', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - proposalId is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/generateProposalPdf?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                htmlContent: propose_configuration_ctrl_inputs.htmlContent,
                configId: propose_configuration_ctrl_inputs.configId,
                pdfName: propose_configuration_ctrl_inputs.pdfName
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(400);
                res.should.be.json;
                // console.log(res.body.message);
                assert.equal('SCHEMA_VALIDATION_FAILED', res.body.code, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - htmlContent is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/generateProposalPdf?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                proposalId: propose_configuration_ctrl_inputs.proposalId,
                configId: propose_configuration_ctrl_inputs.configId,
                htmlContent: propose_configuration_ctrl_inputs.htmlContent
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(400);
                res.should.be.json;
                // console.log(res.body.message);
                assert.equal('SCHEMA_VALIDATION_FAILED', res.body.code, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - pdfName is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/generateProposalPdf?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                proposalId: propose_configuration_ctrl_inputs.proposalId,
                configId: propose_configuration_ctrl_inputs.configId,
                pdfName: propose_configuration_ctrl_inputs.pdfName
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(400);
                res.should.be.json;
                // console.log(res.body.message);
                assert.equal('SCHEMA_VALIDATION_FAILED', res.body.code, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/generateProposalPdf?api_key=`) //define on which api you perform an opeartion and which method
            .send({
                proposalId: propose_configuration_ctrl_inputs.proposalId,
                configId: propose_configuration_ctrl_inputs.configId,
                pdfName: propose_configuration_ctrl_inputs.pdfName
            })
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

//Get list from proposal config details

describe('Test cases - 2. propose_configuation_ctrl.js - propose configuration controller - Get list of proposal Item Config Details', function () {
    // this.timeout(20000);

    let getProposalItemConfig = {
        proposalId: '5b75951d6601cf6084190c9c'
    }

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getProposalItemConfiglist?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(getProposalItemConfig)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                done();
            });
    });

    it('It should return status 401 - Send invalid id', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getProposalItemConfiglist?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send({
                proposalId: 'String'
            })
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body.message);
                assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Provided objectId is not valid', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/getProposalItemConfiglist?api_key=`) //define on which api you perform an opeartion and which method
            .send({ getProposalItemConfig })
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

//Add Proposal Format function

describe('Test cases - 3. propose_configuation_ctrl.js - propose configuration controller - Add Proposal format', function () {
    // this.timeout(20000);

    let addProposalFormat = { "proposalId": "5b7e600dc42fa9703e6e00f3", "formatNo": "new format", "cmmpd": true, "portrait": true, "landscape": false, "signature": true, "dollarSign": true, "totalConfig": [{ "disabled": true, "isVisible": true, "_id": "5b767f3f6d087855694978b5", "fieldName": "TAX", "columnName": "taxTotal", "seqNo": 1 }], "columnsConfig": [{ "disabled": true, "isVisible": true, "isHidden": true, "_id": "5b767f3f6d087855694978b9", "fieldName": "Estimate Number", "columnName": "estimateNo", "seqNo": 1 }, { "disabled": true, "isVisible": true, "isHidden": true, "_id": "5b767f3f6d087855694978b8", "fieldName": "Estimate Name", "columnName": "estimateName", "seqNo": 2 }, { "disabled": true, "isVisible": true, "isHidden": true, "_id": "5b767f3f6d087855694978b7", "fieldName": "Total", "columnName": "estimateTotal", "seqNo": 3 }, { "disabled": true, "isVisible": true, "isHidden": true, "_id": "5b767f3f6d087855694978b6", "fieldName": "Status", "columnName": "estimateStatus", "seqNo": 3 }] };
    let withoutProposalId = { "formatNo": "new format", "cmmpd": true, "portrait": true, "landscape": false, "signature": true, "dollarSign": true, "totalConfig": [{ "disabled": true, "isVisible": true, "_id": "5b767f3f6d087855694978b5", "fieldName": "TAX", "columnName": "taxTotal", "seqNo": 1 }], "columnsConfig": [{ "disabled": true, "isVisible": true, "isHidden": true, "_id": "5b767f3f6d087855694978b9", "fieldName": "Estimate Number", "columnName": "estimateNo", "seqNo": 1 }, { "disabled": true, "isVisible": true, "isHidden": true, "_id": "5b767f3f6d087855694978b8", "fieldName": "Estimate Name", "columnName": "estimateName", "seqNo": 2 }, { "disabled": true, "isVisible": true, "isHidden": true, "_id": "5b767f3f6d087855694978b7", "fieldName": "Total", "columnName": "estimateTotal", "seqNo": 3 }, { "disabled": true, "isVisible": true, "isHidden": true, "_id": "5b767f3f6d087855694978b6", "fieldName": "Status", "columnName": "estimateStatus", "seqNo": 3 }] };
    let withOutConfigs = { "formatNo": "new format", "cmmpd": true, "portrait": true, "landscape": false, "signature": true, "dollarSign": true };
    let withEmptyConfigs = { "formatNo": "new format", "cmmpd": true, "portrait": true, "landscape": false, "signature": true, "dollarSign": true, "totalConfig": [], "columnsConfig": [] };

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/addProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(addProposalFormat)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                assert.equal('Format added successfully', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - ProposalId not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/addProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(withoutProposalId)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(400);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                assert.equal('SCHEMA_VALIDATION_FAILED', res.body.code, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - totalConfig or columnsConfig is missing', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/addProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(withOutConfigs)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(400);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                // assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Request validation failed: Parameter (body) failed schema validation', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - passing totalConfig or columnsConfig is empty', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/addProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(withEmptyConfigs)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(400);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                // assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Request validation failed: Parameter (body) failed schema validation', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/addProposalFormat?api_key=`) //define on which api you perform an opeartion and which method
            .send({ addProposalFormat })
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

//Update Proposal format function

describe('Test cases - 4. propose_configuation_ctrl.js - propose configuration controller - Update Proposal format', function () {
    // this.timeout(20000);

    let updateProposalFormat = {"configId":"5b87963ede5f6b21c7943438","proposalId":"5b7e600dc42fa9703e6e00f3","formatNo":"check","cmmpd":true,"portrait":true,"landscape":false,"signature":true,"dollarSign":true,"totalConfig":[{"disabled":true,"isVisible":true,"_id":"5b767f3f6d087855694978b5","fieldName":"TAX","columnName":"taxTotal","seqNo":1}],"columnsConfig":[{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b9","fieldName":"Estimate Number","columnName":"estimateNo","seqNo":1},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b8","fieldName":"Estimate Name","columnName":"estimateName","seqNo":2},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b7","fieldName":"Total","columnName":"estimateTotal","seqNo":3},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b6","fieldName":"Status","columnName":"estimateStatus","seqNo":3}]};
    let withoutConfigId = {"proposalId":"5b7e600dc42fa9703e6e00f3","formatNo":"check","cmmpd":true,"portrait":true,"landscape":false,"signature":true,"dollarSign":true,"totalConfig":[{"disabled":true,"isVisible":true,"_id":"5b767f3f6d087855694978b5","fieldName":"TAX","columnName":"taxTotal","seqNo":1}],"columnsConfig":[{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b9","fieldName":"Estimate Number","columnName":"estimateNo","seqNo":1},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b8","fieldName":"Estimate Name","columnName":"estimateName","seqNo":2},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b7","fieldName":"Total","columnName":"estimateTotal","seqNo":3},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b6","fieldName":"Status","columnName":"estimateStatus","seqNo":3}]};
    let withOutConfigs = {"configId":"5b87963ede5f6b21c7943438","proposalId":"5b7e600dc42fa9703e6e00f3","formatNo":"check","cmmpd":true,"portrait":true,"landscape":false,"signature":true,"dollarSign":true};
    let withEmptyConfigs = {"configId":"5b87963ede5f6b21c7943438","proposalId":"5b7e600dc42fa9703e6e00f3","formatNo":"check","cmmpd":true,"portrait":true,"landscape":false,"signature":true,"dollarSign":true,"totalConfig":[],"columnsConfig":[]};
    let withInvalidConfigId = {"configId":"String","proposalId":"5b7e600dc42fa9703e6e00f3","formatNo":"check","cmmpd":true,"portrait":true,"landscape":false,"signature":true,"dollarSign":true,"totalConfig":[{"disabled":true,"isVisible":true,"_id":"5b767f3f6d087855694978b5","fieldName":"TAX","columnName":"taxTotal","seqNo":1}],"columnsConfig":[{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b9","fieldName":"Estimate Number","columnName":"estimateNo","seqNo":1},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b8","fieldName":"Estimate Name","columnName":"estimateName","seqNo":2},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b7","fieldName":"Total","columnName":"estimateTotal","seqNo":3},{"disabled":true,"isVisible":true,"isHidden":true,"_id":"5b767f3f6d087855694978b6","fieldName":"Status","columnName":"estimateStatus","seqNo":3}]};

    it('It should return status 200 - All parameters provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(updateProposalFormat)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                assert.equal('Format updated successfully', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - Config Id (_id) is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(withoutConfigId)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(400);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                assert.equal('SCHEMA_VALIDATION_FAILED', res.body.code, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 401 - Invalid configId provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(withInvalidConfigId)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body.message);
                assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Provided objectId is not valid', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - totalConfig or columnsConfig is missing', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(withOutConfigs)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body.message);
                assert.equal(401, res.body.code, 'Status should be 401.');
                res.should.be.instanceof(Object);
                assert.equal('Required field missing', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 400 - passing totalConfig or columnsConfig is empty', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateProposalFormat?api_key=${test_data.api_token}`) //define on which api you perform an opeartion and which method
            .send(withEmptyConfigs)
            .set('Content-Type', 'application/json') //set header for this test
            .end((err, res) => {
                // console.log(res);    
                res.should.have.status(200);
                res.should.be.json;
                // console.log(res.body.message);
                res.should.be.instanceof(Object);
                assert.equal(401, res.body.code, 'Status should be 401.');
                assert.equal('Required field empty', res.body.message, 'message should be properly defined.');
                done();
            });
    });

    it('It should return status 403 - Api token is not provided', (done) => {
        chai.request(test_data.url_prefix) //started server - connected with db
            .post(`/api/updateProposalFormat?api_key=`) //define on which api you perform an opeartion and which method
            .send({ updateProposalFormat })
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