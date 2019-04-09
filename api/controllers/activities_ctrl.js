"use strict";
var mongoose = require("mongoose"),
	validator = require("../../config/validator.js"),
	Constant = require("../../config/constant.js"),
	Config = require("../../config/config.js"),
	NoteDetails = mongoose.model("NoteActivity"),
	EventActivity = mongoose.model("EventActivity"),
	TaskActivity = mongoose.model("TaskActivity"),
	ContactActivities = mongoose.model("ActivitiesContact"),
	EmailActivity = mongoose.model("EmailActivity"),
	FaxActivity = mongoose.model("FaxActivity"),
	CallActivity = mongoose.model("CallActivity"),
	LetterActivity = mongoose.model("LetterActivity"),
	Activity = mongoose.model("Activity"),
	OpportunityActivities = mongoose.model("ActivitiesOpportunitie"),
	ProjectActivities = mongoose.model("ActivitiesProject"),
	async = require("async"),
	CompanyContact = mongoose.model("CompanyContact"),
	ActivityCategory = mongoose.model("ActivityCategory"),
	EmailTemplate = mongoose.model("EmailTemplate"),
	ObjectId = require("mongoose").Types.ObjectId;
var query;
var model;
var moment = require("moment");
var _ = require("underscore");
var path = require("path");
var fs = require("fs-extra");

/* Mailgun Email setup*/
var nodemailer = require("nodemailer");
var mg = require("nodemailer-mailgun-transport");

var auth = {
	auth: {
		api_key: Config.MAILGUN.api_key,
		domain: Config.MAILGUN.domain_name
	}
};

var nodemailerMailgun = nodemailer.createTransport(mg(auth));
/* Mailgun Connection*/
module.exports = {
	getActivityList: getActivityList,
	addNoteDetails: addNoteDetails,
	addEventDetails: addEventDetails,
	addTaskDetails: addTaskDetails,
	addEmailDetails: addEmailDetails,
	addFaxDetails: addFaxDetails,
	addCallDetails: addCallDetails,
	addLetterDetails: addLetterDetails,
	getActivities: getActivities,
	deleteActivity: deleteActivity,
	getActivityCategoryList: getActivityCategoryList,
	addActivityCategory: addActivityCategory,
	addEmailFile: addEmailFile
};

/**
 * Function to add/update document files
 * @access private
 * @return json 
 * Created by Santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 29-June-2017
 */
function addEmailFile(req, res) {
	var timestamp = Number(new Date()); // current time as number
	var file = req.swagger.params.file.value;
	var mailfileId = req.swagger.params.id.value;
	var filename = +timestamp + "_" + file.originalname;
	var docPath = "./emailfile/files/" + timestamp + "_" + file.originalname;
	fs.writeFile(path.resolve(docPath), file.buffer, function(err) {
		if (err) {
			res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
		} else {
			var docFiles = Config.webUrl + "/emailfile/files/" + filename;

			EmailActivity.update({_id: mailfileId}, {attachmentUrl: docFiles, attachFileName: filename}, function(err) {
				if (err) {
					res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
				} else {
					res.json({code: Constant.SUCCESS_CODE, message: Constant.DOCUMENT_FILE_UPDATED, contactImage: Config.webUrl + "/emailfile/files/" + filename});
				}
			});
		}
	});
}

/**
 * Function is use to get contact activities
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */

