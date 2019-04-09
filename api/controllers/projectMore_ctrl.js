"use strict";
var mongoose = require('mongoose'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    Config = require('../../config/config.js'),
    ProjectTask = mongoose.model('ProjectTask'),
    document = mongoose.model('Document'),
    ProjectActivities = mongoose.model('ActivitiesProject'),
    Timer = mongoose.model('Timer'),
    Invoice = mongoose.model('Invoice'),
    Estimate = mongoose.model('Estimate'),
    ProjectDailie = mongoose.model('ProjectDailie'),
    Item = mongoose.model('Item'),
    ProjectRole = mongoose.model('ProjectRole'),
    CompanyContact = mongoose.model('CompanyContact'),
    ContactInternet = mongoose.model('ContactInternet'),
    EmailTemplate = mongoose.model('EmailTemplate'),
    ContactAddress = mongoose.model('ContactAddress'),
    Expenses = mongoose.model('Expenses'),
    PurchaseOrder=mongoose.model('PurchaseOrder'),
    phantom = require('phantom'),
    fs = require('fs'),
    ObjectId = require('mongoose').Types.ObjectId;

/* Mailgun Email setup*/
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var auth = {
    auth: {
        api_key: Config.MAILGUN.api_key,
        domain: Config.MAILGUN.domain_name
    }
};

var nodemailerMailgun = nodemailer.createTransport(mg(auth));
var async = require('async');

module.exports = {
    addProjecttask: addProjecttask,
    getProjecttask: getProjecttask,
    getDocumentDetailByProject: getDocumentDetailByProject,
    getActivityDetailByProject: getActivityDetailByProject,
    getTimerDetailByProject: getTimerDetailByProject,
    getInvoiceDetailByProject: getInvoiceDetailByProject,
    addDailyReport: addDailyReport,
    getDailyReportList: getDailyReportList,
    getProjectEstimate: getProjectEstimate,
    getDailyReportDetails: getDailyReportDetails,
    newDailyReport: newDailyReport,
    getTools: getTools,
    updateTools: updateTools,
    dailyReportSendToCustomer: dailyReportSendToCustomer,
    deleteDailyReport: deleteDailyReport,
    getProjectExpenses: getProjectExpenses,
    getProjectpo:getProjectpo
};

/* Function is use to Add project task  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */
function addProjecttask(req, res) {

    var taskData = {
        companyId: req.body.companyId,
        projectId: req.body.projectId,        
        itemName: req.body.itemName,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        duration: req.body.duration,
        dailyAverage: req.body.dailyAverage
    };
    if(req.body.itemId){
        taskData.itemId = req.body.itemId;
    }
    ProjectTask(taskData).save(function (err, data) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: err });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_TASK_ADD, data: data });
        }
    });
}

/* Function is use to get Project task 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */

function getProjecttask(req, res) {
    ProjectTask.find({ projectId: req.body.projectId, deleted: false })
        .populate('projectId')
        .populate('companyId')
        .exec(function (err, projecttasklist) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_TASK_LIST, data: projecttasklist });
            } 
        });
}

/* Function is use to get document detail for project
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */

function getDocumentDetailByProject(req, res) {

    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.projectId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var query = document.find({ companyId: req.body.companyId, projectId: req.body.projectId, deleted: false }).select('documentType fileName documentTitle description createdAt pages');
        query.exec(function (err, documentdetail) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                    res.json({ code: Constant.SUCCESS_CODE, data: documentdetail });
                }
        });
    }
}

/* Function is use to get activity detail for project
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */
function getActivityDetailByProject(req, res) {

    if (!validator.isValidObject(req.body.projectId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        ProjectActivities.find({ projectId: req.body.projectId, deleted: false })
            .populate('activityId')
            .populate('projectId', 'priorityId')
            .exec(function (err, projectActivity) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_DETAIL_BY_PROJECT, data: projectActivity });
                 
                }
            });
    }
}

