"use strict";
var mongoose = require('mongoose'),
    phantom = require('phantom'),
    User = mongoose.model('User'),
    Company = mongoose.model('Company'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    Config = require('../../config/config.js'),
    CompanyContact = mongoose.model('CompanyContact'),
    Item = mongoose.model('Item'),
    contactPhone = mongoose.model('ContactPhone'),
    contactAddress = mongoose.model('ContactAddress'),
    contactinternet = mongoose.model('ContactInternet'),
    EstimateItem = mongoose.model('EstimatesItem'),
    ContactEstimation = mongoose.model('Estimate'),
    estimateConfig = mongoose.model('estimateConfig'),
    serviceOrder = mongoose.model('Order'),
    OrderItems = mongoose.model('OrderItems'),
    Project = mongoose.model('Project'),
    ProjectItems = mongoose.model('ProjectItems'),
    ObjectId = require('mongoose').Types.ObjectId;
var async = require('async');
var path = require('path');
var fs = require('fs-extra');
var json2csv = require('json2csv');
var _fs = require('fs');
var _ = require('underscore');
var moment = require('moment');
var revision;
var message;
var query;
var field;
var offset;
module.exports = {
    getContactEstimation: getContactEstimation,
    addEstimate: addEstimate,
    getEstimateDetail: getEstimateDetail,
    updateEstimateDetail: updateEstimateDetail,
    deleteEstimate: deleteEstimate,
    addItemRevision: addItemRevision,
    updateItemRevision: updateItemRevision,
    getRevisionList: getRevisionList,
    getRevisionDetail: getRevisionDetail,
    deleteItemRevision: deleteItemRevision,
    exportEstimateCsv: exportEstimateCsv,
    addMemoEstimate: addMemoEstimate,
    updateItemRevisionName: updateItemRevisionName,
    getEstimateRevisionCount: getEstimateRevisionCount,
    updateEstimateItemName: updateEstimateItemName,
    estimatesNo: estimatesNo,
    updateEstimateDetailInline: updateEstimateDetailInline,
    addEstimateName: addEstimateName,
    createProjectSO: createProjectSO
};
/**
 * Function is use to get contact estimation
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */

function getContactEstimation(req, res) {
    // console.log("INSIDE getContactEstimation", req.body)
    var condition;
    var skip;
    var count;
    var body = req.body;
    if ((body.searchText)) {
        count = req.body.per_page ? req.body.per_page : 0;
        skip = 0;
    }
    else {
        count = req.body.per_page ? req.body.per_page : 0;
        skip = (req.body.page - 1) * req.body.per_page;
    }
    var sortCreatedAt = { createdAt: -1 };
    var sort = {};
    var sortValue = req.body.sortColumnName;
    var sortType = req.body.sortOrder === 'asc' ? 1 : -1;
    sort[sortValue] = sortType;
    var sorting = req.body.sortColumnName ? sort : sortCreatedAt;
    if (body.searchText) {
        if (body.userId) {
            condition = { companyId: mongoose.Types.ObjectId(body.companyId), creatorUserId: body.userId, $or: [{ 'estimateNumber': { "$regex": body.searchText, "$options": "i" } }, { 'estimateName': { "$regex": body.searchText, "$options": "i" } }, { 'companyContactsInfo.companyName': { "$regex": body.searchText, "$options": "i" } }, { 'salesRepInfo.firstname': { "$regex": body.searchText, "$options": "i" } }, { 'salesRepInfo.lastname': { "$regex": body.searchText, "$options": "i" } }], deleted: false };//searching query for contacts
        } else {
            condition = { companyId: mongoose.Types.ObjectId(body.companyId), $or: [{ 'estimateNumber': { "$regex": body.searchText, "$options": "i" } }, { 'estimateName': { "$regex": body.searchText, "$options": "i" } }, { 'companyContactsInfo.companyName': { "$regex": body.searchText, "$options": "i" } }, { 'salesRepInfo.firstname': { "$regex": body.searchText, "$options": "i" } }, { 'salesRepInfo.lastname': { "$regex": body.searchText, "$options": "i" } }], deleted: false };//searching query for contacts
        }
    } else {
        if (body.userId) {
            condition = { companyId: mongoose.Types.ObjectId(body.companyId), creatorUserId: body.userId, deleted: false }; // listing query
        } else {
            condition = { companyId: mongoose.Types.ObjectId(body.companyId), deleted: false }; // listing query
        }
    }
    var aggregateQuery = [
        {
            $lookup: {
                from: "companies",
                localField: "companyId",
                foreignField: "_id",
                as: "companiesInfo"
            }
        }, {
            $unwind: {
                path: "$companiesInfo",
            }
        },
        {
            $lookup: {
                from: "companycontacts",
                localField: "customerId",
                foreignField: "_id",
                as: "companyContactsInfo"
            }
        }, {
            $unwind: {
                path: "$companyContactsInfo",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "opportunities",
                localField: "opportunityId",
                foreignField: "_id",
                as: "opportunitiesInfo"
            }
        }, {
            $unwind: {
                path: "$opportunitiesInfo",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "companycontacts",
                localField: "salesRep",
                foreignField: "_id",
                as: "salesRepInfo"
            }
        }, {
            $unwind: {
                path: "$salesRepInfo",
                preserveNullAndEmptyArrays: true
            }
        },
        { $match: condition }, {
            $project: {
                _id: 1,
                estimateName: 1,
                estimateNumber: 1,
                createdAt: 1,
                // creatorUserId:1,
                companyId: {
                    '_id': '$companiesInfo._id',
                    'name': '$companiesInfo.company'
                },
                customerId: {
                    '_id': '$companyContactsInfo._id',
                    'companyName': '$companyContactsInfo.companyName',
                },
                oppurtinityId: {
                    '_id': '$opportunitiesInfo._id',
                    'title': '$opportunitiesInfo.title',
                },
                salesRep: {
                    '_id': '$salesRepInfo._id',
                    'firstname': '$salesRepInfo.firstname',
                    'lastname': '$salesRepInfo.lastname',
                }
            }
        }
    ];
    // var aggregateQuery = [
    //     {
    //         $lookup: {
    //             from: "companies",
    //             localField: "companyId",
    //             foreignField: "_id",
    //             as: "companiesInfo"
    //         }
    //     },{
    //         $unwind: {
    //             path: "$companiesInfo",
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "companycontacts",
    //             localField: "customerId",
    //             foreignField: "_id",
    //             as: "companyContactsInfo"
    //         }
    //     },{
    //         $unwind: {
    //             path: "$companyContactsInfo",
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "companycontacts",
    //             localField: "salesRep",
    //             foreignField: "_id",
    //             as: "salesRepInfo"
    //         }
    //     },{
    //         $unwind: {
    //             path: "$salesRepInfo",
    //         }
    //     },
    //     {$match: condition}, {
    //         $project: {
    //             _id: 1,
    //             estimateName: 1,
    //             estimateNumber: 1,
    //             createdAt: 1,
    //             // creatorUserId:1,
    //             companyId: {
    //                 '_id': '$companiesInfo._id',
    //                 'name': '$companiesInfo.company'
    //             },
    //             customerId: {
    //                 '_id':'$companyContactsInfo._id',
    //                 'companyName':'$companyContactsInfo.companyName',
    //             },
    //             salesRep: {
    //                 '_id':'$salesRepInfo._id',
    //                 'firstname': '$salesRepInfo.firstname',
    //                 'lastname': '$salesRepInfo.lastname',
    //             }
    //         }
    //     }
    // ];


    var countQuery = [].concat(aggregateQuery);
    aggregateQuery.push({ $sort: sorting });
    aggregateQuery.push({ $skip: skip ? skip : 0 });
    aggregateQuery.push({ $limit: count });
    // console.log("aggregateQuery",aggregateQuery)
    ContactEstimation.aggregate(aggregateQuery).then(function (result) {
        // console.log("aggregateQuery result",result)

        var estimateObj = {};
        estimateObj.estimate = result;
        countQuery.push({ $group: { _id: null, count: { $sum: 1 } } });
        ContactEstimation.aggregate(countQuery).then(function (dataCount) {
            var cnt = (dataCount[0]) ? dataCount[0].count : 0;
            var pageCount = cnt / req.body.per_page;
            var result = pageCount % 1;
            if (result !== 0) {
                pageCount = Math.ceil(pageCount);
            }
            estimateObj.totalcount = pageCount;
            estimateObj.page = req.body.page;
            estimateObj.per_page = req.body.per_page;
            estimateObj.searchText = req.body.searchText ? req.body.searchText : "";
            estimateObj.sortOrder = req.body.sortOrder ? req.body.sortOrder : 'desc';
            estimateObj.sortColumnName = sortValue;
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATELIST_FETCH_SUCCESS, data: estimateObj });
        });
    }).catch(function (err) {
        // console.log("ERRRRRRRRRRRR", err)
        res.json({ code: Constant.ERROR_CODE, message: err });
    });
}


