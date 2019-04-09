"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Company = mongoose.model('Company'),
    TaskActivity = mongoose.model('TaskActivity'),
    Opportunity = mongoose.model('Opportunity'),
    Estimate = mongoose.model('Estimate'),
    Project = mongoose.model('Project'),
    Order = mongoose.model('Order'),
    Invoice = mongoose.model('Invoice'),
    Goal = mongoose.model('Goal'),
    Tailgate = mongoose.model('Tailgate'),
    Common = require('../../config/common.js'),
    Config = require('../../config/config.js'),
    Constant = require('../../config/constant.js');

var async = require("async");
var nodemailer = require('nodemailer');
var moment = require("moment");
var mg = require('nodemailer-mailgun-transport');


module.exports = {
    getTasksList: getTasksList,
    getFilterTasksList: getFilterTasksList,
    getOpportunitiesList: getOpportunitiesList,
    getFilterOpportunitiesList: getFilterOpportunitiesList,
    getEstimatesList: getEstimatesList,
    getFilterEstimatesList: getFilterEstimatesList,
    getProjectsList: getProjectsList,
    getFilterProjectsList: getFilterProjectsList,
    getOrdersList: getOrdersList,
    getFilterOrdersList: getFilterOrdersList,
    getInvoicesList: getInvoicesList,
    getFilterInvoicesList: getFilterInvoicesList,
    getGoalsList: getGoalsList,
    getTailgatesList: getTailgatesList
};


/**
 * Function is use to get tasks list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 12th-June-2017
 */
function getTasksList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    TaskActivity.find({ companyId: req.body.companyId, deleted: false })
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('assignedTo')
        .populate('categoryId', 'categoryName')
        .exec(function (err, taskList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.TASKS_LIST_FETCHED, data: taskList });
            }
        });
}

/**
 * Function is use to get tasks list by filterType
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 12th-June-2017
 */
function getFilterTasksList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    var query;
    if (req.body.filterType == 'date') {
        var startDate = moment(req.body.startDate).startOf('day');
        var endDate = moment(req.body.endDate).endOf('day');
        query = { "startDate": { "$gte": startDate, "$lte": endDate }, companyId: req.body.companyId, deleted: false };
    } else if (req.body.filterType == 'priority') {
        query = { companyId: req.body.companyId, 'priority': req.body.priorityId, deleted: false };
    } else if (req.body.filterType == 'status') {
        if (req.body.status != 0) {
            query = { companyId: req.body.companyId, 'status': req.body.status, deleted: false };
        } else {
            query = { companyId: req.body.companyId, deleted: false };
        }
    } else if (req.body.filterType == 'users') {
        query = { companyId: req.body.companyId, 'assignedTo': { $in: req.body.assignedTo }, deleted: false };
    } else {
        query = { companyId: req.body.companyId, deleted: false };
    }
    TaskActivity.find(query)
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('assignedTo')
        .populate('categoryId', 'categoryName')
        .exec(function (err, taskList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.TASKS_LIST_FETCHED, data: taskList });
            }
        });
}

/**
 * Function is use to get opportunities list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 12th-June-2017
 */
function getOpportunitiesList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    Opportunity.find({ companyId: req.body.companyId, deleted: false })
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('companyId')
        .populate('categoryId')
        .populate('departmentId')
        .populate('salesRep')
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
 * Function is use to get opportunities list by filterType
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 12th-June-2017
 */
function getFilterOpportunitiesList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    var query;
    if (req.body.filterType == 'date') {
        var startDate = moment(req.body.startDate).startOf('day');
        var endDate = moment(req.body.endDate).endOf('day');
        query = { "createdAt": { "$gte": startDate, "$lte": endDate }, companyId: req.body.companyId, deleted: false };
    } else if (req.body.filterType == 'stage') {
        query = { companyId: req.body.companyId, 'stageId': { $in: req.body.stageId }, deleted: false };
    } else if (req.body.filterType == 'category') {
        query = { companyId: req.body.companyId, 'categoryId': { $in: req.body.categoryId }, deleted: false };
    } else if (req.body.filterType == 'salesRep') {
        query = { companyId: req.body.companyId, 'salesRep': { $in: req.body.salesRep }, deleted: false };
    } else {
        query = { companyId: req.body.companyId, deleted: false };
    }
    Opportunity.find(query)
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('companyId')
        .populate('categoryId')
        .populate('departmentId')
        .populate('salesRep', 'firstname lastname')
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
 * Function is use to get estimates list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 12th-June-2017
 */
