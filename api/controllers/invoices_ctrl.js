"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        ContactInvoice = mongoose.model('Invoice'),
        InvoiceItem = mongoose.model('InvoiceItem'),
        query;
var async = require('async');
var model;
module.exports = {
    getContactInvoice: getContactInvoice,
    addInvoice: addInvoice,
    updateInvoice: updateInvoice,
    deleteInvoice: deleteInvoice,
    getInvoiceDetails: getInvoiceDetails
};

/**
 * Function is use to get invoice
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */
function getContactInvoice(req, res) {

    var body = req.body;
    var companyId = body.companyId;
    var contactId = body.contactId;

    if (!validator.isValidObject(body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
    }
    else {

        if (contactId) {

            if (!validator.isValidObject(contactId)) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_CONTACT_ID});
            }
            else {
                model = ContactInvoice
                query = {individualId: contactId, companyId: companyId, deleted: false};
            }
        }
        else if (body.itemId) {
            model = InvoiceItem
            query = {itemId: body.itemId, deleted: false};
        }
        else if (body.projectId) {
            model = ContactInvoice
            query = {projectId: body.projectId, deleted: false};
        }
        else {
            model = ContactInvoice
            query = {companyId: companyId, deleted: false};
        }
        // main code execution
        model.
                find(query).
                populate('companyId', '_id company').
                populate('contactId', '_id firstname lastname').
                populate('projectId', 'title').
                populate('individualId', '_id firstname lastname').
                populate('opportunityId').
                populate('estimateId').
                populate('invoiceId').
                populate('salesRep', 'firstname lastname').
                exec(function(err, invoice) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    }
                    else {

                        if (invoice) {
                            res.json({code: Constant.SUCCESS_CODE, message: Constant.INVOICES_LIST_FETCHED, data: invoice});
                        } else {
                            res.json({code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.DATA_NOT_FOUND});
                        }
                    }
                });
    }
}

/**
 * Function is use to add invoice
 * @access private
 * @return json 
 * Created by Santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 31-July-2017
 */