/* Function is use to Add Estimate for oppertunity
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-June-2017
 */
function addEstimate(req, res) {
    if (!validator.isValidObject(req.body.customerId) || !validator.isValidObject(req.body.salesRep)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.FIELD_REQUIRED });
    }
    else {
        var estimatesavedata = {
            companyId: req.body.companyId,
            contactId: req.body.contactId,
            customerId: req.body.customerId,
            title: req.body.title,
            billingAddress1: req.body.billingAddress1,
            billingAddress2: req.body.billingAddress2,
            billingzip: req.body.billingzip,
            billingcity: req.body.billingcity,
            billingstate: req.body.billingstate,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            shippingzip: req.body.shippingzip,
            shippingcity: req.body.shippingcity,
            shippingstate: req.body.shippingstate,
            salesRep: req.body.salesRep,
            class: req.body.class,
            createdBy: req.body.createdBy,
            proposedServices: req.body.proposedServices,
            note: req.body.note,
            estimateName: req.body.estimateName,
            estimateNumber: req.body.estimateNumber

        };
        if (req.body.opportunityId) {
            estimatesavedata.opportunityId = req.body.opportunityId;
        }
        if (req.body.individualId) {
            estimatesavedata.individualId = req.body.individualId;
        }
        if (req.body.individualId === "") {
            estimatesavedata.individualId = null;
        }
        if (req.body.stage) {
            estimatesavedata.stage = req.body.stage;
        }
        if (req.body.projectId) {
            estimatesavedata.projectId = req.body.projectId;
        }
        if (req.body.proposalId) {
            estimatesavedata.proposalId = req.body.proposalId;
        }

        var EstimateRecord = new ContactEstimation(estimatesavedata);
        EstimateRecord.save(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                var estimateItemData = {
                    lineItems: req.body.item,
                    revisionName: req.body.revisionName,
                    estimateId: data._id,
                    companyId: req.body.companyId,
                    laborCost: req.body.laborCost,
                    materialCost: req.body.materialCost,
                    totalEstimate: req.body.totalEstimate,
                    taxRate: req.body.taxRate,
                    markUp: req.body.markUp,
                    itemsTotal: req.body.itemsTotal,
                    ourCostTotal: req.body.ourCostTotal,
                    materialExtendedTotal: req.body.materialExtendedTotal,
                    taxTotal: req.body.taxTotal,
                    taxExtendedTotal: req.body.taxExtendedTotal,
                    hoursExtendedTotal: req.body.hoursExtendedTotal,
                    rateTotal: req.body.rateTotal,
                    laborExtendedTotal: req.body.laborExtendedTotal,
                    materialCostTotal: req.body.materialCostTotal,
                    shippingTotal: req.body.shippingTotal,
                    markUpPercent: req.body.markUpPercent,
                    markUpTotal: req.body.markUpTotal,
                    createdBy: req.body.createdBy,
                    revisionNotes: req.body.revisionNotes
                };
                EstimateItem(estimateItemData).save(function (err, data) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    } else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATE_ADD_SUCCESS, data: data });
                    }
                });

            }
        });
    }
}

