"use strict";
var mongoose = require('mongoose'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    CompanyProject = mongoose.model('Project'),
    ProjectCategory = mongoose.model('ProjectCategory'),
    contactDepartment = mongoose.model('ContactDepartment'),
    ProjectRole = mongoose.model('ProjectRole'),
    ProjectItem = mongoose.model('ProjectItems'),
    query,
    offset,
    ObjectId = require('mongoose').Types.ObjectId;

var async = require('async');
module.exports = {
    getContactProject: getContactProject,
    addProject: addProject,
    getProjectDetail: getProjectDetail,
    updateProjectDetail: updateProjectDetail,
    deleteProject: deleteProject,
    addProjectCategory: addProjectCategory,
    getProjectDropdownList: getProjectDropdownList,
    addMemoProject: addMemoProject,
    getprojectNo: getprojectNo
};

/**
 * Function is use to get contact estimation
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */
function getContactProject(req, res) {
    var body = req.body;
    var companyId = body.companyId;
    var contactId = body.contactId;

    if (!validator.isValid(body.companyId)) {
        res.json({ code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING });
    }
    else {
        if (contactId) {
            if (!validator.isValidObject(contactId)) {
                res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_CONTACT_ID });
            }
            else {
                query = { customerId: contactId, companyId: companyId, deleted: false };
            }
        }
        else {
            query = { companyId: companyId, deleted: false };
        }

        // main code execution
        CompanyProject.
            find(query).
            sort({ createdAt: -1 }).
            populate('companyId', '_id company').
            populate('contactId', '_id firstname lastname').
            populate('customerId', '_id firstname lastname').
            populate('individualId', '_id firstname lastname').
            populate('categoryId', '_id categoryName').
            exec(function (err, projects) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
                }
                else {                                       
                    if (projects) {
                        res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_LIST_FETCH, data: projects });
                    } else {
                        res.json({ code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.DATA_NOT_FOUND });
                    }
                }
            });
    }
}

/* Function is use to Add Project  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 30-June-2017
 */
function addProject(req, res) {
    if (!validator.isValid(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {

        var projectsavedata = {
            companyId: req.body.companyId,
            stageId: req.body.stageId,
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            percentComplete: req.body.percentComplete,
            projectRate: req.body.projectRate,
            overheadPercent: req.body.overheadPercent,
            isOverhead: req.body.isOverhead,
            siteAddress: req.body.siteAddress,
            createdBy: req.body.createdBy
        };
        if (req.body.customerId) {
            projectsavedata.customerId = req.body.customerId;
        }
        if (req.body.individualId) {
            projectsavedata.individualId = req.body.individualId;
        }
        if (req.body.categoryId) {
            projectsavedata.categoryId = req.body.categoryId;
        }
        if (req.body.categoryId) {
            projectsavedata.departmentId = req.body.departmentId;
        }
        if (req.body.priorityId) {
            projectsavedata.priorityId = req.body.priorityId;
        }
        var ProjectRecord = new CompanyProject(projectsavedata);

        ProjectRecord.save(function (err, data) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                var s = data._id.toString();
                var d = s.slice(-7);
                var projectNumber = d.toUpperCase();

                CompanyProject.findByIdAndUpdate(data._id, { projectNumber: projectNumber }, function (err, projectData) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    }
                    else {
                        async.each(req.body.role, function (rolevalue, callback) {
                            var roleData = {
                                contactId: rolevalue.contactId,
                                firstname: rolevalue.firstname,
                                lastname: rolevalue.lastname,
                                roleType: rolevalue.roleType,
                                projectId: data._id
                            };

                            ProjectRole(roleData).save(function (err, projectRoledata) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback();
                                }
                            });
                        }, function (err) {
                            if (err) {
                                res.json({ code: Constant.ERROR_CODE, message: err });
                            } else {
                                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_ADD, data: data });
                            }
                        });
                    }
                });
            }
        });
    }
}
/* Function is use to get Project detail for oppertunity 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 26-June-2017
 */

function getProjectDetail(req, res) {

    if (!validator.isValid(req.body.projectId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }

    else {
        // check project id is a valid object id..
        var estmatesRecord = {};
        CompanyProject.findOne({ _id: req.body.projectId })
            .populate('customerId', '_id companyName')
            .populate('individualId', '_id firstname lastname')
            .populate('categoryId', '_id categoryName')
            .populate('departmentId', '_id departmentName')
            .exec(function (err, projectdetail) {
                if (err) {
                    console.log("err", err);
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {

                    estmatesRecord.projectdetail = projectdetail;

                    ProjectRole.find({ projectId: req.body.projectId }, function (err, categorylist) {
                        if (err) {
                            console.log("err2", err);
                            res.json({ code: Constant.ERROR_CODE, message: err });
                        }
                        else {
                            estmatesRecord.roleList = categorylist;
                            ProjectItem.find({ projectId: req.body.projectId, deleted: false }, function (err, itemlist) {
                                if (err) {
                                    res.json({ code: Constant.ERROR_CODE, message: err });
                                }
                                else {
                                    estmatesRecord.itemLists = itemlist;
                                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_DETAIL, data: estmatesRecord });
                                }
                            }).sort({ updatedAt: -1 })
                                .populate('lTypeId', 'laborType');
                            // res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_DETAIL, data: estmatesRecord });
                        }
                    });
                }
            });


    }
}

/* Function is use to update Project Detail 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 26-June-2017 
 */

