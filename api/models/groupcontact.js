/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Groups Schema*/
var DBschema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactGroup'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('GroupContact', DBschema);
