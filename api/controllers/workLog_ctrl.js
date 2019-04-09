"use strict";

var mongoose = require('mongoose'),
    WorkLog = mongoose.model('WorkLog'),
    Project = mongoose.model('Project'),
    serviceOrder = mongoose.model('Order'),
    validator = require('../../config/validator.js'),
    Constant = require('../../config/constant.js'),
    ObjectId = require('mongoose').Types.ObjectId,
    AddOther = mongoose.model('WorkLogAddOther'),
    query;

module.exports = {
    addNewWorkLog: addNewWorkLog,
    getProjectAndServiceOrderList: getProjectAndServiceOrderList,
    getWorkLogDetails: getWorkLogDetails,
    updateWorkLogInfo: updateWorkLogInfo,
    getWorkLogList: getWorkLogList,
    deleteWorkLogInfo: deleteWorkLogInfo,
    getWorkLogNo: getWorkLogNo,
    saveAddOtherOption: saveAddOtherOption,
    inlineEditWorklog:inlineEditWorklog
};

/**
 * Function is use to add new worklog
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 30th-June-2017s
 */
function addNewWorkLog(req, res) {

    var browserDetails = {}
    var ip = req.headers['x-forwarded-for'] ||req.connection.remoteAddress ||req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
    browserDetails = req.body.browserDetails;
    console.log("ip>",ip)

    browserDetails.IP = ip.replace("::ffff:", '');
    if (!validator.isValid(req.body.companyId) ||
        !validator.isValid(req.body.companyEmployeeId) ||
        !validator.isValid(req.body.project._id)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        var WorkLogSaveData = {
            worklogNumber:req.body.worklogNumber,
            companyId: req.body.companyId,
            companyEmployeeId: req.body.companyEmployeeId,
            technicianName: req.body.technicianName,
            currentDate: req.body.currentDate,
            currentTime: req.body.currentTime,
            browserDetails: browserDetails,
            status: req.body.status

        };
        console.log("browserDetails",browserDetails)
        if (req.body.project.title) {
            WorkLogSaveData.projectId = req.body.project._id;
        } else {
            WorkLogSaveData.projectId = null;
        }
        if (req.body.project.orderNumber) {
            WorkLogSaveData.serviceOrderId = req.body.project._id;
        } else {
            WorkLogSaveData.serviceOrderId = null;
        }
        if (req.body.project.otherTitle) {
            WorkLogSaveData.otherValueId = req.body.project._id;
        } else {
            WorkLogSaveData.otherValueId = null;
        }


        var WorkLogRecord = new WorkLog(WorkLogSaveData);

        WorkLogRecord.save(function (err, data) {

            if (err) {
                res.json({
                    code: Constant.ERROR_CODE,
                    message: err
                });
            } else {
                console.log("data", data)
                res.json({
                    code: Constant.SUCCESS_CODE,
                    message: Constant.WORKLOG_ADD_SUCCESS,
                    data: data
                });

            }
        });
    }
}

/**
 * Function is use to update worklog
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 30th-June-2017s
 */
function updateWorkLogInfo(req, res) {console.log("INSIDE UPDATE",req.body)
    if (!validator.isValid(req.body.companyId) ||
    !validator.isValid(req.body.companyEmployeeId) ||
    !validator.isValid(req.body.projectId._id)) {
    res.json({
    code: Constant.ERROR_CODE,
    message: Constant.FIELD_REQUIRED
    });
    } else {
    var WorkLogUpdateData = {
    companyId: req.body.companyId,
    companyEmployeeId: req.body.companyEmployeeId,
    // technicianName: req.body.technicianName,
    // currentDate: req.body.currentDate
    modifiedBy:req.body.modifiedBy,
    modifiedDate:req.body.modifiedDate,
    modifiedTime:req.body.modifiedTime,
    status:req.body.status,
    // project:req.body.project,
    checkInOutDate:req.body.checkInOutDate,
    checkInOutTime:req.body.checkInOutTime
    
    };

    if (req.body.projectId.title) {
    WorkLogUpdateData.projectId = req.body.projectId._id;
    } else {
    WorkLogUpdateData.projectId = null;
    }
    if (req.body.projectId.orderNumber) {

    WorkLogUpdateData.serviceOrderId = req.body.projectId._id;
    } else {
    WorkLogUpdateData.serviceOrderId = null;
    }
    if (req.body.projectId.otherTitle) {

    WorkLogUpdateData.otherValueId = req.body.projectId._id;
    } else {
    WorkLogUpdateData.otherValueId = null;
    }
    console.log("WorkLogUpdateData",WorkLogUpdateData)
    WorkLog.update({_id: req.body.workLogId}, {$set: WorkLogUpdateData}, function (err, data) {
    
    if (err) {
    res.json({
    code: Constant.ERROR_CODE,
    message: err
    });
    } else {
    res.json({
    code: Constant.SUCCESS_CODE,
    message: Constant.WORKLOG_INFO_UPDATED
    });
    
    }
    });
    }
    }




