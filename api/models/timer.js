
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** timers Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    companyEmployeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyUser'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    projectTaskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectTask'
    },
    startDate: { type: Date },
    endDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    totalHours: { type: Number },
    description: { type: String },
    wageRate: { type: Number },
    employeeApproved: { type: Boolean },
    timerNumber: { type: String },
    createdBy: { type: String },
    modifiedBy: { type: String },
    hoursDt: { type: Number },
    hoursRt: { type: Number },
    hoursOt: { type: Number },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Timer', DBschema);












