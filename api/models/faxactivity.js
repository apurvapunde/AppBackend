/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** FaxActivity Schema*/
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
    activityType: { type: Number },
    template: {
        type: String
    },
    description: {
        type: String
    },
    from: {
        type: String
    },
    subject: {
        type: String
    },
    pages: {
        type: Number
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
module.exports = mongoose.model('FaxActivity', DBschema);
