"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        CompanyContact = mongoose.model('CompanyContact'),
        contactPhone = mongoose.model('ContactPhone'),
        contactAddress = mongoose.model('ContactAddress'),
        contactinternet = mongoose.model('ContactInternet'),
        contactSource = mongoose.model('ContactSource'),
        contactDepartment = mongoose.model('ContactDepartment'),
        contactIndustry = mongoose.model('ContactIndustry'),
        contactType = mongoose.model('ContactType'),
        contactStatus = mongoose.model('ContactStatus'),
        groupContact = mongoose.model('GroupContact'),
        Keyword = mongoose.model('Keyword'),
        contactKeyword = mongoose.model('ContactKeyword');
var im = require('imagemagick');
var async = require('async');
var path = require('path');
var url = require('url');
var fs_extra = require('fs-extra');
var condition;
var body;
var query;
var count;
var skip;

module.exports = {
    addCompanyContact: addCompanyContact,
    addCompanyContactMore: addCompanyContactMore,
    getcontactdropdown: getcontactdropdown,
    addcontactType: addcontactType,
    addcontactStatus: addcontactStatus,
    addcontactSource: addcontactSource,
    addcontactDepartment: addcontactDepartment,
    addcontactIndustry: addcontactIndustry,
    deleteContactDepartment: deleteContactDepartment,
    deleteContactIndustry: deleteContactIndustry,
    updateContactPic: updateContactPic,
    getContactList: getContactList,
    updateCompanyContact: updateCompanyContact,
    getContactDetail: getContactDetail,
    deletecontact: deletecontact,
    addNewkeywords: addNewkeywords,
    getIndividualList: getIndividualList,
    getCompanyContactList: getCompanyContactList,
    getAssociateContactList: getAssociateContactList,
    removeContactPic: removeContactPic
};
/**
 * Function is use to create contact and company 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 06-June-2017
 */
