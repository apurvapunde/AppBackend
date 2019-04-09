"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        ContactDocument = mongoose.model('Document'),
        DocumentCategory = mongoose.model('DocumentCategory'),
        path = require('path'),
        fs = require('fs-extra'),
        CompanyContact = mongoose.model('CompanyContact'),
        Project = mongoose.model('Project'),
        Estimate = mongoose.model('Estimate'),
        Order = mongoose.model('Order'),
        PurcahseOrder = mongoose.model('PurchaseOrder'),
        query;

module.exports = {
    getContactDocument: getContactDocument,
    addDocument: addDocument,
    addDocumentCategory: addDocumentCategory,
    updateDocument: updateDocument,
    deleteDocument: deleteDocument,
    addDocumentFile: addDocumentFile,
    getIndividualDocument: getIndividualDocument,
    getDocumentCategory: getDocumentCategory,
    getProjectListByAlphabet: getProjectListByAlphabet,
    getEstimateListByAlphabet: getEstimateListByAlphabet,
    getOrderListByAlphabet: getOrderListByAlphabet,
    getPoListByAlphabet: getPoListByAlphabet,
    getClientListByAlphabet: getClientListByAlphabet
};

/**
 * Function is use to get project by alphabet key
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 30-June-2017
 */
function getProjectListByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var title = req.body.title;

    if (!validator.isValidObject(companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        if (companyId && req.body.contactId) {
            query = {companyId: companyId, customerId: req.body.contactId, "title": {"$regex": title, "$options": "i"}, deleted: false};
        }
        else if (req.body.contactArr) {
            query = {'individualId': {$in: req.body.contactArr}, companyId: companyId, "title": {"$regex": title, "$options": "i"}, deleted: false};
        }

        else {
            query = {companyId: companyId, deleted: false};
        }
        Project.find(query, {_id: 1, title: 1}, function (err, doc) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.PROJECT_LIST, data: doc});

            }
        });
    }
}

/**
 * Function is use to get estimate by alphabet key
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 30-June-2017
 */
function getEstimateListByAlphabet(req, res) {

    var companyId = req.body.companyId;
    var title = req.body.title;

    if (!validator.isValidObject(companyId) || !validator.isValid(title)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {

        Estimate.find({companyId: companyId, "title": {"$regex": title, "$options": "i"}, deleted: false}, {_id: 1, title: 1}, function (err, doc) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.ESTIMATELIST_FETCH_SUCCESS, data: doc});

            }
        });
    }
}

/**
 * Function is use to get order by alphabet key
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 30-June-2017
 */
function getOrderListByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var title = req.body.title;

    if (!validator.isValidObject(companyId) || !validator.isValid(title)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {

        Order.find({companyId: companyId, "title": {"$regex": title, "$options": "i"}, deleted: false}, {_id: 1, title: 1}, function (err, doc) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.ORDER_LIST, data: doc});

            }
        });
    }
}

/**
 * Function is use to get purchase order by alphabet key
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 30-June-2017
 */
function getPoListByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var title = req.body.title;

    if (!validator.isValidObject(companyId) || !validator.isValid(title)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {

        PurcahseOrder.find({companyId: companyId, "title": {"$regex": title, "$options": "i"}, deleted: false}, {_id: 1, title: 1}, function (err, doc) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.ORDER_LIST, data: doc});

            }
        });
    }
}

/**
 * Function is use to get client list by alphabet key
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 30-June-2017
 */
function getClientListByAlphabet(req, res) {
    var companyId = req.body.companyId;
    var name = req.body.name;

    if (!validator.isValidObject(companyId) || !validator.isValid(name)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {

        CompanyContact.find({companyId: companyId, "name": {"$regex": name, "$options": "i"}, deleted: false}, {_id: 1, name: 1}, function (err, doc) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.COMPANY_LISTCONTACT_FETCHED, data: doc});

            }
        });
    }
}

/**
 * Function is use to get contact document
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */
function getContactDocument(req, res) {

    var body = req.body;
    var companyId = body.companyId;
    var contactId = body.contactId;

    if (!validator.isValidObject(companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
    }
    else {
        if (contactId) {

            if (!validator.isValidObject(contactId)) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_CONTACT_ID});
            }
            else {
                query = {contactId: contactId, companyId: companyId, deleted: false};
            }
        }
        else {
            query = {companyId: companyId, deleted: false};
        }
        // main code execution
        ContactDocument.find(query, {documentType: 1, documentTitle: 1, description: 1, fileName: 1, pages: 1}).
                exec(function (err, document) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    }
                    else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.DOCUMENT_LIST, data: document});

                    }
                });
    }
}

