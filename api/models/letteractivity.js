/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** letteractivity Schema*/

var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    activityType: { type: Number },
    StartDate: { type: String },
    startTime:{type:String},
    subject: {
        type: String
    },
    description: {
        type: String
    },
    template: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('LetterActivity', DBschema);