// function updateWorkLogInfo(req, res) {
//     console.log("updateWorklog>>>>>>>>>...",req.body)
//     if (!validator.isValid(req.body.companyId) ||
//         !validator.isValid(req.body.companyEmployeeId) ||
//         !validator.isValid(req.body.project._id)) {
//         res.json({
//             code: Constant.ERROR_CODE,
//             message: Constant.FIELD_REQUIRED
//         });
//     } else {
//         var WorkLogUpdateData = {
//             companyId: req.body.companyId,
//             companyEmployeeId: req.body.companyEmployeeId,
//             // technicianName: req.body.technicianName,
//             // currentDate: req.body.currentDate
//             modifiedBy:req.body.modifiedBy,
//             modifiedDate:req.body.modifiedDate,
//             modifiedTime:req.body.modifiedTime,
//             status:req.body.status,
//             project:req.body.project,
//             checkInOutDate:req.body.checkInOutDate,
//             checkInOutTime:req.body.checkInOutTime

//         };
//         if (req.body.project.title) {
//             WorkLogUpdateData.projectId = req.body.project._id;
//         } else {
//             WorkLogUpdateData.projectId = null;
//         }
//         if (req.body.project.orderNumber) {
//             WorkLogUpdateData.serviceOrderId = req.body.project._id;
//         } else {
//             WorkLogUpdateData.serviceOrderId = null;
//         }
//         if (req.body.project.otherTitle) {
//             WorkLogUpdateData.otherValueId = req.body.project._id;
//         } else {
//             WorkLogUpdateData.otherValueId = null;
//         }

//         WorkLog.update({
//             _id: req.body.worklogId
//         }, {
//             $set: WorkLogUpdateData
//         }, function (err, data) {

//             if (err) {
//                 res.json({
//                     code: Constant.ERROR_CODE,
//                     message: err
//                 });
//             } else {
//                 console.log("response>>>>>>>>",data)
//                 res.json({
//                     code: Constant.SUCCESS_CODE,
//                     message: Constant.WORKLOG_INFO_UPDATED,
//                     data: data
//                 });

//             }
//         });
//     }
// }

/**
 * Function is use to get projects ,service orders, and other option lists
 * @access private
 * @return json
 * Created by Ramiz Kasid
 * @smartData Enterprises (I) Ltd
 * Created Date 09 Jan 2019
 * 
 */
function getProjectAndServiceOrderList(req, res) {
    var companyId = req.body.companyId;
    query = {
        companyId: companyId,
        deleted: false
    };

    if (!validator.isValidObject(companyId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        Project.find(query, {
            _id: 1,
            title: 1
        }, function (err, projectData) {
            if (err) {
                res.json({
                    code: Constant.ERROR_CODE,
                    message: Constant.INTERNAL_ERROR
                });
            } else {
                serviceOrder.find(query, {
                    _id: 1,
                    orderNumber: 1
                }, function (err, serviceOrderData) {
                    if (err) {
                        res.json({
                            code: Constant.ERROR_CODE,
                            message: Constant.INTERNAL_ERROR
                        });
                    } else {
                        AddOther.find(query, {
                            _id: 1,
                            otherTitle: 1
                        }, function (err, otherData) {
                            if (err) {
                                res.json({
                                    code: Constant.ERROR_CODE,
                                    message: Constant.INTERNAL_ERROR
                                });
                            } else {
                                var newProjectArray = projectData.concat(serviceOrderData, otherData);
                                res.json({
                                    code: Constant.SUCCESS_CODE,
                                    message: Constant.PROJECT_LIST,
                                    data: newProjectArray
                                });
                            }

                        });

                    }
                });
            }
        });
    }
}

/**
 * Function is use to get worklog details info
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 30th-June-2017
 */
function getWorkLogDetails(req, res) {
    console.log("INSIDE", req.body)
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.workLogId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        WorkLog.findOne({
                _id: req.body.workLogId,
                companyId: req.body.companyId
            })
            .populate('companyId', '_id company')
            .populate('companyEmployeeId', '_id firstname lastname')
            .populate('projectId', '_id title')
            .populate('serviceOrderId', '_id orderNumber')
            .populate('otherValueId', '_id otherTitle')
            .exec(function (err, worklogDetails) {
                console.log(">>>>>>>>>>",worklogDetails)
                if (err) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.INTERNAL_ERROR
                    });
                } else {
                    res.json({
                        code: Constant.SUCCESS_CODE,
                        message: Constant.WORKLOG_DETAILS_FETCHED,
                        data: worklogDetails
                    });
                }
            });
    }
}

