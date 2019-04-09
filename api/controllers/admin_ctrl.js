"use strict";
var mongoose = require('mongoose'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        laborRate = mongoose.model('LaborRate'),
        source = mongoose.model('ContactSource'),
        industry = mongoose.model('ContactIndustry'),
        stage = mongoose.model('Stage'),
        status = mongoose.model('ContactStatus'),
        contract = mongoose.model('OrderContract'),
        orderType = mongoose.model('orderType');
var query;

module.exports = {
    addlaborRate: addlaborRate,
    getlaborRate: getlaborRate,
    updatelaborRate: updatelaborRate,
    deletelaborRate: deletelaborRate,
    addOrderType: addOrderType,
    updateOrderType: updateOrderType,
    getOrderType: getOrderType,
    deleteOrderType: deleteOrderType,
    addOpportunitySource: addOpportunitySource,
    updateOpportunitySource: updateOpportunitySource,
    getOpportunitySource: getOpportunitySource,
    deleteOpportunitySource: deleteOpportunitySource,
    deleteIndustry: deleteIndustry,
    addIndustry: addIndustry,
    updateIndustry: updateIndustry,
    getIndustryList: getIndustryList,
    deleteStage: deleteStage,
    updateStage: updateStage,
    getStageList: getStageList,
    addStage: addStage,
    addContract: addContract,
    updateContract: updateContract,
    getOrdercontract: getOrdercontract,
    deleteOrdercontract: deleteOrdercontract
};

/* Function is use to get getlabor 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13-Sep-2017
 */

function getlaborRate(req, res) {
    if (!validator.isValid(req.body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        laborRate.find({companyId: req.body.companyId, deleted: false}, {laborType: true, displayName: true, rate: true,ourCost:true})
                .collation({locale: "en"})
                .sort({laborType: 1})
                .exec(function(err, laborRatelist) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    } else {
                        res.json({code: Constant.SUCCESS_CODE, data: laborRatelist});
                    }

                });
    }
}
/* Function is use to add labor Rate
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 19-Sep-2017
 */

function addlaborRate(req, res) {
    if (!validator.isValid(req.body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        laborRate.findOne({laborType: {$regex: new RegExp('^' + req.body.laborType + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, typeData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (typeData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.laborType_EXIST
                    });
                }
                else {
                    var laborRateData = {
                        laborType: req.body.laborType,
                        companyId: req.body.companyId,
                        displayName: req.body.displayName,
                        rate: req.body.rate,
                        ourCost: req.body.ourCost
                    };
                    laborRate(laborRateData).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }
            }
        });
    }
}
/* Function is use to update labor Rate
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 15-March-2018
 */

function updatelaborRate(req, res) {
    if (!validator.isValid(req.body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        laborRate.findOne({laborType: {$regex: new RegExp('^' + req.body.laborType + '$', "i")}, "_id": {$ne: req.body.laborId}, deleted: false, companyId: req.body.companyId}, function(err, typeData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (typeData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.laborType_EXIST
                    });
                }
                else {
                    var laborRateData = {
                        laborType: req.body.laborType,
                        companyId: req.body.companyId,
                        displayName: req.body.displayName,
                        rate: req.body.rate,
                        ourCost: req.body.ourCost

                    };
                    laborRate.findByIdAndUpdate(req.body.laborId, laborRateData, function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }
            }
        });
    }
}

/* Function is use to delete labor Rate
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 15-March-2018
 */

function deletelaborRate(req, res) {
    if (!validator.isValid(req.body.laborId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        laborRate.findByIdAndUpdate(req.body.laborId, {deleted: true}, function(err, data) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            } else {
                res.json({code: Constant.SUCCESS_CODE, data: data});
            }
        });
    }
}


/**
 * Function is use to Add type for order for SO
 * @access private * 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 15-MAr-2017
 */

function addOrderType(req, res) {
    if (!validator.isValid(req.body.orderTypeName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        orderType.findOne({orderTypeName: {$regex: new RegExp('^' + req.body.orderTypeName + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, orderData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (orderData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.ORDER_TYPE_ALREADY_EXIST
                    });
                }
                else {
                    var sourceData = {
                        orderTypeName: req.body.orderTypeName,
                        companyId: req.body.companyId

                    };
                    orderType(sourceData).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }
            }
        });
    }
}
/**
 * Function is use to Update type for order for SO
 * @access private * 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 15-Mar-2017
 */

