/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** estimates Schema*/
var memo = new mongoose.Schema({
    userName: {type: String},
    message: {type: String}
});
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact',
        default:null
    },
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity',
        default:null
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact',
        default:null
    },
    individualId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact',
        default:null
    },
    title: {type: String},
    proposalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    estimateNumber: {type: String},
    estimateName: {type: String},
    note: {type: String},
    proposedServices: {type: String},
    salesRep: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact',
        default:null
    },
    memo: [memo],
    class: {type: Number}, //1- Demo-Class
//    memo: {type: String},
    billingAddress1: {type: String},
    billingAddress2: {type: String},
    billingcity: {type: String},
    billingstate: {type: String},
    billingzip: {type: String},
    shippingAddress1: {type: String},
    shippingcity: {type: String},
    shippingstate: {type: String},
    shippingzip: {type: String},
    shippingAddress2: {type: String},
    stage: {type: mongoose.Schema.Types.ObjectId, ref: 'Stage'}, // 1- Pre-Approved 2- Approved 3- In-Progress 4- Dead 5- In-Complete 6- Complete 
    formatId: {type: String},
    createdBy: {type: String},
    creatorUserId:{type: String},
    modifiedBy: {type: String},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('Estimate', DBschema);