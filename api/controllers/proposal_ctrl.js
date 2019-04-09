"use strict";
var mongoose = require('mongoose'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    Config = require('../../config/config.js'),
    ContactProposal = mongoose.model('Proposal'),
    ContactInternet = mongoose.model('ContactInternet'),
    contactAddress = mongoose.model('ContactAddress'),
    EstimateItem = mongoose.model('EstimatesItem'),
    query,
    offset,
    ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment');
/* Mailgun Email setup*/
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var auth = {
    auth: {
        api_key: Config.MAILGUN.api_key,
        domain: Config.MAILGUN.domain_name
    }
};
var nodemailerMailgun = nodemailer.createTransport(mg(auth));
/* Mailgun Connection*/
var async = require('async');
module.exports = {
    getContactProposal: getContactProposal,
    addProposal: addProposal,
    getProposalDetail: getProposalDetail,
    updateProposalDetail: updateProposalDetail,
    deleteProposal: deleteProposal,
    proposalSendToCustomer: proposalSendToCustomer,
    getproposalNo: getproposalNo
};
/**
 * Function is use to get contact estimation
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */
function getContactProposal(req, res) {
    var body = req.body;
    var val;
    var companyId = body.companyId;
    var individualId = body.contactId;
    if (!validator.isValidObject(body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
    }
    else {
        if (individualId && !req.body.proposalNumber) {
            if (!validator.isValidObject(individualId)) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_CONTACT_ID});
            }
            else {
                query = {individualId: body.contactId, companyId: companyId, deleted: false};
            }
        }
        else if (req.body.proposalNumber) {
            if (!validator.isValid(req.body.proposalNumber)) {
                res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
            }
            else {
                query = {individualId: individualId, proposalNumber: {$regex: new RegExp("^" + req.body.proposalNumber + "$", "i")}, deleted: false};
                val = {proposalNumber: true};
            }

        }
        else {
            query = {companyId: companyId, deleted: false};
        }
        // main code execution
        ContactProposal.
                find(query, val)
                .sort({createdAt: -1}).
                populate('companyId', '_id company').
                populate('estimateId').
                populate('customerId', '_id firstname lastname').
                populate('individualId', '_id firstname lastname').
                exec(function(err, proposal) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    }
                    else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.PROPOSAL_LIST_FETCH, data: proposal});
                    }
                });
    }
}

/* Function is use to Add Proposal for oppertunity 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-June-2017
 */

function addProposal(req, res) {
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.customerId) || !validator.isValidObject(req.body.individualId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.FIELD_REQUIRED });
    }
    else {

        var proposalSaveData = {
            companyId: req.body.companyId,
            customerId: req.body.customerId,
            individualId: req.body.individualId,
            projectName: req.body.projectName,
            projectLocation: req.body.projectLocation,
            summary: req.body.summary,
            note: req.body.note,
            salesRep: req.body.salesRepId,
            proposalNumber: req.body.proposalNumber,
            proposedEstimates: req.body.estimates
        }
        var model = ContactProposal(proposalSaveData);
        model.save(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROPOSAL_ADD, data: data });
            }
        });
    }
}

/** 
 * Function is use to get Proposal detail  
 * @access private
 * @return json
 * @author hemant khandait
 * @author Sandeep Thakare
 * @smartData Enterprises (I) Ltd
 * @since Tuesday, June 27, 2017 01:00 PM
 */

function getProposalDetail(req, res) {

    if (!validator.isValidObject(req.body.proposalId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.FIELD_REQUIRED });
    }
    else {

        var ValidProposalId = ObjectId.isValid(req.body.proposalId);
        if (ValidProposalId === true) {
            var proposalrecord = {};
            ContactProposal.findOne({ _id: req.body.proposalId })
                .populate('contactId', '_id firstname lastname')
                .populate('customerId', '_id companyName')
                .populate('individualId', '_id firstname lastname')
                .populate('salesRep', '_id firstname lastname salesRepSign')
                .populate('opportunityId', '_id title')
                .populate('proposalId', '_id proposalNumber')
                .populate('projectId', '_id title')
                .populate('proposedEstimates.estimateId', '_id proposedServices')
                .exec(function (err, proposaldetail) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    } else {
                        contactAddress.findOne({ contactId: proposaldetail.customerId, isPrimary: true }, function (err, addressdata) {
                            if (err) {
                                res.json({ code: Constant.ERROR_CODE, message: err });
                            }
                            else {
                                proposalrecord.proposaldetail = proposaldetail;
                                proposalrecord.addressdata = addressdata;
                                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROPOSAL_DETAIL, data: proposalrecord });
                            }
                        });
                    }
                });
        }
        else {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_ID });
        }
    }
}

