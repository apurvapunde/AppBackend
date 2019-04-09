"use strict";
var mongoose = require('mongoose'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    Config = require('../../config/config.js'),
    companyContact = mongoose.model('CompanyContact'),
    companyUser = mongoose.model('CompanyUser'),
    Opportunity = mongoose.model('Opportunity'),
    EmailTemplate = mongoose.model('EmailTemplate'),
    category = mongoose.model('CompanyCategory'),
    Item = mongoose.model('Item'),
    contactIndustry = mongoose.model('ContactIndustry'),
    ProjectTask = mongoose.model('ProjectTask'),
    contactStatus = mongoose.model('ContactStatus'),
    laborRate = mongoose.model('LaborRate'),
    proposal = mongoose.model('Proposal'),
    Estimate = mongoose.model('Estimate'),
    EstimateItem = mongoose.model('EstimatesItem'),
    attachmentFile = mongoose.model('AttachmentFile');

var query;
var path = require('path');
var im = require('imagemagick');
var easyimg = require('easyimage');
var fs_extra = require('fs-extra');
var model;

module.exports = {
    addCategory: addCategory,
    getCategoryList: getCategoryList,
    getCompanyListByAlphabet: getCompanyListByAlphabet,
    getItemListByAlphabet: getItemListByAlphabet,
    getOpportunityListByAlphabet: getOpportunityListByAlphabet,
    getCompanyPhoneInternet: getCompanyPhoneInternet,
    SalesRep: SalesRep,
    getIndividual: getIndividual,
    getEmailTemplate: getEmailTemplate,
    getEmailTemplatelist: getEmailTemplatelist,
    getEstimateByAlphabet: getEstimateByAlphabet,
    getProjecttaskByAlphabet: getProjecttaskByAlphabet,
    getIndustryList: getIndustryList,
    getlaborRate: getlaborRate,
    addlaborRate: addlaborRate,
    countForCompany: countForCompany,
    geProposalList: geProposalList,
    updatePic: updatePic,
    getEstimateById: getEstimateById,
    getEstimateSalesCompanyByAlphabet: getEstimateSalesCompanyByAlphabet
};

/**
 * Function is use to Add category
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function addCategory(req, res) {

    var body = req.body;
    if (!validator.isValid(body.categoryName) || !validator.isValidObject(body.companyId) || !validator.isValidObject(body.userId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        category.findOne({ categoryName: { $regex: new RegExp('^' + body.categoryName + '$', "i") }, deleted: false, companyId: body.companyId }, function (err, categoryData) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            }
            else {
                if (categoryData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_CATEGORY_EXIST
                    });
                }
                else {
                    var categoryDataTosave = {
                        categoryName: req.body.categoryName,
                        companyId: req.body.companyId,
                        userId: req.body.userId
                    };
                    category(categoryDataTosave).save(function (err, data) {
                        if (err) {
                            res.json({ code: Constant.ERROR_CODE, message: err });
                        } else {
                            res.json({ code: Constant.SUCCESS_CODE, data: data });
                        }
                    });
                }
            }
        });
    }
}

/**
 * Function is use to get categorylist
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function getCategoryList(req, res) {

    if (!validator.isValid(req.body.companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    }
    else {
        category.find({ companyId: req.body.companyId })
            .sort({ categoryName: 1 })
            .exec(function (err, categoryList) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.CATEGORY_LIST_FETCHED, data: categoryList });

                }
            });
    }
}
/**
 * Function is use to get industry
 * @access private
 * @return json
 * Created by hemant
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function getIndustryList(req, res) {
    contactIndustry.find({ companyId: req.body.companyId, moduleType: req.body.moduleType, "deleted": false }, function (err, industryInfo) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            if (req.body.statusName) {
                query = { companyId: req.body.companyId, statusName: req.body.statusName };
            }
            else {
                query = { companyId: req.body.companyId };
            }
            contactStatus.findOne(query, function (err, doc) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, data: industryInfo, statusNameId: doc._id });
                }
            });
        }
    });
}
/**
 * Function is use to get companylist by alphabet key
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function getCompanyListByAlphabet(req, res) {

    var companyId = req.body.companyId;
    var companyName = req.body.companyName;
    if (!validator.isValidObject(companyId) || !validator.isValid(companyName)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {

        companyContact.find({ companyId: companyId, userType: 1, "companyName": { "$regex": companyName, "$options": "i" }, deleted: false }, { _id: 1, firstname: 1, lastname: 1, companyName: 1 }, function (err, doc) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.COMPANY_LISTCONTACT_FETCHED, data: doc });
            }
        }).sort({ _id: 1 }).limit(10);
    }
}

/**
 * Function is use to get companylist by alphabet key
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function getItemListByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var item = req.body.itemName;
    var string = item.replace(/  +/g, ' ');
    string = string.replace(/(^\s*)|(\s*$)/gi, "");
    string = string.replace(/[ ]{2,}/gi, " ");
    string = string.replace(/\n /, "\n");

    var searchItem = string.replace(/ /g, '|');
    if (!validator.isValidObject(companyId) || !validator.isValid(item)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        Item.aggregate([
            { $match: { companyId: mongoose.Types.ObjectId(req.body.companyId), $and: [{ 'itemName': { "$regex": searchItem, "$options": "si" } }, { 'modal': { "$regex": searchItem, "$options": "si" } }], deleted: false } },
            {
                $lookup: {
                    from: "suppliers",
                    localField: "_id",
                    foreignField: "itemId",
                    as: "suppliersInfo"
                }
            },
            { $limit: 25 }
        ]).then(function (data) {
            res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.ITEM_LIST_FETCHED, data: data });
        }).catch(function (err) {
            console.log(111, err)
            res.json({ code: Constant.ERROR_CODE, message: err });
        });
    }
}

/**
 * Function is use to get phone and internet details according to company name
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function getCompanyPhoneInternet(req, res) {
    var contactId = req.body.contactId;
    companyContact.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(contactId) } },
        {
            $lookup:
            {
                from: "contactphones",
                localField: "_id",
                foreignField: "contactId",
                as: "PhoneInfo"
            }
        },
        {
            $lookup:
            {
                from: "contactinternets",
                localField: "_id",
                foreignField: "contactId",
                as: "InternetInfo"
            }
        },
        {
            $lookup:
            {
                from: "contactaddresses",
                localField: "_id",
                foreignField: "contactId",
                as: "AddressInfo"
            }
        },
        {
            $project: {
                ContactPhoneInfo: {
                    $filter: {
                        input: "$PhoneInfo",
                        as: "items",
                        cond: { $eq: ["$$items.isPrimary", true] }
                    }
                },
                ContactInternetInfo: {
                    $filter: {
                        input: "$InternetInfo",
                        as: "items",
                        cond: { $eq: ["$$items.isPrimary", true] }
                    }
                },
                ContactAddressesInfo: {
                    $filter: {
                        input: "$AddressInfo",
                        as: "items",
                        cond: { $eq: ["$$items.isPrimary", true] }
                    }
                }
            }
        }
    ]).then(function (data) {
        res.json({ code: Constant.SUCCESS_CODE, data: data });
    }).catch(function (err) {
        res.json({ code: Constant.ERROR_CODE, message: err });
    });
}

/**
 * Function is use to get sales rep data
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function SalesRep(req, res) {
    {
        var companyId = req.body.companyId;
        var firstname = req.body.firstname;
        if (!validator.isValidObject(companyId)) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
        } else {
            if (firstname) {
                query = { companyId: companyId, isSalesRep: true, "firstname": { "$regex": firstname, "$options": "i" }, deleted: false };
            }
            else {
                query = { companyId: companyId, isSalesRep: true, deleted: false };
            }
            companyContact.find(query, { firstname: true, lastname: true }, function (err, doc) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {

                    if (doc) {
                        res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.SALESREP_DATA, data: doc });
                    } else {
                        res.json({ code: Constant.NOT_FOUND_ERROR_CODE, 'message': Constant.RECORD_NOT_FOUND });
                    }
                }
            });
        }
    }
}
/**
 * Function is use to get individual data
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-June-2017
 */
function getIndividual(req, res) {
    var companyId = req.body.companyId;
    var firstname = req.body.firstname;
    if (!validator.isValidObject(companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        if (companyId && req.body.contactId) {
            query = { companyId: companyId, userType: 2, companyContactId: req.body.contactId, "firstname": { "$regex": firstname, "$options": "i" }, deleted: false };
        }
        else {
            query = { companyId: companyId, userType: 2, deleted: false };
        }
        companyContact.find(query, { firstname: true, lastname: true, title: true }, function (err, doc) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.INDIVIDUAL_DATA, data: doc });

            }
        });
    }
}


