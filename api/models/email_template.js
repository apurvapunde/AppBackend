var mongoose = require('mongoose');

var DBschema = mongoose.Schema({
    title: { type: String },
    subject: { type: String },
    description: { type: String },
    code: { type: String },
    deleted: { type: Boolean, default: false }
});
module.exports = mongoose.model('EmailTemplate', DBschema);