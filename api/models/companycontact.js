/*** Module dependencies.*/
var mongoose = require('mongoose');
/***  companycontacts Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,          //Azure user's Id 
        ref: 'User'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'                                  
    },
    companyContactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    parentContactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    createdBy: {
        type: String,
        default: null
    },
    modifiedBy: {
        type: String,
        default: null
    },
    companyName: {
        type: String,
        default: null
    },
    userType: { type: Number }, //1 for isCompany 2 for isIndividual
    age: { type: Number },
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    nickName: {
        type: String,
        default: null
    },
    profileImage: {
        type: String,
        default: null
    },
    contactTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactType'
    },
    contactStatusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactStatus'
    },
    sourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactSource'
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactDepartment'
    },
    industryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactIndustry'
    },
    isSalesRep: {
        type: Boolean,
        default: false
    },
    salesRepSign:{type:String},
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactType'
    },
    birthday: {
        type: String,
        default: null
    },
    spouse: {
        type: String,
        default: null
    },
    children: {
        type: String,
        default: null
    },
    webAddress: {
        type: String,
        default: null
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    branch: {
        type: String,
        default: null
    },
    notes: {
        type: String,
        default: null
    },
    keyword: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactKeyword'
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('CompanyContact', DBschema);