/* Function is use to get activity detail for project
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */
function getTimerDetailByProject(req, res) {

    if (!validator.isValidObject(req.body.projectId) || !validator.isValidObject(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        Timer.find({ companyId: req.body.companyId, projectId: req.body.projectId, deleted: false })
            .populate('companyId', 'firstName lastName')
            .populate('projectId', 'projectNumber title')
            .exec(function (err, projectActivity) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.TIMER_DETAILS_FETCHED, data: projectActivity });
                  
                }
            });
    }
}

/* Function is use to get activity detail for project
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */
function getInvoiceDetailByProject(req, res) {

    if (!validator.isValidObject(req.body.projectId) || !validator.isValidObject(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        //'invoiceNumber salesRep  subtotal  balanceDue'
        Invoice.find({ companyId: req.body.companyId, projectId: req.body.projectId, deleted: false })
            .populate('salesRep', 'firstname lastname')
            .exec(function (err, projectActivity) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.INVOICES_LIST_FETCHED, data: projectActivity });
                   
                }
            });
    }
}


/* Function is use to get estimate list for project
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */

function getProjectEstimate(req, res) {
    Estimate.find({ projectId: req.body.projectId })
        .exec(function (err, datalist) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_ESTIMATE_LIST, data: datalist });
            }

        });
}

/* Function is use to get po's list for project
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */

function getProjectpo(req, res) {

    PurchaseOrder.find({ projectId: req.body.projectId })
        .exec(function (err, datalist) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PO_LIST, data: datalist });
            }

        });
}

/* Function is use to get po's list for project
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 11-July-2017
 */

function getProjectExpenses(req, res) {
    Expenses.find({ projectId: req.body.projectId })
        .exec(function (err, datalist) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.EXPENSE_LIST, data: datalist });
            }

        });
}

/* Function is use to add daily report
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-July-2017
 */
