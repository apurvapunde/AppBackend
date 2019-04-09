/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Callactivity Schema*/

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
    activityType: { type: Number },//1 for note, 2 for event, 3 for task, 4 for email, 5 for fax, 6 for call, 7 for letter
    description: {
        type: String
    },
    from: {
        type: String
    },
    subject: {
        type: String
    },
    startDate: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    date: {
        type: String
    },
    duration: {
        type: Number
    },
    result: {
        type: String
    },
    createdBy: {
        type: String
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
module.exports = mongoose.model('CallActivity', DBschema);

