/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** ContactLink Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    linkContactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    typeName: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('ContactLink', DBschema);