/* Function is use to Add Estimate Name for opportunity
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-June-2017
 */
function addEstimateName(req, res) {
    // console.log("inside add estimate", req.body)
    if (!validator.isValidObject(req.body.companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING });
    }
    else {
        var estimatesavedata = {
            companyId: req.body.companyId,
            estimateName: req.body.estimateName,
            estimateNumber: req.body.estimateNumber,
            creatorUserId: req.body.userId

        };
        if (req.body.customerId) {
            estimatesavedata.customerId = req.body.customerId;
        }
        if (req.body.opportunityId) {
            estimatesavedata.opportunityId = req.body.opportunityId;
        }
        if (req.body.individualId) {
            estimatesavedata.individualId = req.body.individualId;
        }
        if (req.body.individualId === "") {
            estimatesavedata.individualId = null;
        }

        var EstimateRecord = new ContactEstimation(estimatesavedata);
        EstimateRecord.save(function (err, data) {
            // console.log(err, "saving estimate", data)
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                var estimateItemData = {
                    lineItems: req.body.item,
                    revisionName: req.body.revisionName,
                    estimateId: data._id,
                    companyId: req.body.companyId,
                    createdBy: req.body.createdBy
                };
                EstimateItem(estimateItemData).save(function (err, data) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    } else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATE_ADD_SUCCESS, data: data });
                    }
                });

            }
        });
    }
}


