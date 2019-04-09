
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Contactindustry Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    moduleType:{type: Number},//1 for contact 2 for opportunity
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    industryName: {
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
module.exports = mongoose.model('ContactIndustry', DBschema);
