
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** roles Schema*/

var DBschema = new mongoose.Schema({
    roleName: {
        type: String
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    readPermission: {
        type: Boolean,
        default: false},
    createPermission: {
        type: Boolean,
        default: false
    },
    editPermission: {
        type: Boolean,
        default: false
    },
    deletePermission: {
        type: Boolean,
        default: false
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
module.exports = mongoose.model('Role', DBschema);