function addInvoice(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValidObject(body.projectId) || !validator.isValidObject(body.contactId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        var invoiceData = {
        };
        if (req.body.createdBy) {
            invoiceData.createdBy = req.body.createdBy;
        }
        if (req.body.billingAddress1) {
            invoiceData.billingAddress1 = req.body.billingAddress1;
            invoiceData.billingAddress2 = req.body.billingAddress2;
            invoiceData.billingCity = req.body.billingCity;
            invoiceData.billingState = req.body.billingState;
        }
        if (req.body.shippingAddress1) {
            invoiceData.shippingAddress1 = req.body.shippingAddress1;
            invoiceData.shippingAddress2 = req.body.shippingAddress2;
            invoiceData.shippingCity = req.body.shippingCity;
            invoiceData.shippingState = req.body.shippingState;
        }
        if (req.body.memo) {
            invoiceData.memo = req.body.memo;
        }
        if (req.body.createdDate) {
            invoiceData.createdDate = req.body.createdDate;
        }
        if (req.body.individualId) {
            invoiceData.individualId = req.body.individualId;
        }
        if (req.body.dueDate) {
            invoiceData.dueDate = req.body.dueDate;
        }
        if (req.body.poNumber) {
            invoiceData.poNumber = req.body.poNumber;
        }

        if (req.body.orderId) {
            invoiceData.orderId = req.body.orderId;
        }
        if (req.body.title) {
            invoiceData.title = req.body.title;
        }
        if (req.body.poId) {
            invoiceData.poId = req.body.poId;
        }
        if (req.body.contactId) {
            invoiceData.contactId = req.body.contactId;
        }
        if (req.body.salesRep) {
            invoiceData.salesRep = req.body.salesRep;
        }
        if (req.body.projectId) {
            invoiceData.projectId = req.body.projectId;
        }
        if (req.body.opportunityId) {
            invoiceData.opportunityId = req.body.opportunityId;
        }
        if (req.body.estimateId) {
            invoiceData.estimateId = req.body.estimateId;
        }
        if (req.body.otherCost) {
            invoiceData.otherCost = req.body.otherCost;
        }
        if (req.body.shippingZip) {
            invoiceData.shippingZip = req.body.shippingZip;
        }
        if (req.body.billingZip) {
            invoiceData.billingZip = req.body.billingZip;
        }
        if (req.body.terms) {
            invoiceData.terms = req.body.terms;
        }
        if (req.body.class) {
            invoiceData.class = req.body.class;
        }
        if (req.body.tax) {
            invoiceData.tax = req.body.tax;
        }
        if (req.body.total) {
            invoiceData.total = req.body.total;
        }
        if (req.body.materialCost) {
            invoiceData.materialCost = req.body.materialCost;
        }
        if (req.body.laborCost) {
            invoiceData.laborCost = req.body.laborCost;
        }
        if (req.body.equipmentCost) {
            invoiceData.equipmentCost = req.body.equipmentCost;
        }
        if (req.body.customerMessage) {
            invoiceData.customerMessage = req.body.customerMessage;
        }
        if (req.body.companyId) {
            invoiceData.companyId = req.body.companyId;
        }


        var InvoiceRecord = new ContactInvoice(invoiceData);

        InvoiceRecord.save(function(err, invoice) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                var invoiceId = invoice._id.toString();
                var InvoiceNo = invoiceId.slice(-7);
                var invoiceNumber = InvoiceNo.toUpperCase();
                ContactInvoice.findOneAndUpdate({_id: invoice._id}, {invoiceNumber: invoiceNumber}, function(err, updatedInvoice) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    }
                    else {
                        async.each(req.body.item, function(invoiceitem, callback) {
                            var invoiceItemData = {
                                itemId: invoiceitem._id,
                                invoiceId: invoice._id,
                                itemType: invoiceitem.itemType,
                                date: invoiceitem.date,
                                itemName: invoiceitem.itemName,
                                description: invoiceitem.description,
                                class: invoiceitem.class,
                                quantity: invoiceitem.quantity,
                                unitPrice: invoiceitem.unitPrice,
                                amount: invoiceitem.amount,
                                isTaxable: invoiceitem.isTaxable,
                                taxRate: invoiceitem.taxRate,
                                total: invoiceitem.total,
                                salesRep: req.body.salesRep,
                                companyId: req.body.companyId,
                            };
                            InvoiceItem(invoiceItemData).save(function(err, data) {
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
                                res.json({code: Constant.SUCCESS_CODE, 'message': Constant.INVOICE_ADD, data: invoice});
                            }
                        });
                    }
                });
            }
        });
    }
}


/**
 * Function is use to update invoice 
 * @access private
 * @return json 
 * Created by Santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 31-July-2017
 */
