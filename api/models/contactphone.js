/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** ContactPhone Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    phonetype: {
        type: String
    },
    phone: {
        type: String
    },
    isPrimary: {
        type: Boolean
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('ContactPhone', DBschema);

