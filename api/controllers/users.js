"use strict";
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    companyUser = mongoose.model('CompanyUser'),
    userRole = mongoose.model('Role'),
    Config = require('../../config/config.js'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js');
var jwt = require('jsonwebtoken');
var im = require('imagemagick');
var path = require('path');
var url = require("url");
var fs_extra = require('fs-extra');
module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getRole: getRole,
    updateUserDetail: updateUserDetail,
    updateUserPic: updateUserPic,
    removeUserPic: removeUserPic,
    checkToken: checkToken,
    getCompanyEmployeeByAlphabet: getCompanyEmployeeByAlphabet
};
/**
 * [getUsers - get users ]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function getAllUsers(req, res) {
    if (!validator.isValidObject(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        companyUser.find({
            companyId: req.body.companyId,
            "_id": {
                $ne: req.body.userId
            },
            deleted: false
        })
            .exec(function (err, users) {
                if (err) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: err
                    });
                } else {
                    res.json({
                        code: Constant.SUCCESS_CODE,
                        data: users
                    });
                }
            });
    }
}
/* Function is use to get list of company employees by their names
 * @access private
 * @return json
 * Created by Apurva Punde
 * @smartData Enterprises (I) Ltd
 * Created Date 22-Feb-2019
 */

function getCompanyEmployeeByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var userName = req.body.userName;
    if (!validator.isValidObject(companyId) || !validator.isValid(userName)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.FIELD_REQUIRED });
    } else {
        companyUser.find({ companyId: req.body.companyId, "_id": { $ne: req.body.userId }, "firstname": { "$regex": userName, "$options": "i" }, "lastname": { "$regex": userName, "$options": "i" }, deleted: false })
            .exec(function (err, users) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, data: users });
                }
            });
    }
}

/**
 * [getUserById - get user details]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function getUserById(req, res) {
    if (!validator.isValidObject(req.body.companyUserId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        companyUser.findOne({ _id: req.body.companyUserId, deleted: false })
            .exec(function (err, user) {
                if (err) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: err
                    });
                } else {
                    res.json({
                        code: Constant.SUCCESS_CODE,
                        data: user
                    });
                }
            });
    }
}

/**
 * [deleteUser - delete users ]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function deleteUser(req, res) {
    var id = req.swagger.params.id.value;
    User.findByIdAndRemove(id, function (err, user) {
        if (user) {
            res.json({
                code: 201,
                message: 'Record Deleted successfully'
            });
        } else {
            res.json({
                code: Constant.ERROR_CODE,
                message: 'Unable to delete user'
            });
        }
    });
}


/**
 * [updateUser - update users ]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function updateUser(req, res) {
    var id = req.swagger.params.id.value;
    var body = req.body;
    if (!validator.isValid(body.firstName) || !validator.isValid(body.lastName) || !validator.isValid(body.email) || !validator.isValid(body.company)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: 'Required fields are missing'
        });
    } else {
        User.findOne({
            _id: id,
            deleted: false
        }, function (err, user) {
            if (err) {
                res.json({
                    code: Constant.ERROR_CODE,
                    message: 'Unable to get user'
                });
            } else {
                User.findOne({
                    email: req.body.email
                }, {
                        email: 1
                    }, function (err, email) {
                        if (err) {
                            res.json({
                                code: Constant.ERROR_CODE,
                                message: Constant.INTERNAL_ERROR
                            });
                        } else {
                            if (email) {
                                res.json({
                                    code: Constant.ERROR_CODE,
                                    message: Constant.EMAIL_ALREADY_EXIST
                                });
                            } else {

                                user.firstName = body.firstName;
                                user.lastName = body.lastName;
                                user.email = body.email;
                                user.company = body.company;
                                user.save(function (err, Updateduser) {
                                    if (err) {
                                        res.json({
                                            code: Constant.ERROR_CODE,
                                            message: 'Unable to update user'
                                        });
                                    } else {
                                        res.json({
                                            code: Constant.SUCCESS_CODE,
                                            'data': Updateduser,
                                            message: 'User updated successfully'
                                        });
                                    }
                                });
                            }

                        }
                    });
            }
        });
    }
}

/**
 * [getUserById - get role list]
 * @param  {object} req
 * @param  {object} res
 * @return {json}
 */
