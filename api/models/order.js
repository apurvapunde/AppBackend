/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** orders Schema*/
var userIdSubschema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'CompanyUser'},
    userName: {type: String}
});
var memo = new mongoose.Schema({
    userName: {type: String},
    message: {type: String}
});
var imageSubschema = new mongoose.Schema({
    url: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    status: {type: Boolean, default: true}
});
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity'
    },
    estimateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estimate'
    },
    salesRep: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    poId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrder'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    memo: [memo],
    signatureImg: [imageSubschema],
    userIds: [userIdSubschema],
    scheduledDate: {type: String},
    estimatedDuration: {type: String},
    title: {type: String},
    descriptionWork: {type: String},
    poNumber: {type: String},
    orderNumber: {type: String},
//    billingAddress1: {type: String},
//    billingAddress2: {type: String},
//    billingCity: {type: String},
//    billingState: {type: String},
//    billingZip: {type: String},
//    shippingAddress1: {type: String},
//    shippingCity: {type: String},
//    shippingState: {type: String},
//    shippingZip: {type: String},
//    shippingAddress2: {type: String},
    serviceLocation: {type: String},
    stageId: {type: Number}, // 1- Pre-Approved 2- Approved 3- In-Progress 4- Dead 5- In-Complete 6- Complete 
    orderTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderType'
    },
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderContract'
    },
    statusId: {type: Number},//1-Open 2-In-Progress 3-Pending 4-Work Completed 5-Closed 6-Canceled
    technicianSignature: {type: String},
    customerSignature: {type: String},
    techSignDate: {type: Date},
    custSignDate: {type: Date},
    createdBy: {type: String},
    modifiedBy: {type: String},
    startdate: {type: String, default: ''},
    enddate: {type: String, default: ''},
    technicianName: {type: String, default: ''},
    phone: {type: String, default: ''},
    notes: {type: String, default: ''},
    //new order field 30 oct 2017
    itemsTotal: {type: Number},
    taxExtendedTotal: {type: Number},
    materialCostTotal: {type: Number},
    ourCostTotal: {type: Number},
    mOurCostExtTotal: {type: Number},
    materialExtendedTotal: {type: Number},
    taxTotal: {type: Number},
    hoursExtendedTotal: {type: Number},
    laborExtendedTotal: {type: Number},
    rateTotal: {type: Number},
    shippingTotal: {type: Number},
    markupTotal: {type: Number},
    materialCost: {type: Number},
    laborCost: {type: Number},
    markupPercent: {type: Number},
    grandTotal: {type: Number},
    taxRate: {type: Number},
    markUp: {type: Number},
    billingCompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    workPerformed: {type: String},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Order', DBschema);