function getActivityList(req, res) {

	if (req.body.contactId) {

		if (!validator.isValidObject(req.body.contactId)) {
			res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_CONTACT_ID});
		}
		else {
			model = ContactActivities;
			query = {contactId: req.body.contactId, deleted: false};
		}
	}
	else if (req.body.activityType) {
		model = ContactActivities;
		query = {activityType: req.body.activityType, deleted: false};
	}
	else {
		model = Activity;
		query = {companyId: req.body.companyId, deleted: false};
	}

	// main code execution
	model.
		find(query)
		.populate("activityId")
		.populate("contactId", "firstname lastname")
		.exec(function(err, activities) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			}
			else {
				if (req.body.activityType) {

					var uniqueStandards = _.uniq(activities, function(item) {
						return item.contactId;

					});
					res.json({code: Constant.SUCCESS_CODE, data: uniqueStandards, message: Constant.USER_ACTIVITY_FETCHED});
				}
				else {
					res.json({code: Constant.SUCCESS_CODE, data: activities, message: Constant.USER_ACTIVITY_FETCHED});
				}
			}
		});
}
/* Function is use to add note details
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function addNoteDetails(req, res) {

	var body = req.body;
	if (!validator.isValidObject(body.companyId) || !validator.isValid(body.subject)) {

		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	} else {
		CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {

				if (companyInfo) {
					var activityData = {
						companyId: req.body.companyId,
						activityType: 1,
						subject: req.body.subject,
						startDate: req.body.createdDate,
						startTime: req.body.createdTime
					};

					Activity(activityData).save(function(err, activitydata) {
						if (err) {
							res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
						} else {

							var contactId = req.body.contactId;
							var projectId = req.body.projectId;
							var opportunityId = req.body.opportunityId;

							var noteData = {
								companyId: req.body.companyId,
								subject: req.body.subject,
								description: req.body.description,
								categoryId: req.body.categoryId,
								createdDate: req.body.createdDate,
								createdTime: req.body.createdTime,
								createdBy: req.body.createdBy,
								activityId: activitydata._id,
								activityType: 1
							};
							NoteDetails(noteData).save(function(err, data) {
								if (err) {
									res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
								} else {
									if (data) {
										async.series([
											function(callback) {
												async.each(contactId, function(contact, contactCallback) {

													var contactData = {
														noteactivityId: data._id,
														contactId: contact,
														activityId: activitydata._id,
														activityType: 1
													};
													ContactActivities(contactData).save(function(err) {
														if (err) {
															contactCallback(err);
														} else {
															contactCallback();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(projectId, function(project, callbackProject) {
													var projectData = {
														noteactivityId: data._id,
														projectId: project,
														activityId: activitydata._id,
														activityType: 1

													};
													ProjectActivities(projectData).save(function(err) {
														if (err) {
															callbackProject(err);
														} else {
															callbackProject();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}

												});
											},
											function(callback) {
												async.each(opportunityId, function(opportunity, callbackOpportunity) {
													var OpportunityData = {
														noteactivityId: data._id,
														opportunitiesId: opportunity,
														activityId: activitydata._id,
														activityType: 1
													};
													OpportunityActivities(OpportunityData).save(function(err) {
														if (err) {
															callbackOpportunity(err);
														} else {
															callbackOpportunity();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											}
										], function(err) {
											if (err) {
												res.json({code: Constant.ERROR_CODE, message: err});
											} else {
												res.json({code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_ADDED_SUCCESS, data: data});
											}
										});
									}
									else {
										res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
									}
								}
							});

							// async series code..
						}
					});
				}
				else {
					res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
				}
			}
		});
	}
}

/* Function is use to add event details
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function addEventDetails(req, res) {

	var body = req.body;
	if (!validator.isValidObject(body.companyId)) {

		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	} else {
		CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {

				if (companyInfo) {
					var activityData = {
						companyId: req.body.companyId,
						activityType: 2,
						subject: req.body.subject,
						StartDate: req.body.stratDate,
						StartTime: req.body.stratTime
					};

					Activity(activityData).save(function(err, activitydata) {
						if (err) {
							res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
						} else {

							var contactId = req.body.contactId;
							var projectId = req.body.projectId;
							var opportunityId = req.body.opportunityId;

							var eventDetailsData = {
								companyId: req.body.companyId,
								eventName: req.body.eventName,
								categoryId: req.body.categoryId,
								eventNotes: req.body.eventNotes,
								subject: req.body.subject,
								startDate: req.body.startdate,
								endDate: req.body.endDate,
								startTime: req.body.startTime,
								endTime: req.body.endTime,
								isAllDay: req.body.isAllDay,
								isComplete: req.body.isComplete,
								isCalendarEvent: req.body.isCalendarEvent,
								createdBy: req.body.createdBy,
								createdOn: req.body.createdOn,
								activityId: activitydata._id,
								activityType: 2
							};
							EventActivity(eventDetailsData).save(function(err, data) {
								if (err) {
									res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
								} else {
									if (data) {
										async.series([
											function(callback) {
												async.each(contactId, function(contact, contactCallback) {

													var contactData = {
														eventId: data._id,
														contactId: contact,
														activityId: activitydata._id,
														activityType: 2
													};
													ContactActivities(contactData).save(function(err) {
														if (err) {
															contactCallback(err);
														} else {
															contactCallback();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(projectId, function(project, callbackProject) {
													var projectData = {
														noteactivityId: data._id,
														projectId: project,
														activityId: activitydata._id,
														activityType: 2
													};
													ProjectActivities(projectData).save(function(err) {
														if (err) {
															callbackProject(err);
														} else {
															callbackProject();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(opportunityId, function(opportunity, callbackOpportunity) {
													var OpportunityData = {
														noteactivityId: data._id,
														opportunitiesId: opportunity,
														activityId: activitydata._id,
														activityType: 2
													};
													OpportunityActivities(OpportunityData).save(function(err) {
														if (err) {
															callbackOpportunity(err);
														} else {
															callbackOpportunity();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											}
										], function(err) {
											if (err) {
												res.json({code: Constant.ERROR_CODE, message: err});
											} else {
												res.json({code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_ADDED_SUCCESS, data: data});
											}
										});
									}
									else {
										res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
									}
								}
							});
						}
					});
				}
				else {
					res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
				}
			}
		});
	}
}

/* Function is use to add task details
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function addTaskDetails(req, res) {

	var body = req.body;
	if (!validator.isValidObject(body.companyId)) {
		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	} else {

		CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {

				if (companyInfo) {
					var activityData = {
						companyId: req.body.companyId,
						activityType: 3,
						subject: req.body.subject,
						startDate: req.body.startdate,
						startTime: req.body.reminderTime,
						dueDate: req.body.duedate
					};
					Activity(activityData).save(function(err, activitydata) {
						if (err) {
							res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
						} else {

							var contactId = req.body.contactId;
							var projectId = req.body.projectId;
							var opportunityId = req.body.opportunityId;

							var taskDetailsData = {
								companyId: req.body.companyId,
								categoryId: req.body.categoryId,
								priority: req.body.priority,
								description: req.body.description,
								subject: req.body.subject,
								startDate: req.body.startdate,
								dueDate: req.body.duedate,
								assignedTo: req.body.assignedTo,
								assignedBy: req.body.assignedBy,
								reminderDate: req.body.reminderDate,
								reminderTime: req.body.reminderTime,
								isComplete: req.body.isComplete,
								activityId: activitydata._id,
								activityType: 3
							};
							TaskActivity(taskDetailsData).save(function(err, data) {
								if (err) {
									res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
								} else {
									if (data) {
										async.series([
											function(callback) {
												async.each(contactId, function(contact, contactCallback) {

													var contactData = {
														noteactivityId: data._id,
														contactId: contact,
														activityId: activitydata._id,
														activityType: 3
													};
													ContactActivities(contactData).save(function(err) {
														if (err) {
															contactCallback(err);
														} else {
															contactCallback();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(projectId, function(project, callbackProject) {
													var projectData = {
														noteactivityId: data._id,
														projectId: project,
														activityId: activitydata._id,
														activityType: 3

													};
													ProjectActivities(projectData).save(function(err) {
														if (err) {
															callbackProject(err);
														} else {
															callbackProject();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(opportunityId, function(opportunity, callbackOpportunity) {
													var OpportunityData = {
														noteactivityId: data._id,
														opportunitiesId: opportunity,
														activityId: activitydata._id,
														activityType: 3
													};
													OpportunityActivities(OpportunityData).save(function(err) {
														if (err) {
															callbackOpportunity(err);
														} else {
															callbackOpportunity();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
										], function(err) {
											if (err) {
												res.json({code: Constant.ERROR_CODE, message: err});
											} else {
												res.json({code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_ADDED_SUCCESS, data: data});
											}
										});
									}
									else {
										res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
									}
								}
							});
						}
					});
				}
				else {
					res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
				}
			}
		});
	}
}
/* Function is use to add email details
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017 addEmailDetails
 */
