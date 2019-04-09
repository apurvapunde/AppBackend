/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Goal Schema*/
var DBschema = new mongoose.Schema({
    goal_type: { type: Boolean },//1 for company, 2 for idividual
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    year: {
        type: String
    },
    month: {
        type: Number
    },
    goal: {
        type: String
    },
    Sales_rep: {
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
module.exports = mongoose.model('Goal', DBschema);