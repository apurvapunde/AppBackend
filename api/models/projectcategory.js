/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** projectcategory Schema*/
var DBschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'

    },
    categoryName: { type: String },
    categoryId: { type: Number },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('ProjectCategory', DBschema);