function addCompanyContact(req, res) {
    var body = req.body;
    var condition;
    if (req.body.userType === 2) {
        condition = !validator.isValid(body.companyName) || !validator.isValid(body.lastname) || !validator.isValid(body.firstname);
    }
    else {
        condition = !validator.isValid(body.companyName);
    }
    if (condition) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        var companyName = req.body.companyName;
        CompanyContact.findOne({"companyName": {"$regex": companyName, "$options": "i"}, deleted: false}, {companyName: 1}, function(err, companyInfo) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {

                if (companyInfo && req.body.userType === 1) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.COMPANY_ALREADY_EXIST
                    });
                }
                else {
                    var contactData = {
                        userId: req.body.userId,
                        companyId: req.body.companyId,
                        companyName: req.body.companyName,
                        userType: req.body.userType,
                        title: req.body.title,
                        contactStatusId: req.body.statusId,
                        createdBy: req.body.createdBy,
                        webAddress: req.body.webAddress
                    };
                    if (req.body.userType === 2) {
                        contactData.companyContactId = req.body.companyContactId;
                    }
                    if (req.body.parentContactId) {
                        contactData.parentContactId = req.body.parentContactId;
                    }
                    if (req.body.lastname) {
                        contactData.lastname = req.body.lastname;
                    }
                    if (req.body.firstname) {
                        contactData.firstname = req.body.firstname;
                    }
                    if (req.body.nickName) {
                        contactData.nickName = req.body.nickName;
                    }
                    if (req.body.isSalesRep) {
                        contactData.isSalesRep = req.body.isSalesRep;
                    }
                    if (req.body.sourceId !== "0") {
                        contactData.sourceId = req.body.sourceId;
                    }
                    if (req.body.contactTypeId !== "0") {
                        contactData.contactTypeId = req.body.contactTypeId;
                    }
                    if (req.body.age) {
                        contactData.age = req.body.age;
                    }
                    var ContactRecord = new CompanyContact(contactData);
                    // call the built-in save method to save to the database
                    ContactRecord.save(function(err, contactInfo) {
                        var Phone = req.body.phone;
                        var Address = req.body.address;
                        var Internet = req.body.internet;
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                        } else {
                            async.series([//you can use "async.series" as well            
                                function(callback) {

                                    async.each(Phone, function(product, callbackPhone) {
                                        var Phonecontact = {
                                            contactId: contactInfo._id,
                                            userId: req.body.userId,
                                            phonetype: product.phonetype,
                                            phone: product.phone,
                                            isPrimary: product.isPrimary
                                        };
                                        contactPhone(Phonecontact).save(function(err, data) {
                                            if (err) {
                                                callbackPhone(err);
                                            } else {
                                                callbackPhone();
                                            }
                                        });
                                    }, function(err) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            callback();
                                        }

                                    });
                                },
                                function(callback) {
                                    async.each(Address, function(contactAdd, callbackAddress) {
                                        var Addresscontact = {
                                            contactId: contactInfo._id,
                                            userId: req.body.userId,
                                            addressType: contactAdd.addressType,
                                            mapAddress1: contactAdd.mapAddress1,
                                            mapAddress2: contactAdd.mapAddress2,
                                            zip: contactAdd.zip,
                                            city: contactAdd.city,
                                            state: contactAdd.state,
                                            countryId: contactAdd.countryId,
                                            isPrimary: contactAdd.isPrimary
                                        };
                                        contactAddress(Addresscontact).save(function(err, data) {
                                            if (err) {
                                                callbackAddress(err);

                                            } else {

                                                callbackAddress();
                                            }
                                        });
                                    }, function(err) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            callback();
                                        }

                                    });
                                },
                                function(callback) {
                                    async.each(Internet, function(product, callbackInternet) {
                                        var Internetcontact = {
                                            contactId: contactInfo._id,
                                            userId: req.body.userId,
                                            internetType: product.internetType,
                                            internetvalue: product.internetvalue,
                                            isPrimary: product.isPrimary
                                        };
                                        contactinternet(Internetcontact).save(function(err, data) {
                                            if (err) {
                                                callbackInternet(err);
                                            } else {
                                                callbackInternet();
                                            }
                                        });
                                    }, function(err) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            callback();
                                        }


                                    });
                                }
                            ], function(err) {
                                if (err) {
                                    res.json({code: Constant.ERROR_CODE, message: err});
                                } else {
                                    res.json({code: Constant.SUCCESS_CODE, message: Constant.ADD_CONTACT_SUCCESS, data: contactInfo});
                                }
                            });
                        }
                    });
                }
            }
        });
    }
}
/**
 * Function is use to add more info to contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 07-June-2017
 */
function addCompanyContactMore(req, res) {

    var companycontactData = {
        birthday: req.body.birthday,
        spouse: req.body.spouse,
        children: req.body.children,
        branch: req.body.branch,
        notes: req.body.notes
    };
    if (req.body.referredBy) {
        companycontactData.referredBy = req.body.referredBy;
    }
    if (req.body.referredBy === "") {
        companycontactData.referredBy = null;
    }
    if (req.body.modifiedBy) {
        companycontactData.modifiedBy = req.body.modifiedBy;
    }
    if (req.body.departmentId) {
        companycontactData.departmentId = req.body.departmentId;
    }
    if (req.body.departmentId === "") {
        companycontactData.departmentId = null;
    }
    if (req.body.industryId) {
        companycontactData.industryId = req.body.industryId;
    }
    if (req.body.industryId === "") {
        companycontactData.industryId = null;
    }
    if (req.body.age) {
        companycontactData.age = req.body.age;
    }
    query = {'_id': req.body.contactId};

    CompanyContact.findOneAndUpdate(query, companycontactData, {upsert: true}, function(err, data) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            if (req.body.keyword) {
                contactKeyword.remove({'contactId': req.body.contactId}, function(err) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    }
                    else {
                        async.each(req.body.keyword, function(keyword, callback) {
                            Keyword.findOne({_id: keyword}, function(err, keyworddata) {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    if (keyworddata) {
                                        var contactKeywordData = {
                                            keywordId: keyword,
                                            keywordName: keyworddata.keywordName,
                                            userId: req.body.userId,
                                            contactId: req.body.contactId
                                        };
                                        contactKeyword(contactKeywordData).save(function(err, data) {
                                            if (err) {
                                                callback(err);
                                            } else {
                                                callback();
                                            }
                                        });
                                    } else {
                                        callback();
                                    }
                                }
                            });

                        }, function(err) {
                            if (err) {
                                res.json({code: Constant.ERROR_CODE, message: err});
                            } else {
                                res.json({code: Constant.SUCCESS_CODE, message: Constant.UPDATE_CONTACT_SUCCESS, data: data});
                            }

                        });
                    }
                });
            }
            else {

                res.json({code: Constant.SUCCESS_CODE, message: Constant.UPDATE_CONTACT_SUCCESS, data: data});
            }
        }
    });
}