/* Function is use to update proposal for oppertunity 
 * @access private
 * @return json
 * Created by hemant shandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function updateProposalDetail(req, res) {
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.customerId) || !validator.isValidObject(req.body.individualId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.FIELD_REQUIRED });
    }
    else {
        var proposalupdateData = {
            companyId: req.body.companyId,
            customerId: req.body.customerId,
            individualId: req.body.individualId,
            projectName: req.body.projectName,
            projectLocation: req.body.projectLocation,
            summary: req.body.summary,
            note: req.body.note,
            salesRep: req.body.salesRepId,
            proposedEstimates: req.body.estimates
        }

        ContactProposal.findByIdAndUpdate(req.body.proposalId, proposalupdateData, function (err, estimateData) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROPOSAL_UPDATE, data: proposalupdateData });
            }
        });


    }

}

/* Function is use to delete prpposal for oppertunity 
 * @access private
 * @return json
 * Created by hemant shandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function deleteProposal(req, res) {

    if (!validator.isValidObject(req.body.proposalId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.FIELD_REQUIRED });
    }
    else {

        var ValidProposalId = ObjectId.isValid(req.body.proposalId);
        if (ValidProposalId === true) {

            ContactProposal.findOneAndUpdate({ _id: req.body.proposalId }, { deleted: true }, function (err, proposaldetail) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROPOSAL_DELETE, data: proposaldetail });
                }
            });
        }
        else {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_ID });
        }
    }
}

/* Function is use to send proposal to customer
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function proposalSendToCustomer(req, res) {
    var proposalRecord = {};
    async.series([//you can use "async.series" as well            
        function (callbacs) {

            ContactProposal.findOne({ _id: req.body.proposalId, companyId: req.body.companyId, deleted: false }, { customerId: 1, individualId: 1, discription: 1, title: 1 }, function (err, proposalInfo) {
                if (err) {
                    callbacs(err);
                }
                else {
                    if (proposalInfo) {
                        proposalRecord.customerId = proposalInfo.customerId;
                        proposalRecord.individualId = proposalInfo.individualId;
                        proposalRecord.proposalEmailTemplate = proposalInfo.discription;
                        proposalRecord.title = proposalInfo.title;
                    } else {
                        proposalRecord.customerId = '';
                        proposalRecord.individualId = '';
                        proposalRecord.proposalEmailTemplate = '';
                        proposalRecord.title = '';
                    }

                    callbacs(null);
                }
            });
        },
        function (callbacs) {
            ContactInternet.findOne({ contactId: proposalRecord.customerId, isPrimary: true, deleted: false }, { internetvalue: 1 }, function (err, customerInfo) {
                if (err) {
                    callbacs(err);
                } else {
                    if (customerInfo) {
                        proposalRecord.customerEmail = customerInfo.internetvalue;
                    } else {
                        proposalRecord.customerEmail = 'support@hive.com';
                    }
                    callbacs(null);
                }
            });
        },
        function (callbacs) {
            ContactInternet.findOne({ contactId: proposalRecord.individualId, isPrimary: true, deleted: false }, { internetvalue: 1 }, function (err, individualInfo) {
                if (err) {
                    callbacs(err);
                } else {
                    if (individualInfo) {
                        proposalRecord.individualEmail = individualInfo.internetvalue;
                    } else {
                        proposalRecord.individualEmail = 'support@hive.com';
                    }
                    callbacs(null);
                }
            });
        },
        function (callback) {
            nodemailerMailgun.sendMail({
                from: Config.EMAIL_FROM, // sender address
                to: proposalRecord.individualEmail, //config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                cc: proposalRecord.customerEmail, //config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                subject: proposalRecord.title + ' proposal', // Subject line
                text: proposalRecord.title + ' proposal', // plaintext bod            'h:Reply-To': 'support@hive.com',
                html: proposalRecord.proposalEmailTemplate // html body
            }, function (err, info) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null);
                }
            });
        }
    ], function (err) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROPOSAL_SENT_SUCCESS });
        }
    });
}

/**
 * Function to get proposal no 
 * @access private
 * @return json 
 * Created by Hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 06-Apr-2018
 */

function getproposalNo(req, res) {
    ContactProposal.count({ companyId: req.body.companyId }).exec(function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        }
        else {
            res.json({ code: Constant.SUCCESS_CODE, proposalNumber: 'PRO-' + parseInt(100000 + result + 1) });
        }
    });
}