function updateInvoice(req, res) {

    var invoiceData = {
    };
    if (req.body.modifiedBy) {
        invoiceData.modifiedBy = req.body.modifiedBy;
    }
    if (req.body.billingAddress1) {
        invoiceData.billingAddress1 = req.body.billingAddress1;
        invoiceData.billingAddress2 = req.body.billingAddress2;
        invoiceData.billingCity = req.body.billingCity;
        invoiceData.billingState = req.body.billingState;
    }
    if (req.body.shippingAddress1) {
        invoiceData.shippingAddress1 = req.body.shippingAddress1;
        invoiceData.shippingAddress2 = req.body.shippingAddress2;
        invoiceData.shippingCity = req.body.shippingCity;
        invoiceData.shippingState = req.body.shippingState;
    }
    if (req.body.memo) {
        invoiceData.memo = req.body.memo;
    }
    if (req.body.createdDate) {
        invoiceData.createdDate = req.body.createdDate;
    }
    if (req.body.individualId) {
        invoiceData.individualId = req.body.individualId;
    }
    if (req.body.dueDate) {
        invoiceData.dueDate = req.body.dueDate;
    }
    if (req.body.poNumber) {
        invoiceData.poNumber = req.body.poNumber;
    }

    if (req.body.orderId) {
        invoiceData.orderId = req.body.orderId;
    }
    if (req.body.title) {
        invoiceData.title = req.body.title;
    }
    if (req.body.poId) {
        invoiceData.poId = req.body.poId;
    }
    if (req.body.contactId) {
        invoiceData.contactId = req.body.contactId;
    }
    if (req.body.salesRep) {
        invoiceData.salesRep = req.body.salesRep;
    }
    if (req.body.projectId) {
        invoiceData.projectId = req.body.projectId;
    }
    if (req.body.opportunityId) {
        invoiceData.opportunityId = req.body.opportunityId;
    }
    if (req.body.estimateId) {
        invoiceData.estimateId = req.body.estimateId;
    }
    if (req.body.otherCost) {
        invoiceData.otherCost = req.body.otherCost;
    }
    if (req.body.shippingZip) {
        invoiceData.shippingZip = req.body.shippingZip;
    }
    if (req.body.billingZip) {
        invoiceData.billingZip = req.body.billingZip;
    }
    if (req.body.terms) {
        invoiceData.terms = req.body.terms;
    }
    if (req.body.class) {
        invoiceData.class = req.body.class;
    }
    if (req.body.tax) {
        invoiceData.tax = req.body.tax;
    }
    if (req.body.total) {
        invoiceData.total = req.body.total;
    }
    if (req.body.materialCost) {
        invoiceData.materialCost = req.body.materialCost;
    }
    if (req.body.laborCost) {
        invoiceData.laborCost = req.body.laborCost;
    }
    if (req.body.equipmentCost) {
        invoiceData.equipmentCost = req.body.equipmentCost;
    }
    if (req.body.customerMessage) {
        invoiceData.customerMessage = req.body.customerMessage;
    }



    ContactInvoice.findOneAndUpdate({_id: req.body.invoiceId}, invoiceData, function(err, invoicedetail) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        } else {
            if (req.body.item) {
                InvoiceItem.remove({'invoiceId': req.body.invoiceId}, function(err) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    }
                    else {
                        async.each(req.body.item, function(invoiceitem, callback) {

                            var invoiceItemData = {
                                itemId: invoiceitem._id,
                                invoiceId: invoicedetail._id,
                                date: invoiceitem.date,
                                itemName: invoiceitem.itemName,
                                description: invoiceitem.description,
                                class: invoiceitem.class,
                                quantity: invoiceitem.quantity,
                                unitPrice: invoiceitem.unitPrice,
                                amount: invoiceitem.amount,
                                isTaxable: invoiceitem.isTaxable,
                                taxRate: invoiceitem.taxRate,
                                total: invoiceitem.total
                            };
                            InvoiceItem(invoiceItemData).save(function(err, data) {
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
                                res.json({code: Constant.SUCCESS_CODE, message: Constant.INVOICE_DETAIL_UPDATE, data: invoicedetail});
                            }
                        });
                    }
                });
            }
            else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.INVOICE_DETAIL_UPDATE});
            }
        }
    }
    );
}
/**
 * Function is use to delete invoice
 * @access private
 * @return json 
 * Created by Santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 31-July-2017
 */
function deleteInvoice(req, res) {

    if (!validator.isValidObject(req.body.invoiceId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }

    else {

        ContactInvoice.findOneAndUpdate({_id: req.body.invoiceId}, {deleted: true}, function(err, invoicedetail) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            } else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.INVOICE_DELETED_SUCCESS, data: invoicedetail});
            }
        });
    }
}


function getInvoiceDetails(req, res) {

    if (!validator.isValidObject(req.body.invoiceId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }

    else {

        var invoiceData = {};
        ContactInvoice.findOne({_id: req.body.invoiceId}, {deleted: false}, function(err, invoicedetail) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            } else {

                InvoiceItem.find({invoiceId: req.body.invoiceId}, {deleted: false}, function(err, invoiceitem) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    } else {

                        invoiceData.InvoiceDetails = invoicedetail;
                        invoiceData.InvoiceItemDetails = invoiceitem;
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.INVOICE_DETAILS, data: invoiceData});
                    }
                });
            }
        }).populate('salesRep', 'firstname lastname')
                .populate('individualId', 'firstname lastname')
                .populate('projectId', 'title')
                .populate('contactId', 'companyName')
                .populate('opportunityId', 'title')
                .populate('estimateId', 'estimateNumber');
    }
}



