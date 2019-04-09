/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Activity Schema*/

var DBschema = new mongoose.Schema({
    activityType: {
        type: String // 1 for note, 2 for event, 3 for task, 4 for email, 5 for fax, 6 for call, 7 for letter
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    subject: {
        type: String
    },
    StartDate: {
        type: String
    },
    StartTime: {
        type: String
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
module.exports = mongoose.model('Activity', DBschema);