function getWorkLogList(req, res) {
    req.headers['X-Forwarded-For']
var ip = req.headers['x-forwarded-for'] ||req.connection.remoteAddress ||req.socket.remoteAddress ||(req.connection.socket ? req.connection.socket.remoteAddress : null);
	// console.log(ip,"<<<<<<<<<<<")
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.companyEmployeeId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {

        var ValidcompanyId = ObjectId.isValid(req.body.companyId);

        if (ValidcompanyId === true) {
            WorkLog.find({
                    companyId: req.body.companyId,
                    companyEmployeeId: req.body.companyEmployeeId,
                    deleted: false
                })
                .sort({
                    createdAt: -1
                })
                .populate('companyId', '_id company')
                .populate('companyEmployeeId', '_id firstname lastname')
                .populate('projectId', '_id title')
                .populate('serviceOrderId', '_id orderNumber')
                .populate('otherValueId', '_id otherTitle')
                .exec(function (err, workLogLists) {
                    if (err) {
                        res.json({
                            code: Constant.ERROR_CODE,
                            message: Constant.INTERNAL_ERROR
                        });
                    } else {
                        console.log("workLogLists", workLogLists.length)
                        res.json({
                            code: Constant.SUCCESS_CODE,
                            message: Constant.WORKLOG_LIST_FETCHED,
                            data: workLogLists
                        });
                    }
                });
        } else {
            res.json({
                code: Constant.ERROR_CODE,
                message: Constant.INVALID_ID
            });
        }
    }
}

/**
 * Function is use to delete timer info
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 10th-July-2017
 */
function deleteWorkLogInfo(req, res) {
    if (!validator.isValid(req.body.workLogId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {

        var ValidWorkLogId = ObjectId.isValid(req.body.workLogId);
        if (ValidWorkLogId === true) {

            var workLogUpdateData = {
                deleted: true
            };

            WorkLog.update({
                _id: req.body.workLogId
            }, {
                $set: workLogUpdateData
            }, function (err) {
                if (err) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: err
                    });
                } else {
                    res.json({
                        code: Constant.SUCCESS_CODE,
                        message: Constant.WORKLOG_INFO_DELETED
                    });
                }
            });
        } else {
            res.json({
                code: Constant.ERROR_CODE,
                message: Constant.INVALID_ID
            });
        }
    }
}

/**
 * Function to get worklog no 
 * @access private
 * @return json 
 * Created by Apurva
 * @smartData Enterprises (I) Ltd
 * Created Date 25-Jan-2018
 */


function getWorkLogNo(req, res) {
    WorkLog.count({
        companyId: req.body.companyId
    }).exec(function (err, result) {
        if (err) {
            res.json({
                code: Constant.ERROR_CODE,
                message: Constant.INTERNAL_ERROR
            });
        } else {
            res.json({
                code: Constant.SUCCESS_CODE,
                workLogNo: 'WL-' + parseInt(100000 + result + 1)
            });
        }
    });
}
/**
 * @access private
 * @returns json
 * Created by apurva
 * @smartData EnterPrises (I) Ltd
 * Created Date 09 jan 2019
 */
function saveAddOtherOption(req, res) {
    if (!validator.isValid(req.body.title)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    } else {
        AddOther.findOne({
            otherTitle: {
                $regex: new RegExp('^' + req.body.title + '$', "i")
            },
            deleted: false,
            companyId: req.body.companyId
        }, function (err, resData) {
            if (err) {
                res.json({
                    code: Constant.ERROR_CODE,
                    message: err
                });
            } else {
                if (resData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.WORKLOG_OTHER_OPTION_EXIST
                    });
                } else {
                    let Data = {
                        userId: req.body.userId,
                        companyId: req.body.companyId,
                        otherTitle: req.body.title,
                    }
                    AddOther(Data).save(function (err, data) {
                        if (err) {
                            res.json({
                                code: Constant.ERROR_CODE,
                                message: err
                            });
                        } else {
                            res.json({
                                code: Constant.SUCCESS_CODE,
                                message: Constant.WORKLOG_OTHER_OPTION_SUCCESS,
                                data: data
                            });
                        }
                    });
                }

            }
        });
    }
}
/**
 * @access private
 * @returns json
 * Created by apurva
 * @smartData EnterPrises (I) Ltd
 * Created Date 21 jan 2019
 */
function inlineEditWorklog(req, res) {
    console.log("inline edit>>>>>>>>>>>>>>>",req.body)
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.workLogId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        var worklogData = {};
        if (req.body.projectId) {
            if (req.body.projectId.title) {
                worklogData.projectId = req.body.projectId._id;
                } else {
                    worklogData.projectId = null;
                }
                if (req.body.projectId.orderNumber) {
            
                    worklogData.serviceOrderId = req.body.projectId._id;
                } else {
                    worklogData.serviceOrderId = null;
                }
                if (req.body.projectId.otherTitle) {
            
                    worklogData.otherValueId = req.body.projectId._id;
                } else {
                    worklogData.otherValueId = null;
                }
            // worklogData.projectId = req.body.projectId;
        }
        if (req.body.status) {
            worklogData.status = req.body.status;
        }
        WorkLog.findOneAndUpdate({ _id: req.body.workLogId }, worklogData, function (err, worklogDetails) {
            if (err) {
                res.json({ code: Constant.ERROR_CODE, message: err });
            } else {
                res.json({ code: Constant.SUCCESS_CODE,
                    message: Constant.WORKLOG_INFO_UPDATED,
                    data: worklogDetails });
            }
        });
    }
}