/**
 * Function is use to get oppertunitylist by alphabet key
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 26-June-2017
 */
function getOpportunityListByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var title = req.body.title;

    if (!validator.isValidObject(companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        if (req.body.contactARR) {
            query = { companyId: companyId, 'contactId': { $in: req.body.contactArr }, "title": { "$regex": title, "$options": "i" }, deleted: false };
        }
        else {
            query = { companyId: companyId, deleted: false };
        }
        Opportunity.find(query, { title: true, contactId: true, individualId: true, "opportunityNumber": 1 }, function (err, doc) {
            if (err) {
                console.log(err)
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.OPPERTUNITY_FETCHED, data: doc });

            }
        }).sort({ _id: 1 }).populate('individualId', 'firstname lastname');
    }
}

/**
 * Function is use get email template  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function getEmailTemplate(req, res) {

    EmailTemplate.findOne({ code: req.body.code }, function (err, data) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        }
        else {
            res.json({ code: Constant.SUCCESS_CODE, data: data });
        }
    });
}
/**
 * Function is use get email template  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function getEmailTemplatelist(req, res) {

    EmailTemplate.find({ subject: req.body.subject }, function (err, data) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        }
        else {
            res.json({ code: Constant.SUCCESS_CODE, data: data });
        }
    });
}

/**
 * Function is use to get Estimate data
 * @access private
 * @return json
 * Created by Hemant
 * @smartData Enterprises (I) Ltd
 * Created Date 29-June-2017
 */
function getEstimateByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var estimateNumber = req.body.estimateNumber;
    if (!validator.isValidObject(companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {

        if (req.body.opportunityId) {
            query = { companyId: mongoose.Types.ObjectId(companyId), opportunityId: mongoose.Types.ObjectId(req.body.opportunityId), "estimateNumber": { "$regex": estimateNumber, "$options": "i" }, deleted: false };
        }
        else if (estimateNumber) {
            query = { companyId: mongoose.Types.ObjectId(companyId), "estimateNumber": { "$regex": estimateNumber, "$options": "i" }, deleted: false };
        }
        else {
            query = { companyId: mongoose.Types.ObjectId(companyId), deleted: false };

        }
        Estimate.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: "estimatesitems",
                    localField: "_id",
                    foreignField: "estimateId",
                    as: "estimateItemInfo"
                }

            },
            {
                $lookup: {
                    from: "companycontacts",
                    localField: "salesRep",
                    foreignField: "_id",
                    as: "salesRepInfo"
                }

            },
            {
                $lookup: {
                    from: "companycontacts",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "companyInfo"
                }

            },
            {
                $project: {
                    estimateNumber: 1,
                    estimateName: 1,
                    companyId: 1,
                    companyName: '$companyInfo.companyName',
                    estimateTotal: '$estimateItemInfo',
                    salesRepFirst: '$salesRepInfo.firstname',
                    salesRepLast: '$salesRepInfo.lastname',
                }
            }
        ]).then(function (data) {
            res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.ESTIMATELIST_FETCH_SUCCESS, data: data });
        }).catch(function (err) {
            console.log(err, 999999)
            res.json({ code: Constant.ERROR_CODE, message: err });
        });
    }
}
/* Function is use to get Project task by alphabet
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13-July-2017
 */

