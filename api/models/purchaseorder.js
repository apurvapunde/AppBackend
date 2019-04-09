/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** purchaseorder Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },

    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    statusId: {
        type: Number   // 1 for open 2 for close 3 for inprocess
    },
    // New  field
    vendor: { type: String },
    vendorAddress1: { type: String },
    vendorAddress2: { type: String },
    vendorState: { type: String },
    vendorCity: { type: String },
    vendorZip: { type: String },
    shippingAddress1: { type: String },
    shippingAddress2: { type: String },
    shippingState: { type: String },
    shippingCity: { type: String },
    shippingZip: { type: String },

    // End of newly created field

    attachmentUrl: { type: String },
    uponReceipt: { type: String },
    material: { type: Number },
    equipment: { type: Number },
    subtotal: { type: Number },
    tax: { type: Number },
    taxable: { type: Boolean },
    total: { type: Number },
    approvalStatusId: { type: Number },// 1 for approved 2 for rejected 3 for pending 4 for inprocess
    createdDate: { type: String },
    approvedDate: { type: String },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    approvedBy: {
        type: String
    },
    poNumber: { type: String },
    title: { type: String },
    shipDate: { type: String },
    shipVia: { type: String },
    trackingNumber: { type: String },
    attachment: { type: String },
    attachmentDescription: { type: String },
    notes: { type: String },
    modifiedBy: { type: String },
    laborCost: { type: Number },
    materialCost: { type: Number },
    equipmentCost: { type: Number },
    otherCost: { type: Number },
    createdBy: { type: String },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('PurchaseOrder', DBschema);