/* Function is use to get Estimate detail for oppertunity
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 26-June-2017
 + */

function getEstimateDetail(req, res) {

    if (!validator.isValidObject(req.body.estimateId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    }

    else {
        var ValidEstimateId = ObjectId.isValid(req.body.estimateId);
        if (ValidEstimateId === true) {

            var estmatesRecord = {};
            ContactEstimation.findOne({ _id: req.body.estimateId })
                .populate('contactId', '_id firstname lastname')
                .populate('customerId', '_id companyName')
                .populate('individualId', '_id firstname lastname salesRepSign')
                .populate('salesRep', '_id firstname lastname salesRepSign')
                .populate('opportunityId', '_id title contactId')
                .populate('proposalId', '_id proposalNumber')
                .populate('projectId', '_id title')
                .populate('stage', 'stageName')
                .exec(function (err, estimatedetail) {
                    if (err) {
                        console.log(err);
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    } else {
                        if (estimatedetail.individualId) {
                            contactPhone.findOne({ contactId: estimatedetail.individualId, isPrimary: true }, function (err, individualPhone) {
                                if (err) {
                                    res.json({ code: Constant.ERROR_CODE, message: err });
                                } else {
                                    contactAddress.findOne({ contactId: estimatedetail.individualId, isPrimary: true }, { "countryId": 1, "state": 1, "city": 1, "zip": 1, "mapAddress2": 1, "mapAddress1": 1, "addressType": 1 }, function (err, individualAddress) {
                                        if (err) {
                                            res.json({ code: Constant.ERROR_CODE, message: err });
                                        } else {
                                            contactinternet.findOne({ contactId: estimatedetail.individualId, isPrimary: true }, function (err, individualInternet) {
                                                if (err) {
                                                    res.json({ code: Constant.ERROR_CODE, message: err });
                                                } else {
                                                    EstimateItem.find({ estimateId: req.body.estimateId, deleted: false }, function (err, itemlist) {
                                                        if (err) {
                                                            res.json({ code: Constant.ERROR_CODE, message: err });
                                                        }
                                                        else {
                                                            estmatesRecord.estimateDetails = estimatedetail;
                                                            if (individualPhone) {
                                                                estmatesRecord.individualPhone = individualPhone.phone;
                                                            }
                                                            if (individualAddress) {
                                                                estmatesRecord.individualAddress = individualAddress;
                                                            }
                                                            if (individualInternet) {
                                                                estmatesRecord.individualInternet = individualInternet.internetvalue;
                                                            }
                                                            estmatesRecord.itemLists = itemlist;
                                                            res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATE_DETAIL_SUCCESS, data: estmatesRecord });
                                                        }
                                                    }).sort({ updatedAt: -1 })
                                                        .populate('lTypeId', 'laborType');

                                                }
                                            });

                                        }
                                    });


                                }
                            });
                        } else {
                            EstimateItem.find({ estimateId: req.body.estimateId, deleted: false }, function (err, itemlist) {
                                if (err) {
                                    res.json({ code: Constant.ERROR_CODE, message: err });
                                }
                                else {
                                    estmatesRecord.estimateDetails = estimatedetail;
                                    estmatesRecord.itemLists = itemlist;
                                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATE_DETAIL_SUCCESS, data: estmatesRecord });
                                }
                            }).sort({ updatedAt: -1 })
                                .populate('lTypeId', 'laborType');
                        }
                    }
                });
        }
        else {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_ID });
        }
    }
}

/* Function is use to update Estimate
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 26-June-2017
 */

