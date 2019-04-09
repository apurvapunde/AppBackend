
/*** Module dependencies.*/
var mongoose = require('mongoose');
/*** attachment file Schema*/

var DBschema = new mongoose.Schema({
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity'
    },
    filename: {
        type: String
    },
    filePath: {
        type: String
    },
    size: {
        type: String
    },
    uploader: {
        type: String
    },
    fileTypeId: {type: Number}, // 1:Images,2:Documents,3:others 
    createdBy: {
        type: String
    },
    modifiedBy: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    temp_deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('AttachmentFile', DBschema);

