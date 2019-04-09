'use strict';

var mongoose = require('mongoose'),
    UserActivity = mongoose.model('UserActivity'),
    CompanyUser = mongoose.model('CompanyUser'),
    validator = require('../../config/validator.js'),
    Common = require('../../config/common.js'),
    Config = require('../../config/config.js'),
    Constant = require('../../config/constant.js');

module.exports = {
    addUserActivity: addUserActivity,
    getUserActivity: getUserActivity,
    getCompanyUserActivity: getCompanyUserActivity,
    changeUserEmailActivity: changeUserEmailActivity
};


/**
 * Function is use to add user activity
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 6th-April-2017
 */
function addUserActivity(req, res) {
    var userActivityData = {
        companyId: req.body.companyId,
        userId: req.body.userId,
        activity: req.body.activity,
        fullname: req.body.fullname,
        activity_type: req.body.activity_type
    };
    var UserActivityRecord = new UserActivity(userActivityData);
    // call the built-in save method to save to the database
    UserActivityRecord.save(function (err, userInfo) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, 'message': Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_ADDED_SUCCESS, data: userInfo });
        }
    });
}


/**
 * Function is use to get user activity by userId and companyId
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 6th-April-2017
 */
function getUserActivity(req, res) {
    UserActivity.find({ userId: req.body.userId, companyId: req.body.companyId }, function (err, UserActivity) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.USER_ACTIVITY_FETCHED, data: UserActivity });
        }
    }).sort({ createdAt: -1 });
}

/**
 * Function is use to get user activity by userId and companyId
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 6th-April-2017
 */
function getCompanyUserActivity(req, res) {
    UserActivity.find({ companyId: req.body.companyId }).sort({ createdAt: -1 })
        .exec(function (err, CompanyUserActivity) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.COMPANY_ALL_USERS_ACTIVITY_FETCHED, data: CompanyUserActivity });
            }
        });
}

/**
 * Function is use to add user activity for change email for all associated accounts
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 27th-April-2017
 */
function changeUserEmailActivity(req, res) {
    CompanyUser.find({ userId: req.body.userId, isDeleted: false, isAccepted: 1 }, { companyId: 1, firstname: 1, lastname: 1 }, function (err, userCompanies) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, 'message': Constant.INTERNAL_ERROR });
        } else {
            if (userCompanies) {
                userCompanies.forEach(function (company) {
                    var userActivityData = {
                        companyId: company.companyId,
                        userId: req.body.userId,
                        activity: req.body.activity,
                        fullname: company.firstname + ' ' + company.lastname,
                        activity_type: req.body.activity_type
                    };
                    var UserActivityRecord = new UserActivity(userActivityData);
                    // call the built-in save method to save to the database
                    UserActivityRecord.save(function (err, userInfo) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('success');
                        }
                    });
                });
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_ADDED_SUCCESS });
            }
        }
    });
}