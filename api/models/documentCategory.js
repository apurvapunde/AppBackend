/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** documentCategory Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    categoryName: { type: String },
    categoryId: { type: Number },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('DocumentCategory', DBschema);

