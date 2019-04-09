"use strict";
var mongoose = require('mongoose'),
        Item = mongoose.model('Item'),
        ItemCategory = mongoose.model('ItemCategory'),
        ItemType = mongoose.model('ItemType'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        Project = mongoose.model('Project'),
        CompanyContact = mongoose.model('CompanyContact'),
        supplier = mongoose.model('Supplier');

var im = require('imagemagick');
var async = require('async');
var path = require('path');
var url = require("url");
var fs = require('fs-extra');
var condition;
var offset;
module.exports = {
    addItem: addItem,
    updateItem: updateItem,
    getItem: getItem,
    getItemType: getItemType,
    getItemCategory: getItemCategory,
    addItemType: addItemType,
    addItemCategory: addItemCategory,
    getProjectByName: getProjectByName,
    getIndividualItem: getIndividualItem,
    deleteItem: deleteItem,
    updateItemImage: updateItemImage,
    getUploadItemFile: getUploadItemFile,
    updateItemType: updateItemType,
    updateItemCategory: updateItemCategory,
    getManufacturerByName: getManufacturerByName,
    removeItemPic: removeItemPic
};

/* Function is use to Add item type
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function addItem(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValid(body.manufacturer) || !validator.isValid(body.itemName) || !validator.isValid(body.modal) || !validator.isValid(body.itemStatus)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        var companyId = body.companyId;

        CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                if (companyInfo) {
                    var itemData = {
                        companyId: companyId,
                        itemName: body.itemName,
                        project: body.project,
                        manufacturer: body.manufacturer,
                        mfgUrl: body.mfgUrl,
                        description: body.description,
                        notes: body.notes,
                        modal: body.modal,
                        partNumber: body.partNumber,
                        itemCategory: body.itemCategory,
                        labourHour: body.labourHours,
                        series: body.series,
                        itemStatus: body.itemStatus,
                        createdBy: body.createdBy,
                        manufactureWarranty: body.manufactureWarranty
                    };

                    Item(itemData).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                        } else {
                            async.each(req.body.suppliers, function(items, callback) {
                                var supplierData = {
                                    priceSchedule: items.schedule,
                                    supplierName: items.supplierName,
                                    demoPrice: items.demoPrice,
                                    listPrice: items.listPrice,
                                    dealerPrice: items.dealerPrice,
                                    priceDate: items.priceDate,
                                    leadTimeDays: items.leadTimedays,
                                    supplySource: items.supplySource,
                                    itemId: data._id
                                };

                                supplier(supplierData).save(function(err, supplierdata) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback();
                                    }
                                });

                            }, function(err) {
                                if (err) {
                                    res.json({code: Constant.ERROR_CODE, message: err});
                                } else {
                                    res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_ADDED, data: data});
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
/* Function is use to update item type
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function updateItem(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValid(body.manufacturer) || !validator.isValid(body.itemName) || !validator.isValid(body.modal) || !validator.isValid(body.itemStatus)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        var itemId = body.itemId;
        var companyId = body.companyId;

        CompanyContact.findOne({companyId: body.companyId, deleted: false}, function(err, companyInfo) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                if (companyInfo) {
                    var itemData = {
                        companyId: companyId,
                        itemName: body.itemName,
                        profileImage: body.profileImage,
                        project: body.project,
                        manufacturer: body.manufacturer,
                        mfgUrl: body.mfgUrl,
                        description: body.description,
                        notes: body.notes,
                        modal: body.modal,
                        partNumber: body.partNumber,
                        itemCategory: body.itemCategory,
                        labourHour: body.labourHours,
                        series: body.series,
                        itemStatus: body.itemStatus,
                        modifiedBy: body.modifiedBy,
                        manufactureWarranty: body.manufactureWarranty
                    };
                    if (req.body.replacementItems) {
                        itemData.replacementItems = req.body.replacementItems;
                    }
                    if (req.body.relatedItems) {
                        itemData.relatedItems = req.body.relatedItems;
                    }
                    if (req.body.alternativeItems) {
                        itemData.alternativeItems = req.body.alternativeItems;
                    }

                    Item.findOneAndUpdate({_id: itemId}, {$set: itemData}, function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                        } else {
                            if (req.body.suppliers) {
                                supplier.remove({'itemId': req.body.itemId}, function(err) {
                                    if (err) {
                                        res.json({code: Constant.ERROR_CODE, message: err});
                                    }
                                    else {
                                        async.each(req.body.suppliers, function(items, callback) {
                                            var supplierData = {
                                                priceSchedule: items.priceSchedule,
                                                supplierName: items.supplierName,
                                                demoPrice: items.demoPrice,
                                                listPrice: items.listPrice,
                                                dealerPrice: items.dealerPrice,
                                                priceDate: items.priceDate,
                                                leadTimeDays: items.leadTimedays,
                                                supplySource: items.supplySource,
                                                itemId: itemId
                                            };

                                            supplier(supplierData).save(function(err, supplierdata) {
                                                if (err) {
                                                    callback(err);
                                                } else {
                                                    callback();
                                                }
                                            });

                                        }, function(err) {
                                            if (err) {
                                                res.json({code: Constant.ERROR_CODE, message: err});
                                            } else {
                                                res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_UPDATED, data: data});
                                            }

                                        });
                                    }
                                });
                            }

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
/**
 * Function is use to get items
 * @access private
 * @return json 
 * Created by santosh
 * Modified by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 * Modified Date 27-Oct-2017
 */
function getItem(req, res) {
    var body = req.body;
    var companyId = body.companyId;
    var item = {};

    if (!validator.isValidObject(body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
    }
    else {
        if (body.searchText) {
            condition = {companyId: companyId, $or: [{'itemName': {"$regex": body.searchText, "$options": "i"}}, {'modal': {"$regex": body.searchText, "$options": "i"}}, {'partNumber': {"$regex": body.searchText, "$options": "i"}}, {'manufacturer': {"$regex": body.searchText, "$options": "i"}}], deleted: false};//searching query for items
            offset = (req.body.page - 1) * req.body.per_page;
        } else {
            condition = {companyId: companyId, deleted: false};//query for itemListing
            offset = (req.body.page - 1) * req.body.per_page;
        }
        var sortCreatedAt = {createdAt: -1};
        var sort = {};
        var sortValue = req.body.sortColumnName;
        var sortType = req.body.sortOrder === 'asc' ? 1 : -1;
        sort[sortValue] = sortType;
        var sorting = req.body.sortColumnName ? sort : sortCreatedAt;
        var limit = req.body.per_page ? req.body.per_page : 0;

        Item.count(condition, function(err, totalCount) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {

                Item.find(condition)
                        .collation({locale: 'en'})
                        .sort(sorting)
                        .skip(offset)
                        .limit(limit)
                        .populate('itemTypeId').
                        populate('itemCategoryId').
                        exec(function(err, item1) {
                            if (err) {
                                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                            }
                            else {
                                ItemType.findOne({"itemType": "Material"}, function(err, itemType) {
                                    if (err) {
                                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                                    }
                                    else {
                                        var currentpage = req.body.page;
                                        var totalRecord = totalCount;
                                        var totalPage = (totalRecord / req.body.per_page) + ((totalRecord % req.body.per_page) > 0 ? 1 : 0);

                                        item.item = item1;
                                        item.totalcount = Math.ceil(totalPage);
                                        item.page = currentpage;
                                        item.sortOrder = req.body.sortOrder ? req.body.sortOrder : 'desc';
                                        item.sortColumnName = sortValue;

                                        res.json({code: Constant.SUCCESS_CODE, data: item, itemType: itemType});
                                    }
                                });


                            }
                        });

            }
        });

    }
}

/**
 * Function is use to get  individual items
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function getIndividualItem(req, res) {
    var body = req.body;
    var itemId = body.itemId;
    var item = {};
    if (!validator.isValidObject(body.itemId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
    }
    else {
        Item.findOne({_id: itemId, deleted: false}).
                populate('itemTypeId', '_id itemType').
                populate('itemCategoryId', '_id categoryType').
                populate('toolsId', 'title').
                exec(function(err, itemdata) {
                    if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    }
                    else {
                        supplier.find({itemId: itemId}, function(err, supplierdata) {
                            if (err) {
                                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                            }
                            else {
                                item.supplierdata = supplierdata;
                                item.item = itemdata;
                                res.json({code: Constant.SUCCESS_CODE, data: item});
                            }
                        });

                    }
                });
    }
}

/**
 * Function is use to get item type
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function getItemType(req, res) {
    var body = req.body;
    var companyId = body.companyId;

    if (!validator.isValidObject(body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
    }
    else {
        ItemType.find({companyId: companyId, deleted: false}, function(err, itemtype) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {
                if (itemtype) {
                    res.json({code: Constant.SUCCESS_CODE, data: itemtype});
                } else {
                    res.json({code: Constant.NOT_FOUND_ERROR_CODE, message: Constant.DATA_NOT_FOUND});
                }
            }
        });

    }
}



/* Function is use to Add item type
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function addItemType(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValid(body.itemType)) {

        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        var companyId = req.body.companyId;
        var itemType = req.body.itemType;

        CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                if (companyInfo) {

                    var itemData = {
                        companyId: companyId,
                        itemType: itemType
                    };

                    ItemType(itemData).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_TYPE_ADDED, data: data});
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
/* Function is use to Update item type
 * @access private
 * @return json
 * Created by HEMANT KHANDAIT
 * @smartData Enterprises (I) Ltd
 * Created Date 07-july-2017
 */

function updateItemType(req, res) {
    ItemType.findOneAndUpdate({_id: req.body.itemTypeId}, {$set: {itemType: req.body.itemType}}, function(err, data) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_TYPE_UPDATED, data: data});
        }
    });


}
/* Function is use to Update item category
 * @access private
 * @return json
 * Created by HEMANT KHANDAIT
 * @smartData Enterprises (I) Ltd
 * Created Date 07-july-2017
 */