function addDailyReport(req, res) {

    if (!validator.isValidObject(req.body.projectId) || !validator.isValidObject(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var dailyreportData = {
            projectId: req.body.projectId,
            companyId: req.body.companyId,
            customerId: req.body.customerId,
            problems: req.body.problems,
            date: req.body.date,
            projectNumber: req.body.projectNumber,
            projectManager: req.body.projectManager,
            leadTech: req.body.leadTech,
            daysOfWeek: req.body.daysOfWeek,
            attention: req.body.attention,
            projectTitle: req.body.projectTitle,
            dailyProduction: req.body.dailyProduction,
            resolution: req.body.resolution,
            workPlan: req.body.workPlan,
            onSiteTeamMember: req.body.onSiteTeamMember,
            notes: req.body.notes,
            preparedBy: req.body.preparedBy
        };
        ProjectDailie(dailyreportData).save(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {

                CompanyContact.findOne({ _id: req.body.customerId, userType: 1, deleted: false }, 'companyName', function (err, compnayDetails) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                    } else {
                        var TemplateData = {};
                        TemplateData.company = compnayDetails;
                        async.series([
                            function (callback) {
                                ContactAddress.findOne({ contactId: req.body.customerId, isPrimary: true }, 'state city zip mapAddress1 mapAddress2', function (err, contactData) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        TemplateData.ContactAddress = contactData;
                                        callback(null);
                                    }
                                });
                            },

                            function (callback) {
                                CompanyContact.findOne({ _id: req.body.attention, userType: 2 }, 'firstname lastname', function (err, individualData) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        TemplateData.individual = individualData;
                                        callback(null);
                                    }
                                });
                            }

                        ], function (err) {
                            if (err) {
                                res.json({ code: Constant.ERROR_CODE, message: err });
                            } else {
                                //  create pdf 
                                var todayDate = new Date();
                                var currentTime = todayDate.getTime();
                                var fileName = currentTime + '.pdf';
                                var file = "./emailTemplate/dailyReportTemplate.html";
                                var filePath = "./pdf/" + fileName;
                                var filePlacedPath = Config.webUrl + "/pdf/" + fileName;

                                fs.readFile(file, {
                                    encoding: 'utf-8'
                                }, function (err, Tempdata) {
                                    if (!err) {

                                        var finalHtml = Tempdata

                                            .replace(/{Company}/g, TemplateData.company ? TemplateData.company.companyName : "-")
                                            .replace(/{State}/g, TemplateData.ContactAddress ? TemplateData.ContactAddress.state : "")
                                            .replace(/{City}/g, TemplateData.ContactAddress ? TemplateData.ContactAddress.city : "")
                                            .replace(/{Zip}/g, TemplateData.ContactAddress ? TemplateData.ContactAddress.zip : "")
                                            .replace(/{Address}/g, TemplateData.ContactAddress ? TemplateData.ContactAddress.mapAddress1 ? TemplateData.ContactAddress.mapAddress1 : '' + ' ' + TemplateData.ContactAddress.mapAddress2 ? TemplateData.ContactAddress.mapAddress2 : '' : "")

                                            .replace(/{IndividualName}/g, TemplateData.individual ? TemplateData.individual.firstname + ' ' + TemplateData.individual.lastname : "-")
                                            .replace(/{Date}/g, req.body.date ? req.body.date : "-")
                                            .replace(/{DayOfWeek}/g, data ? data.daysOfWeek : "-")

                                            .replace(/{ProjectNo}/g, req.body.projectNumber)
                                            .replace(/{ProjectTitle}/g, req.body.projectTitle)
                                            .replace(/{ProjectManager}/g, req.body.projectManager)
                                            .replace(/{LeadTech}/g, req.body.leadTech)

                                            // str.replace(/(?:\r\n|\r|\n)/g, '<br />');
                                            .replace(/{DailyProduction}/g, (req.body.dailyProduction).replace(/(?:\r\n|\r|\n)/g, '<br />'))
                                            .replace(/{Problems}/g, (req.body.problems).replace(/(?:\r\n|\r|\n)/g, '<br />'))
                                            .replace(/{Resolution}/g, (req.body.resolution).replace(/(?:\r\n|\r|\n)/g, '<br />'))
                                            .replace(/{WorkPlanForTomorrow}/g, (req.body.workPlan).replace(/(?:\r\n|\r|\n)/g, '<br />'))
                                            .replace(/{AllianceTeamMembers}/g, (req.body.onSiteTeamMember).replace(/(?:\r\n|\r|\n)/g, '<br />'))
                                            .replace(/{Notes}/g, (req.body.notes).replace(/(?:\r\n|\r|\n)/g, '<br />'))

                                            .replace(/{PreparedBy}/g, req.body.preparedBy);

                                        // now create pdf
                                        phantom.create(['--ignore-ssl-errors=yes']).then(function (ph) {
                                            ph.createPage().then(function (page) {
                                                page.property(
                                                    'paperSize', {
                                                        format: 'A4',
                                                        orientation: 'landscape', // portrait or landscape
                                                        width: '1024px',
                                                        height: '768px',
                                                        margin: '50px'
                                                    }).then(function () {
                                                        page.property('content', finalHtml).then(function () {
                                                            setTimeout(function () {
                                                                page.render(filePath).then(function () {
                                                                    page.close();
                                                                    ph.exit();
                                                                    ProjectDailie.findOneAndUpdate({ _id: data._id }, { $set: { dailyReportFile: fileName, dailyReportFilePath: filePlacedPath } }, function (err) {
                                                                        if (err) {
                                                                            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                                                                        } else {
                                                                            res.json({ code: Constant.SUCCESS_CODE, message: Constant.DAILY_REPORT_SUBMITTED });
                                                                        }
                                                                    });
                                                                });
                                                            }, 2000);
                                                        }).catch(function (err) {
                                                            res.json({ code: Constant.ERROR_CODE, message: Constant.ERROR_PDF });
                                                        });
                                                    }).catch(function (err) {
                                                        res.json({ code: Constant.ERROR_CODE, message: Constant.ERROR_PDF });
                                                    });
                                            }).catch(function (err) {
                                                res.json({ code: Constant.ERROR_CODE, message: Constant.ERROR_PDF });
                                            });
                                        });

                                    } else {
                                        res.json({ code: Constant.ERROR_CODE, message: Constant.ERROR_PDF });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

/* Function is use to get list of detail report for project
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-July-2017
 */
function getDailyReportList(req, res) {
    if (!validator.isValidObject(req.body.projectId) || !validator.isValidObject(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {

        ProjectDailie.find({ companyId: req.body.companyId, projectId: req.body.projectId, deleted: false })
            .populate('projectId', 'projectNumber projectTitle')
            .populate('customerId', 'companyName')
            .populate('attention', 'firstname lastname')
            .exec(function (err, projectDailyReport) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_DAILY, data: projectDailyReport });
                   
                }
            });
    }
}

/* Function is use to get detail of individual dail report for project
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-July-2017
 */

function getDailyReportDetails(req, res) {
    if (!validator.isValidObject(req.body.projectId) && !validator.isValidObject(req.body.dailyReportId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        ProjectDailie.findOne({ _id: req.body.dailyReportId, projectId: req.body.projectId, deleted: false })
            .populate('customerId', 'companyName')
            .populate('projectId', 'projectNumber projectTitle')
            .populate('attention', 'firstname lastname')
            .exec(function (err, projectDailyReport) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_DAILY, data: projectDailyReport });
                }
            });
    }
}

/* Function is use to get detail of individual dail report for project
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-July-2017
 */

function newDailyReport(req, res) {

    if (!validator.isValidObject(req.body.projectId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        ProjectDailie.findOne({ projectId: req.body.projectId, deleted: false })
            .populate('customerId', 'companyName')
            .exec(function (err, projectDailyReport) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    if (projectDailyReport) {

                        ProjectRole.findOne({ projectId: req.body.projectId, deleted: false }, 'roleName firstname lastname', function (err, projectrole) {
                            if (err) {
                                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                            } else {
                                if (projectrole) {
                                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.acti, data: projectDailyReport });
                                } else {
                                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.acti, data: projectDailyReport });
                                }
                            }

                        });
                    } else {
                        res.json({ code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.DATA_NOT_FOUND });
                    }
                }
            });
    }
}


