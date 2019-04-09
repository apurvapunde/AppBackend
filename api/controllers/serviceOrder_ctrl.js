"use strict";
var mongoose = require('mongoose'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    serviceOrder = mongoose.model('Order'),
    OrderItems = mongoose.model('OrderItems'),
    contract = mongoose.model('OrderContract'),
    orderType = mongoose.model('orderType');
var async = require('async');
var field;
var query;
module.exports = {
    addServiceOrder: addServiceOrder,
    updateServiceOrder: updateServiceOrder,
    getServiceDetail: getServiceDetail,
    deleteServiceOrder: deleteServiceOrder,
    getServiceOrderlist: getServiceOrderlist,
    getServiceOrderListData: getServiceOrderListData,
    addMemoServiceOrder: addMemoServiceOrder,
    addOrderType: addOrderType,
    getOrderType: getOrderType,
    getOrderNo: getOrderNo
};

/**
 * Function is use to add Service order
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 24-July-2017
 */
function addServiceOrder(req, res) {

    var body = req.body;
    if (!validator.isValidObject(body.customerId) || !validator.isValidObject(body.billingCompanyId) || !validator.isValidObject(body.orderTypeId) || !validator.isValidObject(body.descriptionWork)) {

        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {

        var ServiceOrderData = {
            companyId: req.body.companyId,
            customerId: req.body.customerId,
            title: req.body.title,
            descriptionWork: req.body.descriptionWork,
            poNumber: req.body.poNumber,
            poId: req.body.poId,
            stageId: req.body.stageId,
            statusId: req.body.statusId,
            salesRep: req.body.salesRep,
            orderTypeId: req.body.orderTypeId,
            technicianSignature: req.body.technicianSignature,
            customerSignature: req.body.customerSignature,
            techSignDate: req.body.techSignDate,
            custSignDate: req.body.custSignDate,
            itemsTotal: req.body.itemsTotal,
            taxExtendedTotal: req.body.taxExtendedTotal,
            materialCostTotal: req.body.materialCostTotal,
            ourCostTotal: req.body.ourCostTotal,
            mOurCostExtTotal: req.body.mOurCostExtTotal,
            materialExtendedTotal: req.body.materialExtendedTotal,
            taxTotal: req.body.taxTotal,
            hoursExtendedTotal: req.body.hoursExtendedTotal,
            laborExtendedTotal: req.body.laborExtendedTotal,
            rateTotal: req.body.rateTotal,
            shippingTotal: req.body.shippingTotal,
            markupTotal: req.body.markupTotal,
            materialCost: req.body.materialCost,
            laborCost: req.body.laborCost,
            taxRate: req.body.taxRate,
            markUp: req.body.markUp,
            markupPercent: req.body.markupPercent,
            grandTotal: req.body.grandTotal,
            createdBy: req.body.createdBy,
            billingCompanyId: req.body.billingCompanyId,
            scheduledDate: req.body.scheduledDate,
            estimatedDuration: req.body.estimatedDuration,
            serviceLocation: req.body.serviceLocation
        };
        if (req.body.userIds) {
            ServiceOrderData.userIds = req.body.userIds;
        }
        if (req.body.projectId) {
            ServiceOrderData.projectId = req.body.projectId
        }
        if (req.body.estimateId) {
            ServiceOrderData.estimateId = req.body.estimateId
        }
        if (req.body.contractId) {
            ServiceOrderData.contractId = req.body.contractId
        }
        var serviceOrderRecord = new serviceOrder(ServiceOrderData);

        serviceOrderRecord.save(function (err, ServiceOrder) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {

                var orderNumber = req.body.orderNumber;
                serviceOrder.findByIdAndUpdate(ServiceOrder._id, { orderNumber: orderNumber }, function (err, orderdata1) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    }
                    else {
                        if (req.body.item) {
                            async.each(req.body.item, function (item, callback) {

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
        });

    }

}

/**
 * Function is use to update Service order
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 25-July-2017
 */
function updateServiceOrder(req, res) {
    var body = req.body;
    var OrderData;
    var condition;
    if (body.customerId) {
        condition = ((!validator.isValidObject(body.customerId) || !validator.isValidObject(body.billingCompanyId)));
    }
    else if (body.item) {
        condition = (!validator.isValid(body.orderId));

    }
    else {
        condition = (!validator.isValid(body.technicianName) || (!validator.isValidObject(body.opportunityId)));
    }
    if (condition) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });
    } else {
        if (body.customerId) {
            OrderData = {
                title: req.body.title,
                descriptionWork: req.body.descriptionWork,
                poNumber: req.body.poNumber,
                statusId: req.body.statusId,
                orderTypeId: req.body.orderTypeId,
                technicianSignature: req.body.technicianSignature,
                customerSignature: req.body.customerSignature,
                techSignDate: req.body.techSignDate,
                custSignDate: req.body.custSignDate,
                modifiedBy: req.body.modifiedBy,
                scheduledDate: req.body.scheduledDate,
                estimatedDuration: req.body.estimatedDuration,
                billingCompanyId: req.body.billingCompanyId,
                serviceLocation: req.body.serviceLocation
            };
        }
        else {
            OrderData = {
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                technicianName: req.body.technicianName,
                phone: req.body.phone,
                notes: req.body.notes
            };
        }
        if (req.body.itemsTotal) {
            OrderData.itemsTotal = req.body.itemsTotal;
        }
        if (req.body.workPerformed) {
            OrderData.workPerformed = req.body.workPerformed;
        }
        if (req.body.taxExtendedTotal) {
            OrderData.taxExtendedTotal = req.body.taxExtendedTotal;
        }
        if (req.body.materialCostTotal) {
            OrderData.materialCostTotal = req.body.materialCostTotal;
        }
        if (req.body.ourCostTotal) {
            OrderData.ourCostTotal = req.body.ourCostTotal;
        }
        if (req.body.mOurCostExtTotal) {
            OrderData.mOurCostExtTotal = req.body.mOurCostExtTotal;
        }
        if (req.body.materialExtendedTotal) {
            OrderData.materialExtendedTotal = req.body.materialExtendedTotal;
        }
        if (req.body.taxTotal) {
            OrderData.taxTotal = req.body.taxTotal;
        }
        if (req.body.hoursExtendedTotal) {
            OrderData.hoursExtendedTotal = req.body.hoursExtendedTotal;
        }
        if (req.body.laborExtendedTotal) {
            OrderData.laborExtendedTotal = req.body.laborExtendedTotal;
        }
        if (req.body.rateTotal) {
            OrderData.rateTotal = req.body.rateTotal;
        }
        if (req.body.shippingTotal) {
            OrderData.shippingTotal = req.body.shippingTotal;
        }
        if (req.body.markupTotal) {
            OrderData.markupTotal = req.body.markupTotal;
        }
        if (req.body.materialCost) {
            OrderData.materialCost = req.body.materialCost;
        }
        if (req.body.laborCost) {
            OrderData.laborCost = req.body.laborCost;
        }
        if (req.body.markupPercent) {
            OrderData.markupPercent = req.body.markupPercent;
        }
        if (req.body.taxRate) {
            OrderData.taxRate = req.body.taxRate;
        }
        if (req.body.markUp) {
            OrderData.markUp = req.body.markUp;
        }
        if (req.body.customerId) {
            OrderData.customerId = req.body.customerId;
        }
        if (req.body.poId) {
            OrderData.poId = req.body.poId;
        }
        if (req.body.stageId) {
            OrderData.stageId = req.body.stageId;
        }
        if (req.body.total) {
            OrderData.total = req.body.total;
        }
        if (req.body.otherCost) {
            OrderData.otherCost = req.body.otherCost;
        }
        if (req.body.equipmentCost) {
            OrderData.equipmentCost = req.body.equipmentCost;
        }
        if (req.body.laborCost) {
            OrderData.laborCost = req.body.laborCost;
        }
        if (req.body.materialCost) {
            OrderData.materialCost = req.body.materialCost;
        }
        if (req.body.salesRep) {
            OrderData.salesRep = req.body.salesRep;
        }
        if (req.body.otherCost) {
            OrderData.otherCost = req.body.otherCost;
        }
        if (req.body.opportunityId) {
            OrderData.opportunityId = req.body.opportunityId;
        }
        if (req.body.estimateId) {
            OrderData.estimateId = req.body.estimateId;
        }
        if (req.body.userIds) {
            OrderData.userIds = req.body.userIds;
        }
        if (req.body.projectId) {
            OrderData.projectId = req.body.projectId
        }
        if (req.body.contractId) {
            OrderData.contractId = req.body.contractId
        }
        if (req.body.contractId === "") {
            OrderData.contractId = null;
        }

        serviceOrder.findOneAndUpdate({ _id: req.body.orderId }, OrderData, function (err, Orderdetail) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                if (req.body.item) {
                    OrderItems.remove({ 'orderId': req.body.orderId }, function (err) {
                        if (err) {

                            res.json({ code: Constant.ERROR_CODE, message: err });
                        }
                        else {
                            if (req.body.item) {
                                async.each(req.body.item, function (item, callback) {
                                    var ItemData = {
                                        itemId: item._id,
                                        orderId: req.body.orderId,
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
                                        lHours: item.lHours,
                                        lExtended: item.lExtended,
                                        lHoursExtended: item.lHoursExtended,
                                        lRate: item.lRate,
                                        rowTotal: item.rowTotal,
                                        unit: item.unit
                                    };
                                    OrderItems(ItemData).save(function (err, data) {
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
                                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.SERVICE_ORDER_UPDATE, data: Orderdetail });

                                    }

                                });
                            }
                            else {
                                res.json({ code: Constant.SUCCESS_CODE, message: Constant.SERVICE_ORDER_UPDATE, data: Orderdetail });
                            }
                        }
                    });

                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.SERVICE_ORDER_UPDATE, data: Orderdetail });
                }
            }
        });
    }
}

