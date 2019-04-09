

/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** estimates Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    subject: { type: String },
    category: { type: String },
    date: { type: String },
    time: { type: String },
    createdBy: { type: String },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity'
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
module.exports = mongoose.model('NoteDetail', DBschema);