"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        CompanyContact = mongoose.model('CompanyContact'),
        serviceOrder = mongoose.model('Order');
var path = require('path');
var fs = require('fs-extra');

module.exports = {
    addSignatureServiceOrder: addSignatureServiceOrder,
    addSignatureSalesrep: addSignatureSalesrep,
    addSignatureImageSalesrep:addSignatureImageSalesrep
};

/**
 * Function is use to add Service order
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 24-July-2017
 */


function addSignatureServiceOrder(req, res) {
    var model = req.body;

    if (!validator.isValidObject(model.userId) || !validator.isValidObject(model.orderId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        var timestamp = Number(new Date());
        var t = model.orderId;
        var s = t.toString();
        var d = s.slice(-7);
        var imageNameExt = "sign.png";
        var filename = +timestamp + '_' + d + '_' + imageNameExt;
        var base64String = req.body.image;
        var data = base64String.replace(/^data:image\/\w+;base64,/, "");
        var bufferSignImage = new Buffer(data, 'base64');
        var signaturePath = "./images/orderSignature/" + filename;
        fs.writeFile(path.resolve(signaturePath), bufferSignImage, {encoding: 'base64'}, function(err) {
            if (err) {
                throw err;
            }
            else {
                var signImage = Config.webUrl + "/images/orderSignature/" + filename;

                serviceOrder.findByIdAndUpdate(req.body.orderId, {'signatureImg.url': signImage, 'signatureImg.userId': req.body.userId}, function(err, data) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    } else {
                        res.json({code: Constant.SUCCESS_CODE, data: data});
                    }
                });
            }
        });
    }
}
/**
 * Function is use to add signature for contact salesRep
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 04-Dec-2017
 */


function addSignatureSalesrep(req, res) {
    var model = req.body;

    if (!validator.isValidObject(model.contactId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        var timestamp = Number(new Date());
        var t = model.contactId;
        var s = t.toString();
        var d = s.slice(-7);
        var imageNameExt = "salesSign.png";
        var filename = +timestamp + '_' + d + '_' + imageNameExt;
        var base64String = req.body.image;
        var data = base64String.replace(/^data:image\/\w+;base64,/, "");
        var bufferSignImage = new Buffer(data, 'base64');
        var signaturePath = "./images/salesRepSignature/" + filename;
        fs.writeFile(path.resolve(signaturePath), bufferSignImage, {encoding: 'base64'}, function(err) {
            if (err) {
                throw err;
            }
            else {
                var signImage = Config.webUrl + "/images/salesRepSignature/" + filename;

                CompanyContact.findByIdAndUpdate(req.body.contactId, {salesRepSign: signImage}, function(err, data) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    } else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.SIGN_UPDATED,url:signImage,data: data});
                    }
                });
            }
        });
    }
}


/**
 * Function is use to add signature image for contact salesRep
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 11-Jan-2018
 */
function addSignatureImageSalesrep(req, res) {
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var contactId = req.swagger.params.id.value;
    var filename = +timestamp + '_' + file.originalname;
    var signaturePath = "./images/salesRepSignature/" + filename;
    fs.writeFile(path.resolve(signaturePath), file.buffer, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            var signImage = Config.webUrl + "/images/salesRepSignature/" + filename;

            CompanyContact.findByIdAndUpdate(contactId, {salesRepSign: signImage}, function(err, data) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: err});
                } else {
                    res.json({code: Constant.SUCCESS_CODE, message: Constant.SIGN_UPDATED,url:signImage,data: data});
                }
            });
        }
    }
    );
}