'use strict';
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Tailgate Schema*/
var DBschema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    dateEffective: { type: String},
    dateExpire: { type: String },
    topic: { type: String },
    content: { type: String },
    deleted: { type: Boolean, default: false}
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Tailgate', DBschema);

