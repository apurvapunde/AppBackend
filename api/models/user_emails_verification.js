'use strict';

var mongoose = require('mongoose');

var UserEmailVerificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company' },
    email: { type: String },
    isAccepted: { type: Number, default: 0 },
}, {
        timestamps: true
    });

var UserEmailVerification = mongoose.model('UserEmailVerification', UserEmailVerificationSchema);
// make this available to our users in our Node applications
module.exports = UserEmailVerification;