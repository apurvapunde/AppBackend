"use strict";
var mongoose = require('mongoose'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    CompanyContact = mongoose.model('CompanyContact'),
    contactGroup = mongoose.model('ContactGroup'),
    groupContact = mongoose.model('GroupContact');
var async = require('async');


module.exports = {
    addcontactGroup: addcontactGroup,
    deletecontactGroup: deletecontactGroup,
    addcontacttoGroup: addcontacttoGroup,
    removecontactfromGroup: removecontactfromGroup,
    getcontactGroup: getcontactGroup,
    removecontactlist: removecontactlist,
    addcontactlist: addcontactlist,
};


/**
 * Function is use to Add group for contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addcontactGroup(req, res) {
    if (!validator.isValid(req.body.groupName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        contactGroup.findOne({ groupName: { $regex: new RegExp('^' + req.body.groupName + '$', "i") }, companyId: req.body.companyId, deleted: false }, { groupName: 1 }, function (err, groupInfo) {

            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            }
            else {
                if (groupInfo) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.GROUP_ALREADY_EXIST
                    });
                }
                else {
                    var GroupData = {
                        groupName: req.body.groupName,
                        companyId: req.body.companyId,
                        userId: req.body.userId
                    };
                    contactGroup(GroupData).save(function (err, data) {
                        if (err) {
                            res.json({ code: Constant.ERROR_CODE, message: err });
                        } else {
                            var r = data.toObject();
                            r.group_count = 0;
                            res.json({ code: Constant.SUCCESS_CODE, message: Constant.ADDED_GROUP_SUCCESS, data: r });

                        }
                    });
                }
            }
        });
    }
}

/**
 * Function is use to get group of company  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function getcontactGroup(req, res) {
    contactGroup.aggregate([
        {
            $lookup:
            {
                from: "groupcontacts",
                localField: "_id",
                foreignField: "groupId",
                as: "groupContactInfo"
            }
        },
        { $match: { "companyId": mongoose.Types.ObjectId(req.body.companyId), deleted: false } },
        { $project: { _id: 1, groupName: 1, group_count: { $size: "$groupContactInfo" } } }
    ]).then(function (data) {
        res.json({ code: Constant.SUCCESS_CODE, data: data });

    }).catch(function (err) {
        res.json({ code: Constant.ERROR_CODE, message: err });

    });
}

/**
 * Function is use to Add contact to a group  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 12-June-2017
 */

function addcontacttoGroup(req, res) {

    async.each(req.body.contactArray, function (product, callback) {
        var GroupData = {
            contactId: product,
            userId: req.body.userId,
            groupId: req.body.groupId
        };
        groupContact(GroupData).save(function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    }, function (err) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.CONTACT_ADDED_GROUP_SUCCESS });
        }
    });
}

/**
 * Function is use to remove contact to a group  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 12-June-2017
 */

function removecontactfromGroup(req, res) {

    async.each(req.body.contactArray, function (contactId, callback) {
    var query = { groupId: req.body.groupId, contactId: contactId };

        groupContact.remove(query, function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    }, function (err) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.CONTACT_REMOVED_GROUP_SUCCESS });
        }
    });
}

/**
 * Function is use get all contact for removing contact to a group  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 14-June-2017
 */

function removecontactlist(req, res) {
    groupContact.find({ groupId: req.body.groupId, "deleted": false}, { _id: false, contactId: true }, function (err, typeInfo) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            if (typeInfo.length > 0) {
                for (var i = 0; i < typeInfo.length; i++) {
                    typeInfo[i]._id = typeInfo[i].contactId._id;
                    typeInfo[i].firstname = typeInfo[i].contactId.firstname;
                    typeInfo[i].lastname = typeInfo[i].contactId.lastname;
                    delete typeInfo[i].contactId;
                }
            }
            res.json({ code: Constant.SUCCESS_CODE, data: typeInfo });
        }
    }).populate('contactId', { 'firstname': true, 'lastname': true, '_id': true }).lean();
}

/**
 * Function is use get all contact for adding contact to a group  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 14-June-2017
 */

function addcontactlist(req, res) {
    groupContact.find({ groupId: req.body.groupId, deleted: false }, function (err, data) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        }
        else {
            var contactID = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    contactID.push(data[key].contactId);
                }
            }
            CompanyContact.find({ _id: { $nin: contactID }, companyId: req.body.companyId,userType:2,deleted: false }, { _id: true, firstname: true, lastname: true }, function (err, contactdata) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, data: contactdata });
                }
            });
        }
    });
}

/**
 * Function is use to delete group of contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function deletecontactGroup(req, res) {

    if (!validator.isValid(req.body.groupId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var GroupStatus = {
            deleted: true
        };
        contactGroup.update({ _id: req.body.groupId }, { $set: GroupStatus }, { multi: true }, function (err) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.GROUP_DELETE });
            }
        });
    }
}
