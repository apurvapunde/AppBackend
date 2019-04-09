"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        Expenses = mongoose.model('Expenses'),
        ObjectId = require('mongoose').Types.ObjectId;


var path = require('path');
var fs = require('fs-extra');
var query;
module.exports = {
    addExpenses: addExpenses,
    updateExpenses: updateExpenses,
    getExpensesList: getExpensesList,
    getIndividualExpenses: getIndividualExpenses,
    updateExpenseImage: updateExpenseImage
};

/* Function is use to Add expenses
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 10-July-2017
 */

function addExpenses(req, res) {
    var body = req.body;

    if (!validator.isValidObject(body.enteredOn)
            || !validator.isValid(body.createdBy) || !validator.isValidObject(body.projectId)

            ) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {

        var expensesData = {
            companyId: req.body.companyId,
            enteredOn: body.enteredOn,
            createdBy: body.createdBy,
            projectId: body.projectId,
            type: body.type,
            description: body.description,
            amount: body.amount,
            purchasedAt: body.purchasedAt,
            ccLast: body.ccLast,
            notes: body.notes
        };

        Expenses(expensesData).save(function(err, data) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.EXPENSES_ADD, data: data});
            }
        });
    }
}
/* Function is use to update expenses
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 07-July-2017
 */

function updateExpenses(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.enteredOn)
            || !validator.isValid(body.createdBy) || !validator.isValidObject(body.projectId)

            ) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {

        var expensesData = {
            companyId: req.body.companyId,
            enteredOn: body.enteredOn,
            createdBy: body.createdBy,
            projectId: body.projectId,
            type: body.type,
            description: body.description,
            amount: body.amount,
            purchasedAt: body.purchasedAt,
            ccLast: body.ccLast,
            notes: body.notes,
            estimateImage: body.estimateImage
        };

        Expenses.findOneAndUpdate({_id: body.expenseId}, {$set: expensesData}, function(err, data) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                res.json({code: Constant.SUCCESS_CODE, message: Constant.EXPENSES_UPDATE, data: data});
            }
        });
    }
}

/**
 * Function is use to get expenses list
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 07-July-2017
 */
function getExpensesList(req, res) {
    if (req.body.projectId) {
        query = {projectId: req.body.projectId, deleted: false};
    }
    else
    {
        query = {companyId: req.body.companyId, deleted: false};
    }

    Expenses.
            find(query).
            populate('projectId', 'title').
            exec(function(err, expenses) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                }
                else {
                    res.json({code: Constant.SUCCESS_CODE, data: expenses});
                }
            });
}

/**
 * Function is use to get  individual expenses
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 07-July-2017
 */
function getIndividualExpenses(req, res) {
    var body = req.body;
    var expenseId = body.expenseId;

    if (!validator.isValidObject(expenseId)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    }
    else {

        var ValidExpenseId = ObjectId.isValid(expenseId);
        if (ValidExpenseId === true) {

            Expenses.findOne({_id: expenseId, deleted: false}).populate('projectId', 'title').
                    exec(function(err, expenses) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                        }
                        else {
                            if (expenses) {
                                res.json({code: Constant.SUCCESS_CODE, data: expenses});
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

/**
 * Function to update expenses images
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 10-July-2017
 */
function updateExpenseImage(req, res) {
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var expenseId = req.swagger.params.expenseId.value;
    var filename = +timestamp + '_' + file.originalname;
    var imagePath = "./images/expenses/" + timestamp + '_' + file.originalname;
    fs.writeFile(path.resolve(imagePath), file.buffer, function(err) {
        if (err) {
            console.log("err-", err);
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            var expenseImage = {
                expenseImage: Config.webUrl + "/images/expenses/" + filename
            };
            Expenses.update({_id: expenseId}, {$set: expenseImage}, function(err) {
                if (err) {
                    console.log("err", err);
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_IMAGE_UPDATED, contactImage: Config.webUrl + "/images/expenses/" + filename});
                }
            });
        }
    });
}

