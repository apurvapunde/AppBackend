"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        companyContact = mongoose.model('CompanyContact'),
        companyUser = mongoose.model('CompanyUser'),
        Opportunity = mongoose.model('Opportunity'),
        EmailTemplate = mongoose.model('EmailTemplate'),
        category = mongoose.model('CompanyCategory'),
        Item = mongoose.model('Item'),
        contactIndustry = mongoose.model('ContactIndustry'),
        ProjectTask = mongoose.model('ProjectTask'),
        contactStatus = mongoose.model('ContactStatus'),
        laborRate = mongoose.model('LaborRate'),
        proposal = mongoose.model('Proposal'),
        Estimate = mongoose.model('Estimate'),
        attachmentFile = mongoose.model('AttachmentFile');

var query;
var path = require('path');
var im = require('imagemagick');
var easyimg = require('easyimage');
var fs_extra = require('fs-extra');
var model;

module.exports = {
    uploadMultipleFile: uploadMultipleFile,
    getFileList: getFileList,
    renameFileAttachment: renameFileAttachment,
    deleteFileAttachment: deleteFileAttachment,
    restoreFileAttachment: restoreFileAttachment
};
/**
 * Function is use to upload multiple files
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 15th-Feb-2017
 */

function uploadMultipleFile(req, res) {

    var fileSize = req.swagger.params.file.value.size
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var opportunityId = req.swagger.params.id.value;
    var filename = timestamp + '_' + file.originalname;
    var docPath = "./images/common/" + timestamp + '_' + file.originalname;
    var extention = path.extname(filename);
    var allowedExtensionsImg = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    var allowedExtensionsDoc = /(\.txt|\.rtf|\.doc|\.docx|\.pdf|\.xls|\.xlsx|\.ppt|\.pptx|\.pps|\.msg|\.log|\.odt|\.pages|\.csv|\.xml)$/i;
    var fileType;
    if (allowedExtensionsImg.exec(filename)) {
        fileType = 1
    }
    else if (allowedExtensionsDoc.exec(filename)) {
        fileType = 2
    }
    else {
        fileType = 3
    }
    fs_extra.writeFile(path.resolve(docPath), file.buffer, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            var saveData = {
                filePath: Config.webUrl + "/images/common/" + filename,
                opportunityId: opportunityId,
                filename: filename,
                size: fileSize / 1000, //size in kb
                uploader: req.swagger.params.uploader.value,
                fileTypeId: fileType,
                createdBy: req.swagger.params.uploader.createdBy,
                modifiedBy: req.swagger.params.uploader.modifiedBy
            };
            attachmentFile(saveData).save(function(err, data) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    res.json({code: Constant.SUCCESS_CODE, data: data});
                }
            });
        }
    }
    );
}

/**
 * Function is use to get documentlist 
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 16-Feb-2018
 */
function getFileList(req, res) {
    attachmentFile.find({opportunityId: req.body.opportunityId, deleted: false}, function(err, doc) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        }
        else {
            res.json({code: Constant.SUCCESS_CODE, data: doc});

        }
    }).sort({'createdAt': -1});
}

/* Function is use to rename file 
 * @access private
 * @return json
 * Created by hemant shandait
 * @smartData Enterprises (I) Ltd
 * Created Date 19-Feb-2017
 */

function renameFileAttachment(req, res) {
    attachmentFile.findOne({filename: {$regex: new RegExp('^' + req.body.filename + '$', "i")}, deleted: false}, function(err, sameData) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        }
        else {
            if (sameData) {
                res.json({
                    code: Constant.ERROR_CODE,
                    message: Constant.FILE_RENAME_EXIST
                });
            }
            else {
                attachmentFile.findByIdAndUpdate(req.body.attachmentId, {filename: req.body.filename}, function(err, data) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    }
                    else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.FILE_RENAME, data: data});
                    }
                });
            }
        }
    });
}
/* Function is use to  Delete file attachment
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 19-Feb-2018
 */

function deleteFileAttachment(req, res) {
    var toDelete;
    if (req.body.isTemp) {
        toDelete = {temp_deleted: true};
    }
    else {
        toDelete = {deleted: true};
    }

    attachmentFile.findOneAndUpdate({_id: req.body.attachmentId}, toDelete).exec(function(err, data) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.FILE_DELETE, data: data});
        }
    });
}


/* Function is use to restore Deleted file attachment
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 19-Feb-2018
 */

function restoreFileAttachment(req, res) {
    attachmentFile.findOneAndUpdate({_id: req.body.attachmentId}, {temp_deleted: false}).exec(function(err, data) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.FILE_RESTORE, data: data});
        }
    });
}