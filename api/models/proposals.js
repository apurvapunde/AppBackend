/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** proposals Schema*/
var proposedEstimates = new mongoose.Schema({
    estimateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estimate'
    },
    estimateNumber: {type: String},
    estimateName: {type: String},
    status: {type: String},
    total: {type: Number},
    deleted: {
        type: Boolean,
        default: false
    }
});
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    proposalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal'
    },
    discription: {
        type: String
    },
    code: {
        type: String
    },
    estimateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estimate'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    individualId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity'
    },
    salesRep: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    proposedEstimates:[proposedEstimates],
    title: {type: String},
    proposalNumber: {type: String},
    proposalVersion: {type: String},
    projectName: {type: String},
    projectLocation: {type: String},
    summary: {type: String},
    note: {type: String},
    formatId: {type: String},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('Proposal', DBschema);



