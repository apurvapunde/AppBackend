/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** LinkRemember Schema*/

var DBschema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventActivity'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyContact'
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('LinkRemember', DBschema);