function getEstimatesList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;

    Estimate.find({ companyId: req.body.companyId, deleted: false })
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('customerId', '_id companyName')
        .populate('salesRep', '_id firstname lastname')
        .exec(function (err, estimatesList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATES_LIST_FETCHED, data: estimatesList });


            }
        });
}

/**
 * Function is use to get estimates list by filterType
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 12th-June-2017
 */
function getFilterEstimatesList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    var query;
    if (req.body.filterType == 'date') {
        var startDate = moment(req.body.startDate).startOf('day');
        var endDate = moment(req.body.endDate).endOf('day')
        query = { "createdAt": { "$gte": startDate, "$lte": endDate }, companyId: req.body.companyId, deleted: false };
    } else if (req.body.filterType == 'stage') {
        query = { companyId: req.body.companyId, 'stage': req.body.stage, deleted: false };
    } else if (req.body.filterType == 'value') {
        query = { companyId: req.body.companyId, 'totalEstimate': { "$gte": req.body.min, "$lte": req.body.max }, deleted: false };
    } else if (req.body.filterType == 'salesRep') {
        query = { companyId: req.body.companyId, 'salesRep': { $in: req.body.salesRep }, deleted: false };
    } else {
        query = { companyId: req.body.companyId, deleted: false };
    }
    Estimate.find(query)
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('customer ', '_id firstname lastname')
        .populate('salesRep', 'firstname lastname')
        .exec(function (err, estimatesList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.ESTIMATES_LIST_FETCHED, data: estimatesList });
            }
        });
}

/**
 * Function is use to get projects list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 13th-June-2017
 */
function getProjectsList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    Project.find({ companyId: req.body.companyId, deleted: false })
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('companyId')
        .populate('categoryId', '_id categoryName')
        .exec(function (err, projectsList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECTS_LIST_FETCHED, data: projectsList });


            }
        });
}

/**
 * Function is use to get projects list by filterType
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 13th-June-2017
 */
function getFilterProjectsList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    var query;
    if (req.body.filterType == 'date') {

        var startDate = moment(req.body.startDate).startOf('day');
        var endDate = moment(req.body.endDate).endOf('day')
        query = { "startDate": { "$gte": startDate, "$lte": endDate }, companyId: req.body.companyId, deleted: false };
    } else if (req.body.filterType == 'stage') {
        query = { companyId: req.body.companyId, 'stageId': req.body.stageId, deleted: false };
    } else if (req.body.filterType == 'category') {
        query = { companyId: req.body.companyId, 'categoryId': { $in: req.body.categoryId }, deleted: false };
    } else {
        query = { companyId: req.body.companyId, deleted: false };
    }
    Project.find(query)
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('companyId')
        .exec(function (err, projectsList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECTS_LIST_FETCHED, data: projectsList });
            }
        });
}

/**
 * Function is use to get orders list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 13th-June-2017
 */
function getOrdersList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    Order.find({ companyId: req.body.companyId, deleted: false })
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('companyId')
        .populate('customerId', '_id companyName')
        .populate('salesRep', 'firstname lastname')
        .exec(function (err, ordersList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.ORDERS_LIST_FETCHED, data: ordersList });

            }
        });
}

/**
 * Function is use to get orders list by filterType
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 13th-June-2017
 */
