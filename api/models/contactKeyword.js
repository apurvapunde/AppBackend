/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** ContactKeyword Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    keywordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Keyword'
    },
    keywordName: {
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
module.exports = mongoose.model('ContactKeyword', DBschema);