function updateEstimateDetail(req, res) {
    if (!validator.isValidObject(req.body.customerId) || !validator.isValidObject(req.body.salesRep)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var estimateData = {
            companyId: req.body.companyId,
            contactId: req.body.contactId,
            customerId: req.body.customerId,
            title: req.body.title,
            billingAddress1: req.body.billingAddress1,
            billingAddress2: req.body.billingAddress2,
            billingzip: req.body.billingzip,
            billingcity: req.body.billingcity,
            billingstate: req.body.billingstate,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            shippingzip: req.body.shippingzip,
            shippingcity: req.body.shippingcity,
            shippingstate: req.body.shippingstate,
            salesRep: req.body.salesRep,
            modifiedBy: req.body.modifiedBy,
            laborCost: req.body.laborCost,
            materialCost: req.body.materialCost,
            proposedServices: req.body.proposedServices,
            note: req.body.note,
            estimateName: req.body.estimateName
        };
        if (req.body.individualId) {
            estimateData.individualId = req.body.individualId;
        }
        if (req.body.individualId === "") {
            estimateData.individualId = null;
        }
        if (req.body.stage) {
            estimateData.stage = req.body.stage;
        }
        if (req.body.opportunityId) {
            estimateData.opportunityId = req.body.opportunityId;
        }
        if (req.body.projectId) {
            estimateData.projectId = req.body.projectId;
        }
        if (req.body.projectId === "") {
            estimateData.projectId = null;
        }
        if (req.body.proposalId) {
            estimateData.proposalId = req.body.proposalId;
        }
        if (req.body.proposalId === "") {
            estimateData.proposalId = null;
        }

        ContactEstimation.findOneAndUpdate({ _id: req.body.estimateId }, estimateData, function (err, estimatedetail) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATE_UPDATE_SUCCESS, data: estimateData });
            }
        });
    }
}

/* Function is use to update Estimate detail inline
 * @access private
 * @return json
 * Created by ramiz kasid
 * @smartData Enterprises (I) Ltd
 * Created Date 18-Sept-2018
 */

function updateEstimateDetailInline(req, res) {
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.estimateId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var estimateData = {};
        if (req.body.companyId) {
            estimateData.companyId = req.body.companyId;
        }
        if (req.body.contactId) {
            estimateData.contactId = req.body.contactId;
        }
        if (req.body.customerId) {
            estimateData.customerId = req.body.customerId;
        }
        if (req.body.billingAddress1 == '' || req.body.billingAddress1 == null || req.body.billingAddress1) {
            estimateData.billingAddress1 = req.body.billingAddress1;
        }
        if (req.body.billingAddress2 == '' || req.body.billingAddress2 == null || req.body.billingAddress2) {
            estimateData.billingAddress2 = req.body.billingAddress2;
        }
        if (req.body.billingzip == '' || req.body.billingzip == null || req.body.billingzip) {
            estimateData.billingzip = req.body.billingzip;
        }
        if (req.body.billingcity == '' || req.body.billingcity == null || req.body.billingcity) {
            estimateData.billingcity = req.body.billingcity;
        }
        if (req.body.billingstate == '' || req.body.billingstate == null || req.body.billingstate) {
            estimateData.billingstate = req.body.billingstate;
        }
        if (req.body.shippingAddress1 == '' || req.body.shippingAddress1 == null || req.body.shippingAddress1) {
            estimateData.shippingAddress1 = req.body.shippingAddress1;
        }
        if (req.body.shippingAddress2 == '' || req.body.shippingAddress2 == null || req.body.shippingAddress2) {
            estimateData.shippingAddress2 = req.body.shippingAddress2;
        }
        if (req.body.shippingzip == '' || req.body.shippingzip == null || req.body.shippingzip) {
            estimateData.shippingzip = req.body.shippingzip;
        }
        if (req.body.shippingcity == '' || req.body.shippingcity == null || req.body.shippingcity) {
            estimateData.shippingcity = req.body.shippingcity;
        }
        if (req.body.shippingstate == '' || req.body.shippingstate == null || req.body.shippingstate) {
            estimateData.shippingstate = req.body.shippingstate;
        }
        if (req.body.note) {
            estimateData.note = req.body.note;
        }
        if (req.body.salesRep) {
            estimateData.salesRep = req.body.salesRep;
        }
        if (req.body.estimateName) {
            estimateData.estimateName = req.body.estimateName;
        }
        if (req.body.proposalId) {
            estimateData.proposalId = req.body.proposalId;
        }
        if (req.body.proposedServices) {
            estimateData.proposedServices = req.body.proposedServices;
        }
        if (req.body.proposalId === "") {
            estimateData.proposalId = null;
        }
        if (req.body.stage) {
            estimateData.stage = req.body.stage;
        }
        if (req.body.projectId) {
            estimateData.projectId = req.body.projectId;
        }
        if (req.body.projectId === "") {
            estimateData.projectId = null;
        }
        if (req.body.individualId) {
            estimateData.individualId = req.body.individualId;
        }
        if (req.body.individualId === "") {
            estimateData.individualId = null;
        }

        // console.log(">>>>>>>>>>>>>>>>",estimateData)
        ContactEstimation.findOneAndUpdate({ _id: req.body.estimateId }, estimateData, function (err, estimatedetail) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATE_UPDATE_SUCCESS, data: estimateData });
            }
        });
    }
}