function getProjecttaskByAlphabet(req, res) {
    if (!validator.isValid(req.body.itemName)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        ProjectTask.find({ projectId: req.body.projectId, "itemName": { "$regex": req.body.itemName, "$options": "i" }, deleted: false }, { itemName: true })
            .exec(function (err, projecttasklist) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_TASK_LIST, data: projecttasklist });
                }
            });
    }
}
/* Function is use to get getlabor 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13-Sep-2017
 */

function getlaborRate(req, res) {
    if (!validator.isValid(req.body.companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        laborRate.find({ companyId: req.body.companyId, deleted: false }, { laborType: true, displayName: true, rate: true })
            .exec(function (err, laborRatelist) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, data: laborRatelist });
                }

            });
    }
}
/* Function is use to add labor Rate
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 19-Sep-2017
 */

function addlaborRate(req, res) {
    if (!validator.isValid(req.body.companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        laborRate.findOne({ laborType: { $regex: new RegExp('^' + req.body.laborType + '$', "i") }, deleted: false, companyId: req.body.companyId }, function (err, typeData) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            }
            else {
                if (typeData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.laborType_EXIST
                    });
                }
                else {
                    var laborRateData = {
                        laborType: req.body.laborType,
                        companyId: req.body.companyId,
                        displayName: req.body.displayName,
                        rate: req.body.rate
                    };
                    laborRate(laborRateData).save(function (err, data) {
                        if (err) {
                            res.json({ code: Constant.ERROR_CODE, message: err });
                        } else {
                            res.json({ code: Constant.SUCCESS_CODE, data: data });
                        }
                    });
                }
            }
        });
    }
}
/* Function is use to get count of a company 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 1-Sep-2017
 */

function countForCompany(req, res) {
    if (!validator.isValid(req.body.contactId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        companyContact.count({ companyContactId: req.body.contactId, deleted: false }, function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, data: data });
            }
        });
    }
}

/**
 * Function is use to get proposal list
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */
function geProposalList(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING });
    }
    else {
        // main code execution
        proposal.
            find({ companyId: body.companyId, deleted: false }, { proposalNumber: true })
            .sort({ createdAt: -1 }).
            exec(function (err, proposal) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROPOSAL_LIST_FETCH, data: proposal });
                }
            });
    }
}

/**
 * Function is use to update  pic
 * @access private/
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 17th-June-2017
 */
function updatePic(req, res) {
    var folderPath;
    switch (req.swagger.params.modelName.value) {
        case "item":
            model = Item;
            folderPath = "item/";
            break;
        case "contact":
            model = companyContact;
            folderPath = "contact/";
            break;
        case "user":
            model = companyUser;
            folderPath = "user/";
            break;
    }
    var userId = req.swagger.params.id.value;
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var filename = +timestamp + '_' + file.originalname;
    var thumbFileName = filename + '_thumb.jpg';
    var imagePath = "./images/" + folderPath + timestamp + '_' + file.originalname;
    fs_extra.writeFile(path.resolve(imagePath), file.buffer, function (err) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            im.resize({ srcPath: imagePath, dstPath: "images/" + folderPath + thumbFileName, width: 200, height: 180 }, function (err, stdout, stderr) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Resized to 640x480');
                }
            });

            var userImage = {
                userImage: Config.webUrl + "/images/" + folderPath + thumbFileName
            };
            model.update({ _id: userId }, { $set: userImage }, function (err) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                } else {
                    fs_extra.unlink(imagePath, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ code: Constant.SUCCESS_CODE, message: Constant.UPDATE_PROFILE_PIC_SUCCESS, userImage: Config.webUrl + "/images/" + folderPath + thumbFileName });
                        }
                    });
                }
            });
        }
    });
}

