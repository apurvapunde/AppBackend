"use strict";
var mongoose = require('mongoose'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    Opportunity = mongoose.model('Opportunity'),
    companyContact = mongoose.model('CompanyContact'),
    OpportunityTag = mongoose.model('OpportunityTag'),
    Estimate = mongoose.model('Estimate');
var async = require('async');
var condition;
var offset;

module.exports = {
    addOpportunity: addOpportunity,
    getOpportunitiesByCompany: getOpportunitiesByCompany,
    updateOpportunity: updateOpportunity,
    getOpportunitiesData: getOpportunitiesData,
    opportunityNo: opportunityNo,
    deleteOpportunity: deleteOpportunity,
    getContactOpportunities: getContactOpportunities,
    getOpportunitiesEstimates: getOpportunitiesEstimates,
    addMemoOpportunity: addMemoOpportunity,
    addOpportunityTag: addOpportunityTag,
    getOpportunityTag: getOpportunityTag
};
/**
 * Function is use to add addopportunity for company
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function addOpportunity(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValid(body.salesRep) || !validator.isValid(body.contactId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        companyContact.findOne({ companyId: body.companyId }, function (err, companyInfo) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                if (companyInfo) {
                    var opportunityData = {
                        companyId: req.body.companyId,
                        contactId: req.body.contactId,
                        title: req.body.title,
                        estCloseDate: req.body.estCloseDate,
                        value: req.body.value,
                        categoryId: req.body.categoryId,
                        opportunityNumber: req.body.opportunityNumber,
                        salesRep: req.body.salesRep,
                        probabilityId: req.body.probabilityId,
                        priorityId: req.body.priorityId,
                        description: req.body.description,
                        contract: req.body.contract,
                        createdBy: req.body.createdBy,
                        tags: req.body.tags,
                        estStartDate: req.body.estStartDate,
                        sourceDetails: req.body.sourceDetails
                    };
                    if (req.body.stageId) {
                        opportunityData.stageId = req.body.stageId;
                    }
                    if (req.body.source) {
                        opportunityData.source = req.body.source;
                    }
                    if (req.body.endUser) {
                        opportunityData.endUser = req.body.endUser;
                    }
                    if (req.body.individualId) {
                        opportunityData.individualId = req.body.individualId;
                    }
                    if (req.body.industryId !== "0" && validator.isValidObject(req.body.industryId)) {
                        opportunityData.industryId = req.body.industryId;
                    }

                    var OpportunityRecord = new Opportunity(opportunityData);
                    OpportunityRecord.save(function (err, opportunity) {
                        if (err) {
                            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                        } else {
                            var s = opportunity._id.toString();
                            var d = s.slice(-7);
                            var opportunityNumber = d.toUpperCase();
                            Opportunity.findByIdAndUpdate(opportunity._id, { opportunityNumber: opportunityNumber }, function (err, oData) {
                                if (err) {
                                    res.json({ code: Constant.ERROR_CODE, message: err });
                                }
                                else {
                                    res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.OPPORTUNITY_ADDED_SUCCESS, data: opportunity });

                                }
                            })
                        }
                    });
                }
                else {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.DATA_NOT_FOUND + " " + " for this CompanyId" });
                }
            }
        });
    }
}

/**
 * Function is use to update addopportunity for company
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function updateOpportunity(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValid(body.salesRep) || !validator.isValid(body.contactId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        Opportunity.findOne({ _id: body.opportunityId }, function (err, companyInfo) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                if (companyInfo) {
                    var opportunityData = {
                        companyId: req.body.companyId,
                        contactId: req.body.contactId,
                        title: req.body.title,
                        estCloseDate: req.body.estCloseDate,
                        actCloseDate: req.body.actCloseDate,
                        value: req.body.value,
                        categoryId: req.body.categoryId,
                        departmentId: req.body.departmentId,
                        salesRep: req.body.salesRep,
                        probabilityId: req.body.probabilityId,
                        priorityId: req.body.priorityId,
                        description: req.body.description,
                        contract: req.body.contract,
                        modifiedBy: req.body.modifiedBy,
                        tags: req.body.tags,
                        estStartDate: req.body.estStartDate,
                        sourceDetails: req.body.sourceDetails,
                        actStartDate: req.body.actStartDate
                    };
                    if (req.body.stageId) {
                        opportunityData.stageId = req.body.stageId;
                    }
                    if (req.body.source) {
                        opportunityData.source = req.body.source;
                    }
                    if (req.body.endUser) {
                        opportunityData.endUser = req.body.endUser;
                    }
                    if (!req.body.individualId) {
                        opportunityData.individualId = new mongoose.mongo.ObjectID();
                    }
                    if (req.body.individualId) {
                        opportunityData.individualId = req.body.individualId;
                    }
                    if (req.body.industryId !== "0" && validator.isValidObject(req.body.industryId)) {
                        opportunityData.industryId = req.body.industryId;
                    }
                    if (req.body.industryId === "0") {
                        opportunityData.industryId = null;
                    }
                    var query = { '_id': req.body.opportunityId };
                    Opportunity.findOneAndUpdate(query, opportunityData, function (err, contactInfo) {
                        if (err) {
                            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                        } else {
                            res.json({ code: Constant.SUCCESS_CODE, message: Constant.OPPORTUNITY_UPDATE_SUCCESS });
                        }
                    });
                }
                else {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.DATA_NOT_FOUND + " " + " for this opportunityId" });
                }
            }
        });
    }
}

/**
 * Function is to get list of opportunity
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */

function getOpportunitiesByCompany(req, res) {
    console.log("INSIDE getOpportunitiesByCompany", req.body)
    var body = req.body;    
    var companyId = body.companyId;
    var opportunityObj = {};

    if (!validator.isValidObject(body.companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING });
    }
    else {
        if (body.searchText) {
            condition = { companyId: companyId, $or: [{ 'opportunityNumber': { "$regex": body.searchText, "$options": "i" } }, { 'title': { "$regex": body.searchText, "$options": "i" } }], deleted: false };//searching query for items
            offset = (req.body.page - 1) * req.body.per_page;
        } else {
            condition = { companyId: companyId, deleted: false };//query for itemListing
            offset = (req.body.page - 1) * req.body.per_page;
        }
        var sortCreatedAt = { createdAt: -1 };
        var sort = {};
        var sortValue = req.body.sortColumnName;
        var sortType = req.body.sortOrder === 'asc' ? 1 : -1;
        sort[sortValue] = sortType;
        var sorting = req.body.sortColumnName ? sort : sortCreatedAt;
        var limit = req.body.per_page ? req.body.per_page : 0;

        Opportunity.count(condition, function (err, totalCount) {
            console.log("TOTALCOUNT", totalCount)
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                console.log("CONDITION", condition)
                Opportunity.find(condition)
                    .sort(sorting)
                    .skip(offset)
                    .limit(limit)
                    .populate('companyId', 'company')
                    .populate('categoryId', '_id categoryName')
                    .populate('departmentId', '_id departmentName')
                    .populate('contactId', '_id firstname lastname')
                    .populate('salesRep', '_id firstname lastname')
                    .populate('endUser', '_id companyName')
                    .populate('individualId', '_id firstname lastname')
                    .populate('stageId', '_id stageName')
                    .exec(function (err, opportunityData) {
                        console.log(err,"opportunityData", opportunityData)
                        if (err) {
                            
                            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                        }
                        else {
                            var currentpage = req.body.page;
                            var totalRecord = totalCount;
                            var totalPage = (totalRecord / req.body.per_page) + ((totalRecord % req.body.per_page) > 0 ? 1 : 0);

                            opportunityObj.opportunity = opportunityData;
                            opportunityObj.totalcount = Math.ceil(totalPage);
                            opportunityObj.page = currentpage;
                            opportunityObj.sortOrder = req.body.sortOrder ? req.body.sortOrder : 'desc';
                            opportunityObj.sortColumnName = sortValue;

                            res.json({ code: Constant.SUCCESS_CODE, message: Constant.OPPORTUNITY_LIST_FETCHED, data: opportunityObj });


                        }
                    });

            }
        });

    }
}




