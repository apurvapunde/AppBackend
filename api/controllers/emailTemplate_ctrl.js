"use strict";
var mongoose = require('mongoose'),
    EmailTemplate = mongoose.model('EmailTemplate'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js');


module.exports = {
    addCompanyEmailTemplate: addCompanyEmailTemplate,
    getCompanyEmailTemplateDetails: getCompanyEmailTemplateDetails,
    updateCompanyEmailTemplate: updateCompanyEmailTemplate,
    getCompanyEmailTemplates: getCompanyEmailTemplates
};

/* Function is use to Add email template
* @access private
* @return json
* Created by santosh
* @smartData Enterprises (I) Ltd
* Created Date 27-June-2017
*/

function addCompanyEmailTemplate(req, res) {

    var body = req.body;

    if (!validator.isValidObject(body.subject)
        || !validator.isValidObject(body.title) || !validator.isValidObject(body.description)
        || !validator.isValidObject(body.code)
    ) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {

        var EmailTemplateData = {
            subject: body.subject,
            title: body.title,
            description: body.description,
            code: body.code
        };
        EmailTemplate(EmailTemplateData).save(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.EMAIL_TEMPLATE_ADD, data: data });
            }
        });
    }
}

function getCompanyEmailTemplateDetails(req, res) {

    var body = req.body;
    if (!validator.isValidObject(body.emailtemplateId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        EmailTemplate.findOne({ _id: body.emailtemplateId, deleted: false }).
            exec(function (err, emailtemplate) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    if (emailtemplate) {
                        res.json({ code: Constant.SUCCESS_CODE, data: emailtemplate });
                    } else {
                        res.json({ code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.DATA_NOT_FOUND });
                    }
                }
            });
    }
}
/* Function is use to update email template 
* @access private
* @return json
* Created by santosh
* @smartData Enterprises (I) Ltd
* Created Date 27-June-2017
*/

function updateCompanyEmailTemplate(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.subject) || !validator.isValidObject(body.emailtemplateId)
        || !validator.isValidObject(body.title) || !validator.isValidObject(body.description)
        || !validator.isValidObject(body.code)
    ) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        var emailTemplateData = {
            subject: body.subject,
            title: body.title,
            description: body.description,
            code: body.code
        };
        EmailTemplate.findOneAndUpdate({ _id: body.emailtemplateId }, { $set: emailTemplateData }, function (err, emailtemplate) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                if (emailtemplate) {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.EMAIL_TEMPLATE_UDATE, data: emailtemplate });
                }
                else {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_EMAIL_TEMPLATE_ID });
                }
            }
        });
    }
}

/**
 * Function is use to get email template
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function getCompanyEmailTemplates(req, res) {
    EmailTemplate.
        find().
        exec(function (err, emailtemplate) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            }
            else {
                if (emailtemplate) {
                    res.json({ code: Constant.SUCCESS_CODE, data: emailtemplate });
                } else {
                    res.json({ code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.DATA_NOT_FOUND });
                }
            }
        });
}