/**
 * Function is use to get all dropdown list related to addcontact/add more contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 07-June-2017
 */

function getcontactdropdown(req, res) {
    if (!validator.isValidObject(req.body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        var DropdownRecord = {};
        async.series([//you can use "async.series" as well            
            function(callback) {
                contactType.find({companyId: req.body.companyId, "deleted": false}, function(err, typeInfo) {
                    if (err) {
                        callback(err);
                    } else {
                        DropdownRecord.type = typeInfo;
                        callback(null);
                    }
                });
            },
            function(callback) {
                contactStatus.find({companyId: req.body.companyId, "deleted": false}, function(err, statusInfo) {
                    if (err) {
                        callback(err);
                    } else {
                        DropdownRecord.status = statusInfo;
                        callback(null);
                    }
                });
            },
            function(callback) {
                contactSource.find({companyId: req.body.companyId, moduleType: 1, "deleted": false}, function(err, sourceInfo) {
                    if (err) {
                        callback(err);
                    } else {
                        DropdownRecord.source = sourceInfo;
                        callback(null);
                    }
                });
            },
            function(callback) {
                contactDepartment.find({companyId: req.body.companyId, "deleted": false}, function(err, DepartmentInfo) {
                    if (err) {
                        callback(err);
                    } else {
                        DropdownRecord.Department = DepartmentInfo;
                        callback(null);
                    }
                });
            },
            function(callback) {
                contactIndustry.find({companyId: req.body.companyId, moduleType: req.body.moduleType, "deleted": false}, function(err, industryInfo) {
                    if (err) {
                        callback(err);
                    } else {
                        DropdownRecord.industry = industryInfo;
                        callback(null);
                    }
                });
            },
            function(callback) {
                CompanyContact.find({companyId: req.body.companyId, userType: 2, "_id": {$ne: req.body.referredBy}, "deleted": false}, function(err, contactInfo) {
                    if (err) {
                        callback(err);
                    } else {
                        DropdownRecord.contact = contactInfo;
                        callback(null);
                    }
                });
            },
            function(callback) {
                Keyword.find({companyId: req.body.companyId, "deleted": false}, function(err, kewordInfo) {

                    if (err) {
                        callback(err);
                    } else {
                        DropdownRecord.keyword = kewordInfo;
                        callback(null);
                    }
                });
            }
        ], function(err) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            } else {
                res.json({code: Constant.SUCCESS_CODE, data: DropdownRecord});
            }
        });
    }
}
/**
 * Function is use to Add type for contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addcontactType(req, res) {
    if (!validator.isValid(req.body.typeName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        contactType.findOne({typeName: {$regex: new RegExp('^' + req.body.typeName + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, typeData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (typeData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_TYPE_EXIST
                    });
                }
                else {
                    var typeDataFieald = {
                        typeName: req.body.typeName,
                        companyId: req.body.companyId,
                        userId: req.body.userId
                    };
                    contactType(typeDataFieald).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }

}

/**
 * Function is use to Add Status for contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addcontactStatus(req, res) {
    if (!validator.isValid(req.body.statusName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        contactStatus.findOne({statusName: {$regex: new RegExp('^' + req.body.statusName + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, statusData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (statusData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_STATUS_EXIST
                    });
                }
                else {
                    var statusDataField = {
                        statusName: req.body.statusName,
                        companyId: req.body.companyId,
                        userId: req.body.userId
                    };
                    contactStatus(statusDataField).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }


}

/**
 * Function is use to Add Source for contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addcontactSource(req, res) {
    if (!validator.isValid(req.body.sourceName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        contactSource.findOne({sourceName: {$regex: new RegExp('^' + req.body.sourceName + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, sourceData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (sourceData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_SOURCE_EXIST
                    });
                }
                else {
                    var sourceData = {
                        sourceName: req.body.sourceName,
                        companyId: req.body.companyId,
                        userId: req.body.contactId,
                        moduleType: 1
                    };
                    contactSource(sourceData).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }
            }
        });
    }
}

/**
 * Function is use to Add Department for contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addcontactDepartment(req, res) {
    if (!validator.isValid(req.body.departmentName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        contactDepartment.findOne({departmentName: {$regex: new RegExp('^' + req.body.departmentName + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, departmentData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (departmentData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_DEPARTMENT_EXIST
                    });
                }
                else {
                    var departmentDataField = {
                        departmentName: req.body.departmentName,
                        companyId: req.body.companyId,
                        userId: req.body.contactId,
                        module: 0
                    };
                    contactDepartment(departmentDataField).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }
}

/**
 * Function is use to delete Department for contact 
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 24-July-2017
 */
