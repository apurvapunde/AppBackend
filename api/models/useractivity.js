'use strict';

var mongoose = require('mongoose');

var UserActivitySchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    activity: { type: String },
    fullname: { type: String },
    activity_type: { type: String } // success, disable, enable, notify
}, {
        timestamps: true
    });

var UserActivity = mongoose.model('UserActivity', UserActivitySchema);
// make this available to our users in our Node applications
module.exports = UserActivity;