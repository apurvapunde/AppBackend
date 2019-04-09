"use strict";

var mongoose = require('mongoose'),
    Timer = mongoose.model('Timer'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    addNewTimer: addNewTimer,
    updateTimerInfo: updateTimerInfo,
    getTimerDetails: getTimerDetails,
    getTimersList: getTimersList,
    deleteTimerInfo: deleteTimerInfo
};

/**
 * Function is use to add new timer
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 30th-June-2017s
 */
function addNewTimer(req, res) {
    if (!validator.isValid(req.body.companyId) ||
        !validator.isValid(req.body.companyEmployeeId) ||
        !validator.isValid(req.body.projectId) || !validator.isValid(req.body.contactId) || !validator.isValid(req.body.projectItemId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var TimerSaveData = {
            companyId: req.body.companyId,
            companyEmployeeId: req.body.companyEmployeeId,
            projectId: req.body.projectId,
            contactId: req.body.contactId,
            projectTaskId: req.body.projectItemId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalHours: req.body.totalHours,
            description: req.body.description,
            wageRate: req.body.wageRate,
            employeeApproved: false,
            timerNumber: '',
            createdBy: req.body.createdBy,
            modifiedBy: req.body.modifiedBy,
            hoursDt: req.body.hoursDt,
            hoursRt: req.body.hoursRt,
            hoursOt: req.body.hoursOt
        };

        var TimerRecord = new Timer(TimerSaveData);

        TimerRecord.save(function (err, data) {

            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {

                var s = data._id.toString();
                var d = s.slice(-7);
                var timerNumber = d.toUpperCase();
                Timer.findByIdAndUpdate(data._id, { timerNumber: timerNumber }, function (err, timerData) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    }
                    else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.TIMER_ADD_SUCCESS, data: data });
                    }
                });

            }
        });
    }
}

/**
 * Function is use to update timer info
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 30th-June-2017
 */
function updateTimerInfo(req, res) {
    if (!validator.isValid(req.body.companyId) || !validator.isValid(req.body.companyEmployeeId) || !validator.isValid(req.body.projectId) || !validator.isValid(req.body.contactId) || !validator.isValid(req.body.projectItemId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var TimerUpdateData = {
            contactId: req.body.contactId,
            companyId: req.body.companyId,
            projectId: req.body.projectId,
            projectTaskId: req.body.projectItemId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalHours: req.body.totalHours,
            description: req.body.description,
            wageRate: req.body.wageRate,
            employeeApproved: req.body.employeeApproved,
            modifiedBy: req.body.modifiedBy,
            hoursDt: req.body.hoursDt,
            hoursRt: req.body.hoursRt,
            hoursOt: req.body.hoursOt
        };

        Timer.update({ _id: req.body.timerId }, { $set: TimerUpdateData }, function (err) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.TIMER_INFO_UPDATED });
            }
        });
    }
}

/**
 * Function is use to get timer details info
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 30th-June-2017
 */
function getTimerDetails(req, res) {
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.timerId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        Timer.findOne({ _id: req.body.timerId, companyId: req.body.companyId })
            .populate('companyId', '_id company')
            .populate('companyEmployeeId', '_id firstname lastname')
            .populate('projectId', '_id title')
            .populate('contactId', '_id firstname lastname')
            .populate('projectTaskId', '_id itemName')
            .exec(function (err, timerDetails) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.TIMER_DETAILS_FETCHED, data: timerDetails });
                }
            });
    }
}

/**
 * Function is use to get all timer list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 30th-June-2017
 */
function getTimersList(req, res) {
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.companyEmployeeId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {

        var ValidcompanyId = ObjectId.isValid(req.body.companyId);

        if (ValidcompanyId === true) {
            Timer.find({ companyId: req.body.companyId, companyEmployeeId: req.body.companyEmployeeId, deleted: false })
                .sort({ createdAt: -1 })
                .populate('companyId', '_id company')
                .populate('companyEmployeeId', '_id firstname lastname')
                .populate('projectId', '_id title')
                .populate('contactId', '_id firstname lastname')
                .populate('projectTaskId', '_id itemName')
                .exec(function (err, timerlists) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                    } else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.TIMER_LIST_FETCHED, data: timerlists });
                    }
                });
        } else {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_ID });
        }
    }
}

/**
 * Function is use to delete timer info
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 10th-July-2017
 */
function deleteTimerInfo(req, res) {
    if (!validator.isValid(req.body.timerId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {

        var ValidtimerId = ObjectId.isValid(req.body.timerId);
        if (ValidtimerId === true) {

            var TimerUpdateData = {
                deleted: true
            };

            Timer.update({ _id: req.body.timerId }, { $set: TimerUpdateData }, function (err) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.TIMER_INFO_DELETED });
                }
            });
        }
        else {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_ID });
        }
    }
}