function addEmailDetails(req, res) {

	var body = req.body;
	var subject = null;
	var title = "";
	var html = "";

	if (!validator.isValidObject(body.companyId)) {

		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	} else {
		CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {

				if (companyInfo) {
					var activityData = {
						companyId: req.body.companyId,
						activityType: 4,
						subject: req.body.subject
					};

					Activity(activityData).save(function(err, activitydata) {
						if (err) {
							res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
						} else {

							var contactId = req.body.contactId;
							var projectId = req.body.projectId;
							var opportunityId = req.body.opportunityId;

							var emailDetailsData = {
								companyId: req.body.companyId,
								from: req.body.from,
								to: req.body.to,
								cc: req.body.cc,
								bcc: req.body.bcc,
								subject: req.body.subject,
								attachment: req.body.attachment,
								description: req.body.description,
								template: req.body.template,
								sendAsEmail: req.body.sendAsEmail,
								sendAsHtml: req.body.sendAsHtml,
								activityId: activitydata._id,
								activityType: 4
							};
							EmailActivity(emailDetailsData).save(function(err, data) {
								if (err) {
									res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
								} else {
									if (data) {

										async.series([
											function(callback) {
												async.each(contactId, function(contact, contactCallback) {

													var contactData = {
														noteactivityId: data._id,
														contactId: contact,
														activityId: activitydata._id,
														activityType: 4
													};
													ContactActivities(contactData).save(function(err) {
														if (err) {
															contactCallback(err);
														} else {
															contactCallback();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(projectId, function(project, callbackProject) {
													var projectData = {
														noteactivityId: data._id,
														projectId: project,
														activityId: activitydata._id,
														activityType: 4
													};
													ProjectActivities(projectData).save(function(err) {
														if (err) {
															callbackProject(err);
														} else {
															callbackProject();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {

												async.each(opportunityId, function(opportunity, callbackOpportunity) {
													var OpportunityData = {
														noteactivityId: data._id,
														opportunitiesId: opportunity,
														activityId: activitydata._id,
														activityType: 4
													};
													OpportunityActivities(OpportunityData).save(function(err) {
														if (err) {
															callbackOpportunity(err);
														} else {
															callbackOpportunity();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											}
										], function(err) {
											if (err) {
												res.json({code: Constant.ERROR_CODE, message: err});
											} else {
												EmailTemplate.findOne({code: "EmailActivity", deleted: false}, function(err, template) {
													if (err) {

														res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
													}
													else {
														if (template) {

															subject = template.subject;
															console.log(subject);
															title = template.title;
															html = template.description.replace("{{description}}", req.body.description).replace("{{Date}}", moment().format("MMM Do YY"));

															nodemailerMailgun.sendMail({
																from: Config.EMAIL_FROM, // sender address
																to: req.body.to, //config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
																cc: req.body.cc, //config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
																bcc: req.body.bcc, //config.EMAIL_TEMP, // 'smartData@yopmail.com' For Sandbox subdomains add the address to authorized recipients in Account Settings or Please add your own domain for email
																subject: req.body.subject, // Subject line
																title: title, // title
																"h:Reply-To": "support@hive.com",
																html: html // html body,

															}, function(err) {
																if (err) {
																	res.json({code: Constant.SUCCESS_CODE, "message": Constant.EMAIL_TEMPLATE_ERROR, data: data});
																}
																else {
																	res.json({code: Constant.SUCCESS_CODE, "message": Constant.EMAIL_TEMPLATE_SEND, data: data});
																}
															});
														}
														else {
															res.json({code: Constant.ERROR_CODE, "message": Constant.INVALID_TEMPLATE});
														}
													}
												});

											}
										});
									}
									else {
										res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
									}
								}
							});
						}
					});
				}
				else {
					res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
				}
			}
		});
	}
}

/* Function is use to add fax details
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function addFaxDetails(req, res) {

	var body = req.body;
	if (!validator.isValidObject(body.companyId)) {
		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	} else {
		CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {
				if (companyInfo) {
					var activityData = {
						companyId: req.body.companyId,
						activityType: 5,
						subject: req.body.subject
					};
					Activity(activityData).save(function(err, activitydata) {
						if (err) {
							res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
						} else {

							var contactId = req.body.contactId;
							var projectId = req.body.projectId;
							var opportunityId = req.body.opportunityId;

							var faxDetailsData = {
								companyId: req.body.companyId,
								subject: req.body.subject,
								template: req.body.template,
								description: req.body.description,
								from: req.body.from,
								categoryId: req.body.categoryId,
								createdDate: req.body.createdDate,
								pages: req.body.pages,
								activityId: activitydata._id,
								activityType: 5
							};

							FaxActivity(faxDetailsData).save(function(err, data) {
								if (err) {
									res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
								} else {
									if (data) {

										async.series([
											function(callback) {
												async.each(contactId, function(contact, contactCallback) {

													var contactData = {
														noteactivityId: data._id,
														contactId: contact,
														activityId: activitydata._id,
														activityType: 5
													};
													ContactActivities(contactData).save(function(err) {
														if (err) {
															contactCallback(err);
														} else {
															contactCallback();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(projectId, function(project, callbackProject) {
													var projectData = {
														noteactivityId: data._id,
														projectId: project,
														activityId: activitydata._id,
														activityType: 5
													};
													ProjectActivities(projectData).save(function(err) {
														if (err) {
															callbackProject(err);
														} else {
															callbackProject();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(opportunityId, function(opportunity, callbackOpportunity) {
													var OpportunityData = {
														noteactivityId: data._id,
														opportunitiesId: opportunity,
														activityId: activitydata._id,
														activityType: 5
													};
													OpportunityActivities(OpportunityData).save(function(err) {
														if (err) {
															callbackOpportunity(err);
														} else {
															callbackOpportunity();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											}
										], function(err) {
											if (err) {
												res.json({code: Constant.ERROR_CODE, message: err});
											} else {
												res.json({code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_ADDED_SUCCESS, data: data});
											}
										});
									}
									else {
										res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
									}
								}
							});
						}
					});
				}
				else {
					res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
				}
			}
		});
	}
}
/* Function is use to add call details
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function addCallDetails(req, res) {

	var body = req.body;
	if (!validator.isValidObject(body.companyId)) {

		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	} else {
		CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {

				if (companyInfo) {

					var activityData = {
						companyId: req.body.companyId,
						activityType: 6,
						subject: req.body.subject,
						startDate: req.body.createDate,
						startTime: req.body.startTime,
						endTime: req.body.endTime,
						date: req.body.date
					};

					Activity(activityData).save(function(err, activitydata) {
						if (err) {
							res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
						} else {

							var contactId = req.body.contactId;
							var projectId = req.body.projectId;
							var opportunityId = req.body.opportunityId;

							var callActivityData = {
								companyId: req.body.companyId,
								subject: req.body.subject,
								description: req.body.description,
								categoryId: req.body.categoryId,
								from: req.body.from,
								startTime: req.body.startTime,
								endTime: req.body.endTime,
								date: req.body.date,
								createDate: req.body.createDate,
								duration: req.body.duration,
								result: req.body.result,
								createdBy: req.body.createdBy,
								activityId: activitydata._id,
								activityType: 6
							};
							CallActivity(callActivityData).save(function(err, data) {
								if (err) {
									res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
								} else {
									if (data) {
										async.series([
											function(callback) {
												async.each(contactId, function(contact, contactCallback) {

													var contactData = {
														noteactivityId: data._id,
														contactId: contact,
														activityId: activitydata._id,
														activityType: 6,
													};
													ContactActivities(contactData).save(function(err) {
														if (err) {
															contactCallback(err);
														} else {
															contactCallback();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(projectId, function(project, callbackProject) {
													var projectData = {
														noteactivityId: data._id,
														projectId: project,
														activityId: activitydata._id,
														activityType: 6
													};
													ProjectActivities(projectData).save(function(err) {
														if (err) {
															callbackProject(err);
														} else {
															callbackProject();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}

												});
											},
											function(callback) {
												async.each(opportunityId, function(opportunity, callbackOpportunity) {
													var OpportunityData = {
														noteactivityId: data._id,
														opportunitiesId: opportunity,
														activityId: activitydata._id,
														activityType: 6
													};
													OpportunityActivities(OpportunityData).save(function(err) {
														if (err) {
															callbackOpportunity(err);
														} else {
															callbackOpportunity();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											}
										], function(err) {
											if (err) {
												res.json({code: Constant.ERROR_CODE, message: err});
											} else {
												res.json({code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_ADDED_SUCCESS, data: data});
											}
										});
									}
									else {
										res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
									}
								}
							});
						}

					});
				}
				else {
					res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
				}
			}
		});
	}
}
/* Function is use to add call details
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function addLetterDetails(req, res) {

	var body = req.body;
	if (!validator.isValidObject(body.companyId)) {

		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	} else {
		CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {

				if (companyInfo) {
					var activityData = {
						companyId: req.body.companyId,
						activityType: 7,
						subject: req.body.subject,
						StartDate: req.body.createdDate,
						startTime: req.body.createdTime
					};

					Activity(activityData).save(function(err, activitydata) {
						if (err) {
							res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
						} else {
							var contactId = req.body.contactId;
							var projectId = req.body.projectId;
							var opportunityId = req.body.opportunityId;

							var letterActivityData = {
								companyId: req.body.companyId,
								subject: req.body.subject,
								description: req.body.description,
								categoryId: req.body.categoryId,
								createdDate: req.body.createdDate,
								createdTime: req.body.createdTime,
								createdBy: req.body.createdBy,
								template: req.body.template,
								activityId: activitydata._id,
								activityType: 7
							};

							LetterActivity(letterActivityData).save(function(err, data) {
								if (err) {
									res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
								} else {
									if (data) {

										async.series([
											function(callback) {
												async.each(contactId, function(contact, contactCallback) {

													var contactData = {
														noteactivityId: data._id,
														contactId: contact,
														activityId: activitydata._id,
														activityType: 7
													};
													ContactActivities(contactData).save(function(err) {
														if (err) {
															contactCallback(err);
														} else {
															contactCallback();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(projectId, function(project, callbackProject) {
													var projectData = {
														noteactivityId: data._id,
														projectId: project,
														activityId: activitydata._id,
														activityType: 7
													};
													ProjectActivities(projectData).save(function(err) {
														if (err) {
															callbackProject(err);
														} else {
															callbackProject();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											},
											function(callback) {
												async.each(opportunityId, function(opportunity, callbackOpportunity) {
													var OpportunityData = {
														noteactivityId: data._id,
														opportunitiesId: opportunity,
														activityId: activitydata._id,
														activityType: 7
													};
													OpportunityActivities(OpportunityData).save(function(err) {
														if (err) {
															callbackOpportunity(err);
														} else {
															callbackOpportunity();
														}
													});
												}, function(err) {
													if (err) {
														callback(err);
													} else {
														callback();
													}
												});
											}
										], function(err) {
											if (err) {
												res.json({code: Constant.ERROR_CODE, message: err});
											} else {
												res.json({code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_ADDED_SUCCESS, data: data});
											}
										});
									}
									else {
										res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
									}
								}
							});
						}
					});
				}
				else {
					res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_COMPANY_ID});
				}
			}
		});
	}
}
/* Function is use to add call details
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function getActivities(req, res) {
	var body = req.body;

	if (!validator.isValidObject(body.activityId) || !validator.isValid(body.activityType)) {
		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	} else {
		var activityId = body.activityId;
		var activityType = body.activityType;
		// var noteEvent = 2 for event 3 for task, 4 for email,5 for fax, 6 for call, 7 for letter

		if (activityType === 1) {
			model = NoteDetails;
		}
		else if (activityType === 2) {
			model = EventActivity;
		}
		else if (activityType === 3) {
			model = TaskActivity;
		}
		else if (activityType === 4) {
			model = EmailActivity;
		}
		else if (activityType === 5) {
			model = FaxActivity;
		}
		else if (activityType === 6) {
			model = CallActivity;
		}
		else if (activityType === 7) {
			model = LetterActivity;
		}
		else {
			res.json({
				code: Constant.ERROR_CODE,
				message: Constant.INVALID_ACTIVITY_TYPE
			});
		}
		model.findOne({activityId: activityId, activityType: activityType, deleted: false}, function(err, activitydetails) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {

				var ActivityData = {};
				ActivityData.activitydetails = activitydetails;
				async.series([
					function(callback) {
						ContactActivities.find({activityId: activityId, activityType: activityType, deleted: false}, function(err, contactData) {
							if (err) {
								callback(err);
							} else {
								ActivityData.ContactActivity = contactData;
								callback(null);
							}
						}).populate("contactId", "title firstname lastname");
					},
					function(callback) {
						OpportunityActivities.find({activityId: activityId, activityType: activityType, deleted: false}, function(err, opportunityData) {
							if (err) {
								callback(err);
							} else {
								ActivityData.OpportunityActivity = opportunityData;
								callback(null);
							}
						}).populate("opportunitiesId", "title");
					},
					function(callback) {
						ProjectActivities.find({activityId: activityId, activityType: activityType, deleted: false}, function(err, projectData) {
							if (err) {
								callback(err);
							} else {
								ActivityData.ProjectActivity = projectData;
								callback(null);
							}
						}).populate("projectId", "title");
					}
				], function(err) {
					if (err) {
						res.json({code: Constant.ERROR_CODE, message: err});
					} else {
						res.json({code: Constant.SUCCESS_CODE, data: ActivityData});
					}
				});
			}
		}).populate("categoryId", "categoryName")
			.populate("assignedTo", "firstname lastname");
	}
}


/**
 * Function to delete activity
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 10-June-2017
 */
function deleteActivity(req, res) {

	var activityId = req.body.activityId;
	if (!validator.isValid(activityId)) {
		res.json({
			code: Constant.ERROR_CODE,
			message: Constant.REQUIRED_FILED_MISSING
		});
	}
	else {

		var ValidactivityId = ObjectId.isValid(activityId);

		if (ValidactivityId === true) {

			Activity.findOneAndUpdate({_id: activityId, deleted: false}, {$set: {deleted: true}}, function(err) {
				if (err) {
					res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
				}
				else {
					res.json({code: Constant.SUCCESS_CODE, message: Constant.ACTIVITY_DELETE_SUCCESS});
				}
			});
		}
		else {
			res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_ID});
		}
	}
}
/**
 * Function is use to add  company category
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 12-July-2017
 */
function addActivityCategory(req, res) {

	var body = req.body;
	if (!validator.isValidObject(body.companyId) ||
            !validator.isValid(body.userId)
            || !validator.isValid(body.categoryName)) {

		res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});

	} else {
		var ActivityCategoryData = {
			companyId: req.body.companyId,
			userId: req.body.userId,
			categoryName: req.body.categoryName,
			activityType: req.body.activityType
		};
		var ActivityCategoryDataRecord = new ActivityCategory(ActivityCategoryData);
		ActivityCategoryDataRecord.save(function(err, categoryAdd) {
			if (err) {
				res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
			} else {
				res.json({code: Constant.SUCCESS_CODE, "message": Constant.USER_ACTIVITY_CATEGORY_ADD, data: categoryAdd});
			}
		});
	}
}

/**
 * Function is use to get list activity category
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 12-July-2017
 */

function getActivityCategoryList(req, res) {

	var activityType = req.body.activityType;
	var companyId = req.body.companyId;
	if (!validator.isValid(activityType) ||
            !validator.isValid(companyId)) {

		res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
	}

	else {

		var ValicompanyId = ObjectId.isValid(companyId);

		if (ValicompanyId === true) {
			ActivityCategory.
				find({deleted: false}).
				exec(function(err, activitycategory) {
					if (err) {
						res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
					}
					else {
						if (activitycategory) {
							res.json({code: Constant.SUCCESS_CODE, data: activitycategory});
						} else {
							res.json({code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.DATA_NOT_FOUND});
						}
					}
				});
		}
		else {
			res.json({code: Constant.ERROR_CODE, message: Constant.INVALID_ID});
		}
	}
}