function updateItemCategory(req, res) {

    var companyId = req.body.companyId;
    var categoryType = req.body.categoryType;

    ItemCategory.findOneAndUpdate({_id: req.body.itemCategoryId}, {$set: {categoryType: categoryType}}, function(err, data) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_CATEGORY_UPDATED, data: data});
        }
    });
}

/**
 * Function is use to get item category
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function getItemCategory(req, res) {
    var body = req.body;
    var companyId = body.companyId;

    if (!validator.isValidObject(body.companyId)) {
        res.json({code: Constant.ERROR_CODE, message: Constant.COMPANY_ID_MISSING});
    }
    else {
        ItemCategory.find({companyId: companyId, deleted: false}, function(err, itemcategory) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {
                res.json({code: Constant.SUCCESS_CODE, data: itemcategory});

            }
        });
    }
}
/* Function is use to Add item category
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */
function addItemCategory(req, res) {
    var body = req.body;
    if (!validator.isValidObject(body.companyId) || !validator.isValid(body.categoryType)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        var companyId = req.body.companyId;
        var categoryType = req.body.categoryType;

        CompanyContact.findOne({companyId: body.companyId}, function(err, companyInfo) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                if (companyInfo) {
                    var itemData = {
                        companyId: companyId,
                        categoryType: categoryType,
                    };

                    ItemCategory(itemData).save(function(err, data) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_CATEGORY_ADDED, data: data});
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

/* Function is use to get project by name
 * @access private
 * @return json
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 27-June-2017
 */

function getProjectByName(req, res) {
    var body = req.body;
    var name = body.projectName;
    if (!validator.isValidObject(body.companyId) || !validator.isValidObject(body.projectName)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        var companyId = req.body.companyId;
        var categoryName = req.body.categoryName;

        Project.find({companyId: companyId, "title": {"$regex": name, "$options": "i"}, stageId: {$in: [1, 2]}, deleted: false}, function(err, project) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                res.json({code: Constant.SUCCESS_CODE, 'message': Constant.PROJECT_LIST, data: project});

            }
        });
    }
}

/**
 * Function to delete item
 * @access private
 * @return json 
 * Created by santosh
 * @smartData Enterprises (I) Ltd
 * Created Date 21-June-2017
 */
function deleteItem(req, res) {
    var itemId = req.body.itemId;
    Item.findOneAndUpdate({_id: itemId, deleted: false}, {$set: {deleted: true}}, function(err, result) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        }
        else {
            res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_DELETE_SUCCESS});
        }
    });
}
/**
 * Function to update item images
 * @access private
 * @return json 
 * Created by Sarvesh Dwivedi
 * @smartData Enterprises (I) Ltd
 * Created Date 29-June-2017
 */
