"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        PurchaseOrder = mongoose.model('PurchaseOrder'),
        PurchaseOrderAttachment = mongoose.model('PoAttachment'),
        PoItem = mongoose.model('PoItem'),
        ObjectId = require('mongoose').Types.ObjectId;
var async = require('async');
var path = require('path');
var fs = require('fs-extra');
var field;
var query;
var offset;
module.exports = {
    addPurchaseOrder: addPurchaseOrder,
    addAttachmentFile: addAttachmentFile,
    updatePurchaseOrder: updatePurchaseOrder,
    getPODetail: getPODetail,
    deletePO: deletePO,
    getPOlist: getPOlist,
    deletePOAttach: deletePOAttach,
    getpurchaseOrderNo: getpurchaseOrderNo,
};

/**
 * Function is use to add purchase order
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 18-July-2017
 */
function addPurchaseOrder(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValidObject(body.customerId) || !validator.isValidObject(body.contactId) || !validator.isValidObject(body.requestedBy)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }
    else {

        var PurchaseOrderData = {
            companyId: req.body.companyId,
            customerId: req.body.customerId,
            contactId: req.body.contactId,
            vendor: req.body.vendor,
            vendorAddress1: req.body.vendorAddress1,
            vendorAddress2: req.body.vendorAddress2,
            vendorState: req.body.vendorState,
            vendorCity: req.body.vendorCity,
            vendorZip: req.body.vendorZip,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            shippingState: req.body.shippingState,
            shippingCity: req.body.shippingCity,
            shippingZip: req.body.shippingZip,
            requestedBy: req.body.requestedBy,
            shipVia: req.body.shipVia,
            statusId: req.body.statusId,
            uponReceipt: req.body.uponReceipt,
            title: req.body.title,
            shipDate: req.body.shipDate,
            notes: req.body.notes,
            trackingNumber: req.body.trackingNumber,
            materialTotal: req.body.materialTotal,
            laborTotal: req.body.laborTotal,
            shippingTotal: req.body.shippingTotal,
            mOurCostTotal: req.body.mOurCostTotal,
            mOurCostExtTotal: req.body.mOurCostExtTotal,
            lHoursExtended: req.body.lHoursExtended,
            lExtendedTotal: req.body.lExtendedTotal,
            lHoursTotal: req.body.lHoursTotal,
            lRateTotal: req.body.lRateTotal,
            estimateTotal: req.body.estimateTotal,
            createdBy: req.body.createdBy,
            poNumber: req.body.poNumber

        };
        if (req.body.projectId) {
            PurchaseOrderData.projectId = req.body.projectId
        }

        var PurchaseOrderRecord = new PurchaseOrder(PurchaseOrderData);

        PurchaseOrderRecord.save(function(err, purchaseorderdata) {
            if (err) {

                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {

                async.each(req.body.item, function(item, callback) {

                    var estimateItemData = {
                        itemId: item.itemId,
                        poId: purchaseorderdata._id,
                        itemTypeId: item.itemTypeId,
                        header: item.header,
                        headerName: item.headerName,
                        itemName: item.itemName,
                        itemMfg: item.itemMfg,
                        partNo: item.partNo,
                        quantity: item.quantity,
                        mOurCost: item.mOurCost,
                        modelNo: item.modelNo,
                        materialCost: item.materialCost,
                        laborCost: item.laborCost,
                        mOurCostExtended: item.mOurCostExtended,
                        lHours: item.lHours,
                        lExtended: item.lExtended,
                        lHoursExtended: item.lHoursExtended,
                        lRate: item.lRate,
                        rowTotal: item.rowTotal,
                        unit: item.unit
                    };

                    PoItem(estimateItemData).save(function(err, data) {
                        if (err) {
                            callback(err);
                        } else {
                            callback();
                        }
                    });

                }, function(err) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    } else {
                        res.json({code: Constant.SUCCESS_CODE, 'message': Constant.PURCHASE_ORDER_ADD, data: purchaseorderdata});
                    }
                });

            }
        });
    }
}
function addAttachmentFile(req, res) {
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var poId = req.swagger.params.id.value;
    var filename = +timestamp + '_' + file.originalname;
    var docPath = "./documentFile/poAttachment/" + timestamp + '_' + file.originalname;
    fs.writeFile(path.resolve(docPath), file.buffer, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            var docFiles = Config.webUrl + "/documentFile/poAttachment/" + filename;
            PurchaseOrderAttachment({poId: poId, attachmentUrl: docFiles, description: req.body.description}).save(function(err, data) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    res.json({code: Constant.SUCCESS_CODE, message: Constant.DOCUMENT_FILE_UPDATED, attachment: Config.webUrl + "/documentFile/poAttachment/" + filename, data: data});
                }
            });
        }
    });
}
/**
 * Function is use to update purchase order
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 18-July-2017
 */
