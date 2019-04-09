"use strict";
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** To store stage of diffrent module like estimate */
var DBschema = new mongoose.Schema({

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    stageName:{type:String},
    moduleType: {type: Number},//1 estimate
    deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('Stage', DBschema);