/* Function is use to get Service order detail
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 25-July-2017
 */

function getServiceDetail(req, res) {
    var PORecord = {};
    serviceOrder.findOne({ _id: req.body.orderId })
        .populate('poId')
        .populate('companyId', '_id company')
        .populate('customerId', '_id companyName')
        .populate('requestedBy', '_id firstname lastname')
        .populate('salesRep', '_id firstname lastname')
        .populate('opportunityId', 'title')
        .populate('billingCompanyId', 'companyName')
        .populate('orderTypeId')
        .populate('estimateId', 'estimateNumber')
        .populate('projectId', 'title')
        .populate('contractId', 'orderContractName')
        .exec(function (err, PoDetail) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                PORecord.orderDetails = PoDetail;

                OrderItems.find({ orderId: req.body.orderId }, function (err, itemlist) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    }
                    else {
                        PORecord.itemLists = itemlist;
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.SERVICE_ORDER_DETAIL, data: PORecord });
                    }
                }).sort({ _id: 1 });
            }
        });
}

/* Function is use to delete Service order
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 25-July-2017
 */

function deleteServiceOrder(req, res) {
    serviceOrder.findOneAndUpdate({ _id: req.body.orderId }, { deleted: true }, function (err, estimatedetail) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.SERVICE_DELETED_SUCCESS, data: estimatedetail });
        }
    });
}


