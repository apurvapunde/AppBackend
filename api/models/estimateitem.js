/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** estimatesitems Schema*/
var lineItems = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    itemTypeId: {type: Number},
    header: {type: String},
    displayLaborName: {type: String},
    headerName: {type: String},
    itemName: {type: String},
    itemMfg: {type: String},
    partNo: {type: String},
    quantity: {type: Number},
    markUp: {type: Number},
    mTaxable: {type: Boolean},
    mOurCost: {type: Number},
    mMarkup: {type: Number},
    mCost: {type: Number},
    modelNo: {type: String},
    materialCost: {type: Number},
    laborCost: {type: Number},
    mOurCostExtended: {type: Number},
    mExtended: {type: Number},
    mTax: {type: Number},
    mTaxExtended: {type: Number},
    lType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LaborRate'
    },
    laborTypeName: {type: String},
    lHours: {type: Number},
    lExtended: {type: Number},
    lHoursExtended: {type: Number},
    lRate: {type: Number},
    unit: {type: Number},
    rowTotal: {type: Number},
    deleted: {
        type: Boolean,
        default: false
    }
});
var DBschema = new mongoose.Schema({
    revisionName: {type: String},
    proposedServices: {type: String},
    revName: {type: String}, //revision updated name
    revisionNotes: {type: String},
    estimateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estimate'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    tax: {type: Number},
    laborCost: {type: Number},
    materialCost: {type: Number},
    equipmentCost: {type: Number},
    otherCost: {type: Number},
    totalEstimate: {type: Number},
    taxRate: {type: Number},
    markUp: {type: Number},
    itemsTotal: {type: Number},
    ourCostTotal: {type: Number},
    materialExtendedTotal: {type: Number},
    taxTotal: {type: Number},
    taxExtendedTotal: {type: Number},
    hoursExtendedTotal: {type: Number},
    rateTotal: {type: Number},
    laborExtendedTotal: {type: Number},
    materialCostTotal: {type: Number},
    shippingTotal: {type: Number},
    markUpPercent: {type: Number},
    markUpTotal: {type: Number},
    createdBy: {type: String},
    modifiedBy: {type: String},
    lineItems: [lineItems],
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('EstimatesItem', DBschema);

