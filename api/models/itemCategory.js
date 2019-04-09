
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** itemCategory Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    categoryType: { type: String },
    categoryId: { type: Number },
    deleted: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('ItemCategory', DBschema);