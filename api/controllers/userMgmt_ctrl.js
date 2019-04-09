'use strict';

var mongoose = require('mongoose'),
        jwt = require('jsonwebtoken'),
        User = mongoose.model('User'),
        CompanyUser = mongoose.model('CompanyUser'),
        validator = require('../../config/validator.js'),
        Common = require('../../config/common.js'),
        Config = require('../../config/config.js'),
        Constant = require('../../config/constant.js');

var async = require("async");

var d = new Date();
var currentYear = d.getFullYear();
var moment = require('moment-timezone');
// Load the bcrypt module
var bcrypt = require('bcrypt');
// Generate a salt
var salt = bcrypt.genSaltSync(10);

/* Mailgun Email setup*/
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var auth = {
    auth: {
        api_key: Config.MAILGUN.api_key,
        domain: Config.MAILGUN.domain_name
    }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));
/* DB Connection*/

module.exports = {
    inviteUser: inviteUser,
    getCompanyUsers: getCompanyUsers,
    setCompanyUsersPassword: setCompanyUsersPassword,
    deleteCompanyUser: deleteCompanyUser,
    updateUserStatus: updateUserStatus,
    updateCompanyUserProfile: updateCompanyUserProfile,
    resendInvitation: resendInvitation,
    resetCompanyUserPassword: resetCompanyUserPassword,
    acceptCompanyInvitation: acceptCompanyInvitation,
    checkIsAccepted: checkIsAccepted,
    getCompanyUsersDetails: getCompanyUsersDetails
};


/**
 * Function is use to invite new user from company
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 15th-March-2017
 */