function getRole(req, res) {
    if (!validator.isValidObject(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        userRole.find({
            companyId: req.body.companyId,
            deleted: false
        })
            .exec(function (err, roles) {
                if (err) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: err
                    });
                } else {
                    res.json({
                        code: Constant.SUCCESS_CODE,
                        data: roles
                    });
                }
            });
    }
}

/* Function is use to Update users role type or user name
 * @access private
 * @return json
 * Created by HEMANT KHANDAIT
 * @smartData Enterprises (I) Ltd
 * Created Date 06-Nov-2017
 */

function updateUserDetail(req, res) {
    var userdata;
    var message;
    if (req.body.roles) {
        userdata = {
            roles: req.body.roles
        };
        message = Constant.ROLES_UPDATED;
    } else {
        userdata = {
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            name: req.body.name,
            userImage: req.body.userImage
        };
        message = Constant.UPDATE_USER_PROFILE_SUCCESS;
    }


    companyUser.findOneAndUpdate({
        _id: req.body.userId
    }, userdata, function (err, data) {
        if (err) {
            res.json({
                code: Constant.ERROR_CODE,
                message: Constant.INTERNAL_ERROR
            });
        } else {
            res.json({
                code: Constant.SUCCESS_CODE,
                message: message,
                data: userdata
            });
        }
    });
}

/**
 * Function is use to update user profile pic
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 8th-June-2017
 */
function updateUserPic(req, res) {
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var userId = req.swagger.params.id.value;
    var filename = +timestamp + '_' + file.originalname;
    var thumbFileName = filename + '_thumb.jpg';
    var imagePath = "./images/user/" + timestamp + '_' + file.originalname;
    fs_extra.writeFile(path.resolve(imagePath), file.buffer, function (err) {
        if (err) {
            res.json({
                code: Constant.ERROR_CODE,
                message: Constant.INTERNAL_ERROR
            });
        } else {
            im.resize({
                srcPath: imagePath,
                dstPath: "images/user/" + thumbFileName,
                width: 200,
                height: 180
            }, function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Resized to 640x480');
                }
            });

            var userImage = {
                userImage: Config.webUrl + "/images/user/" + thumbFileName
            };
            companyUser.update({
                _id: userId
            }, {
                    $set: userImage
                }, function (err) {
                    if (err) {
                        res.json({
                            code: Constant.ERROR_CODE,
                            message: Constant.INTERNAL_ERROR
                        });
                    } else {
                        fs_extra.unlink(imagePath, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({
                                    code: Constant.SUCCESS_CODE,
                                    message: Constant.UPDATE_PROFILE_PIC_SUCCESS,
                                    userImage: Config.webUrl + "/images/user/" + thumbFileName
                                });
                            }
                        });
                    }
                });
        }
    });
}

/**
 * Function is use to remove user profile pic
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 8th-June-2017
 */
function removeUserPic(req, res) {
    if (req.body.path) {
        var parsed = url.parse(req.body.path);
        var removePath = "./images/user/" + path.basename(parsed.pathname);
        fs_extra.unlink(removePath, function (err) {
            if (err && err.code === 'ENOENT') {
                // file doens't exist
                res.json({
                    code: Constant.ERROR_CODE,
                    message: Constant.File_NO_LONGER_EXIST
                });
            } else if (err) {
                res.json({
                    code: Constant.ERROR_CODE,
                    message: Constant.INTERNAL_ERROR
                });
            } else {
                companyUser.update({
                    _id: req.body.userId
                }, {
                    $set: {
                        userImage: null
                    }
                }, function (err) {
                    if (err) {
                        res.json({
                            code: Constant.ERROR_CODE,
                            message: Constant.INTERNAL_ERROR
                        });
                    } else {
                        res.json({
                            code: Constant.SUCCESS_CODE,
                            message: Constant.UPDATE_PROFILE_PIC_SUCCESS
                        });
                    }
                });
            }
        });
    } else {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    }
}
/**
 * Function is use to check token
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 14th-Nov-2017
 */
function checkToken(req, res) {
    var bearer = req.body.bearerToken.split(" ");
    var bearerToken = bearer[1];
    jwt.verify(bearerToken, Config.SECRET, function (err, decoded) {
        if (err) {
            res.json({
                code: Constant.NOT_FOUND_TOKEN,
                message: Constant.TOKEN_INVALID
            });
        } else {
            res.json({
                code: Constant.SUCCESS_CODE,
                message: Constant.TOKEN_VERIFIED
            });
        }

    });
}