/**
 * Function is use to get contact document by id
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */
function getIndividualDocument(req, res) {

    var body = req.body;
    var documentId = body.documentId;

    if (!validator.isValidObject(documentId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }
    else {
        query = {_id: documentId, deleted: false};

        ContactDocument.
                findOne(query).
                populate('companyId', '_id company').
                populate('clientId', '_id companyName firstname lastname').
                populate('projectId', 'title').
                populate('individualId', '_id firstname lastname').
                populate('opportunityId', '_id title').
                populate('estimateId', '_id title estimateNumber').
                populate('orderId', '_id title orderNumber').
                populate('poId', '_id title poNumber').
                populate('documentCategoryId', '_id categoryName').
                exec(function (err, document) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    }
                    else {
                        if (document) {
                            res.json({code: Constant.SUCCESS_CODE, data: document});
                        } else {
                            res.json({code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.DATA_NOT_FOUND});
                        }
                    }
                });
    }
}

/* Function is use to add document
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function addDocument(req, res) {

    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValidObject(body.clientId) || !validator.isValidObject(body.opportunityId) || !validator.isValidObject(body.estimateId) || !validator.isValidObject(body.projectId)) {

        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        CompanyContact.findOne({companyId: body.companyId}, function (err, companyInfo) {

            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                if (companyInfo) {

                    var docsData = {
                        companyId: body.companyId,
                        description: body.description,
                        createdBy: body.createdBy
                    };
                    if (req.body.contactId) {
                        docsData.contactId = req.body.contactId;
                    }
                    if (req.body.clientId) {
                        docsData.clientId = req.body.clientId;
                    }
                    if (req.body.projectId) {
                        docsData.projectId = req.body.projectId;
                    }
                    if (req.body.opportunityId) {
                        docsData.opportunityId = req.body.opportunityId;
                    }
                    if (req.body.estimateId) {
                        docsData.estimateId = req.body.estimateId;
                    }
                    if (req.body.orderId) {
                        docsData.orderId = req.body.orderId;
                    }
                    if (req.body.poId) {
                        docsData.poId = req.body.poId;
                    }
                    if (req.body.documentType) {
                        docsData.documentType = req.body.documentType;
                    }
                    if (req.body.documentCategoryId) {
                        docsData.documentCategoryId = req.body.documentCategoryId;
                    }
                    if (req.body.referenceNumber) {
                        docsData.referenceNumber = req.body.referenceNumber;
                    }
                    if (req.body.version) {
                        docsData.version = req.body.version;
                    }
                    if (req.body.location) {
                        docsData.location = req.body.location;
                    }
                    if (req.body.fileName) {
                        docsData.fileName = req.body.fileName;
                    }
                    if (req.body.author) {
                        docsData.author = req.body.author;
                    }
                    if (req.body.pages) {
                        docsData.pages = req.body.pages;
                    }
                    if (req.body.keyword) {
                        docsData.keyword = req.body.keyword;
                    }
                    if (req.body.documentTitle) {
                        docsData.documentTitle = req.body.documentTitle;
                    }
                    if (req.body.documentTitle) {
                        docsData.documentTitle = req.body.documentTitle;
                    }
                    if (req.body.document) {
                        docsData.document = req.body.document;
                    }
                    if (req.body.documentTitle) {
                        docsData.documentTitle = req.body.documentTitle;
                    }

                    ContactDocument(docsData).save(function (err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, message: Constant.DOCUMENT_ADDED, data: data});
                        }
                    });
                }
                else {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
                }
            }
        });
    }
}

/* Function is use to update document
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function updateDocument(req, res) {

    var body = req.body;
//    if (!validator.isValidObject(body.companyId) || !validator.isValidObject(body.documentId)) {
        if (!validator.isValidObject(body.documentId) || !validator.isValidObject(body.clientId) || !validator.isValidObject(body.opportunityId) || !validator.isValidObject(body.estimateId) || !validator.isValidObject(body.projectId)) {
            res.json({
                code: Constant.ERROR_CODE,
                message: Constant.REQUIRED_FILED_MISSING
            });
        } else {

            CompanyContact.findOne({companyId: body.companyId}, function (err, companyInfo) {

                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {

                    if (companyInfo) {

                        var docsData = {
                            companyId: body.companyId,
                            description: body.description,
                            modifiedBy: body.modifiedBy
                        };
                        if (req.body.contactId) {
                            docsData.contactId = req.body.contactId;
                        }
                        if (req.body.clientId) {
                            docsData.clientId = req.body.clientId;
                        }
                        if (req.body.projectId) {
                            docsData.projectId = req.body.projectId;
                        }
                        if (req.body.opportunityId) {
                            docsData.opportunityId = req.body.opportunityId;
                        }
                        if (req.body.estimateId) {
                            docsData.estimateId = req.body.estimateId;
                        }
                        if (req.body.orderId) {
                            docsData.orderId = req.body.orderId;
                        }
                        if (req.body.poId) {
                            docsData.poId = req.body.poId;
                        }
                        if (req.body.documentType) {
                            docsData.documentType = req.body.documentType;
                        }
                        if (req.body.documentCategoryId) {
                            docsData.documentCategoryId = req.body.documentCategoryId;
                        }
                        if (req.body.referenceNumber) {
                            docsData.referenceNumber = req.body.referenceNumber;
                        }
                        if (req.body.version) {
                            docsData.version = req.body.version;
                        }
                        if (req.body.location) {
                            docsData.location = req.body.location;
                        }
                        if (req.body.fileName) {
                            docsData.fileName = req.body.fileName;
                        }
                        if (req.body.author) {
                            docsData.author = req.body.author;
                        }
                        if (req.body.pages) {
                            docsData.pages = req.body.pages;
                        }
                        if (req.body.keyword) {
                            docsData.keyword = req.body.keyword;
                        }
                        if (req.body.documentTitle) {
                            docsData.documentTitle = req.body.documentTitle;
                        }
                        if (req.body.documentTitle) {
                            docsData.documentTitle = req.body.documentTitle;
                        }
                        if (req.body.document) {
                            docsData.document = req.body.document;
                        }
                        if (req.body.documentTitle) {
                            docsData.documentTitle = req.body.documentTitle;
                        }

                        ContactDocument.findOneAndUpdate({_id: body.documentId}, {$set: docsData}, function (err, data) {
                            if (err) {
                                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                            } else {
                                res.json({code: Constant.SUCCESS_CODE, message: Constant.DOCUMENT_Update, data: data});
                            }
                        });
                    }
                    else {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
                    }
                }
            });
        }
    }
    /* Function is use to delete document
     * @access private
     * @return json
     * Created by hemant
     * @smartData Enterprises (I) Ltd
     * Created Date 17-Aug-2017
     */
    function deleteDocument(req, res) {
        ContactDocument.findOneAndUpdate({_id: req.body.documentId}, {$set: {deleted: true}}, function (err, data) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.DOCUMENT_DELETED});
            }
        });
    }
    /**
     * Function to add/update document files
     * @access private
     * @return json 
     * Created by Santosh
     * @smartData Enterprises (I) Ltd
     * Created Date 29-June-2017
     */
    function addDocumentFile(req, res) {
        var timestamp = Number(new Date()); // current time as number
        var file = req.swagger.params.file.value;
        var documentId = req.swagger.params.id.value;
        var filename = +timestamp + '_' + file.originalname;
        var docPath = "./documentFile/files/" + timestamp + '_' + file.originalname;
        fs.writeFile(path.resolve(docPath), file.buffer, function (err) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                var docFiles = Config.webUrl + "/documentFile/files/" + filename;
                ContactDocument.update({_id: documentId}, {documentUrl: docFiles}, function (err) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    } else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.DOCUMENT_FILE_UPDATED, contactImage: Config.webUrl + "/documentFile/files/" + filename});
                    }
                });
            }
        });
    }

    /**
     * Function is use to get item category
     * @access private
     * @return json 
     * Created by santosh
     * @smartData Enterprises (I) Ltd
     * Created Date 27-June-2017
     */
    function getDocumentCategory(req, res) {
        var body = req.body;
        var companyId = body.companyId;

        if (!validator.isValidObject(body.companyId)) {
            res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
        }
        else {
            DocumentCategory.find({companyId: companyId, deleted: false}, function (err, itemcategory) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                }
                else {
                    res.json({code: Constant.SUCCESS_CODE, data: itemcategory});

                }
            });
        }
    }

    /* Function is use to Add category
     * @access private
     * @return json
     * Created by santosh
     * @smartData Enterprises (I) Ltd
     * Created Date 27-June-2017
     */
    function addDocumentCategory(req, res) {
        var body = req.body;
        if (!validator.isValidObject(body.companyId)
                || !validator.isValid(body.categoryName)) {
            res.json({
                code: Constant.ERROR_CODE,
                message: Constant.REQUIRED_FILED_MISSING
            });
        } else {
            var companyId = req.body.companyId;
            var docscategoryName = req.body.categoryName.trim();

            CompanyContact.findOne({companyId: body.companyId}, function (err, companyInfo) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    if (companyInfo) {

                        DocumentCategory.findOne({companyId: companyId, "categoryName": {"$regex": docscategoryName, "$options": "i"}, deleted: false}, function (err, category) {
                            if (category) {
                                res.json({code: Constant.ERROR_CODE, message: Constant.CONTACT_CATEGORY_EXIST});
                            }
                            else {
                                var docsCategoryData = {
                                    companyId: companyId,
                                    categoryName: docscategoryName
                                };
                                DocumentCategory(docsCategoryData).save(function (err, data) {
                                    if (err) {
                                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                                    } else {
                                        res.json({code: Constant.SUCCESS_CODE, message: Constant.DOCUMENT_CATEGORY_ADDED, data: data});
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
                    }
                }
            });
        }
}