function inviteUser(req, res) {
    if (validator.isEmail(req.body.email)) {
        User.findOne({email: req.body.email}, function(err, userRecord) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, 'message': Constant.INTERNAL_ERROR});
            } else {
                if (userRecord) {
                    CompanyUser.findOne({userId: userRecord._id, companyId: req.body.companyId, deleted: false}, function(err, companyRecord) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, 'message': Constant.INTERNAL_ERROR});
                        } else {
                            if (companyRecord) {
                                res.json({code: Constant.ERROR_CODE, 'message': Constant.ALREADY_INVITED_USER});
                            } else {
                                var CompanyUserData = {
                                    userId: userRecord._id,
                                    companyId: req.body.companyId,
                                    userImage: '',
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    email: req.body.email,
                                    roles: req.body.roles,
                                    isAccepted: 0,
                                    status: 0,
                                    deleted: false
                                };
                                var CompanyUserRecord = new CompanyUser(CompanyUserData);
                                // call the built-in save method to save to the database
                                CompanyUserRecord.save(function(err, CompanyUserInfo) {
                                    if (err) {
                                        res.json({code: Constant.ERROR_CODE, 'message': Constant.INTERNAL_ERROR});
                                    } else {
                                        var usersInfo = {
                                            userId: userRecord._id,
                                            firstname: req.body.firstname,
                                            lastname: req.body.lastname,
                                            email: req.body.email,
                                            company: req.body.company,
                                            roles: req.body.roles,
                                            status: 0,
                                            email_verified: userRecord.email_verified,
                                            companyId: req.body.companyId,
                                            isAccepted: 0,
                                        }
                                        if (userRecord.password) {
                                            nodemailerMailgun.sendMail({
                                                from: Config.EMAIL_FROM, // sender address
                                                to: req.body.email, //Config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                                                subject: 'Account invitation from ' + req.body.companyName, // Subject line
                                                text: 'Account invitation from ' + req.body.companyName, // plaintext body
                                                html: '<table border="0" cellpadding="0" cellspacing="0" width="100%">\n\
                                    <tbody><tr><td>\n\
                                <table align="center" border="0" cellpadding="5" cellspacing="0" style="width:640px;background-color:rgb(57,65,81);">\n\
                                <tbody><tr>\n\
                                <td></td>\n\
                                </tr></tbody></table>\n\
                                <table align="center" border="0" cellpadding="10" cellspacing="0" style="width:640px;background-color:#fff">\n\
                                <tbody><tr><td>\n\
                                <p>Hello ' + req.body.firstname + ',</p>\n\
                                <p><br />You have been invited by company <b>' + req.body.companyName + '</b>. Please click below link to accept invitation and set your password to continue with TelPro Flex.</p>\n\
                                <p><a target="_blank" href="' + Config.WebFrontEndUrl + '/acceptCompanyInvitation/' + usersInfo.userId + '/' + req.body.companyId + '">' + Config.WebFrontEndUrl + '/acceptCompanyInvitation/' + usersInfo.userId + '/' + req.body.companyId + '</a><br /><br /></p>\n\
                                <p>Sincerely,<br />TelPro Flex</p>\n\
                                <div style="border-bottom: 2px solid rgb(57,65,81); height: 0px;">&nbsp;</div>\n\
                                <p>Copyright &copy; ' + currentYear + ' TelPro Flex.</p>\n\
                                </td></tr></tbody></table></td></tr>\n\
                                </tbody></table>' // html body
                                            }, function(err, info) {
                                                if (err) {
                                                    res.json({code: Constant.SUCCESS_CODE, 'message': Constant.SENT_USER_EMAIL_FAILED, data: usersInfo});
                                                }
                                                else {
                                                    res.json({code: Constant.SUCCESS_CODE, 'message': Constant.USER_INVITE_SUCCESS + req.body.email, data: usersInfo});
                                                }
                                            });
                                        } else {
                                            nodemailerMailgun.sendMail({
                                                from: Config.EMAIL_FROM, // sender address
                                                to: req.body.email, //Config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                                                subject: 'Account invitation from ' + req.body.companyName, // Subject line
                                                text: 'Account invitation from ' + req.body.companyName, // Subject line
                                                html: '<table border="0" cellpadding="0" cellspacing="0" width="100%">\n\
                                    <tbody><tr><td>\n\
                                <table align="center" border="0" cellpadding="5" cellspacing="0" style="width:640px;background-color:rgb(57,65,81);">\n\
                                <tbody><tr>\n\
                                <td></td>\n\
                                </tr></tbody></table>\n\
                                <table align="center" border="0" cellpadding="10" cellspacing="0" style="width:640px;background-color:#fff">\n\
                                <tbody><tr><td>\n\
                                <p>Hello ' + req.body.firstname + ',</p>\n\
                                <p><br />You have been invited by company <b>' + req.body.companyName + '</b>. Please click below link to accept invitation and set your password to continue with TelPro Flex.</p>\n\
                                <p><a target="_blank" href="' + Config.WebFrontEndUrl + '/acceptinvite/' + usersInfo.userId + '/' + req.body.companyId + '">' + Config.WebFrontEndUrl + '/acceptinvite/' + usersInfo.userId + '/' + req.body.companyId + '</a><br /><br /></p>\n\
                                <p>Sincerely,<br />TelPro Flex</p>\n\
                                <div style="border-bottom: 2px solid rgb(57,65,81); height: 0px;">&nbsp;</div>\n\
                                <p>Copyright &copy; ' + currentYear + ' TelPro Flex.</p>\n\
                                </td></tr></tbody></table></td></tr>\n\
                                </tbody></table>' // html body
                                            }, function(err, info) {
                                                if (err) {
                                                    res.json({code: Constant.SUCCESS_CODE, 'message': Constant.SENT_USER_EMAIL_FAILED});
                                                }
                                                else {
                                                    res.json({code: Constant.SUCCESS_CODE, 'message': Constant.USER_INVITE_SUCCESS + req.body.email, data: usersInfo});
                                                }
                                            });
                                        }

                                    }
                                });
                            }
                        }
                    })
                } else {
                    var userData = {
                        username: req.body.email,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        company: req.body.companyName,
                        status: 0,
                        email_verified: false,
                        joiningTime: new Date().toISOString(),
                        deleted: false,
                        roles: req.body.roles,
                    };
                    var UsersRecord = new User(userData);
                    // call the built-in save method to save to the database
                    UsersRecord.save(function(err, userInfo) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, 'message': Constant.INTERNAL_ERROR});
                        } else {
                            if (userInfo) {
                                var CompanyUserData = {
                                    userId: userInfo._id,
                                    companyId: req.body.companyId,
                                    userImage: '',
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    company: req.body.companyName,
                                    email: req.body.email,
                                    roles: req.body.roles,
                                    isAccepted: 0,
                                    status: 0,
                                    deleted: false
                                };
                                var CompanyUserRecord = new CompanyUser(CompanyUserData);
                                // call the built-in save method to save to the database
                                CompanyUserRecord.save(function(err, CompanyUserInfo) {
                                    if (err) {
                                        res.json({code: Constant.ERROR_CODE, 'message': Constant.INTERNAL_ERROR});
                                    } else {
                                        var usersInfo = {
                                            userId: userInfo._id,
                                            firstname: req.body.firstname,
                                            lastname: req.body.lastname,
                                            email: req.body.email,
                                            company: req.body.companyName,
                                            roles: req.body.roles,
                                            status: 0,
                                            email_verified: false,
                                            companyId: req.body.companyId,
                                            isAccepted: 0,
                                        }
                                        nodemailerMailgun.sendMail({
                                            from: Config.EMAIL_FROM, // sender address
                                            to: req.body.email, //Config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                                            subject: 'Account invitation from ' + req.body.companyName, // Subject line
                                            text: 'Account invitation from ' + req.body.companyName, // plaintext body
                                            html: '<table border="0" cellpadding="0" cellspacing="0" width="100%">\n\
                                    <tbody><tr><td>\n\
                                <table align="center" border="0" cellpadding="5" cellspacing="0" style="width:640px;background-color:rgb(57,65,81);">\n\
                                <tbody><tr>\n\
                                <td></td>\n\
                                </tr></tbody></table>\n\
                                <table align="center" border="0" cellpadding="10" cellspacing="0" style="width:640px;background-color:#fff">\n\
                                <tbody><tr><td>\n\
                                <p>Hello ' + req.body.firstname + ',</p>\n\
                                <p><br />You have been invited by company <b>' + req.body.companyName + '</b>. Please click below link to accept invitation and set your password to continue with TelPro Flex.</p>\n\
                                <p><a target="_blank" href="' + Config.WebFrontEndUrl + '/acceptinvite/' + usersInfo.userId + '/' + req.body.companyId + '">' + Config.WebFrontEndUrl + '/acceptinvite/' + usersInfo.userId + '/' + req.body.companyId + '</a><br /><br /></p>\n\
                                <p>Sincerely,<br />TelPro Flex</p>\n\
                                <div style="border-bottom: 2px solid rgb(57,65,81); height: 0px;">&nbsp;</div>\n\
                                <p>Copyright &copy; ' + currentYear + ' TelPro Flex.</p>\n\
                                </td></tr></tbody></table></td></tr>\n\
                                </tbody></table>' // html body
                                        }, function(err, info) {
                                            if (err) {
                                                res.json({code: Constant.SUCCESS_CODE, 'message': Constant.SENT_USER_EMAIL_FAILED, data: usersInfo});
                                            }
                                            else {
                                                res.json({code: Constant.SUCCESS_CODE, 'message': Constant.USER_INVITE_SUCCESS + req.body.email, data: usersInfo});
                                            }
                                        });
                                    }
                                });

                            }
                        }
                    });
                }
            }
        });
    } else {
        res.json({code: Constant.ERROR_CODE, 'message': Constant.INVALID_EMAIL});
    }
}

