
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** items Schema*/
var priceSchedule = new mongoose.Schema({
    startQty: {type: String},
    endQty: {type: String},
    price: {type: String}
});
var alternativeItems = new mongoose.Schema({
    value: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    label: {type: String}
});
var relatedItems = new mongoose.Schema({
    value: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    label: {type: String}
});
var replacementItems = new mongoose.Schema({
    value: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    label: {type: String}
});
var DBschema = new mongoose.Schema({
    toolsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    estimateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estimate'
    },
    itemName: {type: String, es_indexed: true},
    categoryType: {type: String},
    itemImage: {
        type: String
    },
    sku: {type: String},
    itemTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemType'
    },
    taxRate: {
        type: Number
    },
    itemCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemCategory'
    },
    project: {type: String},
    manufacturer: {type: String, es_indexed: true},
    mfgUrl: {type: String},
    description: {type: String},
    modal: {type: String, es_indexed: true},
    labourHour: {
        type: String,
        default: "0"
    },
    notes: {type: String},
    //new changes 17-08-2017
    partNumber: {type: String, es_indexed: true},
    itemCategory: {type: String},
    series: {type: String},
    relatedItems: [relatedItems],
    alternativeItems: [alternativeItems],
    replacementItems: [replacementItems],
    itemStatus: {
        type: String
    },
    manufactureWarranty: {type: String},
    taa: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        default: null
    },
    modifiedBy: {
        type: String,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});
module.exports = mongoose.model('Item', DBschema);