function deleteContactDepartment(req, res) {
    contactDepartment.update({_id: req.body.departmentId}, {$set: {deleted: true}}, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.CONTACT_DEPARTMENT_DELETED, data: req.body.departmanetId});
        }
    });
}

/**
 * Function is use to delete Industry for contact 
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 24-July-2017
 */
function deleteContactIndustry(req, res) {
    contactIndustry.update({_id: req.body.industryId}, {$set: {deleted: true}}, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.CONTACT_INDUSTRY_DELETED, data: req.body.departmanetId});
        }
    });
}

/**
 * Function is use to Add ContactIndustry for contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addcontactIndustry(req, res) {
    if (!validator.isValid(req.body.industryName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        contactIndustry.findOne({industryName: {$regex: new RegExp('^' + req.body.industryName + '$', "i")}, companyId: req.body.companyId, deleted: false}, function(err, industryData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (industryData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_INDUSTRY_EXIST
                    });
                }
                else {
                    var industryDataField = {
                        industryName: req.body.industryName,
                        companyId: req.body.companyId,
                        userId: req.body.contactId,
                        moduleType: req.body.moduleType
                    };
                    contactIndustry(industryDataField).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }

}

/**
 * Function is use to update contact profile pic
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 8th-June-2017
 */
function updateContactPic(req, res) {
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var contactId = req.swagger.params.id.value;
    var filename = +timestamp + '_' + file.originalname;
    var thumbFileName = filename + '_thumb.jpg';
    var imagePath = "./images/contact/" + timestamp + '_' + file.originalname;
    fs_extra.writeFile(path.resolve(imagePath), file.buffer, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            im.resize({srcPath: imagePath, dstPath: "images/contact/" + thumbFileName, width: 200, height: 180}, function(err, stdout, stderr) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Resized to 640x480');
                }
            });
            var ContactImage = {
                profileImage: Config.webUrl + "/images/contact/" + thumbFileName
            };
            CompanyContact.update({_id: contactId}, {$set: ContactImage}, function(err) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    fs_extra.unlink(imagePath, function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, message: Constant.CONTACT_PIC_UPDATED, contactImage: Config.webUrl + "/images/contact/" + thumbFileName});
                        }
                    });
                }
            });
        }
    }
    );
}
/**
 * Function is use to Get list of contact of company
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 9th-June-2017
 */