/**
 * Function is use to fetch company user list by companyId
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 15th-March-2017
 */
function getCompanyUsers(req, res) {
    var userListRecord = [];
    CompanyUser.find({companyId: req.body.companyId, userId: {$ne: req.body.userId}, deleted: false})
            .sort({createdAt: -1})
            .populate('userId', 'email_verified lastLogin')
            .exec(function(err, companyUsers) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    if (companyUsers) {
                        companyUsers.forEach(function(companyUserInfo) {
                            var userRecord = {};
                            if (companyUserInfo.userId) {
                                userRecord.userId = companyUserInfo.userId._id;
                                userRecord.firstname = companyUserInfo.firstname;
                                userRecord.lastname = companyUserInfo.lastname;
                                userRecord.email = companyUserInfo.email;
                                userRecord.status = companyUserInfo.status;
                                userRecord.roles = companyUserInfo.roles;
                                userRecord.email_verified = companyUserInfo.userId.email_verified;
                                userRecord.lastLogin = companyUserInfo.userId.lastLogin;
                                userRecord.companyId = companyUserInfo.companyId;
                                userRecord.isAccepted = companyUserInfo.isAccepted;
                                userListRecord.push(userRecord);
                            }
                        });
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.COMPANY_USERS_LIST_FETCHED, data: userListRecord});
                    } else {
                        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_USERS_NOT_AVAIALBLE});
                    }
                }
            });
}

