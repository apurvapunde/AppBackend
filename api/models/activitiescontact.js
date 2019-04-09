"use strict";
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** activitiescontacts Schema*/
var DBschema = new mongoose.Schema({
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventActivity'
    },
    activityType: {type: Number},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('ActivitiesContact', DBschema);