function updateOrderType(req, res) {
    if (!validator.isValid(req.body.orderTypeName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        orderType.findOne({orderTypeName: {$regex: new RegExp('^' + req.body.orderTypeName + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, orderData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (orderData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.ORDER_TYPE_ALREADY_EXIST
                    });
                }
                else {
                    var sourceData = {
                        orderTypeName: req.body.orderTypeName

                    };
                    orderType.findByIdAndUpdate(req.body.typeId, sourceData, function(err, data) {

                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }
            }
        });
    }
}

/* Function is use to get order type for Service order
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-OCT-2017
 */

function getOrderType(req, res) {
    orderType.find({companyId: req.body.companyId, deleted: false}, function(err, orderTypelist) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        } else {
            if (req.body.statusName) {
                query = {companyId: req.body.companyId, statusName: req.body.statusName};
            }
            else {
                query = {companyId: req.body.companyId};
            }
            status.findOne(query, function(err, doc) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                }
                else {
                    res.json({code: Constant.SUCCESS_CODE, data: orderTypelist, statusNameId: doc._id});
                }
            });
        }
    }).sort({orderTypeName: 1}).collation({locale: "en"});
}

/* Function is use to delete order type for service order
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 15-March-2018
 */

function deleteOrderType(req, res) {
    if (!validator.isValid(req.body.typeId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        orderType.findByIdAndUpdate(req.body.typeId, {deleted: true}, function(err, data) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            } else {
                res.json({code: Constant.SUCCESS_CODE, data: data});
            }
        });
    }
}

/**
 * Function is use to Add Status for Opportunity 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addOpportunitySource(req, res) {
    if (!validator.isValid(req.body.sourceName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        source.findOne({sourceName: {$regex: new RegExp('^' + req.body.sourceName + '$', "i")}, moduleType: req.body.moduleType, deleted: false, companyId: req.body.companyId}, function(err, statusData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (statusData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.SOURCE_ALREADY_EXIST
                    });
                }
                else {
                    var sourceDataField = {
                        sourceName: req.body.sourceName,
                        companyId: req.body.companyId,
                        userId: req.body.userId,
                        moduleType: req.body.moduleType
                    };
                    source(sourceDataField).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }


}

/**
 * Function is use to Update Status for Opportunity 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 15-Mar-2017
 */

function updateOpportunitySource(req, res) {
    if (!validator.isValid(req.body.sourceName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        source.findOne({sourceName: {$regex: new RegExp('^' + req.body.sourceName + '$', "i")}, moduleType: req.body.moduleType, deleted: false, companyId: req.body.companyId}, function(err, statusData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (statusData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_STATUS_EXIST
                    });
                }
                else {
                    var sourceDataField = {
                        sourceName: req.body.sourceName,
                        companyId: req.body.companyId,
                        userId: req.body.userId

                    };
                    source.findByIdAndUpdate(req.body.sourceId, sourceDataField, function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }


}

/* Function is use to status opportunity 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13-Sep-2017
 */

function getOpportunitySource(req, res) {
    if (!validator.isValid(req.body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        source.find({companyId: req.body.companyId, moduleType: req.body.moduleType, deleted: false})
                .collation({locale: "en"})
                .sort({sourceName: 1})
                .exec(function(err, laborRatelist) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    } else {
                        res.json({code: Constant.SUCCESS_CODE, data: laborRatelist});
                    }

                });
    }
}

/* Function is use to delete status  for opportunity
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 15-March-2018
 */

function deleteOpportunitySource(req, res) {
    if (!validator.isValid(req.body.sourceId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        source.findByIdAndUpdate(req.body.sourceId, {deleted: true}, function(err, data) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            } else {
                res.json({code: Constant.SUCCESS_CODE, data: data});
            }
        });
    }
}

/**
 * Function is use to delete Industry for contact 
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 24-July-2017
 */
function deleteIndustry(req, res) {
    industry.update({_id: req.body.industryId}, {$set: {deleted: true}}, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, data: req.body.departmanetId});
        }
    });
}

/**
 * Function is use to Add ContactIndustry for contact 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addIndustry(req, res) {
    if (!validator.isValid(req.body.industryName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        industry.findOne({industryName: {$regex: new RegExp('^' + req.body.industryName + '$', "i")}, moduleType: req.body.moduleType, companyId: req.body.companyId, deleted: false}, function(err, industryData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (industryData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_INDUSTRY_EXIST
                    });
                }
                else {
                    var industryDataField = {
                        industryName: req.body.industryName,
                        companyId: req.body.companyId,
                        userId: req.body.contactId,
                        moduleType: req.body.moduleType
                    };
                    industry(industryDataField).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }

}

/* Function is use to Industry opportunity 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13-Sep-2017
 */

function getIndustryList(req, res) {
    industry.find({companyId: req.body.companyId, moduleType: req.body.moduleType, "deleted": false}, function(err, industryInfo) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            if (req.body.statusName) {
                query = {companyId: req.body.companyId, statusName: req.body.statusName};
            }
            else {
                query = {companyId: req.body.companyId};
            }
            status.findOne(query, function(err, doc) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                }
                else {
                    res.json({code: Constant.SUCCESS_CODE, data: industryInfo, statusNameId: doc._id});
                }
            });
        }
    }).sort({industryName: 1}).collation({locale: "en"});

}

