"use strict";
var mongoose = require('mongoose'),
    phantom = require('phantom'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    Config = require('../../config/config.js'),
    ContactEstimation = mongoose.model('Estimate'),
    estimateConfig = mongoose.model('estimateConfig'),
    LZUTF8 = require('lzutf8');
var async = require('async');
module.exports = {
    getItemConfigDetail: getItemConfigDetail,
    getItemConfiglist: getItemConfiglist,
    generateEstimatePdf: generateEstimatePdf,
    addEstimateFormat: addEstimateFormat,
    updateEstimateFormat: updateEstimateFormat
};
/* Function is use to get config detail of estimate item
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 30-Nov-2017
 */
function getItemConfigDetail(req, res) {
    estimateConfig.findOne({ formatNo: req.body.formatNo, deleted: false })
        .populate('estimateId')
        .exec(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {

                res.json({ code: Constant.SUCCESS_CODE, data: data });
            }

        });
}
/* Function is use to get config detail of estimate item
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 30-Nov-2017
 */
function getItemConfiglist(req, res) {
    estimateConfig.find({})
        .sort({ createdAt: 1 })
        .exec(function (err, data) {
            if (err) {
                console.log(err);
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, data: data });
            }
        });
}


/**
 * Function is use to genrate estimate item  pdf
 * @access private
 * @return json
 * 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 07-Dec-2017
 */
function generateEstimatePdf(req, res) {
    if (req.body.htmlContent) {
        LZUTF8.decompressAsync(req.body.htmlContent, { inputEncoding: "StorageBinaryString", outputEncoding: "String" }, function (result, error) {
            if (error === undefined) {
                var todayDate = new Date();
                var currentTime = todayDate.getTime();
                var fileName = req.body.pdfName + '.pdf';
                var filePath = "./pdf/" + fileName;
                var finalHtml = result;
                phantom.create([
                    '--ignore-ssl-errors=yes',
                    '--load-images=yes',
                    '--local-to-remote-url-access=yes'
                ]).then(function (ph) {
                    ph.createPage().then(function (page) {
                        page.property(
                            'paperSize', {
                                width: 1250,
                                height: 1510,
                                margin: {
                                    top: '0.6cm',
                                    left: '0.1cm',
                                    right: '0.1cm',
                                    bottom: '0.6cm'
                                },
                            }).then(function () {
                                page.property('content', finalHtml).then(function () {
                                    setTimeout(function () {
                                    page.render(filePath).then(function () {

                                        page.close();
                                        ph.exit();
                                        ContactEstimation.findOneAndUpdate({ _id: req.body.estimateId }, { $set: { formatId: req.body.configId } }, function (err) {
                                            if (err) {
                                                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                                            } else {
                                                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PDF_GENRATED_SUCESS, pdfurl: Config.webUrl + "/pdf/" + fileName });
                                            }
                                        });
                                    });
                                    }, 2000);
                                }).catch(function (err) {
                                    console.log('Err:- ', err);
                                });
                            }).catch(function (err) {
                                console.log('Err:- ', err);
                            });
                    }).catch(function (err) {
                        console.log('Err:- ', err);
                    });
                });
            }

            else {
                console.log("Decompression error: " + error.message);
            }

        });
    }
    else {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    }

}
/* Function is use to Add format for estimate
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-June-2017
 */
function addEstimateFormat(req, res) {
    var estimateFormatConfig = new estimateConfig(req.body);
    estimateFormatConfig.save(function (err, data) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.FORMAT_ADD_SUCCESS, data: data });
        }
    });

}
/* Function is use to update format for estimate
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-June-2017
 */
function updateEstimateFormat(req, res) {
    if (req.body.configId) {
        estimateConfig.findByIdAndUpdate(req.body.configId, req.body, function (err, formatData) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.FORMAT_UPDATE_SUCCESS, data: formatData });
            }

        });
    }
    else {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    }
}