/* Function is use to delete Estimate 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 26-June-2017
 */

function deleteEstimate(req, res) {
    ContactEstimation.findOneAndUpdate({ _id: req.body.estimateId }, { deleted: true }, function (err, estimatedetail) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATE_DELETED_SUCCESS, data: estimatedetail });
        }
    });
}

/* Function is use to add Estimate item revision
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 06-Oct-2017
 */

function addItemRevision(req, res) {
    var revisiondata = {
        lineItems: req.body.item,
        revisionName: req.body.revisionName,
        proposedServices: req.body.proposedServices
    };
    if (req.body.companyId) {
        revisiondata.companyId = req.body.companyId;
    }
    if (req.body.estimateId) {
        revisiondata.estimateId = req.body.estimateId;
    }
    var revisiondata = new EstimateItem(revisiondata);
    revisiondata.save(function (err, data) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.REVISION_ITEM_ADDED, data: data });
        }
    });
}
/* Function is use to update Estimate item revision
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 06-Oct-2017
 */

function updateItemRevision(req, res) {
    var revisiondata = {
        lineItems: [],
        revisionName: req.body.revisionName,
        revisionNotes: req.body.revisionNotes,
        laborCost: req.body.laborCost,
        materialCost: req.body.materialCost,
        totalEstimate: req.body.totalEstimate,
        taxRate: req.body.taxRate,
        markUp: req.body.markUp,
        itemsTotal: req.body.itemsTotal,
        ourCostTotal: req.body.ourCostTotal,
        materialExtendedTotal: req.body.materialExtendedTotal,
        taxTotal: req.body.taxTotal,
        taxExtendedTotal: req.body.taxExtendedTotal,
        hoursExtendedTotal: req.body.hoursExtendedTotal,
        rateTotal: req.body.rateTotal,
        laborExtendedTotal: req.body.laborExtendedTotal,
        materialCostTotal: req.body.materialCostTotal,
        shippingTotal: req.body.shippingTotal,
        markUpPercent: req.body.markUpPercent,
        markUpTotal: req.body.markUpTotal,
        modifiedBy: req.body.modifiedBy
    };
    var lineItem = {
        lineItems: req.body.item
    };
    EstimateItem.findOneAndUpdate({ _id: req.body.revisionId }, revisiondata).exec(function (err, estimateddata) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            EstimateItem.findOneAndUpdate({ _id: req.body.revisionId }, lineItem).exec(function (err, estimateddata) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.REVISION_ITEM_UPDATED });
                }
            });
        }
    });
}
/* Function is use to update Delete item revision
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 11-Oct-2017
 */

function deleteItemRevision(req, res) {
    EstimateItem.findOneAndUpdate({ _id: req.body.revisionItemId }, { deleted: true }).exec(function (err, estimateddata) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.REVISION_ITEM_DELETE_SUCCESS });
        }
    });
}

/**
 * Function is to get list of revisions
 * @access private
 * @return json 
 * Created by Hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 06-Oct-2017
 */

function getRevisionList(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.estimateId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        EstimateItem.find({ estimateId: body.estimateId, deleted: false })
            .populate('companyId', 'company')
            .sort({ updatedAt: -1 })
            .exec(function (err, data) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, data: data, message: Constant.REVISION_ITEM_LIST_FETCHED });
                }
            });
    }
}
/**
 * Function is to get list of revisions
 * @access private
 * @return json 
 * Created by Hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 06-Oct-2017
 */

