/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** documents Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'

    },
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity'

    },
    estimateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estimate'
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'

    },
    poId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrder'
    },
    description: { type: String },
    documentType: { type: String }, //1 for Word ,2 for Excel ,3 for PowerPoint ,4 for PDF,5 for Email,6 for Other
    documentCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DocumentCategory'
    },

    documentUrl: { type: String },
    referenceNumber: { type: String },
    version: { type: String },
    location: { type: String },
    fileName: { type: String },
    author: { type: String },
    pages: { type: Number },
    keyword: { type: String },
    documentTitle: { type: String },
    document: { type: String },
    createdBy: { type: String },
    modifiedBy: { type: String },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Document', DBschema);
