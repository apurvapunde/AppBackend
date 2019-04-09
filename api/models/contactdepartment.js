/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Companydepartment Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    departmentName: {
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
module.exports = mongoose.model('ContactDepartment', DBschema);