/* Function is use to get  Service order list (it is used in Invoices, ItemOptions and Add/Edit Document)
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 25-July-2017
 */
function getServiceOrderlist(req, res) {
    var body = req.body;
    var model;
    var companyId = body.companyId;

    if (req.body.orderNumber) {
        if (!validator.isValid(body.orderNumber)) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING });

        }
        else {
            model = serviceOrder;
            query = { companyId: companyId, "orderNumber": { "$regex": req.body.orderNumber, "$options": "i" }, deleted: false };

        }
    }
    else if (body.itemId) {
        model = OrderItems;
        query = { itemId: req.body.itemId, deleted: false };
    } else if (body.userId) {
        model = serviceOrder;
        query = { 'userIds.userId': body.userId, companyId: companyId, deleted: false };
    }
    else {
        model = serviceOrder;
        field = { orderNumber: 1, salesRep: 1, customerId: 1, createdBy: 1, stageId: 1, createdAt: 1, statusId: 1, orderTypeId: 1, scheduledDate: 1, contractId: 1 };
    }
    if (!validator.isValidObject(body.companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING });
    }
    else {

        // main code execution
        model.find(query, field)
            .sort({ createdAt: -1 })
            .populate('companyId')
            .populate('salesRep', 'firstname lastname')
            .populate('customerId', 'companyName')
            .populate('orderId')
            .populate('orderTypeId', 'orderTypeName')
            .populate('contractId', 'orderContractName')
            .exec(function (err, SOList) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.SO_LIST, data: SOList });

                }
            });
    }
}
/* Function is use to get service order list and server side pagination, sorting and searching
 * @access private
 * @return json
 * Created by ramiz kasid
 * @smartData Enterprises (I) Ltd
 * Created Date 25-July-2017
 */

