
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** items Schema*/
var DBschema = new mongoose.Schema({
    enteredOn: { type: String },
    createdBy: { type: String },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    type: { type: String },
    description: { type: String },
    amount: { type: Number },
    purchasedAt: { type: String },
    ccLast: { type: String },
    notes: { type: String },
    expenseImage: { type: String },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('Expenses', DBschema);