function updatePurchaseOrder(req, res) {
    var body = req.body;

    if (body.item) {
        PoItem.remove({'poId': req.body.poId}, function(err) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                async.each(req.body.item, function(item, callback) {
                    var estimateItemData = {
                        poId: req.body.poId,
                        itemId: item.itemId,
                        itemTypeId: item.itemTypeId,
                        header: item.header,
                        headerName: item.headerName,
                        itemName: item.itemName,
                        itemMfg: item.itemMfg,
                        partNo: item.partNo,
                        quantity: item.quantity,
                        mOurCost: item.mOurCost,
                        modelNo: item.modelNo,
                        materialCost: item.materialCost,
                        laborCost: item.laborCost,
                        mOurCostExtended: item.mOurCostExtended,
                        lHours: item.lHours,
                        lExtended: item.lExtended,
                        lHoursExtended: item.lHoursExtended,
                        lRate: item.lRate,
                        rowTotal: item.rowTotal,
                        shipVia: item.shipVia,
                        unit: item.unit
                    };
                    PoItem(estimateItemData).save(function(err, data) {
                        if (err) {
                            callback(err);
                        } else {
                            callback();
                        }
                    });

                }, function(err) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    } else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.PURCHASE_ORDER_UPDATE});
                    }
                });
            }
        });

    }
    else if (!validator.isValidObject(body.companyId) || !validator.isValidObject(body.customerId) || !validator.isValidObject(body.contactId) || !validator.isValidObject(body.requestedBy)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }
    else {

        var PurchaseOrderData = {
            customerId: req.body.customerId,
            contactId: req.body.contactId,
            vendor: req.body.vendor,
            vendorAddress1: req.body.vendorAddress1,
            vendorAddress2: req.body.vendorAddress2,
            vendorState: req.body.vendorState,
            vendorCity: req.body.vendorCity,
            vendorZip: req.body.vendorZip,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            shippingState: req.body.shippingState,
            shippingCity: req.body.shippingCity,
            shippingZip: req.body.shippingZip,
            requestedBy: req.body.requestedBy,
            shipVia: req.body.shipVia,
            statusId: req.body.statusId,
            createdDate: req.body.createdDate,
            uponReceipt: req.body.uponReceipt,
            title: req.body.title,
            shipDate: req.body.shipDate,
            notes: req.body.notes,
            trackingNumber: req.body.trackingNumber,
            modifiedBy: req.body.modifiedBy
        };
        if (req.body.projectId) {
            PurchaseOrderData.projectId = req.body.projectId;
        }
        if (req.body.projectId === "") {
            PurchaseOrderData.projectId = null;
        }
        PurchaseOrder.findOneAndUpdate({_id: req.body.poId}, PurchaseOrderData, function(err, PurchaseOrderdetail) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            } else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.PURCHASE_ORDER_UPDATE, data: PurchaseOrderdetail});

            }
        });
    }

}
/* Function is use to get po detail
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 18-July-2017
 */

