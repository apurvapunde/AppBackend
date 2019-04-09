/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** opportunityTag Schema*/

var DBschema = new mongoose.Schema({

    name:{type: String},
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('OpportunityTag', DBschema);