/**
 * Function is use to fetch company user details by id
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 15th-March-2017
 */
function getCompanyUsersDetails(req, res) {
    CompanyUser.findOne({userId: req.body.userId, companyId: req.body.companyId, deleted: false}).sort({createdAt: -1})
            .populate('userId', 'userImage email_verified lastLogin')
            .populate('companyId')
            .exec(function(err, companyUserInfo) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    if (companyUserInfo) {
                        var userDetails = {};
                        userDetails.companyUserId = companyUserInfo._id;
                        userDetails.userId = companyUserInfo.userId._id;
                        userDetails.firstname = companyUserInfo.firstname;
                        userDetails.lastname = companyUserInfo.lastname;
                        userDetails.email = companyUserInfo.email;
                        userDetails.status = companyUserInfo.status;
                        userDetails.roles = companyUserInfo.roles;
                        userDetails.email_verified = companyUserInfo.userId.email_verified;
                        userDetails.lastLogin = companyUserInfo.userId.lastLogin;
                        userDetails.companyId = req.body.companyId;
                        userDetails.isAccepted = companyUserInfo.isAccepted;
                        userDetails.location = companyUserInfo.location;
                        userDetails.phone = companyUserInfo.phone;
                        userDetails.userImage = companyUserInfo.userImage;
                        userDetails.companyName = companyUserInfo.companyId.companyName;
                        userDetails.about = companyUserInfo.about;
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.FETCHED_COMPANY_USER_DETAILS, data: userDetails});
                    } else {
                        res.json({code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.USER_NO_LONGER_EXIST});
                    }

                }
            });
}

/**
 * Function is use to set Company Users Password
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 15th-March-2017
 */
function setCompanyUsersPassword(req, res) {
    var UserRecord = {};
    async.series([//you can use "async.series" as well
        function(callback) {
            var hash = bcrypt.hashSync(req.body.password, salt);
            var updateUserRecord = {
                password: hash,
                email_verified: true,
                status: 1,
                lastLogin: moment(new Date()).format('MM/DD/YYYY h:mm:ss a')
            }
            User.update({_id: req.body.userId}, {$set: updateUserRecord}, function(err, userDetails) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        },
        function(callback) {
            var CompanyUserRecord = {
                isAccepted: 1,
                status: 1
            }
            CompanyUser.update({userId: req.body.userId, companyId: req.body.companyId}, {$set: CompanyUserRecord}, function(err, userDetails) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        },
        function(callback) {
            var jwtToken = null;
            var userRecords = {};
            CompanyUser.findOne({userId: req.body.userId, companyId: req.body.companyId, deleted: false})
                    .populate('userId', 'userImage email_verified lastLogin')
                    .populate('companyId')
                    .exec(function(err, companyUserInfo) {
                        if (err) {
                            callback(err);
                        } else {
                            if (companyUserInfo != null) {
                                var userDetails = {};
                                userDetails.companyEmployeeId = companyUserInfo._id,
                                userDetails.userId = companyUserInfo.userId._id;
                                userDetails.firstname = companyUserInfo.firstname;
                                userDetails.lastname = companyUserInfo.lastname;
                                userDetails.email = companyUserInfo.email;
                                userDetails.status = companyUserInfo.status;
                                userDetails.roles = companyUserInfo.roles;
                                userDetails.email_verified = companyUserInfo.userId.email_verified;
                                userDetails.lastLogin = companyUserInfo.userId.lastLogin;
                                userDetails.companyId = req.body.companyId;
                                userDetails.isAccepted = companyUserInfo.isAccepted;
                                userDetails.location = companyUserInfo.location;
                                userDetails.phone = companyUserInfo.phone;
                                userDetails.userImage = companyUserInfo.userId.userImage;
                                userDetails.companyName = companyUserInfo.companyId.companyName;
                                userDetails.about = companyUserInfo.about;
                                UserRecord.userData = userDetails;
                                var expirationDuration = 60 * 60 * 8 * 1; // expiration duration 8 Hours
                                var params = {
                                    id: companyUserInfo.userId._id
                                }
                                jwtToken = jwt.sign(params, Config.SECRET, {
                                    expiresIn: expirationDuration
                                });
                                if (validator.isValid(jwtToken)) {
                                    UserRecord.token = 'Bearer ' + jwtToken;
                                    callback(null);
                                }
                            } else {
                                callback(Constant.USER_NO_LONGER_EXIST);
                            }
                        }
                    });
        },
    ], function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.SIGNIN_SUCCESS, data: UserRecord.userData, token: UserRecord.token});
        }
    });
}

