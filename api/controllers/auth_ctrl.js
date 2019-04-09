"use strict";
var mongoose = require('mongoose'),
        User = mongoose.model('User'),
        Company = mongoose.model('Company'),
        CompanyUser = mongoose.model('CompanyUser'),
        jwt = require('jsonwebtoken'),
        validator = require('../../config/validator.js'),
        Config = require('../../config/config.js'),
        Constant = require('../../config/constant.js');
var async = require("async");
module.exports = {
    azureAuth: azureAuth,
    signIn: signIn
};
/**
 * Function is use to auth login
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 01st-June-2017
 */
function azureAuth(req, res) {
    var request = require('request');
    var url = Config.azureEndUrl;
    var cread = {
        username: req.body.email,
        password: req.body.password,
        client_id: Config.clientID,
        client_secret: Config.clientSecret,
        resource: Config.azureResource,
        grant_type: req.body.grant_type,
        prompt: "admin_consent"
    };
    // Set the headers
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/json'
    };
    // Configure the request
    var options = {
        url: url,
        method: 'POST',
        headers: headers,
        form: cread
    };
    // Start the request
    request(options, function(error, response, body) {

        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.json({code: Constant.SUCCESS_CODE, message: Constant.SIGNIN_SUCCESS, data: JSON.parse(response.body)});
        }
        else {
            res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_LOGIN_DETAILS, data: body});
        }
    });
}

/**
 * Function is use to login user
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 01st-June-2017
 */
function signIn(req, res) {
    var jwtToken = null;
    var UserRecord = {};
    if (validator.isEmail(req.body.auth_user_name)) {
        async.series([//you can use "async.series" as well            
            function(callback) {
                User.findOne({auth_user_name: req.body.auth_user_name}, function(err, userInfo) {
                    if (err) {
                        callback(err);
                    } else {
                        if (userInfo) {
                            //var token = duo.sign_request(Config.DUO.ikey, Config.DUO.skey, Config.DUO.akey, [req.body.username]); // duo token
                            var expirationDuration = 60 * 60 * 72 * 1; // expiration duration 8 Hours
                            //var expirationDuration = 60; // expiration duration 1 minute
                            var params = {
                                id: userInfo._id
                            };
                            jwtToken = jwt.sign(params, Config.SECRET, {
                                expiresIn: expirationDuration
                            });
                            if (validator.isValid(jwtToken)) {
                                UserRecord.token = 'Bearer ' + jwtToken;
                            }
                            UserRecord.userId = userInfo._id;
                            UserRecord.firstname = userInfo.firstname;
                            UserRecord.lastname = userInfo.lastname;
                            callback(null);
                        } else {
                            var userData = {
                                auth_user_id: req.body.auth_user_id,
                                auth_user_name: req.body.auth_user_name,
                                email: req.body.auth_user_name,
                                company: req.body.company,
                                status: 1,
                                name: req.body.name,
                                email_verified: true,
                                deleted: false
                            };
                            var UsersRecord = new User(userData);
                            // call the built-in save method to save to the database
                            UsersRecord.save(function(err, userInfo) {
                                if (err) {
                                    callback(err);
                                } else {
                                    //var token = duo.sign_request(Config.DUO.ikey, Config.DUO.skey, Config.DUO.akey, [req.body.username]); // duo token
                                    var expirationDuration = 60 * 60 * 8 * 1; // expiration duration 8 Hours
                                    //var expirationDuration = 60; // expiration duration 1 minute
                                    var params = {
                                        id: userInfo._id
                                    };
                                    jwtToken = jwt.sign(params, Config.SECRET, {
                                        expiresIn: expirationDuration
                                    });
                                    if (validator.isValid(jwtToken)) {
                                        UserRecord.token = 'Bearer ' + jwtToken;
                                    }
                                    UserRecord.userId = userInfo._id;
                                    UserRecord.firstname = userInfo.firstname;
                                    UserRecord.lastname = userInfo.lastname;
                                    callback(null);
                                }
                            });
                        }
                    }
                });
            },
            function(callback) {
                CompanyUser.findOne({auth_user_name: req.body.auth_user_name}, function(err, companyUserInfo) {
                    if (err) {
                        callback(err);
                    } else {
                        if (companyUserInfo) {
                            var userRecords = {
                                auth_user_id: companyUserInfo.auth_user_id,
                                auth_user_name: companyUserInfo.auth_user_name,
                                userId: companyUserInfo.userId,
                                companyEmployeeId: companyUserInfo._id,
                                companyId: companyUserInfo.companyId,
                                company: companyUserInfo.company,
                                email: companyUserInfo.email,
                                name: companyUserInfo.name,
                                roles: companyUserInfo.roles,
                                userType: companyUserInfo.userType,
                                createdAt: companyUserInfo.createdAt,
                                firstname: companyUserInfo.firstname,
                                lastname: companyUserInfo.lastname

                            };
                            UserRecord.users = userRecords;

                            callback(null);
                        } else {
                            Company.findOne({company: req.body.company}, function(err, companyInfo) {
                                if (err) {
                                    callback(err);
                                } else {
                                    if (companyInfo) {
                                        UserRecord.companyId = companyInfo._id;
                                        var CompanyUserData = {
                                            auth_user_id: req.body.auth_user_id,
                                            auth_user_name: req.body.auth_user_name,
                                            userId: UserRecord.userId,
                                            companyId: UserRecord.companyId,
                                            company: req.body.company,
                                            userImage: '',
                                            name: req.body.name,
                                            email: req.body.auth_user_name,
                                            roleId: 1,
                                            userType: req.body.userType,
                                            isAccepted: 1,
                                            status: 1,
                                            deleted: false
                                        };
                                        var CompanyUserRecord = new CompanyUser(CompanyUserData);
                                        // call the built-in save method to save to the database
                                        CompanyUserRecord.save(function(err, CompanyUserInfo) {
                                            if (err) {
                                                callback(err);
                                            } else {
                                                var userRecords = {
                                                    auth_user_id: CompanyUserInfo.auth_user_id,
                                                    auth_user_name: CompanyUserInfo.auth_user_name,
                                                    userId: CompanyUserInfo.userId,
                                                    companyEmployeeId: CompanyUserInfo._id,
                                                    companyId: CompanyUserInfo.companyId,
                                                    company: CompanyUserInfo.company,
                                                    email: CompanyUserInfo.email,
                                                    name: CompanyUserInfo.name,
                                                    roleId: CompanyUserInfo.roleId,
                                                    userType: CompanyUserInfo.userType,
                                                    createdAt: CompanyUserInfo.createdAt,
                                                    firstname: CompanyUserInfo.firstname,
                                                    lastname: CompanyUserInfo.lastname
                                                };
                                                UserRecord.users = userRecords;
                                                callback(null);
                                            }
                                        });
                                    } else {
                                        callback(Constant.CONPANY_NO_LONGER_EXIST);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        ], function(err) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.SIGNIN_SUCCESS, data: UserRecord.users, token: UserRecord.token});
            }
        });
    }
    else {
        res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_EMAIL});
    }
}
