/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** projectdailies Schema*/
var DBschema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    attention: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    projectManager: { type: String },
    leadTech: { type: String },
    problems: { type: String },
    date: { type: String },
    projectNumber: { type: String },
    daysOfWeek: { type: String },
    projectTitle: { type: String },
    dailyProduction: { type: String },
    resolution: { type: String },
    workPlan: { type: String },
    onSiteTeamMember: { type: String },
    notes: { type: String },
    preparedBy: { type: String },    
    dailyReportFilePath: { type: String },
    dailyReportFile: { type: String },
    deleted: {
        type: Boolean,
        default: false
    },
},

    {
        timestamps: true
    }
);
module.exports = mongoose.model('ProjectDailie', DBschema);