function updateProjectDetail(req, res) {
    if (!validator.isValid(req.body.customerId) || !validator.isValid(req.body.individualId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var ProjectRecord = {
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            isOverhead: req.body.isOverhead,
            siteAddress: req.body.siteAddress,
            modifiedBy: req.body.modifiedBy
        };
        if (req.body.customerId) {
            ProjectRecord.customerId = req.body.customerId;
        }
        if (req.body.individualId) {
            ProjectRecord.individualId = req.body.individualId;
        }
        if (req.body.categoryId) {
            ProjectRecord.categoryId = req.body.categoryId;
        }
        if (req.body.priorityId) {
            ProjectRecord.priorityId = req.body.priorityId;
        }
        if (req.body.percentComplete) {
            ProjectRecord.percentComplete = req.body.percentComplete;
        }
        if (req.body.projectRate) {
            ProjectRecord.projectRate = req.body.projectRate;
        }
        if (req.body.overheadPercent) {
            ProjectRecord.overheadPercent = req.body.overheadPercent;
        }
        if (req.body.stageId) {
            ProjectRecord.stageId = req.body.stageId;
        }
        CompanyProject.findOneAndUpdate({ _id: req.body.projectId }, ProjectRecord, function (err, projectdetail) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                ProjectRole.remove({ 'projectId': req.body.projectId }, function (err) {
                    if (err) {
                        res.json({ code: Constant.ERROR_CODE, message: err });
                    }
                    else {
                        async.each(req.body.role, function (rolevalue, callback) {

                            var roleData = {
                                contactId: rolevalue.contactId,
                                firstname: rolevalue.firstname,
                                lastname: rolevalue.lastname,
                                roleType: rolevalue.roleType,
                                projectId: req.body.projectId
                            };
                            ProjectRole(roleData).save(function (err, data) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback();
                                }
                            });

                        }, function (err) {
                            if (err) {
                                res.json({ code: Constant.ERROR_CODE, message: err });
                            } else {
                                res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_UPDATE, data: projectdetail });
                            }

                        });
                    }

                });
            }
        });
    }
}
/* Function is use to Delete project for oppertunity 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 26-June-2017
 */

function deleteProject(req, res) {

    if (!validator.isValid(req.body.projectId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }

    else {

        var validProjectId = ObjectId.isValid(req.body.projectId);
        if (validProjectId === true) {
            CompanyProject.findOneAndUpdate({ _id: req.body.projectId }, { deleted: true }, function (err, projectdetail) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, message: Constant.PROJECT_DELETE, data: projectdetail });
                }
            });
        }
        else {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_ID });
        }
    }
}
/* Function is use to Add project category  
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 30-June-2017
 */
function addProjectCategory(req, res) {

    if (!validator.isValid(req.body.categoryName) || !validator.isValid(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {

        ProjectCategory.findOne({ categoryName: { $regex: new RegExp('^' + req.body.categoryName + '$', "i") }, deleted: false, companyId: req.body.companyId }, function (err, categoryData) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            }
            else {
                if (categoryData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.KEYWORD_EXIST
                    });
                }
                else {
                    var categoryDataField = {
                        categoryName: req.body.categoryName,
                        companyId: req.body.companyId,
                        userId: req.body.userId
                    };
                    ProjectCategory(categoryDataField).save(function (err, data) {
                        if (err) {
                            res.json({ code: Constant.ERROR_CODE, message: err });
                        } else {
                            res.json({ code: Constant.SUCCESS_CODE, data: data });
                        }
                    });
                }
            }
        });
    }
}

/**
 * Function is use to get project categorylist
 * @access private
 * @return json
 * Created by hemant
 * @smartData Enterprises (I) Ltd
 * Created Date 30-June-2017
 */
function getProjectDropdownList(req, res) {

    if (!validator.isValid(req.body.companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {

        var validCompanyId = ObjectId.isValid(req.body.companyId);
        if (validCompanyId === true) {
            var DropdownRecord = {};
            async.series([//you can use "async.series" as well            
                function (callback) {

                    ProjectCategory.find({ companyId: req.body.companyId }, function (err, categoryInfo) {
                        if (err) {
                            callback(err);
                        } else {
                            DropdownRecord.categoryInfo = categoryInfo;
                            callback(null);
                        }
                    });
                },
                function (callback) {
                    contactDepartment.find({ companyId: req.body.companyId }, function (err, DepartmentInfo) {
                        if (err) {
                            callback(err);
                        } else {
                            DropdownRecord.Department = DepartmentInfo;
                            callback(null);
                        }
                    });
                }
            ], function (err) {
                if (err) {
                    res.json({ code: Constant.ERROR_CODE, message: err });
                } else {
                    res.json({ code: Constant.SUCCESS_CODE, data: DropdownRecord });
                }
            });
        }
        else {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INVALID_ID });
        }
    }
}
/* Function is use to add memos 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 24-Oct-2017
 */

function addMemoProject(req, res) {
    var memodata = {
        userName: req.body.userName,
        message: req.body.message
    };
    CompanyProject.findOneAndUpdate({ _id: req.body.projectId, deleted: false }, { $push: { memo: memodata } }, function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        } else {
            res.json({ code: Constant.SUCCESS_CODE, message: Constant.MEMO_ADDED, data: result });
        }
    });
}

/**
 * Function to get project no 
 * @access private
 * @return json 
 * Created by Hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 06-Apr-2018
 */

function getprojectNo(req, res) {
    CompanyProject.count({ companyId: req.body.companyId }).exec(function (err, result) {
        if (err) {
            res.json({ code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR });
        }
        else {
            res.json({ code: Constant.SUCCESS_CODE, proposalNumber: 'PJ-' + parseInt(100000 + result + 1) });
        }
    });
}