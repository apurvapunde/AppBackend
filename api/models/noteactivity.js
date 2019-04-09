/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** NoteActivity Schema*/

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

    startDate: { type: String },
    startTime: { type: String },


    activityType: { type: Number },//1 for note, 2 for event, 3 for task, 4 for email, 5 for fax, 6 for call, 7 for letter
    subject: {
        type: String
    },
    description: {
        type: String
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActivityCategory'
    },
    createdDate: {
        type: String
    },
    createdTime: {
        type: String
    },
    createdBy: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('NoteActivity', DBschema);