function getServiceOrderListData(req, res) {
    var model;
    var offset;
    var serviceOrderObj = {};
    var condition;
    var skip;
    var count;
    var body = req.body;
    if ((body.searchText)) {
        count = req.body.per_page ? req.body.per_page : 0;
        skip = (req.body.page - 1) * req.body.per_page;
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
        condition = { companyId: mongoose.Types.ObjectId(body.companyId), $or: [{ 'orderNumber': { "$regex": body.searchText, "$options": "i" } }, { 'createdBy': { "$regex": body.searchText, "$options": "i" } }, { 'orderContractsInfo.orderContractName': { "$regex": body.searchText, "$options": "i" } }, { 'companyContactsInfo.companyName': { "$regex": body.searchText, "$options": "i" } }, { 'orderTypesInfo.orderTypeName': { "$regex": body.searchText, "$options": "i" } }], deleted: false };//searching query for items
    } else {
        condition = { companyId: mongoose.Types.ObjectId(body.companyId), deleted: false }; // listing query
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
                preserveNullAndEmptyArrays: true
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
                from: "ordertypes",
                localField: "orderTypeId",
                foreignField: "_id",
                as: "orderTypesInfo"
            }
        }, {
            $unwind: {
                path: "$orderTypesInfo",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "ordercontracts",
                localField: "contractId",
                foreignField: "_id",
                as: "orderContractsInfo"
            }
        }, {
            $unwind: {
                path: "$orderContractsInfo",
                preserveNullAndEmptyArrays: true
            }
        },
        { $match: condition }, {
            $project: {
                createdAt: 1,
                createdBy: 1,
                scheduledDate: 1,
                orderNumber: 1,
                statusId: 1,
                companyId: '$companiesInfo',
                customerId:
                {
                    '_id': '$companyContactsInfo._id',
                    'companyName': '$companyContactsInfo.companyName',
                },
                orderTypeId:
                {
                    '_id': '$orderTypesInfo._id',
                    'orderTypeName': '$orderTypesInfo.orderTypeName',
                },
                contractId:
                {
                    '_id': '$orderContractsInfo._id',
                    'orderContractName': '$orderContractsInfo.orderContractName',
                },

            }
        }
    ];
    var countQuery = [].concat(aggregateQuery);
    aggregateQuery.push({ $sort: sorting });
    aggregateQuery.push({ $skip: skip ? skip : 0 });
    aggregateQuery.push({ $limit: count });
    serviceOrder.aggregate(aggregateQuery).then(function (result) {
        serviceOrderObj.serviceOrderList = result;
        countQuery.push({ $group: { _id: null, count: { $sum: 1 } } });
        serviceOrder.aggregate(countQuery).then(function (dataCount) {
            var cnt = dataCount[0].count;
            var totalPage = (cnt / req.body.per_page) + ((cnt % req.body.per_page) > 0 ? 1 : 0);
            serviceOrderObj.totalcount = Math.ceil(totalPage);
            serviceOrderObj.page = req.body.page;
            serviceOrderObj.per_page = req.body.per_page;
            serviceOrderObj.searchText = req.body.searchText ? req.body.searchText : "";
            serviceOrderObj.sortOrder = req.body.sortOrder ? req.body.sortOrder : 'desc';
            serviceOrderObj.sortColumnName = sortValue;
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.SO_LIST, data: serviceOrderObj });
        });
    }).catch(function (err) {
        res.json({ code: Constant.ERROR_CODE, message: err });
    });
}


/* Function is use to add memos estimate
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 23-Oct-2017
 */

function addMemoServiceOrder(req, res) {
    var memodata = {
        userName: req.body.userName,
        message: req.body.message
    };
    serviceOrder.findOneAndUpdate({ _id: req.body.serviceOrderId, deleted: false }, { $push: { memo: memodata } }, function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.MEMO_ADDED, data: result });
        }
    });
}

/**
 * Function is use to Add type for order 
 * @access private
 * 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-OCT-2017
 */

function addOrderType(req, res) {
    if (!validator.isValid(req.body.orderTypeName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        orderType.findOne({ orderTypeName: { $regex: new RegExp('^' + req.body.orderTypeName + '$', "i") }, deleted: false, companyId: req.body.companyId }, function (err, orderData) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            }
            else {
                if (orderData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.ORDER_TYPE_ALREADY_EXIST
                    });
                }
                else {
                    var sourceData = {
                        orderTypeName: req.body.orderTypeName,
                        companyId: req.body.companyId

                    };
                    orderType(sourceData).save(function (err, data) {
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

/* Function is use to get Service order
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-OCT-2017
 */

function getOrderType(req, res) {
    orderType.find({ companyId: req.body.companyId, deleted: false }, function (err, orderTypelist) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, data: orderTypelist });
        }
    });
}
/**
 * Function to get order no 
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 19-June-2017
 */

function getOrderNo(req, res) {
    serviceOrder.count({ companyId: req.body.companyId }).exec(function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        }
        else {
            res.json({ code: Constant.SUCCESS_CODE, orderNo: 'SO-' + parseInt(100000 + result + 1) });
        }
    });
}

