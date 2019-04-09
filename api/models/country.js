/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Country Schema*/
var DBschema = new mongoose.Schema({
    country: {
        type: String
    },
    countryCode: {
        type: Number
    },
    countryAbb: {
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
module.exports = mongoose.model('Country', DBschema);
