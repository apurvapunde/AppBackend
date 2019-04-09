/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** documentType Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    TypeName: { type: String },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('DocumentType', DBschema);