function getPODetail(req, res) {

    if (!validator.isValidObject(req.body.poId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }
    else {
        var ValidPoId = ObjectId.isValid(req.body.poId);
        if (ValidPoId === true) {

            var PORecord = {};
            PurchaseOrder.findOne({_id: req.body.poId})
                    .populate('contactId', '_id firstname lastname')
                    .populate('companyId', '_id company')
                    .populate('customerId', '_id companyName')
                    .populate('requestedBy', '_id firstname lastname')
                    .populate('projectId', '_id projectNumber title')
                    .exec(function(err, PoDetail) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            PORecord.PoDetails = PoDetail;
                            PoItem.find({poId: req.body.poId}, function(err, itemlist) {
                                if (err) {
                                    res.json({code: Constant.ERROR_CODE, message: err});
                                }
                                else {
                                    PurchaseOrderAttachment.find({poId: req.body.poId, deleted: false}, function(err, attachmentlist) {
                                        if (err) {
                                            res.json({code: Constant.ERROR_CODE, message: err});
                                        }
                                        else {
                                            PORecord.itemLists = itemlist;
                                            PORecord.attachmentlists = attachmentlist;
                                            res.json({code: Constant.SUCCESS_CODE, message: Constant.PURCHASE_ORDER_DETAIL, data: PORecord});
                                        }
                                    });
                                }
                            }).sort({_id: 1});
                        }
                    });
        }
        else {
            res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_ID});
        }
    }
}

/* Function is use to delete puchaseorder
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 18-July-2017
 */

function deletePO(req, res) {

    if (!validator.isValidObject(req.body.poId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }
    else {

        var ValidPoId = ObjectId.isValid(req.body.poId);

        if (ValidPoId === true) {
            PurchaseOrder.findOneAndUpdate({_id: req.body.poId}, {deleted: true}, function(err, estimatedetail) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: err});
                } else {
                    res.json({code: Constant.SUCCESS_CODE, message: Constant.PO_DELETED_SUCCESS, data: estimatedetail});
                }
            });
        }
        else {
            res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_ID});
        }
    }
}
/* Function is use to delete puchaseorder attach
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 18-July-2017
 */

function deletePOAttach(req, res) {

    if (!validator.isValidObject(req.body.attachmentId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }
    else {

        var ValidattachmentId = ObjectId.isValid(req.body.attachmentId);

        if (ValidattachmentId === true) {
            PurchaseOrderAttachment.findOneAndUpdate({_id: req.body.attachmentId}, {deleted: true}, function(err, estimatedetail) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: err});
                } else {
                    res.json({code: Constant.SUCCESS_CODE, message: Constant.PO_ATTACH_DELETED_SUCCESS, data: estimatedetail});
                }
            });
        }
        else {
            res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_ID});
        }
    }
}

/* Function is use to get  puchaseorder list
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 18-July-2017
 */
function getPOlist(req, res) {
    console.log("INSIDE getPOlist")
    var body = req.body;

    if (req.body.poNumber) {
        if (!validator.isValid(body.poNumber)) {
            res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});

        }
        else {
            query = {poNumber: {"$regex": body.poNumber, "$options": "i"}, deleted: false, companyId: body.companyId};

        }

    }
    else if (req.body.contactId) {
        query = {contactId: req.body.contactId, deleted: false};
    }
    else if (req.body.projectId) {
        query = {projectId: req.body.projectId, deleted: false};
    }
    else {
        query = {companyId: req.body.companyId, deleted: false};

        field = {poNumber: 1, statusId: 1, createdAt: 1, vendor: 1, shipDate: 1, shipVia: 1};
    }
    if (!validator.isValidObject(body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
    }
    else {
        // main code execution
        PurchaseOrder.find(query, field)
                .sort({createdAt: -1})
                .exec(function(err, POList) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    }
                    else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.PO_LIST, data: POList});

                    }
                });

    }
}



/**
 * Function to get purchaseOrder no 
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 19-June-2017
 */

function getpurchaseOrderNo(req, res) {
    PurchaseOrder.count({companyId: req.body.companyId}).exec(function(err, result) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        }
        else {
            res.json({code: Constant.SUCCESS_CODE, poNumber: 'PO-' + parseInt(100000 + result + 1)});
        }
    });
}