/**
 * Function is use to accept company invitation by userId and companyId
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 16th-March-2017
 */
function acceptCompanyInvitation(req, res) {
    var UserRecord = {};
    async.series([//you can use "async.series" as well
        function(callback) {
            var updateUserRecord = {
                email_verified: true,
                status: 1,
                lastLogin: moment(new Date()).format('MM/DD/YYYY h:mm:ss a')
            }
            User.update({_id: req.body.userId}, {$set: updateUserRecord}, function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        },
        function(callback) {
            var CompanyUserRecord = {
                isAccepted: 1,
                status: 1,
                lastLogin: moment(new Date()).format('MM/DD/YYYY h:mm:ss a')
            }
            CompanyUser.update({userId: req.body.userId, companyId: req.body.companyId}, {$set: CompanyUserRecord}, function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        },
        function(callback) {
            CompanyUser.findOne({userId: req.body.userId, companyId: req.body.companyId, isDeleted: false})
                    .populate('companyId')
                    .exec(function(err, companyUsers) {
                        if (err) {
                            callback(err);
                        } else {
                            if (companyUsers) {
                                UserRecord = {
                                    userId: req.body.userId,
                                    companyId: req.body.companyId,
                                    firstname: companyUsers.firstname,
                                    lastname: companyUsers.lastname,
                                    companyName: companyUsers.companyId.companyName,
                                    isAccepted: companyUsers.isAccepted
                                }
                                callback(null);
                            } else {
                                callback(null);
                            }
                        }
                    });
        },
    ], function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR, data: UserRecord});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.INVITATION_ACCEPTED, data: UserRecord});
        }
    });
}

/**
 * Function is use to delete company user from list
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 16th-March-2017
 */
function deleteCompanyUser(req, res) {
    var updateUserRecord = {
        deleted: true
    }
    CompanyUser.update({userId: req.body.userId, companyId: req.body.companyId}, {$set: updateUserRecord}, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.COMPANY_USER_DELETED});
        }
    });
}


/**
 * Function is use to change user current status enable/disable
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 16th-March-2017
 */
function updateUserStatus(req, res) {
    var CompanyUserRecord = {
        status: req.body.status
    }

    CompanyUser.update({userId: req.body.userId, companyId: req.body.companyId}, {$set: CompanyUserRecord}, function(err, userDetails) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            if (req.body.status == 1) {
                var currentStatus = "enabled";
                var statusCode = 1
            } else {
                var currentStatus = "disabled";
                var statusCode = 0
            }
            res.json({code: Constant.SUCCESS_CODE, message: 'User has been ' + currentStatus + ' successfully.', status: statusCode});
        }
    });
}

/**
 * Function is use to update company user info by id
 * @access private
 * @return json
 * Created by smartData 
 * @smartData Enterprises (I) Ltd
 * Created Date 20th-March-2017
 */
function updateCompanyUserProfile(req, res) {
    var CompanyUserRecord = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        location: req.body.location,
        phone: req.body.phone,
        about: req.body.about,
        status: req.body.status ? req.body.status : 1,
        company: req.body.companyName,
        companyId: req.body.companyId,
        weburl: req.body.weburl
    }

    if (req.body.roles) {
        CompanyUserRecord.roles = req.body.roles
    }
    CompanyUser.update({_id: req.body.companyUserId, companyId: req.body.companyId}, {$set: CompanyUserRecord}, {upsert:true, multi:true},  function(err) {
        if (err) {
            console.log(err);
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.COMPANY_USER_PROFILE_UPDATED, data: CompanyUserRecord});
        }
    });
}

