
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** itemCategory Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    itemType: { type: String },
    itemId: { type: Number },
    deleted: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('ItemType', DBschema);