function getContactList(req, res) {
    body = req.body;
    if ((body.companySearchText) || (body.contactSearchText)) {
        count = req.body.per_page ? req.body.per_page : 0;
        skip = (req.body.page - 1) * req.body.per_page;
    }
    else {
        count = req.body.per_page ? req.body.per_page : 0;
        skip = (req.body.page - 1) * req.body.per_page;
    }
    var sortCreatedAt = {createdAt: -1};
    var sort = {};
    var sortValue = req.body.sortColumnName;
    var sortType = req.body.sortOrder === 'asc' ? 1 : -1;
    sort[sortValue] = sortType;
    var sorting = req.body.sortColumnName ? sort : sortCreatedAt;
    if (body.companySearchText) {
        condition = {companyId: mongoose.Types.ObjectId(body.companyId), userType: 1, "companyName": {"$regex": body.companySearchText, "$options": "i"}, deleted: false};//searching query for comapny
    } else if (body.contactSearchText) {
        condition = {companyId: mongoose.Types.ObjectId(body.companyId), userType: 2, $or: [{"firstname": {"$regex": body.contactSearchText, "$options": "i"}}, {"lastname": {"$regex": body.contactSearchText, "$options": "i"}}, {"title": {"$regex": body.contactSearchText, "$options": "i"}}], deleted: false};//searching query for contacts
    } else {
        condition = {companyId: mongoose.Types.ObjectId(body.companyId), userType: req.body.userType, deleted: false}; // listing query
    }

    var aggregateQuery = [
        {
            $lookup: {
                from: "contactphones",
                localField: "_id",
                foreignField: "contactId",
                as: "phoneInfo"
            }
        },
        {
            $lookup: {
                from: "contactaddresses",
                localField: "_id",
                foreignField: "contactId",
                as: "addressInfo"
            }
        },
        {
            $lookup: {
                from: "contactinternets",
                localField: "_id",
                foreignField: "contactId",
                as: "internetInfo"
            }
        },
        {$match: condition}, {
            $project: {
                companyId: 1,
                companyName: 1,
                insensitivecompanyName: {"$toLower": "$companyName"},
                firstname: 1,
                insensitivefirstname: {"$toLower": "$firstname"},
                lastname: 1,
                title: 1,
                insensitivetitle: {"$toLower": "$title"},
                createdAt: 1,
                phoneInfo: {
                    $filter: {
                        input: "$phoneInfo",
                        as: "items",
                        cond: {$eq: ["$$items.isPrimary", true]}
                    }
                },
                internetInfo: {
                    $filter: {
                        input: "$internetInfo",
                        as: "items",
                        cond: {$eq: ["$$items.isPrimary", true]}
                    }
                },
                addressInfo: {
                    $filter: {
                        input: "$addressInfo",
                        as: "items",
                        cond: {$eq: ["$$items.isPrimary", true]}
                    }
                }
            }
        }
    ];
    var countQuery = [].concat(aggregateQuery);
    aggregateQuery.push({$sort: sorting});
    aggregateQuery.push({$skip: skip ? skip : 0});
    aggregateQuery.push({$limit: count});
    CompanyContact.aggregate(aggregateQuery).then(function(result) {
        var contacts = {};
        contacts.contact = result;
        countQuery.push({$group: {_id: null, count: {$sum: 1}}});
        CompanyContact.aggregate(countQuery).then(function(dataCount) {
            var cnt = (dataCount[0]) ? dataCount[0].count : 0;
            var pageCount = cnt / req.body.per_page;
            var result = pageCount % 1;
            if (result !== 0)
            {
                pageCount = Math.ceil(pageCount);
            }
            contacts.totalcount = pageCount;
            contacts.page = req.body.page;
            contacts.sortOrder = req.body.sortOrder ? req.body.sortOrder : 'desc';
            contacts.sortColumnName = sortValue;
            res.json({code: Constant.SUCCESS_CODE, message: Constant.CONTACT_LIST_FETCHED, data: contacts});
        });
    }).catch(function(err) {
        res.json({code: Constant.ERROR_CODE, message: err});
    });
}

/**
 * Function is use to edit contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 10-June-2017
 */
