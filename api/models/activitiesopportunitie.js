/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Activitiesopportunitie Schema*/

var DBschema = new mongoose.Schema({
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    activityType: { type: Number },

    opportunitiesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity'
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('ActivitiesOpportunitie', DBschema);