/**
 * Function is use to re-send invitation to company user
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 20th-March-2017
 */
function resendInvitation(req, res) {
    CompanyUser.findOne({userId: req.body.userId, companyId: req.body.companyId, deleted: false})
            .populate('userId', '_id email email_verified password')
            .populate('companyId')
            .exec(function(err, companyUsers) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    if (companyUsers) {
                        if (companyUsers.userId.password) {
                            nodemailerMailgun.sendMail({
                                from: Config.EMAIL_FROM, // sender address
                                to: companyUsers.userId.email, //Config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                                subject: 'Account invitation from ' + companyUsers.companyId.company, // Subject line
                                text: 'Account invitation from ' + companyUsers.companyId.company, // plaintext body
                                html: '<table border="0" cellpadding="0" cellspacing="0" width="100%">\n\
                                    <tbody><tr><td>\n\
                                <table align="center" border="0" cellpadding="5" cellspacing="0" style="width:640px;background-color:rgb(57,65,81);">\n\
                                <tbody><tr>\n\
                                <td></td>\n\
                                </tr></tbody></table>\n\
                                <table align="center" border="0" cellpadding="10" cellspacing="0" style="width:640px;background-color:#fff">\n\
                                <tbody><tr><td>\n\
                                <p>Hello ' + companyUsers.firstname + ',</p>\n\
                                <p><br />You have been invited by company <b>' + companyUsers.companyId.company + '</b>. Please click below link to accept invitation and set your password to continue with TelPro Flex.</p>\n\
                                <p><a target="_blank" href="' + Config.WebFrontEndUrl + '/acceptCompanyInvitation/' + req.body.userId + '/' + req.body.companyId + '">' + Config.WebFrontEndUrl + '/acceptCompanyInvitation/' + req.body.userId + '/' + req.body.companyId + '</a><br /><br /></p>\n\
                                <p>Sincerely,<br />TelPro Flex</p>\n\
                                <div style="border-bottom: 2px solid rgb(57,65,81); height: 0px;">&nbsp;</div>\n\
                                <p>Copyright &copy; ' + currentYear + ' TelPro Flex.</p>\n\
                                </td></tr></tbody></table></td></tr>\n\
                                </tbody></table>' // html body
                            }, function(err, info) {
                                if (err) {
                                    res.json({code: Constant.SUCCESS_CODE, 'message': Constant.SENT_USER_EMAIL_FAILED});
                                }
                                else {
                                    res.json({code: Constant.SUCCESS_CODE, 'message': Constant.RESENT_INVITATION_SUCCESS});
                                }
                            });
                        }
                        else {
                            nodemailerMailgun.sendMail({
                                from: Config.EMAIL_FROM, // sender address
                                to: companyUsers.userId.email, //Config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                                subject: 'Account invitation from ' + companyUsers.companyId.company, // Subject line
                                text: 'Account invitation from ' + companyUsers.companyId.company, // plaintext body
                                html: '<table border="0" cellpadding="0" cellspacing="0" width="100%">\n\
                                    <tbody><tr><td>\n\
                                <table align="center" border="0" cellpadding="5" cellspacing="0" style="width:640px;background-color:rgb(57,65,81);">\n\
                                <tbody><tr>\n\
                                <td></td>\n\
                                </tr></tbody></table>\n\
                                <table align="center" border="0" cellpadding="10" cellspacing="0" style="width:640px;background-color:#fff">\n\
                                <tbody><tr><td>\n\
                                <p>Hello ' + companyUsers.firstname + ',</p>\n\
                                <p><br />You have been invited by company <b>' + companyUsers.companyId.company + '</b>. Please click below link to accept invitation and set your password to continue with TelPro Flex.</p>\n\
                                <p><a target="_blank" href="' + Config.WebFrontEndUrl + '/acceptinvite/' + req.body.userId + '/' + req.body.companyId + '">' + Config.WebFrontEndUrl + '/acceptinvite/' + req.body.userId + '/' + req.body.companyId + '</a><br /><br /></p>\n\
                                <p>Sincerely,<br />TelPro Flex</p>\n\
                                <div style="border-bottom: 2px solid rgb(57,65,81); height: 0px;">&nbsp;</div>\n\
                                <p>Copyright &copy; ' + currentYear + ' TelPro Flex.</p>\n\
                                </td></tr></tbody></table></td></tr>\n\
                                </tbody></table>' // html body
                            }, function(err, info) {
                                if (err) {
                                    res.json({code: Constant.SUCCESS_CODE, 'message': Constant.SENT_USER_EMAIL_FAILED});
                                }
                                else {
                                    res.json({code: Constant.SUCCESS_CODE, 'message': Constant.RESENT_INVITATION_SUCCESS});
                                }
                            });
                        }
                    }
                    else {
                        res.json({code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.USER_NO_LONGER_EXIST});
                    }
                }
            });
}

