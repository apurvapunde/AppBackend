"use strict";
var mongoose = require('mongoose'),
    phantom = require('phantom'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    Config = require('../../config/config.js'),
    ContactProposal = mongoose.model('Proposal'),
    proposalConfig = mongoose.model('proposalConfig');
var async = require('async');

module.exports = {
    generateProposalPdf: generateProposalPdf,
    getProposalItemConfigDetail: getProposalItemConfigDetail,
    getProposalItemConfiglist: getProposalItemConfiglist,
    addProposalFormat: addProposalFormat,
    updateProposalFormat: updateProposalFormat
};

/** 
 * @access private
 * @return json
 * 
 * @author Sandeep Thakare
 * @smartData Enterprises (I) Ltd
 * @since Friday, August 17, 2018 12:18 PM
 * 
 * @description Function is use to get config detail of proposal item
 * 
 */

function getProposalItemConfigDetail(req, res) {

    if (!req.body.formatNo) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        proposalConfig.findOne({ formatNo: req.body.formatNo, deleted: false })
            .populate('proposalId')
            .exec(function (err, data) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, data: data });
                }
            });
    }
}

/** 
 * @access private
 * @return json
 * 
 * @author Sandeep Thakare
 * @smartData Enterprises (I) Ltd
 * @since Friday, August 17, 2018 12:18 PM
 * 
 * @description Function is use to get config detail of proposal item
 * 
 */

function getProposalItemConfiglist(req, res) {


    if (!mongoose.Types.ObjectId.isValid(req.body.proposalId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_OBJECT });
    } else {
        proposalConfig.find({})
            .sort({ createdAt: 1 })
            .exec(function (err, data) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, data: data });
                }
            });
    }
}


/**
 * Function is use to genrate proposal item pdf
 * @access private
 * @return json
 * 
 * @author Sandeep Thakare
 * @smartData Enterprises (I) Ltd
 * @since Tuesday, Aug 07, 2018 6:16 PM
 * 
 * @description: This function is used to generate dynamic pdf using html provided from front-end and generate
 *              PDF as well as save on server and provide download facility
 * @requires: Need Phatomjs installed globally - PDF generated using phantomjs
 * 
 */
function generateProposalPdf(req, res) {
    if (req.body.htmlContent) {

        if (!mongoose.Types.ObjectId.isValid(req.body.proposalId)) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
        } else {
            var todayDate = new Date();
            var currentTime = todayDate.getTime();
            var fileName = req.body.pdfName + '.pdf';
            var filePath = "./pdf/proposal_pdf/" + fileName;
            var finalHtml = req.body.htmlContent;
            phantom.create([
                '--ignore-ssl-errors=yes',
                '--load-images=yes',
                '--local-to-remote-url-access=yes'
            ]).then(function (ph) {
                ph.createPage().then(function (page) {
                    page.property(
                        'paperSize', {
                            width: 1250,
                            height: 1500,
                            margin: {
                                top: '0.1cm',
                                left: '0.1cm',
                                right: '0.1cm',
                                bottom: '2cm'
                            },
                        }).then(function () {
                            page.property('content', finalHtml).then(function () {
                                setTimeout(function () {
                                    page.render(filePath).then(function () {
                                        page.close();
                                        ph.exit();
                                        ContactProposal.findOneAndUpdate({ _id: req.body.proposalId }, { $set: { formatId: req.body.configId } }, function (err) {
                                            if (err) {
                                                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                                            } else {
                                                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PDF_GENRATED_SUCESS, pdfurl: Config.webUrl + "/pdf/proposal_pdf/" + fileName });
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
    }
    else {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    }

}

/** 
 * @access private
 * @return json
 * 
 * @author Sandeep Thakare
 * @smartData Enterprises (I) Ltd
 * @since Friday, August 17, 2018 12:18 PM
 * 
 * @description Function is use to Add format for proposal
 * 
 */

function addProposalFormat(req, res) {

    if (!mongoose.Types.ObjectId.isValid(req.body.proposalId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_OBJECT });
    } else if( !req.body.totalConfig || !req.body.columnsConfig ) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else if( req.body.totalConfig.length === 0 || req.body.columnsConfig.length === 0 ) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRE_FILED_CONFIGURATION });
    } else {
        var proposalFormatConfig = new proposalConfig(req.body);
        proposalFormatConfig.save(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                console.log(data);
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.FORMAT_ADD_SUCCESS, data: data });
            }
        });
    }
}


/**
 *  Function is use to update format for estimate
 * @access private
 * @return json
 * @author Sandeep Thakare
 * @smartData Enterprises (I) Ltd
 * @since Friday, August 17, 2018 12:18 PM
 */

function updateProposalFormat(req, res) {

    if (!mongoose.Types.ObjectId.isValid(req.body.configId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_OBJECT });
    } else if( !req.body.totalConfig || !req.body.columnsConfig ) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else if( req.body.totalConfig.length === 0 || req.body.columnsConfig.length === 0 ) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRE_FILED_CONFIGURATION });
    } else {
        if (req.body.configId) {
            proposalConfig.findByIdAndUpdate(req.body.configId, req.body, function (err, formatData) {
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
}