function updateItemImage(req, res) {
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var itemId = req.swagger.params.itemId.value;
    var filename = +timestamp + '_' + file.originalname;
    var thumbFileName = filename + '_thumb.jpg';
    var imagePath = "./images/item/" + timestamp + '_' + file.originalname;
    fs.writeFile(path.resolve(imagePath), file.buffer, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            im.resize({srcPath: imagePath, dstPath: "images/item/" + thumbFileName, width: 200, height: 180}, function(err, stdout, stderr) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Resized to 640x480');
                }
            });
            var itemImage = {
                itemImage: Config.webUrl + "/images/item/" + thumbFileName
            };
            Item.update({_id: itemId}, {$set: itemImage}, function(err) {
                if (err) {
                    res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                } else {
                    fs.unlink(imagePath, function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_IMAGE_UPDATED, contactImage: Config.webUrl + "/images/item/" + thumbFileName});
                        }
                    });
                }
            });
        }
    });
}

/**
 * Function to add item Trough
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 7-July-2017
 */


function getUploadItemFile(req, res) {
    var itemSaveData = {};
    var rejectedData = [];
    var previousData = [];
    var rejected_resident = new Object();
    var rejected_item = new Object();
    var accepted_item = new Object();
    var noOfaccepteditem = 0;
    var timestamp = Number(new Date()); // current time as number
    var file = req.swagger.params.file.value;
    var companyId = req.swagger.params.id.value;
    var createdBy = req.swagger.params.createdBy.value;
    var itemTypeId = req.swagger.params.itemTypeId.value;
    var filename = +timestamp + '_' + file.originalname;
    var csvPath = "./csv/" + timestamp + '_' + file.originalname;
    fs.writeFile(path.resolve(csvPath), file.buffer, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            var csv = require("fast-csv");
            var saveData = {};
            var stream = fs.createReadStream(csvPath);
            var extention = path.extname(csvPath);
            if (extention === '.csv') {
                csv.fromStream(stream, {headers: true}, {headers: ["itemName", "mfg", "description", "notes", "dealerPrice", "listPrice", "partNumber", "itemCategory", "labourHours", "demoPrice", "series", "leadTimeDays", "supplySource", "itemStatus", "priceSchedule"]})
                        .validate(function(data, next) {
                            previousData.push(data.name);
                                Item.findOne({'manufacturer': {"$regex": data.mfg, "$options": "i"}, 'partNumber': {"$regex": data.partNumber, "$options": "i"}, 'modal': {"$regex": data.model, "$options": "i"}, deleted: false},
                            function(err, item) {
                                if (err) {
                                    next(err);
                                }
                                else {
                                    if (item !== null) {
                                        supplier.count({"supplierName": {"$regex": data.supplier, "$options": "i"}, itemId: item._id, deleted: false},
                                        function(err, supData) {
                                            if (err) {
                                                next(err);
                                            }
                                            else {
                                                if (supData <= 0) {
                                                        var supplierData = {
                                                            supplierName: data["supplier"],
                                                            demoPrice: data["demoPrice"],
                                                            listPrice: data["listPrice"],
                                                            dealerPrice: data["dealerPrice"],
                                                            leadTimeDays: data['leadTimeDays'],
                                                            priceDate: data['priceDate'],
                                                            itemId: item._id
                                                        };
                                                        if (data.priceSchedule) {
                                                            supplierData.priceSchedule = JSON.parse(data["priceSchedule"].replace(/'/g, '"'));

                                                        }
                                                    supplier(supplierData).save(function(err, supplierdata) {

                                                    });
                                                }
                                            }
                                        });

                                        next(null, !item);
                                    } else {
                                        next(null, !item);
                                    }
                                }
                            });
                            
                        })
                        .on("data-invalid", function(data) {
                            Array.prototype.push.call(rejected_item, data);
                        })
                        .on("data", function(data) {
                            var itemData = {
                                manufacturer: data["mfg"],
                                itemName: data["name"],
                                description: data["description"],
                                modal: data["model"],
                                partNumber: data["partNumber"] !== "" ? data["partNumber"] : data["model"],
                                itemCategory: data["itemCategory"],
                                series: data["series"],
                                taa: data["taa"] !== "" ? data["taa"] : false,
                                mfgUrl: data["mfgUrl"],
                                itemStatus: data["itemStatus"] !== "" ? data["itemStatus"] : "Available",
                                manufactureWarranty: data["manufactureWarranty"],
                                companyId: companyId,
                                createdBy: createdBy,
                                itemTypeId: itemTypeId
                            };
                            Item(itemData).save(function(err, idata) {
                                if (err) {
                                } else {
                                    var supplierData = {
                                        supplierName: data["supplier"],
                                        demoPrice: data["demoPrice"],
                                        listPrice: data["listPrice"],
                                        dealerPrice: data["dealerPrice"],
                                        itemId: idata._id,
                                        leadTimeDays: data['leadTimeDays'],
                                        priceDate: data['priceDate']
                                    };
                                    if (data.priceSchedule) {
                                        supplierData.priceSchedule = JSON.parse(data["priceSchedule"].replace(/'/g, '"'));

                                    }
                                    supplier(supplierData).save(function(err, supplierdata) {
                                        console.log("SUCESSS");
                                    });



                                }
                            });
                            Array.prototype.push.call(accepted_item, data);
                            noOfaccepteditem++;

                        })
                        .on("end", function(data) {
                            fs.unlink(csvPath, function(err) {
                                if (err) {
                                    res.json({code: Constant.SUCCESS_CODE, message: 'items Successfully Imported (but error in temp file deletion)', rejectedData: rejectedData});
                                }
                                else {
                                    res.json({code: Constant.SUCCESS_CODE, message: noOfaccepteditem + ' items successfully imported', invalid: rejected_item, valid: accepted_item});
                                }
                            });
                        });
            }
            else {
                res.json({code: Constant.DATA_NOT_FOUND_CODE, message: 'Please upload CSV files only'});
            }
        }
    });
}

/* Function is use to get item item  manufacturer by name
 * @access private
 * @return json
 * Created by Hemany khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 01-Nov-2017
 */

function getManufacturerByName(req, res) {
    if (!validator.isValidObject(req.body.companyId) || !validator.isValidObject(req.body.manufacturer)) {
        res.json({
            code: Constant.ERROR_CODE,
            message: Constant.REQUIRED_FILED_MISSING
        });
    } else {
        Item.find({"manufacturer": {"$regex": req.body.manufacturer, "$options": "i"}, companyId: req.body.companyId, deleted: false}).distinct('manufacturer').exec(function(err, manufacturerNames) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            }
            else {

                res.json({code: Constant.SUCCESS_CODE, data: manufacturerNames});

            }
        });
    }

}
/**
 * Function is use to remove Item  pic
 * @access private
 * @return json
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 13th-Nov-2017
 */
function removeItemPic(req, res) {
    if (req.body.itemId) {
        Item.findOneAndUpdate({_id: req.body.itemId}, {$set: {itemImage: null}}, function(err, data) {
            if (err) {
                res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
            } else {
                var itemImage = String(data.itemImage);
                var parsed = url.parse(itemImage);
                var removePath = "./images/item/" + path.basename(parsed.pathname);
                fs.unlink(removePath, function(err) {
                    if (err && err.code === 'ENOENT') {
                        // file doens't exist
                        res.json({code: Constant.ERROR_CODE, message: Constant.File_NO_LONGER_EXIST});
                    } else if (err) {
                        res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
                    }
                    else {
                        res.json({code: Constant.SUCCESS_CODE, message: Constant.ITEM_IMAGE_UPDATED});

                    }
                });

            }
        });
    }
    else {
        res.json({code: Constant.ERROR_CODE, message: Constant.REQUIRED_FILED_MISSING});
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            