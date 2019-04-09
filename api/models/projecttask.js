/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** projecttask Schema*/
var DBschema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    itemName: { type: String },
    description: { type: String },
    start: { type: String },
    end: { type: String },
    duration: { type: Number },
    dailyAverage: { type: Number },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('ProjectTask', DBschema);



