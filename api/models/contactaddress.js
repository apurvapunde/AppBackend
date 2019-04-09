/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Companyaddress Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact',
        default: null
    },
    addressType: {
        type: String,
        default: null
    },
    mapAddress1: {
        type: String,
        default: null
    },
    mapAddress2: {
        type: String,
        default: null
    },
    zip: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    countryId: {
        type: Number,
        default: null
    },
    isPrimary: {
        type: Boolean,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    }

},

    {
        timestamps: true
    });
module.exports = mongoose.model('ContactAddress', DBschema);

