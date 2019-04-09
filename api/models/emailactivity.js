/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** EmailActivity Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    activityType: { type: Number },// 1 for note, 2 for event, 3 for task, 4 for email, 5 for fax, 6 for call, 7 for letter

    from: {
        type: String
    },
    to: {
        type: String
    },
    cc: {
        type: String
    },

    bcc: {
        type: String
    },
    subject: {
        type: String
    },
    attachment: {
        type: String
    },
    attachmentUrl: { type: String }, 
    attachFileName: { type: String },
    description: {
        type: String
    },
    template: {
        type: String
    },
    sendAsEmail: {
        type: Boolean
    },
    sendAsHtml: {
        type: Boolean
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
module.exports = mongoose.model('EmailActivity', DBschema);
