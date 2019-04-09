"use strict";
var mongoose = require('mongoose'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    CompanyContact = mongoose.model('CompanyContact'),
    ContactLink = mongoose.model('ContactLink');
var async = require('async');
module.exports = {
    addContactLinks: addContactLinks,
    getContactLinks: getContactLinks,
    removeContactLinks: removeContactLinks,
    getContactLists: getContactLists
};

/**
 * Function is use to add contact links 
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 19th-June-2017
 */
function addContactLinks(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.contactId) || !validator.isValidObject(body.linkContactId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        var contactLinkData = {
            companyId: req.body.companyId,
            contactId: req.body.contactId,
            linkContactId: req.body.linkContactId,
            typeName: req.body.typeName,
            deleted: false
        };

        var ContactLinkRecord = new ContactLink(contactLinkData);
        // call the built-in save method to save to the database
        ContactLinkRecord.save(function (err, contactLink) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.UPDATE_CONTACT_LINK_SUCCESS, data: contactLinkData });
            }
        });
    }
}

/**
 * Function is use to Get detail of contactlink of company
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 21th-June-2017
 */

function getContactLinks(req, res) {
    if (!validator.isValidObject(req.body.contactId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        ContactLink.aggregate([
            { $match: { contactId: mongoose.Types.ObjectId(req.body.contactId) } },
            {
                $lookup:
                {
                    from: "contactphones",
                    localField: "linkContactId",
                    foreignField: "contactId",
                    as: "phoneInfo"
                }
            },
            {
                $lookup:
                {
                    from: "contactaddresses",
                    localField: "linkContactId",
                    foreignField: "contactId",
                    as: "addressInfo"
                }
            },
            {
                $lookup:
                {
                    from: "contactinternets",
                    localField: "linkContactId",
                    foreignField: "contactId",
                    as: "internetInfo"
                }
            },
            {
                $lookup:
                {
                    from: "companycontacts",
                    localField: "linkContactId",
                    foreignField: "_id",
                    as: "companycontactsInfo"
                }
            }

        ]).then(function (data) {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.CONTACT_LIST_FETCHED, data: data });
        }).catch(function (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        });
    }
}

/**
 * Function is use to remove Contact Links
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 19th-June-2017
 */
function removeContactLinks(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.contactId) || !validator.isValidObject(body.linkContactId) || !validator.isValidObject(body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        ContactLink.remove({ contactId: req.body.contactId, linkContactId: req.body.linkContactId, companyId: req.body.companyId }, function (err) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.CONTACT_LINKS_REMOVED });
            }
        });
    }
}

/**
 * Function is use to remove Contact Links
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 19th-June-2017
 */
function getContactLists(req, res) {
    var body = req.body;
    var contactLinkId = [];
    var contacts = {};
    if (!validator.isValidObject(req.body.contactId) || !validator.isValidObject(body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        async.series([//you can use "async.series" as well            
            function (callback) {
                ContactLink.find({ contactId: req.body.contactId, companyId: req.body.companyId,deleted: false  })
                    .exec(function (err, contactLinks) {
                        if (err) {
                            callback(err);
                        } else {
                            contactLinkId.push(req.body.contactId);
                            contactLinks.map(function (d) {
                                contactLinkId.push(d.linkContactId);
                            });
                            callback();
                        }
                    });
            },
            function (callback) {
                CompanyContact.find({ _id: { $nin: contactLinkId }, companyId: req.body.companyId,userType:2, deleted: false }, { _id: 1, firstname: 1, lastname: 1, contactTypeId: 1 }, function (err, contactIds) {
                    if (err) {
                        callback(err);
                    } else {
                        contacts = contactIds;
                        callback();
                    }
                }).populate('contactTypeId', { typeName: true });
            }
        ], function (err) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.CONTACT_LIST_FETCHED, data: contacts });
            }
        });
    }
}