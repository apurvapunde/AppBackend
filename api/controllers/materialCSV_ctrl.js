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
var _ = require('underscore');
var condition;
var offset;




module.exports = {
    uploadExtronFile: uploadExtronFile,
    uploadCrestronFile: uploadCrestronFile,
    uploadCrestronXlsxFile: uploadCrestronXlsxFile,
    uploadExtronFileXlsxFile: uploadExtronFileXlsxFile,
};


/**
 * Function to add item for Extron Trough csv
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 24-Jan-2018
 */


function uploadExtronFile(req, res) {
    var itemSaveData = {};
    var rejectedData = [];
    var previousData = [];
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
                csv.fromStream(stream, {headers: true}, {headers: true})
                        .validate(function(data, next) {
                            previousData.push(data.name);
                            Item.findOne({'manufacturer': {"$regex": data["Manufacturer Name"], "$options": "i"}, 'modal': {"$regex": data["Model Name"], "$options": "i"}, deleted: false},
                            function(err, item) {
                                if (err) {
                                    next(err);
                                }
                                else {
                                    if (item !== null) {
                                        supplier.count({"supplierName": {"$regex": data["Manufacturer Name"], "$options": "i"}, itemId: item._id, deleted: false},
                                        function(err, supData) {
                                            if (err) {
                                                next(err);
                                            }
                                            else {
                                                if (supData <= 0) {
                                                    var supplierData = {
                                                        supplierName: data["Manufacturer Name"],
                                                        listPrice: data["MSRP Price"],
                                                        dealerPrice: data["Cost Column 1"],
                                                        priceDate: data["Price Sheet Date"],
                                                        itemId: item._id
                                                    };
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
                                manufacturer: data["Manufacturer Name"],
                                itemName: data["Item Description - Long"],
                                modal: data["Model Name"],
                                itemCategory: data["Manufacturer Item Category Code"],
                                mfgUrl: data["Manufacturer Website Link/URL"],
                                itemStatus: data["Item Status"],
                                companyId: companyId,
                                createdBy: createdBy,
                                itemTypeId: itemTypeId
                            };
                            Item(itemData).save(function(err, idata) {
                                if (err) {
                                    console.log("errr", err);
                                } else {
                                    var supplierData = {
                                        supplierName: data["Manufacturer Name"],
                                        listPrice: data["MSRP Price"],
                                        dealerPrice: data["Cost Column 1"],
                                        priceDate: data["Price Sheet Date"],
                                        itemId: idata._id
                                    };
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

/**
 * Function to add item upload for crestron Trough csv
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 7-July-2017
 */


function uploadCrestronFile(req, res) {

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
                //["SKU", "NAME", "DESCRIPTION", "DEALER_PRICE", "PRICE"]
                csv.fromStream(stream, {headers: true})
                        .validate(function(data, next) {
                            previousData.push(data.name);
                            Item.findOne({'manufacturer': {"$regex": "Crestron", "$options": "i"}, 'modal': {"$regex": data["MODEL"], "$options": "i"}, deleted: false},
                            function(err, item) {
                                if (err) {
                                    next(err);
                                }
                                else {
                                    if (item !== null) {
                                        supplier.count({"supplierName": {"$regex": "Crestron", "$options": "i"}, itemId: item._id, deleted: false},
                                        function(err, supData) {
                                            if (err) {
                                                next(err);
                                            }
                                            else {
                                                if (supData <= 0) {
                                                    var supplierData = {
                                                        supplierName: "Crestron",
                                                        itemId: item._id
                                                    };

                                                    if ((data["DEALER"] !== "Contact")) {
                                                        supplierData.dealerPrice = data["DEALER"].replace('$', '');
                                                    }
                                                    if ((data["LIST"] !== "Contact")) {
                                                        supplierData.listPrice = data["LIST"].replace('$', '')

                                                    }
                                                    supplier(supplierData).save(function(err, supplierdata) {

                                                    });
                                                }
                                            }
                                        });

                                        next(null, !item);
                                    } else {
                                        Array.prototype.push.call(rejected_item, data);
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
                                manufacturer: "Crestron",
                                partNumber: data["NUMBER"],
                                modal: data["MODEL"],
                                itemName: data["DESCRIPTION"],
                                companyId: companyId,
                                createdBy: createdBy,
                                itemTypeId: itemTypeId
                            };
                            if ((data["DEALER"] === "Contact") || (data["LIST"] === "Contact")) {
                                itemData.notes = "the dealer needs to be contacted for pricing";

                            }
                            if ((data["DEALER"] === "N/A") || (data["LIST"] === "N/A")) {
                                itemData.itemStatus = "Upcoming";
                                itemData.notes = "Release Date: TBA"

                            }
                            Item(itemData).save(function(err, idata) {
                                if (err) {
                                    console.log("errr", err);
                                } else {
                                    var supplierData = {
                                        supplierName: "Crestron",
                                        itemId: idata._id
                                    };
                                    if ((data["DEALER"] !== "Contact")) {
                                        supplierData.dealerPrice = data["DEALER"].replace('$', '');
                                    }
                                    if ((data["LIST"] !== "Contact")) {
                                        supplierData.listPrice = data["LIST"].replace('$', '');

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


/**
 * Function to add item upload for crestron Trough xlsx
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 7-Jan-2018
 */
function uploadCrestronXlsxFile(req, res) {

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
    var xlsxPath = "./csv/" + timestamp + '_' + file.originalname;
    fs.writeFile(path.resolve(xlsxPath), file.buffer, function(err) {
        if (err) {

            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            var XLSX = require('xlsx');
            var saveData = {};
            var extention = path.extname(xlsxPath);
            if (extention === '.xlsx') {

                var workbook = XLSX.readFile(xlsxPath);
                var sheet_name_list = workbook.SheetNames;
                sheet_name_list.forEach(function(y) {

                    var worksheet = workbook.Sheets[y];
                    var headers = {};
                    var data = [];
                    for (var z in worksheet) {
                        if (z[0] === '!')
                            continue;
                        //parse out the column, row, and value
                        var tt = 0;
                        for (var i = 0; i < z.length; i++) {
                            if (!isNaN(z[i])) {
                                tt = i;
                                break;
                            }
                        }
                        ;
                        var col = z.substring(0, tt);
                        var row = parseInt(z.substring(tt));
                        var value = worksheet[z].v;
                        //store header names
                        if (row == 2 && value) {
                            headers[col] = value;
                            continue;
                        }

                        if (!data[row])
                            data[row] = {};
                        data[row][headers[col]] = value;
                    }
                    //drop those first two rows which are empty
                    data.shift();
                    data.shift();
                    var materialDataArray = data.slice(1);
                    async.each(materialDataArray, function(items, callback) {
                        Item.findOne({'partNumber': {"$regex": items["Part Number (Primary Unique Index)"], "$options": "i"}, deleted: false},
                        function(err, itemValues) {
                            if (err) {
                                next(err);
                            }
                            else {
                                if (itemValues !== null) {
                                    supplier.count({"supplierName": {"$regex": items["Manufacturer Name"], "$options": "i"}, itemId: itemValues._id, deleted: false},
                                    function(err, supData) {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            if (supData <= 0) {
                                                var supplierData = {
                                                    supplierName: items["Manufacturer Name"],
                                                    itemId: itemValues._id,
                                                    dealerPrice: items["Dealer’s Cost Column 1"],
                                                    listPrice: items["List Price/MSRP/Price for Resale"]

                                                };
                                                supplier(supplierData).save(function(err, supplierdata) {
                                                    callback();
                                                });
                                            }
                                            else {
                                                items.reason = "Duplicate Part Number"
                                                Array.prototype.push.call(rejected_item, items);
                                                callback();
                                                console.log("sucess repeat")
                                            }
                                        }
                                    });
                                } else {
                                    if (itemValues == null) {

                                        var itemData = {
                                            manufacturer: items["Manufacturer Name"],
                                            partNumber: items["Part Number (Primary Unique Index)"],
                                            itemName: items["Short Description"],
                                            companyId: companyId,
                                            createdBy: createdBy,
                                            itemTypeId: itemTypeId
                                        };
                                        if ((items["Dealer’s Cost Column 1"] === "Contact") || (items["List Price/MSRP/Price for Resale"] === "Contact")) {
                                            itemData.notes = "the dealer needs to be contacted for pricing";

                                        }
                                        if ((items["Dealer’s Cost Column 1"] === "N/A") || (items["LIST"] === "N/A")) {
                                            itemData.itemStatus = "Upcoming";
                                            itemData.notes = "Release Date: TBA"

                                        }
                                        Item(itemData).save(function(err, idata) {
                                            if (err) {
                                                console.log("errr", err);
                                            } else {
                                                var supplierData = {
                                                    supplierName: items["Manufacturer Name"],
                                                    itemId: idata._id,
                                                    dealerPrice: items["Dealer’s Cost Column 1"],
                                                    listPrice: items["List Price/MSRP/Price for Resale"]

                                                };
                                                supplier(supplierData).save(function(err, supplierdata) {
                                                    console.log("SUCESSS new");
                                                    callback();

                                                });




                                            }
                                        });
                                        Array.prototype.push.call(accepted_item, items);
                                        noOfaccepteditem++;
                                    }
                                    else {
                                        console.log("already availble")
                                        items.reason = "Duplicate Part Number"

                                        Array.prototype.push.call(rejected_item, items);
                                        callback();
                                    }
                                }
                            }
                        });

                    }, function(err) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, message: noOfaccepteditem + ' items successfully imported', invalid: rejected_item, valid: accepted_item});

                        }

                    });
                });
            }
            else {
                res.json({code: Constant.DATA_NOT_FOUND_CODE, message: 'Please upload xlsx files only'});
            }
        }
    });
}
/**
 * Function to add item upload for extron Trough xlsx
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 7-Feb-2018
 */
function uploadExtronFileXlsxFile(req, res) {

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
    var xlsxPath = "./csv/" + timestamp + '_' + file.originalname;
    fs.writeFile(path.resolve(xlsxPath), file.buffer, function(err) {
        if (err) {
            res.json({code: Constant.ERROR_CODE, message: Constant.INTERNAL_ERROR});
        } else {
            var XLSX = require('xlsx');
            var saveData = {};
            var extention = path.extname(xlsxPath);
            if (extention === '.xlsx') {

                var workbook = XLSX.readFile(xlsxPath);
                var sheet_name_list = workbook.SheetNames;
                sheet_name_list.forEach(function(y) {

                    var worksheet = workbook.Sheets[y];
                    var headers = {};
                    var data = [];
                    for (var z in worksheet) {
                        if (z[0] === '!')
                            continue;
                        //parse out the column, row, and value
                        var tt = 0;
                        for (var i = 0; i < z.length; i++) {
                            if (!isNaN(z[i])) {
                                tt = i;
                                break;
                            }
                        }
                        ;
                        var col = z.substring(0, tt);
                        var row = parseInt(z.substring(tt));
                        var value = worksheet[z].v;
                        //store header names
                        if (row == 2 && value) {
                            headers[col] = value;
                            continue;
                        }

                        if (!data[row])
                            data[row] = {};
                        data[row][headers[col]] = value;
                    }
                    //drop those first two rows which are empty
                    data.shift();
                    data.shift();
                    var materialDataArray = data.slice(1);
                    async.each(materialDataArray, function(items, callback) {
                        Item.findOne({'partNumber': {"$regex": items["Part Number"], "$options": "i"}, 'modal': {"$regex": items["Model Name"], "$options": "i"}, deleted: false},
                        function(err, itemValues) {
                            if (err) {
                                callback(err);
                            }
                            else {
                                if (itemValues !== null) {
                                    supplier.count({"supplierName": {"$regex": items["Manufacturer Name"], "$options": "i"}, itemId: itemValues._id, deleted: false},
                                    function(err, supData) {
                                        if (err) {
                                            callback(err);
                                        }
                                        else {
                                            if (supData <= 0) {
                                                var supplierData = {
                                                    supplierName: items["Manufacturer Name"],
                                                    listPrice: items["MSRP Price"],
                                                    dealerPrice: items["Cost Column 1"],
                                                    priceDate: items["Price Sheet Date"],
                                                    itemId: itemValues._id
                                                };
                                                supplier(supplierData).save(function(err, supplierdata) {
                                                    callback();
                                                });
                                            }
                                            else {
                                                items.reason = "Duplicate Model Name or Part No."
                                                Array.prototype.push.call(rejected_item, items);
                                                callback();
                                                console.log("sucess repeat")
                                            }
                                        }
                                    });
                                } else {
                                    if (itemValues == null) {

                                        var itemData = {
                                            manufacturer: items["Manufacturer Name"],
                                            itemName: items["Item Description - Long"],
                                            modal: items["Model Name"],
                                            itemCategory: items["Manufacturer Item Category Code"],
                                            mfgUrl: items["Manufacturer Website Link/URL"],
                                            itemStatus: items["Item Status"],
                                            partNumber: items["Part Number"],
                                            companyId: companyId,
                                            createdBy: createdBy,
                                            itemTypeId: itemTypeId
                                        };
                                        Item(itemData).save(function(err, idata) {
                                            if (err) {
                                                console.log("errr", err);
                                            } else {
                                                var supplierData = {
                                                    supplierName: items["Manufacturer Name"],
                                                    listPrice: items["MSRP Price"],
                                                    dealerPrice: items["Cost Column 1"],
                                                    priceDate: items["Price Sheet Date"],
                                                    itemId: idata._id
                                                };
                                                supplier(supplierData).save(function(err, supplierdata) {
                                                    console.log("SUCESSS");
                                                    callback();
                                                });



                                            }
                                        });
                                        Array.prototype.push.call(accepted_item, items);
                                        noOfaccepteditem++;
                                    }
                                    else {
                                        console.log("already availble")
                                        items.reason = "Duplicate Model Name or Part No."

                                        Array.prototype.push.call(rejected_item, items);
                                        callback();
                                    }
                                }
                            }
                        });

                    }, function(err) {
                        if (err) {
                            res.json({code: Constant.ERROR_CODE, message: err});
                        } else {
                            res.json({code: Constant.SUCCESS_CODE, message: noOfaccepteditem + ' items successfully imported', invalid: rejected_item, valid: accepted_item});

                        }

                    });
                });
            }
            else {
                res.json({code: Constant.DATA_NOT_FOUND_CODE, message: 'Please upload xlsx files only'});
            }
        }
    });
}