/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Opportunitie Schema*/
var memo = new mongoose.Schema({
    userName: {type: String},
    message: {type: String}
});
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    opportunityNumber: {type: String},
    title: {type: String},
    customerName: {type: String},
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    endUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    individualName: {type: String},
    individualId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    memo: [memo],
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'CompanyCategory'},
    departmentId: {type: mongoose.Schema.Types.ObjectId, ref: 'ContactDepartment'},
    industryId: {type: mongoose.Schema.Types.ObjectId, ref: 'ContactIndustry'},
    salesRep: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    priorityId: {type: Number}, // 0 for normal , 1 for high , 2 for low
    description: {type: String},
    estCloseDate: {type: String},
    actStartDate: {type: String},
    actCloseDate: {type: String},
    estStartDate: {type: String},
    stageId: {type: mongoose.Schema.Types.ObjectId, ref: 'Stage'} , //0 for test 1, 1 for test 2 
    probabilityId: {type: Number, default: 0}, // 0 for 0, 1 for 20, 2 for 40, 3 for 60,4 for 80, 5 for 100
    weightedValue: {type: Number},
    value: {type: Number},
    daysOpen: {type: Number},
    contract: {type: String},
    sourceDetails: {type: String},
    tags: [],
    source:  {type: mongoose.Schema.Types.ObjectId, ref: 'ContactSource'},
    createdBy: {type: String},
    modifiedBy: {type: String},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Opportunity', DBschema);