/**
 * Function is use to get Estimate data
 * @access private
 * @return json
 * Created by Hemant
 * @smartData Enterprises (I) Ltd
 * Created Date 29-June-2017
 */
function getEstimateById(req, res) {

    if (!validator.isValidObject(req.body.estimateId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        var query = { companyId: mongoose.Types.ObjectId(req.body.companyId), _id: mongoose.Types.ObjectId(req.body.estimateId), deleted: false };

        Estimate.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: "estimatesitems",
                    localField: "_id",
                    foreignField: "estimateId",
                    as: "estimateItemInfo"
                }
            },
            {
                $lookup: {
                    from: "companycontacts",
                    localField: "salesRep",
                    foreignField: "_id",
                    as: "salesRepInfo"
                }
            },
            {
                $lookup: {
                    from: "companycontacts",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "companyInfo"
                }
            },
            {
                $project: {
                    estimateNumber: 1,
                    estimateName: 1,
                    companyId: 1,
                    companyName: '$companyInfo.companyName',
                    estimateTotal: '$estimateItemInfo',
                    salesRepFirst: '$salesRepInfo.firstname',
                    salesRepLast: '$salesRepInfo.lastname',
                    estimateId: 1
                }
            }
        ]).then(function (data) {
            res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.ESTIMATEDATA_FETCH_SUCCESS, data: data[0] });
        }).catch(function (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        });
    }
}

function getEstimateSalesCompanyByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var searchText = req.body.searchText;
    var contactSearchArray = [];
    if (!validator.isValidObject(companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {

        if (req.body.searchText) {
            query = {
                '$or': [
                    { companyName: { '$regex': searchText, '$options': 'i' } },
                    { firstname: { '$regex': searchText, '$options': 'i' } },
                    { lastname: { '$regex': searchText, '$options': 'i' } }
                ], deleted: false
            }
        }
        else {
            query = { companyId: mongoose.Types.ObjectId(companyId), deleted: false };
        }
        companyContact.find(query, function(err, data) {

            if (err) {
                console.log('err ---> ', err)
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {

                if (data) {
                    data.forEach(element => contactSearchArray.push(element._id));

                    let query = {
                        '$or': [
                            { customerId : { $in : contactSearchArray } },
                            { salesRep : { $in : contactSearchArray } },
                            { estimateName :  { '$regex': 'test', '$options': 'i' } },
                            { estimateNumber :  { '$regex': 'test', '$options': 'i' } }
                        ], deleted: false
                    }

                    if (data) {
                        Estimate.aggregate([
                            { $match: query },
                            {
                                $lookup: {
                                    from: "estimatesitems",
                                    localField: "_id",
                                    foreignField: "estimateId",
                                    as: "estimateItemInfo"
                                }
                            },
                            {
                                $lookup: {
                                    from: "companycontacts",
                                    localField: "salesRep",
                                    foreignField: "_id",
                                    as: "salesRepInfo"
                                }

                            },
                            {
                                $lookup: {
                                    from: "companycontacts",
                                    localField: "customerId",
                                    foreignField: "_id",
                                    as: "companyInfo"
                                }

                            },
                            {
                                $project: {
                                    estimateNumber: 1,
                                    estimateName: 1,
                                    companyId: 1,
                                    companyName: '$companyInfo.companyName',
                                    estimateTotal: '$estimateItemInfo',
                                    salesRepFirst: '$salesRepInfo.firstname',
                                    salesRepLast: '$salesRepInfo.lastname',
                                }
                            }
                        ]).then(function (data) {
                            res.json({ code: Constant.SUCCESS_CODE, 'message': Constant.ESTIMATELIST_FETCH_SUCCESS, data: data });
                        }).catch(function (err) {
                            console.log(err, 999999)
                            res.json({ code: Constant.ERROR_CODE, message: err });
                        });
                    }
                } else {
                    res.json({ code: Constant.NOT_FOUND_ERROR_CODE, 'message': Constant.RECORD_NOT_FOUND });
                }
            }
        })
    }
}