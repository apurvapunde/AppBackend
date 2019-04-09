
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** Activity Schema*/

var DBschema = new mongoose.Schema({
    fileId: {
        type: String 
    },
    fileName: {
        type: String 
    }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('DropboxField', DBschema);