/**
 * Function is use to reset company user password
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 20th-March-2017
 */
function resetCompanyUserPassword(req, res) {
    CompanyUser.findOne({userId: req.body.userId, companyId: req.body.companyId, deleted: false})
            .populate('userId', '_id email')
            .populate('companyId')
            .exec(function(err, companyUsers) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    if (companyUsers) {
                        var randonString = Common.generateRandomCode();
                        var hash = bcrypt.hashSync(randonString, salt);
                        var updateUserRecord = {
                            password: hash,
                        }
                        User.update({_id: req.body.userId}, {$set: updateUserRecord}, function(err) {
                            if (err) {
                                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                            } else {
                                nodemailerMailgun.sendMail({
                                    from: Config.EMAIL_FROM, // sender address
                                    to: companyUsers.userId.email, //Config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                                    subject: 'Reset Password', // Subject line
                                    text: 'Reset Password', // plaintext body
                                    html: '<table border="0" cellpadding="0" cellspacing="0" width="100%">\n\
                                    <tbody><tr><td>\n\
                                <table align="center" border="0" cellpadding="5" cellspacing="0" style="width:640px;background-color:rgb(57,65,81);">\n\
                                <tbody><tr>\n\
                                <td></td>\n\
                                </tr></tbody></table>\n\
                                <table align="center" border="0" cellpadding="10" cellspacing="0" style="width:640px;background-color:#fff">\n\
                                <tbody><tr><td>\n\
                                <p>Hello ' + companyUsers.firstname + ',</p>\n\
                                <p><br />Below is the new password. You can change this password from your profile.</p>\n\
                                <p><b>Password : ' + randonString + '</b></p>\n\
                                <p>Sincerely,<br />TelPro Flex</p>\n\
                                <div style="border-bottom: 2px solid rgb(57,65,81); height: 0px;">&nbsp;</div>\n\
                                <p>&copy; ' + currentYear + ' TelPro Flex.</p>\n\
                                </td></tr></tbody></table></td></tr>\n\
                                </tbody></table>' // html body
                                }, function(err, info) {
                                    if (err) {
                                        res.json({code: Constant.SUCCESS_CODE, 'message': Constant.RESET_PASSWORD_EMAIL_FAILED});
                                    }
                                    else {
                                        res.json({code: Constant.SUCCESS_CODE, 'message': Constant.RESET_COMPANY_USER_PASSWORD});
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.USER_NO_LONGER_EXIST, data: {}});
                    }
                }
            });
}

/**
 * Function is use to check whether invitation accpeted or not yet by company invited user
 * @access private
 * @return json
 * Created by smartData
 * @smartData Enterprises (I) Ltd
 * Created Date 28th-May-2018
 */
function checkIsAccepted(req, res) {
    CompanyUser.findOne({userId: req.body.userId, companyId: req.body.companyId, deleted: false}, {firstname: 1, lastname: 1, email: 1, isAccepted: 1}, function(err, userDetails) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            if (userDetails) {
                res.json({code: Constant.SUCCESS_CODE, 'message': Constant.GET_COMPANY_USER_DETAILS, data: userDetails});
            } else {
                res.json({code: Constant.ERROR_CODE, 'message': Constant.INVITE_NO_LONGER_EXIST, data: userDetails});
            }
        }
    });
}