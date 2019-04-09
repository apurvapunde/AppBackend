/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** invoices Schema*/
var DBschema = new mongoose.Schema({

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    individualId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity'
    },
    orderId: {
        type: String
    },
    estimateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estimate'
    },

    poNumber: {
        type: String
    },

    title: { type: String },
    createdDate: { type: String },
    dueDate: { type: String },

    invoiceNumber: { type: String },

    terms: { type: Number },
    class: { type: Number },
    salesRep: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    customerMessage: { type: Number },
    memo: { type: String },
    toBePrinted: { type: Boolean },
    toBeEmailed: { type: Boolean },
    taxable: { type: Boolean },
    subtotal: { type: Number },
    tax: { type: Number },
    total: { type: Number },
    paymentsApplied: { type: Number },
    balanceDue: { type: Number },
    stageId: { type: Number },
    taxRate: { type: Number },
    laborCost: { type: Number },
    equipmentCost: { type: Number },
    materialCost: { type: Number },
    createdBy: { type: String },
    modifiedBy: { type: String },
    billingAddress1: { type: String },
    billingAddress2: { type: String },
    billingCity: { type: String },
    billingState: { type: String },
    billingZip: { type: Number },
    shippingAddress1: { type: String },
    shippingAddress2: { type: String },
    shippingCity: { type: String },
    shippingState: { type: String },
    shippingZip: { type: Number },
    otherCost: { type: Number },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Invoice', DBschema);