function updateCompanyContact(req, res) {
    var body = req.body;
    var condition;
    if (req.body.userType === 2) {
        condition = !validator.isValid(body.companyName) || !validator.isValid(body.lastname) || !validator.isValid(body.firstname);
    }
    else {
        condition = !validator.isValid(body.companyName);
    }
    if (condition) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {

        CompanyContact.findOne({companyName: {$regex: new RegExp("^" + req.body.companyName + "$", "i")}, userType: 1, deleted: false}, {_id: 1, companyName: 1}, function(err, companyInfo) {
            if (err) {

                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                if (companyInfo) {
                    var samecomapnyId = companyInfo._id.equals(req.body.contactId);
                }
                if (1 && (samecomapnyId === false) && (req.body.userType !== 2)) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.COMPANY_ALREADY_EXIST
                    });
                }
                else {

                    var contactData = {
                        userId: req.body.userId,
                        companyId: req.body.companyId,
                        companyName: req.body.companyName,
                        userType: req.body.userType,
                        title: req.body.title,
                        contactStatusId: req.body.statusId,
                        modifiedBy: req.body.modifiedBy,
                        webAddress: req.body.webAddress,
                        isSalesRep: req.body.isSalesRep,
                        nickName: req.body.nickName
                    };
                    if (req.body.parentContactId) {
                        contactData.parentContactId = req.body.parentContactId;
                    }
                    if (req.body.parentContactId === "") {
                        contactData.parentContactId = null;
                    }
                    if (req.body.salesRepSign === "") {
                        contactData.salesRepSign = null;
                    }

                    if (req.body.lastname) {
                        contactData.lastname = req.body.lastname;
                    }
                    if (req.body.firstname) {
                        contactData.firstname = req.body.firstname;
                    }
                    if (req.body.sourceId !== "0") {
                        contactData.sourceId = req.body.sourceId;
                    }
                    if (req.body.typeId !== "0") {
                        contactData.contactTypeId = req.body.typeId;
                    }
                    if (req.body.age) {
                        contactData.age = req.body.age;
                    }

                    CompanyContact.findOneAndUpdate({_id: req.body.contactId}, {$set: contactData}, {multi: true, upsert: true}, function(err, contactInfo) {

                        var Phone = req.body.phone;
                        var Address = req.body.address;
                        var Internet = req.body.internet;
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                        } else {

                            contactPhone.remove({'contactId': req.body.contactId}, function(err) {
                                if (err) {

                                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                                }
                                else {
                                    contactAddress.remove({'contactId': req.body.contactId}, function(err) {
                                        if (err) {
                                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                                        }
                                        else {
                                            contactinternet.remove({'contactId': req.body.contactId}, function(err) {
                                                if (err) {
                                                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                                                }
                                                else {

                                                    async.series([//you can use "async.series" as well            
                                                        function(callback) {

                                                            async.each(Phone, function(product, callbackPhone) {
                                                                var Phonecontact = {
                                                                    contactId: contactInfo._id,
                                                                    userId: req.body.userId,
                                                                    phonetype: product.phonetype,
                                                                    phone: product.phone,
                                                                    isPrimary: product.isPrimary
                                                                };

                                                                contactPhone(Phonecontact).save(function(err, data) {
                                                                    if (err) {
                                                                        callbackPhone(err);
                                                                    } else {
                                                                        callbackPhone();
                                                                    }
                                                                });
                                                            }, function(err) {
                                                                if (err) {
                                                                    callback(err);
                                                                } else {
                                                                    callback();
                                                                }
                                                            });
                                                        },
                                                        function(callback) {
                                                            async.each(Address, function(product, callbackAddress) {
                                                                var Addresscontact = {
                                                                    contactId: contactInfo._id,
                                                                    userId: req.body.userId,
                                                                    addressType: product.addressType,
                                                                    mapAddress1: product.mapAddress1,
                                                                    mapAddress2: product.mapAddress2,
                                                                    zip: product.zip,
                                                                    city: product.city,
                                                                    state: product.state,
                                                                    countryId: product.countryId,
                                                                    isPrimary: product.isPrimary
                                                                };
                                                                contactAddress(Addresscontact).save(function(err, data) {
                                                                    if (err) {
                                                                        callbackAddress(err);
                                                                    } else {
                                                                        callbackAddress();
                                                                    }
                                                                });
                                                            }, function(err) {
                                                                if (err) {
                                                                    callback(err);
                                                                } else {
                                                                    callback();
                                                                }
                                                            });
                                                        },
                                                        function(callback) {
                                                            async.each(Internet, function(product, callbackInternet) {
                                                                var Internetcontact = {
                                                                    contactId: contactInfo._id,
                                                                    userId: req.body.userId,
                                                                    internetType: product.internetType,
                                                                    internetvalue: product.internetvalue,
                                                                    isPrimary: product.isPrimary
                                                                };
                                                                contactinternet(Internetcontact).save(function(err, data) {
                                                                    if (err) {
                                                                        callbackInternet(err);
                                                                    } else {
                                                                        callbackInternet();
                                                                    }
                                                                });
                                                            }, function(err) {
                                                                if (err) {
                                                                    callback(err);
                                                                } else {
                                                                    callback();
                                                                }
                                                            });
                                                        }
                                                    ], function(err) {
                                                        if (err) {

                                                            res.json({code: Constant.ERROR_CODE, message: err});
                                                        } else {
                                                            res.json({code: Constant.SUCCESS_CODE, message: Constant.UPDATE_CONTACT_SUCCESS, data: contactInfo});
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
}

/**
 * Function is use to Get detail of contact of company
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 10th-June-2017
 */
function getContactDetail(req, res) {
    CompanyContact.aggregate([
        {$match: {_id: mongoose.Types.ObjectId(req.body.contactId), deleted: false}},
        {
            $lookup:
                    {
                        from: "contactphones",
                        localField: "_id",
                        foreignField: "contactId",
                        as: "phoneInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contactaddresses",
                        localField: "_id",
                        foreignField: "contactId",
                        as: "addressInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contactinternets",
                        localField: "_id",
                        foreignField: "contactId",
                        as: "internetInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contactsources",
                        localField: "sourceId",
                        foreignField: "_id",
                        as: "sourcesInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contacttypes",
                        localField: "contactTypeId",
                        foreignField: "_id",
                        as: "typeInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contactdepartments",
                        localField: "departmentId",
                        foreignField: "_id",
                        as: "departmentInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contactindustries",
                        localField: "industryId",
                        foreignField: "_id",
                        as: "industryInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contactstatuses",
                        localField: "contactStatusId",
                        foreignField: "_id",
                        as: "statusInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contactkeywords",
                        localField: "_id",
                        foreignField: "contactId",
                        as: "contactkeywordInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "companycontacts",
                        localField: "referredBy",
                        foreignField: "_id",
                        as: "referredByInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "companycontacts",
                        localField: "parentContactId",
                        foreignField: "_id",
                        as: "parentContactIdInfo"
                    }
        },
        {$unwind: {path: "$parentContactIdInfo", preserveNullAndEmptyArrays: true}},
        {
            $lookup:
                    {
                        from: "opportunities",
                        localField: "_id",
                        foreignField: "contactId",
                        as: "opportunitiesInfo"
                    }
        },
        {
            $lookup:
                    {
                        from: "contactstatuses",
                        localField: "companyId",
                        foreignField: "companyId",
                        as: "assosiateStatusIdInfo"
                    }
        },
        {$project: {
                updatedAt: 1,
                createdAt: 1,
                companyId: 1,
                userType: 1,
                contactStatusId: 1,
                parentContactId: 1,
                companyContactId: 1,
                notes: 1,
                branch: 1,
                isPrivate: 1,
                webAddress: 1,
                children: 1,
                spouse: 1,
                birthday: 1,
                isSalesRep: 1,
                profileImage: 1,
                nickName: 1,
                title: 1,
                lastname: 1,
                firstname: 1,
                companyName: 1,
                modifiedBy: 1,
                createdBy: 1,
                phoneInfo: 1,
                addressInfo: 1,
                internetInfo: 1,
                sourcesInfo: 1,
                typeInfo: 1,
                departmentInfo: 1,
                industryInfo: 1,
                statusInfo: 1,
                contactkeywordInfo: 1,
                referredByInfo: 1,
                salesRepSign: 1,
                parentContactName: '$parentContactIdInfo.companyName',
                opportunitiesInfo: 1,
                assosiateStatusIdInfo: {
                    $filter: {
                        input: "$assosiateStatusIdInfo",
                        as: "list",
                        cond: {$eq: ["$$list.statusName", "Active"]}
                    }
                }
            }
        }
    ]).then(function(data) {
        res.json({code: Constant.SUCCESS_CODE, message: Constant.CONTACT_LIST_FETCHED, data: data});
    }).catch(function(err) {
        res.json({code: Constant.ERROR_CODE, message: err});
    });
}

/**
 * Function is use to delete contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 14-June-2017
 */

function deletecontact(req, res) {
    var contactStatus = {
        deleted: true
    };
    
    CompanyContact.update({$or: [{"_id":  req.body.contactId},{companyContactId: req.body.contactId}]}, {$set: contactStatus}, {multi: true}, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        } else {
            groupContact.remove({contactId: req.body.contactId}, function(err, deleteData) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: err});
                }
                else {
                    res.json({code: Constant.SUCCESS_CODE, message: Constant.CONTACT_DELETE});
                }
            });
        }
    });
}

/**
 * Function is use to Add keyword for company 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 20-June-2017
 */

function addNewkeywords(req, res) {
    if (!validator.isValid(req.body.keywordName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        Keyword.findOne({keywordName: {$regex: new RegExp('^' + req.body.keyword + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, typeData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (typeData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.KEYWORD_EXIST
                    });
                }
                else {
                    var keywordData = {
                        keywordName: req.body.keyword,
                        companyId: req.body.companyId,
                        userId: req.body.userId
                    };
                    Keyword(keywordData).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }
            }
        });
    }

}

/**
 * Function is use to get Individual List
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 12-July-2017
 */

function getIndividualList(req, res) {
    CompanyContact.find({companyId: req.body.companyId, userType: 2, deleted: false}, {_id: 1, firstname: 1, lastname: 1}, function(err, individualList) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        }
        else {
            res.json({
                code: Constant.SUCCESS_CODE,
                data: individualList
            });
        }
    });
}
/**
 * Function is use to get parent company List
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-Sep-2017
 */

function getCompanyContactList(req, res) {
    if (!validator.isValidObject(req.body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        if (req.body.companyContactId) {
            query = {companyId: req.body.companyId, userType: 1, "_id": {$ne: req.body.companyContactId}, "parentContactId": {$ne: req.body.companyContactId}, "deleted": false};
        }
        else {
            query = {companyId: req.body.companyId, userType: 1, "deleted": false};
        }
        CompanyContact.find(query, {companyName: true}, function(err, contactComapnylist) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            } else {
                res.json({code: Constant.SUCCESS_CODE, data: contactComapnylist});
            }
        });
    }
}

/**
 * Function is use to Get contact associated with company
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 9th-June-2017
 */

function getAssociateContactList(req, res) {
    if (!validator.isValid(req.body.userType) || !validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.companyContactId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        CompanyContact.aggregate([
            {$match: {companyId: mongoose.Types.ObjectId(req.body.companyId), companyContactId: mongoose.Types.ObjectId(req.body.companyContactId), userType: req.body.userType, deleted: false}},
            {
                $lookup:
                        {
                            from: "contactphones",
                            localField: "_id",
                            foreignField: "contactId",
                            as: "phoneInfo"
                        }
            },
            {
                $lookup:
                        {
                            from: "contactaddresses",
                            localField: "_id",
                            foreignField: "contactId",
                            as: "addressInfo"
                        }
            },
            {
                $lookup:
                        {
                            from: "contactinternets",
                            localField: "_id",
                            foreignField: "contactId",
                            as: "internetInfo"
                        }
            },
            {$project: {
                    companyId: 1,
                    companyName: 1,
                    phoneInfo: 1,
                    internetInfo: 1,
                    firstname: 1,
                    lastname: 1,
                    title: 1,
                    addressInfo: 1
                }
            },
            {$sort: {createdAt: -1}}
        ]).then(function(data) {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.CONTACT_LIST_FETCHED, data: data});
        }).catch(function(err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        });
    }
}

/**
 * Function is use to remove contact profile pic
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13th-Nov-2017
 */
function removeContactPic(req, res) {
    if (req.body.contactId) {
        CompanyContact.findOneAndUpdate({_id: req.body.contactId}, {$set: {profileImage: null}}, function(err, data) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                var profilePic = data.profileImage;
                var parsed = url.parse(profilePic);
                var removePath = "./images/contact/" + path.basename(parsed.pathname);
                fs_extra.unlink(removePath, function(err) {
                    if (err && err.code === 'ENOENT') {
                        // file doens't exist
                        res.json({code: Constant.ERROR_CODE, message: Constant.File_NO_LONGER_EXIST});
                    } else if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    }
                    else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.CONTACT_PIC_UPDATED});
                    }
                });

            }
        });


    }
    else {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }


}