function getRevisionDetail(req, res) {
    var body = req.body;
    EstimateItem.findOne({ "lineItems._id": req.body.revisionId, deleted: false })
        .populate('companyId', 'company')
        .exec(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, data: data });
            }
        });
}
/**
 * Function is to export list of estimate
 * @access private
 * @return json 
 * Created by Hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Oct-2017
 */

function exportEstimateCsv(req, res) {
    var body = req.body;
    EstimateItem.findOne({ _id: req.body.revisionId, deleted: false })
        .populate('companyId', 'company')
        .sort({ updatedAt: -1 })
        .exec(function (err, estimateData) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                if (estimateData) {
                    if (estimateData.lineItems) {
                        var fields = ['itemMfg', 'modelNo', 'partNo', 'itemName', 'quantity', 'mTaxable', 'mOurCost', 'mOurCostExtended', 'mMarkup', 'mCost', 'mExtended', 'mTax', 'mTaxExtended', 'laborTypeName', 'lHours', 'lHoursExtended', 'lRate', 'lExtended', 'rowTotal'];
                        var fieldNames = ['Mfg', 'Model No', 'Part No', 'Desc', 'Qty', 'Taxable', 'Our Cost', 'Our Cost Ext', 'Markup', 'Cost', 'Extended', 'Tax', 'Tax Extended', 'Type', 'Hrs', 'Hrs Ext', 'Rate', 'Extended', 'Row Total'];
                        var csv = json2csv({ data: estimateData.lineItems, fields: fields, fieldNames: fieldNames });
                        var timestamp = moment().format('MMM-DD');
                        var filename = estimateData.revisionName + '_' + timestamp + '_' + 'file.csv';
                        var imagePath = "./csv/estimate/" + filename;
                        var csvPath = Config.webUrl + "/csv/estimate/" + filename;
                        _fs.writeFile(path.resolve(imagePath), csv, function (err) {
                            if (err) {
                                throw err;
                            }
                            else {
                                res.json({ code: Constant.SUCCESS_CODE, message: Constant.EXPORT_ESTIMATEITEM_CSV, path: csvPath });
                            }

                        });
                    } else {
                        res.json({ code: Constant.DATA_NOT_FOUND_CODE, message: Constant.DATA_NOT_FOUND });
                    }
                }
                else {
                    res.json({ code: Constant.DATA_NOT_FOUND_CODE, message: Constant.DATA_NOT_FOUND });
                }
            }
        });

}
/* Function is use to add memos estimate
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Oct-2017
 */

function addMemoEstimate(req, res) {
    var memodata = {
        userName: req.body.userName,
        message: req.body.message
    };
    ContactEstimation.findOneAndUpdate({ _id: req.body.estimateIdcc }, { $push: { memo: memodata } }, function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.MEMO_ADDED, data: result });
        }
    });
}

/* Function is use to update Estimate item revision name
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 12-Oct-2017
 */

function updateItemRevisionName(req, res) {
    var revisiondata = {
        revName: req.body.revName,
    };
    EstimateItem.findOneAndUpdate({ _id: req.body.revisionId }, revisiondata).exec(function (err, estimateddata) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.REVISION_ITEM_UPDATED });

        }
    });
}

/* Function is use to get Estimate item revision count
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 16-Jan-2018
 */

function getEstimateRevisionCount(req, res) {
    EstimateItem.count({ "estimateId": req.body.estimateId }).exec(function (err, estimateddata) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, count: estimateddata });
        }
    });
}
/* Function is use to update Estimate item name
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Jan-2018
 */

function updateEstimateItemName(req, res) {
    Item.findOne({ "_id": req.body.itemId }).exec(function (err, itemdata) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            if (req.body.lineItemId) {
                EstimateItem.findOneAndUpdate({ _id: req.body.estimateItemId, "lineItems._id": req.body.lineItemId }, {
                    "$set": { "lineItems.$.itemName": itemdata.itemName },
                }, { "new": true }).exec(function (err, estimateddata) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message1: err });
                    } else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.ITEM_UPDATED, data: itemdata.itemName });

                    }
                });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, data: itemdata.itemName });

            }

        }
    });
}

/**
 * Function to update estimate no dynamically
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 19-June-2017
 */

