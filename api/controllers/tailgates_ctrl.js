"use strict";

var mongoose = require('mongoose'),
    Tailgate = mongoose.model('Tailgate'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js');

module.exports = {
    addNewTailGate: addNewTailGate,
    updateTailGateInfo: updateTailGateInfo,
    getTailGateDetails: getTailGateDetails,
    getTailGateList: getTailGateList
};

/**
 * Function is use to add new tailgate
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 01st-July-2017
 */
function addNewTailGate(req, res) {
    if (!validator.isValid(req.body.companyId) ||
        !validator.isValid(req.body.dateEffective) ||
        !validator.isValid(req.body.dateExpire) ||
        !validator.isValid(req.body.topic) ||
        !validator.isValid(req.body.content)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var TailGatesSaveData = {
            companyId: req.body.companyId,
            dateEffective: req.body.dateEffective,
            dateExpire: req.body.dateExpire,
            topic: req.body.topic,
            content: req.body.content
        };
        var TailgateRecord = new Tailgate(TailGatesSaveData);

        TailgateRecord.save(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.TAILGATES_ADD_SUCCESS, data: data });
            }
        });
    }
}


/**
 * Function is use to update tailgate info
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 01st-July-2017
 */
function updateTailGateInfo(req, res) {
    if (!validator.isValid(req.body.dateEffective) ||!validator.isValid(req.body.dateExpire) || !validator.isValid(req.body.topic) || !validator.isValid(req.body.content)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var TailgateUpdateData = {
            dateEffective: req.body.dateEffective,
            dateExpire: req.body.dateExpire,
            name: req.body.name,
            content: req.body.content
        };

        Tailgate.update({ _id: req.body.tailgatesId }, { $set: TailgateUpdateData }, function (err) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.TAILGATES_INFO_UPDATED });
            }
        });
    }
}

/**
 * Function is use to get tailgate details info
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 01st-July-2017
 */
function getTailGateDetails(req, res) {
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.tailgatesId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        Tailgate.findOne({ _id: req.body.tailgatesId, companyId: req.body.companyId }).exec(function (err, tailgatesDetails) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.TAILGATES_DETAILS_FETCHED, data: tailgatesDetails });
            }
        });
    }
}

/**
 * Function is use to get all tailgates list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 01st-July-2017
 */
function getTailGateList(req, res) {
    if (!validator.isValidObject(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        Tailgate.find({ companyId: req.body.companyId })
            .sort({ createdAt: -1 }).exec(function (err, tailgateslists) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.TAILGATES_LIST_FETCHED, data: tailgateslists });
                }
            });
    }
}