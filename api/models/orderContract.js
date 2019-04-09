/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** orderContract Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    orderContractName: { type: String },
    deleted: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('OrderContract', DBschema);