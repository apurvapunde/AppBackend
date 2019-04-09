'use strict';

var mongoose = require('mongoose');
var rolesIdSubschema = new mongoose.Schema({
    roleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
    roleName: {type: String}
});
var DBschema = new mongoose.Schema({
    roles: [rolesIdSubschema],
//    roleId: { type: Number, default: 1 }, // 0-Site Owner, 1- Company Admin, 2- Company User, 3- Manager, 4-Viewer
    userType: {type: String},
    auth_user_id: {type: String},
    auth_user_name: {type: String},
    companyId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company'},
    company: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    userImage: {type: String},
    weburl: {
        type: String
    },
    firstname: {type: String},
    lastname: {type: String},
    name: {type: String},
    email: {type: String},
    location: {type: String},
    phone: {type: String},
    about: {type: String},
    isAccepted: {type: Number, default: 0},
    status: {type: Number, default: 0}, //0-InActive, 1-Active
    lastLogin: {type: String},
    deleted: {type: Boolean, default: false} //false-Not deleted, true-deleted 
}, {
    timestamps: true
});
// make this available to our users in our Node applications
module.exports = mongoose.model('CompanyUser', DBschema);
