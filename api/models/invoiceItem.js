
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** invoiceItems Schema*/
var DBschema = new mongoose.Schema({
   itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
      salesRep: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    itemType: {type: String},
    date: {type: String},
    itemName: {type: String},
    taxRate: {type: Number},
    description: {type: String},
    class: {type: String},
    total: {type: Number},
    quantity: {type: Number},
    unitPrice: {type: Number},
    amount: {type: Number},
    isTaxable: {type: Boolean},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('InvoiceItem', DBschema);