function estimatesNo(req, res) {
    ContactEstimation.count({ companyId: req.body.companyId }).exec(function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        }
        else {
            res.json({ code: Constant.SUCCESS_CODE, estimateNo: 'ES-' + parseInt(100000 + result + 1) });
        }
    });
}

/**
 * Function to create new Project/SO containing estimates line items
 * @access private
 * @returns JSON
 * Created by Apurva Punde
 * @smartdata Enterprises (I) Ltd
 * Created Date 14 Feb 2019
 */
function createProjectSO(req, res) {
    // console.log("inside create PO/SO",req.body)
    if (!validator.isValid(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        if (req.body.IsProject) {
            let projectData = {
                title: req.body.textValue,
                companyId: req.body.companyId,
                employeeId: req.body.employeeId,
                createdBy: req.body.createdBy,
            };
            Project(projectData).save(function (err, Project) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                } else {
                    // console.log("Project>>>>>",Project)
                    if (req.body.items) {
                        async.each(req.body.items, function (item, callback) {

                            var projectItemData = {
                                itemId: item._id,
                                projectId: Project._id,
                                itemTypeId: item.itemTypeId,
                                header: item.header,
                                headerName: item.headerName,
                                itemName: item.itemName,
                                itemMfg: item.itemMfg,
                                partNo: item.partNo,
                                quantity: item.quantity,
                                markUp: item.markUp,
                                mTaxable: item.mTaxable,
                                mOurCost: item.mOurCost,
                                mMarkup: item.mMarkup,
                                mCost: item.mCost,
                                modelNo: item.modelNo,
                                materialCost: item.materialCost,
                                laborCost: item.laborCost,
                                mOurCostExtended: item.mOurCostExtended,
                                mExtended: item.mExtended,
                                mTax: item.mTax,
                                mTaxExtended: item.mTaxExtended,
                                lType: item.lType,
                                laborTypeName: item.laborTypeName,
                                displayLaborName: item.displayLaborName,
                                lHours: item.lHours,
                                lExtended: item.lExtended,
                                lHoursExtended: item.lHoursExtended,
                                lRate: item.lRate,
                                rowTotal: item.rowTotal,
                                unit: item.unit
                            };
                            ProjectItems(projectItemData).save(function (err, data) {
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
                                res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.PROJECT_ADD, data: Project });
                            }

                        });
                    }
                    else {
                        res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.PROJECT_ADD, data: Project });

                    }
                }
            });
        } else {
            var serviceOrderData = {
                title: req.body.textValue,
                companyId: req.body.companyId,
                userIds: req.body.employeeId,
                orderNumber: req.body.orderNumber,
                createdBy: req.body.createdBy
            };
            serviceOrder(serviceOrderData).save(function (err, ServiceOrder) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                } else {
                    // console.log("ServiceOrder>>>>>",ServiceOrder)
                    if (req.body.items) {
                        async.each(req.body.items, function (item, callback) {

                            var orderItemData = {
                                itemId: item._id,
                                orderId: ServiceOrder._id,
                                itemTypeId: item.itemTypeId,
                                header: item.header,
                                headerName: item.headerName,
                                itemName: item.itemName,
                                itemMfg: item.itemMfg,
                                partNo: item.partNo,
                                quantity: item.quantity,
                                markUp: item.markUp,
                                mTaxable: item.mTaxable,
                                mOurCost: item.mOurCost,
                                mMarkup: item.mMarkup,
                                mCost: item.mCost,
                                modelNo: item.modelNo,
                                materialCost: item.materialCost,
                                laborCost: item.laborCost,
                                mOurCostExtended: item.mOurCostExtended,
                                mExtended: item.mExtended,
                                mTax: item.mTax,
                                mTaxExtended: item.mTaxExtended,
                                lType: item.lType,
                                laborTypeName: item.laborTypeName,
                                displayLaborName: item.displayLaborName,
                                lHours: item.lHours,
                                lExtended: item.lExtended,
                                lHoursExtended: item.lHoursExtended,
                                lRate: item.lRate,
                                rowTotal: item.rowTotal,
                                unit: item.unit
                            };
                            OrderItems(orderItemData).save(function (err, data) {
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
                                res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.SERVICE_ORDER_ADD, data: ServiceOrder });
                            }

                        });
                    }
                    else {
                        res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.SERVICE_ORDER_ADD, data: ServiceOrder });

                    }
                }
            });
        }

    }
}