
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** poAttachment Schema*/
var DBschema = new mongoose.Schema({
    poId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrder'
    },
    description: {type: String},
    attachmentUrl:{type:String},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('PoAttachment', DBschema);