/* Function is use to get detail of individual dail report for project
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 13-July-2017
 */

function getTools(req, res) {
    if (!validator.isValidObject(req.body.toolsId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        Item.find({ toolsId: req.body.toolsId, deleted: false })
            .exec(function (err, tools) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.TOOLS_LIST, data: tools });
                   
                }
            });
    }
}

/* Function is use to update item type
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function updateTools(req, res) {
    if (!validator.isValidObject(req.body.toolsId) || !validator.isValidObject(req.body.itemId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var itemData = {
            toolsId: req.body.toolsId
        };
        Item.findOneAndUpdate({ _id: req.body.itemId }, { $set: itemData }, function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
            } else {
                res.json({ code: Constant.SUCCESS_CODE, message: Constant.ITEM_UPDATED, data: data });
            }
        });
    }
}

/* Function is use to send proposal to customer
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 18-July-2017
 */
function dailyReportSendToCustomer(req, res) {

    var dailyReport = {};
    async.series([//you can use "async.series" as well            
        function (callback) {
            ProjectDailie.findOne({ _id: req.body.dailyReportId, projectId: req.body.projectId, deleted: false }, { customerId: 1, attention: 1, dailyReportFilePath: 1, date: 1, projectTitle: 1, dailyReportFile: 1 }, function (err, dailyInfo) {
                if (err) {
                    callback(err);
                }
                else {
                    if (dailyInfo) {
                        dailyReport.customerId = dailyInfo.customerId;
                        dailyReport.attentionId = dailyInfo.attention;
                        dailyReport.dailyReportFilePath = dailyInfo.dailyReportFilePath;
                        dailyReport.dailyReportFile = dailyInfo.dailyReportFile;
                        dailyReport.date = dailyInfo.date;
                        dailyReport.projectTitle = dailyInfo.projectTitle;
                    } else {
                        dailyReport.customerId = '';
                        dailyReport.attention = '';
                        dailyReport.dailyReportFilePath = '';
                        dailyReport.dailyReportFile = '';
                        dailyReport.date = '';
                        dailyReport.projectTitle = '';
                    }
                    callback(null);
                }
            });
        },
        function (callback) {
            ContactInternet.findOne({ contactId: dailyReport.customerId, isPrimary: true, deleted: false }, { internetvalue: 1 }, function (err, customerInfo) {
                if (err) {
                    callback(err);
                } else {
                    if (customerInfo) {
                        dailyReport.customerEmail = customerInfo.internetvalue;
                    } else {
                        dailyReport.customerEmail = '';
                    }
                    callback(null);
                }
            });
        },
        function (callback) {

            ContactInternet.findOne({ contactId: dailyReport.attentionId, isPrimary: true, deleted: false }, { internetvalue: 1 }, function (err, attentionInfo) {
                if (err) {
                    callback(err);
                } else {
                    if (attentionInfo) {
                        dailyReport.attentionEmail = attentionInfo.internetvalue;
                    } else {
                        dailyReport.attentionEmail = '';
                    }
                    callback(null);
                }
            });
        },
        function (callback) {
            EmailTemplate.findOne({ code: 'daily_report', deleted: false }, function (err, templateInfo) {
                if (err) {
                    callback(err);
                } else {
                    if (templateInfo) {
                        dailyReport.title = templateInfo.title;
                        dailyReport.subject = templateInfo.subject;
                        var template = templateInfo.description;
                        dailyReport.description = template
                            .replace(/{{FirstName}}/g, req.body.attentionName)
                            .replace(/{{customer}}/g, req.body.customerName)
                            .replace(/{{LoggedInUser}}/g, req.body.LoggedInUser);
                    } else {
                        dailyReport.title = '';
                        dailyReport.subject = '';
                        dailyReport.description = '';
                    }
                    callback(null);
                }
            });
        },
        function (callback) {

            var attachments = [{
                filename: dailyReport.dailyReportFile,
                path: "./pdf/" + dailyReport.dailyReportFile,
                contentType: 'application/pdf'
            }];
            nodemailerMailgun.sendMail({
                from: Config.EMAIL_FROM, // sender address
                to: dailyReport.attentionEmail, //config.EMAIL_TEMP, // 'sarveshd@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                cc: dailyReport.customerEmail, //config.EMAIL_TEMP, // 'sarveshd.sdei@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
                subject: dailyReport.subject + ' (' + dailyReport.date + ') ' + dailyReport.projectTitle, // Subject line
                text: dailyReport.subject + ' (' + dailyReport.date + ') ' + dailyReport.projectTitle,  // plaintext body
                'h:Reply-To': 'support@hive.com',
                attachments: attachments,
                html: dailyReport.description // html body
            }, function (err, info) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null);
                }
            });
        }
    ], function (err) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.DAILY_REPORT_SENT_SUCCESS });

        }
    });
}

/* Function is use to delete daily report
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 18-July-2017
 */

function deleteDailyReport(req, res) {

    if (!validator.isValidObject(req.body.dailyReportId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {

        var ValidDailyReportId = ObjectId.isValid(req.body.dailyReportId);

        if (ValidDailyReportId === true) {

            var dailyreportId = req.body.dailyReportId;

            ProjectDailie.findOneAndUpdate({ _id: dailyreportId, deleted: false }, { $set: { deleted: true } }, function (err, result) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.DAILYREPORT_DELETE_SUCCESS });
                }
            });
        }
        else {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_ID });
        }
    }
}


