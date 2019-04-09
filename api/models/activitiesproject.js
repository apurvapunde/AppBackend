/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** ActivitiesProject Schema*/

var DBschema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    activityType: { type: Number },//1 for note, 2 for event, 3 for task, 4 for email, 5 for fax, 6 for call, 7 for letter
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('ActivitiesProject', DBschema);
