/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** ContactSource Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    moduleType: {type: Number}, //1 for contact 2 for opportunity

    sourceName: {
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
module.exports = mongoose.model('ContactSource', DBschema);
