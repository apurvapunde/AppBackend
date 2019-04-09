/*** Module dependencies.*/
var mongoose = require('mongoose');
var DBschema = new mongoose.Schema({
    laborType: {
        type: String
    },
    displayName: {
        type: String
    },
    rate: {
        type: Number
    },
    ourCost: {
        type: Number
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
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
module.exports = mongoose.model('LaborRate', DBschema);