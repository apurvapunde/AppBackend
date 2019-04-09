
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** worklog Schema*/
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
    serviceOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    otherValueId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkLogAddOther'
    },
    technicianName:{ type: String },
    currentDate: { type: Date },
    currentTime: { type: String },
    browserDetails:{ type: Object },
    status: {
        type: Number 
    },
    deleted: {
        type: Boolean,
        default: false
    },
    worklogNumber: { type: String },
    modifiedBy:{type:String},
    modifiedDate:{type:Date},
    modifiedTime:{type:String},
    checkInOutDate:{type:Date},
    checkInOutTime:{type:String}
    // contactId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'CompanyContact'
    // },
    // projectTaskId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'ProjectTask'
    // },
    // startDate: { type: Date },
    // endDate: { type: Date },
    // startTime: { type: String },
    // endTime: { type: String },
    // totalHours: { type: Number },
    // description: { type: String },
    // wageRate: { type: Number },
    // employeeApproved: { type: Boolean },
    // createdBy: { type: String },
    // modifiedBy: { type: String },
    // hoursDt: { type: Number },
    // hoursRt: { type: Number },
    // hoursOt: { type: Number },
    // deleted: {
    //     type: Boolean,
    //     default: false
    // }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('WorkLog', DBschema);












