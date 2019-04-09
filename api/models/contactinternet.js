/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** ContactInternet Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    internetType: {
        type: String
    },
    internetvalue: {
        type: String
    },
    isPrimary: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('ContactInternet', DBschema);
