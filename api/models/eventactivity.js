/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** EventActivity Schema*/
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
    eventName: {
        type: String
    },
    subject:{type:String},
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActivityCategory'
    },
    eventNotes: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    isAllDay: {
        type: Boolean
    },
    isComplete: {
        type: Boolean
    },
    isCalendarEvent: {
        type: Boolean,
        default: false
    },
    attachment: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('EventActivity', DBschema);
