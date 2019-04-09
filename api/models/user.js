/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** users Schema*/
var rolesIdSubschema = new mongoose.Schema({
    roleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'},
    roleName: {type: String}
});
var DBschema = new mongoose.Schema({
    auth_user_id: {type: String},
    auth_user_name: {type: String},
    roles: [rolesIdSubschema],
    firstName: {
        type: String,
        lowercase: true
    },
    lastName: {
        type: String,
        lowercase: true
    },
    token:{
        type:String,
    },
    name: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {type: String},
    profileImage: {
        type: String,
        default: null
    },
    company: {
        type: String
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        default: 0    // 0 for inactive 1 for active
    },
    lastLogin: {
        type: Date
    },
    deleted: {
        type: Boolean,
        default: false
    },
    term_condition: {
        type: Date,
        default: Date.now()
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('User', DBschema);

