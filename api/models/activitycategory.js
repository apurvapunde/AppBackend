/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** ActivityCategory Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    categoryName: {
        type: String,
    },
    activityType: {
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
module.exports = mongoose.model('ActivityCategory', DBschema);

