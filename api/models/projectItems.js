
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** items Schema*/
var DBschema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    itemTypeId:{type:Number},
    header:{type:String},
    headerName:{type:String},
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
    displayLaborName:{type:String}, 
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
},
{
    timestamps: true
});
module.exports = mongoose.model('ProjectItems', DBschema);