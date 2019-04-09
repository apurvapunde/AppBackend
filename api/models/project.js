/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** project Schema*/
var memo = new mongoose.Schema({
    userName: {type: String},
    message: {type: String}
});
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    individualId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectCategory'
    },
    projectroleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectRole'
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CompanyUser'
    },
    title: {type: String},
    description: {type: String},
    priorityId: {type: Number},
    projectNumber: {type: String},
    stageId: {type: Number}, //1-Open,2-In-progress,3-Closed 
    startDate: {type: Date},
    endDate: {type: Date},
    percentComplete: {type: Number},
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactDepartment'
    },
    projectRate: {type: Number},
    overheadPercent: {type: Number},
    isOverhead: {type: Boolean},
    siteAddress: {type: String},
    memo: [memo],
    createdBy: {type: String},
    modifiedBy: {type: String},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})
module.exports = mongoose.model('Project', DBschema);