function getFilterOrdersList(req, res) {
    var serviceOrderObj = {};
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    var query;
    if (req.body.filterType == 'date') {
        var startDate = moment(req.body.startDate).startOf('day');
        var endDate = moment(req.body.endDate).endOf('day')
        query = { "createdAt": { "$gte": startDate, "$lte": endDate }, companyId: req.body.companyId, deleted: false };
    } else if (req.body.filterType == 'stage') {
        query = { companyId: req.body.companyId, 'stageId': req.body.stageId, deleted: false };
    } else if (req.body.filterType == 'value') {
        query = { companyId: req.body.companyId, 'total': { "$gte": req.body.min, "$lte": req.body.max }, deleted: false };
    } else if (req.body.filterType == 'salesRep') {
        query = { companyId: req.body.companyId, 'salesRep': { $in: req.body.salesRep }, deleted: false };
    } else if (req.body.filterType == 'status') {
        query = { companyId: req.body.companyId, 'statusId': req.body.statusId, deleted: false };
    }
    else {
        query = { companyId: req.body.companyId, deleted: false };
    }
    Order.count(query, function (err, totalCount) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        }
        else {
            Order.find(query)
                .sort({ createdAt: -1 }).skip(offset).limit(limit)
                .populate('companyId')
                .populate('salesRep', 'firstname lastname')
                .populate('customerId', 'companyName')
                .populate('orderId')
                .populate('orderTypeId', 'orderTypeName')
                .populate('contractId', 'orderContractName')
                .exec(function (err, ordersList) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                    }
                    else {
                        var totalRecord = totalCount;
                        var totalPage = (totalRecord / req.body.per_page) + ((totalRecord % req.body.per_page) > 0 ? 1 : 0);
                        serviceOrderObj.page = req.body.page;
                        serviceOrderObj.per_page = req.body.per_page;
                        serviceOrderObj.totalcount = Math.ceil(totalPage);
                        serviceOrderObj.serviceOrderList = ordersList;
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.ORDERS_LIST_FETCHED, data: serviceOrderObj });
                    }
                });
        }
    });

}


/**
 * Function is use to get invoices list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 14th-June-2017
 */

function getInvoicesList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    Invoice.find({ companyId: req.body.companyId, deleted: false })
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('contactId', '_id companyName')
        .populate('salesRep', 'firstname lastname')
        .exec(function (err, invoiceList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.INVOICES_LIST_FETCHED, data: invoiceList });


            }
        });
}

/**
 * Function is use to get invoices list by filterType
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 14th-June-2017
 */
function getFilterInvoicesList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    var query;
    if (req.body.filterType == 'date') {
        var startDate = moment(req.body.startDate).startOf('day');
        var endDate = moment(req.body.endDate).endOf('day')
        query = { "createdAt": { "$gte": startDate, "$lte": endDate }, companyId: req.body.companyId, deleted: false };
    } else if (req.body.filterType == 'stage') {
        query = { companyId: req.body.companyId, 'stageId': req.body.stageId, deleted: false };
    } else if (req.body.filterType == 'value') {
        query = { companyId: req.body.companyId, 'total': { "$gte": req.body.min, "$lte": req.body.max }, deleted: false };
    } else if (req.body.filterType == 'salesRep') {
        query = { companyId: req.body.companyId, 'salesRep': { $in: req.body.salesRep }, deleted: false };
    } else {
        query = { companyId: req.body.companyId, deleted: false };
    }
    Invoice.find(query)
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('contactId', 'companyName')
        .populate('salesRep', 'firstname lastname')
        .exec(function (err, invoiceList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.INVOICES_LIST_FETCHED, data: invoiceList });
            }
        });
}

/**
 * Function is use to get goals list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 05th-June-2017
 */
function getGoalsList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    Goal.find({ companyId: req.body.companyId, deleted: false })
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .populate('companyId')
        .populate('contactId')
        .exec(function (err, goalsList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.GOALS_LIST_FETCHED, data: goalsList });


            }
        });
}

/**
 * Function is use to get tailgates list
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 05th-June-2017
 */
function getTailgatesList(req, res) {
    var limit = req.query.per_page ? req.query.per_page : 0;
    var offset = (req.query.page - 1) * req.query.per_page;
    Tailgate.find({ companyId: req.body.companyId, deleted: false })
        .sort({ createdAt: -1 }).skip(offset).limit(limit)
        .exec(function (err, tailgatesList) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.TAILGATES_LIST_FETCHED, data: tailgatesList });

            }
        });
}