/**
 * Function to update opportunity no dynamically
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 19-June-2017
 */

function opportunityNo(req, res) {
    Opportunity.count().exec(function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        }
        else {
            res.json({ code: Constant.SUCCESS_CODE, opportunityCount: '' + parseInt(result + 1) });
        }
    });
}

/**
 * Function to delete opportunity 
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */

function deleteOpportunity(req, res) {
    var opportunityId = req.body.opportunityId;
    Opportunity.findOneAndUpdate({ _id: opportunityId, deleted: false }, { $set: { deleted: true } }, function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        }
        else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.OPPORTUNITY_DELETE_SUCCESS });
        }
    });
}

/**
 * Function to get opportunity data (by _id) to update 
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 19-June-2017
 */

function getOpportunitiesData(req, res) {
    if (!validator.isValidObject(req.body.opportunityId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        var opportunityId = req.body.opportunityId;
        var condition = {};
        condition._id = mongoose.Types.ObjectId(opportunityId);
        condition.deleted = false;
        var aggregate = [
            {
                $lookup:
                {
                    from: "companycontacts", //Main table name
                    localField: "salesRep", //Main table key name  
                    foreignField: "_id", //reference table key name which i want to join
                    as: "SalesRepInfo"//Alies name which used further for data
                }
            },
            { $unwind: "$SalesRepInfo" },
            {
                $lookup:
                {
                    from: "stages", //Main table name
                    localField: "stageId", //Main table key name  
                    foreignField: "_id", //reference table key name which i want to join
                    as: "StageInfo"//Alies name which used further for data
                }
            },
            { $unwind: { path: "$SourceInfo", preserveNullAndEmptyArrays: true } },
            {
                $lookup:
                {
                    from: "contactphones",
                    localField: "individualId",
                    foreignField: "contactId",
                    as: "ContactPhoneInfo"
                }
            },
            {
                $lookup:
                {
                    from: "contactinternets",
                    localField: "individualId",
                    foreignField: "contactId",
                    as: "ContactInternetInfo"
                }
            },
            {
                $lookup:
                {
                    from: "companycontacts",
                    localField: "individualId",
                    foreignField: "_id",
                    as: "ContactIndividualInfo"
                }
            },
            { $unwind: { path: "$ContactIndividualInfo", preserveNullAndEmptyArrays: true } },
            {
                $lookup:
                {
                    from: "companycontacts",
                    localField: "contactId",
                    foreignField: "_id",
                    as: "CompanyInfo"
                }
            },
            { $unwind: "$CompanyInfo" },
            {
                $lookup:
                {
                    from: "contactindustries",
                    localField: "industryId",
                    foreignField: "_id",
                    as: "opportuniteInfo"
                }
            },
            { $unwind: { path: "$opportuniteInfo", preserveNullAndEmptyArrays: true } },
            {
                $lookup:
                {
                    from: "companycontacts",
                    localField: "endUser",
                    foreignField: "_id",
                    as: "endUserInfo"
                }
            },
            { $unwind: { path: "$endUserInfo", preserveNullAndEmptyArrays: true } },
            {
                $lookup:
                {
                    from: "companycontacts",
                    localField: "endUser",
                    foreignField: "_id",
                    as: "endUserInfo"
                }
            },
            { $unwind: { path: "$endUserInfo", preserveNullAndEmptyArrays: true } },
            { $match: condition }
        ];
        var project = {
            $project: {
                _id: 1,
                title: 1,
                stageId: 1,
                probabilityId: 1,
                priorityId: 1,
                description: 1,
                weightedValue: 1,
                daysOpen: 1,
                actCloseDate: 1,
                actStartDate: 1,
                estCloseDate: 1,
                estStartDate: 1,
                createdAt: 1,
                updatedAt: 1,
                value: 1,
                createdBy: 1,
                modifiedBy: 1,
                sourceDetails: 1,
                tags: 1,
                contract: 1,
                opportunityNumber: 1,
                memo: 1,
                source: '$SourceInfo',
                stageInfo: '$StageInfo',
                industryId: '$opportuniteInfo',
                endUser: '$endUserInfo',
                categoryId: "$CategoryInfo._id",
                categoryName: "$CategoryInfo.categoryName",
                departmentId: "$DepartmentInfo._id",
                departmentName: "$DepartmentInfo.departmentName",
                SalesRepId: "$SalesRepInfo",
                individualUserId: "$ContactIndividualInfo",
                companyContactId: "$CompanyInfo._id",
                CompanyName: "$CompanyInfo.companyName",
                ContactPhoneInfo: {
                    $filter: {
                        input: "$ContactPhoneInfo",
                        as: "items",
                        cond: { $eq: ["$$items.isPrimary", true] }
                    }
                },
                ContactInternetInfo: {
                    $filter: {
                        input: "$ContactInternetInfo",
                        as: "items",
                        cond: { $eq: ["$$items.isPrimary", true] }
                    }
                }
            }
        };
        aggregate.push(project);
        Opportunity.aggregate(aggregate).then(function (data) {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.OPPORTUNITY_LIST_FETCHED, data: data[0] });
        }).catch(function (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        });
    }
}


