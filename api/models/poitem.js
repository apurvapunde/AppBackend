
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** poitems Schema*/
var DBschema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    poId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrder'
    },
    itemTypeId: {type: Number},
    header: {type: String},
    headerName: {type: String},
    itemName: {type: String},
    itemMfg: {type: String},
    partNo: {type: String},
    quantity: {type: Number},
    mOurCost: {type: Number},
    modelNo: {type: String},
    materialCost: {type: Number},
    laborCost: {type: Number},
    mOurCostExtended: {type: Number},
    lHours: {type: Number},
    lExtended: {type: Number},
    lHoursExtended: {type: Number},
    unit: {type: Number},
    lRate: {type: Number},
    rowTotal: {type: Number},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('PoItem', DBschema);