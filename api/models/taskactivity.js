
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** TaskActivity Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    priority: {
        type: String  // 0 for normal , 1 for high , 2 for low
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    activityType: { type: Number },
    startDate: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    startTime: { type: String },
    description: {
        type: String
    },
    subject: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActivityCategory'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    assignedBy: {
        type: String
    },
    reminderDate: {
        type: String
    },
    reminderTime: {
        type: String
    },
    isComplete: {
        type: Number // 0-All, 1-Completed, 2, In Completed
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
module.exports = mongoose.model('TaskActivity', DBschema);
