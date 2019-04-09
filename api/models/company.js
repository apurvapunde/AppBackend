/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Company Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    auth_user_id: { type: String },
    company: {
        type: String
    },
    companyImage: {
        type: String
    },
    phone: {
        type: Number
    },
    weburl: {
        type: String
    },
    location: {
        type: String
    },
    about: {
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
module.exports = mongoose.model('Company', DBschema);

