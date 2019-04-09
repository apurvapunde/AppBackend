/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** projectroles Schema*/
var DBschema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    roleType: {
        type: Number  //1 = Project Manager 2 = Lead Tech
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
;
module.exports = mongoose.model('ProjectRole', DBschema);