/**
 * Function to Contact Opportunities 
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */

function getContactOpportunities(req, res) {
    Opportunity.find({ companyId: req.body.companyId, individualId: req.body.contactId, deleted: false })
        .populate('companyId', 'company')
        .populate('categoryId', '_id categoryName')
        .populate('departmentId', '_id departmentName')
        .populate('contactId', '_id firstname lastname')
        .populate('salesRep', '_id firstname lastname')
        .populate('endUser', '_id firstname lastname')
        .populate('individualId', '_id firstname lastname')
        .exec(function (err, OpportunityList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.OPPORTUNITY_LIST_FETCHED, data: OpportunityList });
            }
        });
}

/**
 * Function to Opportunities estimates 
 * @access private
 * @return json 
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 29-June-2017
 */
function getOpportunitiesEstimates(req, res) {
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.opportunityId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        Estimate.find({ companyId: req.body.companyId, opportunityId: req.body.opportunityId, deleted: false })
            .populate('salesRep', '_id firstname lastname')
            .exec(function (err, estimation) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATELIST_FETCH_SUCCESS, data: estimation });

                }
            });
    }
}
/* Function is use to add memos 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Oct-2017
 */

function addMemoOpportunity(req, res) {
    var memodata = {
        userName: req.body.userName,
        message: req.body.message
    };
    Opportunity.findOneAndUpdate({ _id: req.body.opportunityId, deleted: false }, { $push: { memo: memodata } }, function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.MEMO_ADDED, data: result });
        }
    });
}

// /* Function is use to add opportunityTag 
//  * @access private
//  * @return json
//  * Created by hemant khandait
//  * @smartData Enterprises (I) Ltd
//  * Created Date 19-Dec-2017
//  */

function addOpportunityTag(req, res) {
    async.each(req.body.nameValue, function (product, callbackPhone) {
        OpportunityTag.findOne({ "name": { "$regex": product, "$options": "i" }, deleted: false }, function (err, tagInfo) {
            if (err) {
                callbackPhone(err);
            }
            else {
                if (!tagInfo) {
                    var tagValue = {
                        name: product,
                    };
                    OpportunityTag(tagValue).save(function (err, data) {
                        if (err) {
                            callbackPhone(err);
                        } else {
                            callbackPhone();
                        }
                    });
                }
                else {
                    callbackPhone();
                }

            }


        });
    }, function (err) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE });
        }

    });
}

/* Function is use to get opportunityTag 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 20-Dec-2017
 */

function getOpportunityTag(req, res) {

    OpportunityTag.find({ deleted: false }, { name: 1 }, function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, data: result });
        }
    });
}