/**
 * Function is use to update Industry for opportunity 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function updateIndustry(req, res) {
    if (!validator.isValid(req.body.industryName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        industry.findOne({industryName: {$regex: new RegExp('^' + req.body.industryName + '$', "i")}, moduleType: req.body.moduleType, companyId: req.body.companyId, deleted: false}, function(err, industryData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (industryData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_INDUSTRY_EXIST
                    });
                }
                else {
                    var industryDataField = {
                        industryName: req.body.industryName,
                        companyId: req.body.companyId,
                        userId: req.body.contactId,
                        moduleType: req.body.moduleType
                    };
                    industry.findByIdAndUpdate(req.body.industryId, industryDataField, function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }

}

/**
 * Function is use to delete stage  
 * @access private
 * @return json
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 24-July-2017
 */
function deleteStage(req, res) {
    stage.update({_id: req.body.stageId}, {$set: {deleted: true}}, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, data: req.body.departmanetId});
        }
    });
}

/**
 * Function is use to Add stageName for estimate 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function addStage(req, res) {
    if (!validator.isValid(req.body.stageName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        stage.findOne({stageName: {$regex: new RegExp('^' + req.body.stageName + '$', "i")}, moduleType: req.body.moduleType, companyId: req.body.companyId, deleted: false}, function(err, industryData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (industryData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_INDUSTRY_EXIST
                    });
                }
                else {
                    var industryDataField = {
                        stageName: req.body.stageName,
                        companyId: req.body.companyId,
                        moduleType: req.body.moduleType
                    };
                    stage(industryDataField).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }

}

/* Function is use to get stage for estimate 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13-Sep-2017
 */

function getStageList(req, res) {
    if (!validator.isValid(req.body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    } else {
        stage.find({companyId: req.body.companyId, moduleType: req.body.moduleType, deleted: false})
                .collation({locale: "en"})
                .sort({stageName: 1})
                .exec(function(err, stagelist) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: err});
                    } else {
                        res.json({code: Constant.SUCCESS_CODE, data: stagelist});
                    }

                });
    }
}

/**
 * Function is use to update Stage for Estimate 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 08-June-2017
 */

function updateStage(req, res) {
    if (!validator.isValid(req.body.stageName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        stage.findOne({stageName: {$regex: new RegExp('^' + req.body.stageName + '$', "i")}, moduleType: req.body.moduleType, companyId: req.body.companyId, deleted: false}, function(err, stageData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (stageData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.CONTACT_STAGE_EXIST
                    });
                }
                else {
                    var stageField = {
                        stageName: req.body.stageName,
                        companyId: req.body.companyId,
                        moduleType: req.body.moduleType
                    };
                    stage.findByIdAndUpdate(req.body.stageId, stageField, function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }

            }
        });
    }

}

/**
 * Function is use to Add Contract for order 
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 22-MAR-2018
 */

function addContract(req, res) {
    if (!validator.isValid(req.body.orderContractName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        contract.findOne({orderContractName: {$regex: new RegExp('^' + req.body.orderContractName + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, contractData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (contractData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.ORDER_TYPE_ALREADY_EXIST
                    });
                }
                else {
                    var sourceData = {
                        orderContractName: req.body.orderContractName,
                        companyId: req.body.companyId

                    };
                    contract(sourceData).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }
            }
        });
    }
}
/**
 * Function is use to update Contract for order 
 * @access private * 
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 22-MAR-2018
 */

function updateContract(req, res) {
    if (!validator.isValid(req.body.orderContractName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.FIELD_REQUIRED
        });
    }
    else {
        contract.findOne({orderContractName: {$regex: new RegExp('^' + req.body.orderContractName + '$', "i")}, deleted: false, companyId: req.body.companyId}, function(err, contractData) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: err});
            }
            else {
                if (contractData) {
                    res.json({
                        code: Constant.ERROR_CODE,
                        message: Constant.ORDER_TYPE_ALREADY_EXIST
                    });
                }
                else {
                    var sourceData = {
                        orderContractName: req.body.orderTypeName,
                        companyId: req.body.companyId

                    };
                    contract.findByIdAndUpdate(req.body.contractId, sourceData, function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, data: data});
                        }
                    });
                }
            }
        });
    }
}

/* Function is use to get contact order
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 22-MAr-2017
 */

function getOrdercontract(req, res) {
    contract.find({companyId: req.body.companyId, deleted: false}, function(err, contractlist) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        } else {
            res.json({code: Constant.SUCCESS_CODE, data: contractlist});
        }
    }).sort({orderContractName: 1}).collation({locale: "en"})
}
/* Function is use to delete contact order
 * @access private
 * @return json
 * Created by hemant khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 22-Mar-2017
 */

function deleteOrdercontract(req, res) {
    contract.findOneAndUpdate({_id: req.body.contarctId}, {deleted: true}, function(err, contractdetail) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: err});
        } else {
            res.json({code: Constant.SUCCESS_CODE, data: contractdetail});
        }
    });
}
