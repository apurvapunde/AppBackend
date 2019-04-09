"use strict";
var mongoose = require('mongoose'),
        DropboxField = mongoose.model('DropboxField'),
        Config = require('../../config/config.js'),
        Constant = require('../../config/constant.js'),
        Item = mongoose.model('Item'),
        ItemCategory = mongoose.model('ItemCategory'),
        ItemType = mongoose.model('ItemType'),
        Company = mongoose.model('Company'),
        validator = require('../../config/validator.js'),
        Constant = require('../../config/constant.js'),
        Config = require('../../config/config.js'),
        supplier = mongoose.model('Supplier');
var async = require("async");
var path = require('path');
var moment = require('moment-timezone');
var Dropbox = require("dropbox");
var csv = require("fast-csv");
var _ = require('underscore');
var fs = require('fs-extra');
var dbx = new Dropbox({accessToken: '3H3-K9jFHZAAAAAAAADKMuwm9gWPEAkmJWABwoYhFE8cfJzv0lfSBWz6Vv81_6Re'});


/**
 * Function to add item Trough through dropbox files
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 3-Oct-2017
 **/
function getUploadItemFileFromDropBox(req, res) {
    dbx.filesListFolder({path: '/telpro-svr/documents/Office/Item Import'}) //--> function use to get list of files a perticular file
            .then(function(response) {
                async.each(response.entries, function(items, callback) {

                    var extention = path.extname(items.path_lower);
                    if (extention === '.csv') {
                        DropboxField.findOne({fileId: items.id}, function(err, itemdata) {
                            if (err) {
                                callback(err);
                            }
                            else {
                                if (!itemdata) {
                                    var itemData = {
                                        fileId: items.id,
                                        fileName: items.name
                                    };
                                    DropboxField(itemData).save(function(err, supplierdata) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            dbx.filesDownload({path: items.path_lower})//this is downloading file from dropbox
                                                    .then(function(data) {
                                                        var csvPath = "./csv/" + data.name;
                                                        fs.writeFile(path.resolve(csvPath), data.fileBinary, 'binary', function(err) {
                                                            if (err) {
                                                                throw err;
                                                            }
                                                            else {
                                                                var itemSaveData = {};
                                                                var rejectedData = [];
                                                                var previousData = [];
                                                                var rejected_resident = new Object();
                                                                var rejected_item = new Object();
                                                                var accepted_item = new Object();
                                                                var noOfaccepteditem = 0;
                                                                var saveData = {};
                                                                var stream = fs.createReadStream(csvPath);
                                                                csv.fromStream(stream, {headers: true}, {headers: ["itemName", "mfg", "description", "notes", "dealerPrice", "listPrice", "partNumber", "itemCategory", "labourHours", "demoPrice", "series", "leadTimeDays", "supplySource", "itemStatus", "priceSchedule"]})
                                                                        .validate(function(data, next) {
                                                                            if ((!isNaN(data.dealerPrice)) && (!isNaN(data.listPrice)) && (!isNaN(data.demoPrice)) && (!isNaN(data.leadTimeDays))) {
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
                                                                            }
                                                                            else {
                                                                                next(null, 0);
                                                                            }
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
                                                                                taa: data["taa"],
                                                                                mfgUrl: data["mfgUrl"],
                                                                                itemStatus: data["itemStatus"] !== "" ? data["itemStatus"] : "Available",
                                                                                manufactureWarranty: data["manufactureWarranty"],
                                                                                companyId: mongoose.Types.ObjectId("5936895125da631546bfb13e"),
                                                                                createdBy: "HIVE",
                                                                                itemTypeId: mongoose.Types.ObjectId("599809774fd8b20884f8deb2") //need to changes id when work with herokuapp
                                                                            };
                                                                            Item(itemData).save(function(err, idata) {
                                                                                if (err) {
                                                                                    console.log("errr", err);
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
                                                                                    console.log("Some thing went wrong");
                                                                                }
                                                                                else {
                                                                                    console.log("Process compleated sucessfully");
//                                                                          
                                                                                }
                                                                            });
                                                                        });
                                                            }
                                                        });

                                                    })
                                                    .catch(function(err) {
                                                        throw err;
                                                    });
                                        }
                                    });
                                } else {
                                    console.log("Already exits");
                                }
                            }
                        });
                    }
//                    else if (extention === '.xlsx') {
//                        var result = items.name.match(/crestron|extron/i);
//                        if (result) {
//                            var filename = result[0];
//                            var supplierName = filename.toUpperCase();
//                            console.log("gfggggg", supplierName)
//
//                            switch (supplierName) {
//                                case "CRESTRON":
//                                    uploadDropboxCrestronXlsxFile()
//                                    break;
//                                case "EXTRON":
//                                    uploadDropboxExtronFileXlsxFile()
//                                    break;
//                            }
//                        }
//                    }
                    else {
                        // console.log("ELSE ONE")
                        // console.log("Wrong file");
                    }
                }, function(err) {
                    if (err) {
                        console.log("Error");
                    } else {
                        console.log("DropBox Success");
                    }

                });

            })
            .catch(function(error) {
                console.log(error);
            });
    setTimeout(getUploadItemFileFromDropBox, 10000);
}

getUploadItemFileFromDropBox();





/**
 * Function to add item upload for crestron Trough xlsx
 * @access private
 * @return json 
 * Created by Hemant Khandait
 * @smartData Enterprises (I) Ltd
 * Created Date 7-Jan-2018
 */
function uploadDropboxCrestronXlsxFile(req, res) {

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
            console.log("error");

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
                                            companyId: mongoose.Types.ObjectId("5936895125da631546bfb13e"),
                                            createdBy: "HIVE",
                                            itemTypeId: mongoose.Types.ObjectId("599809774fd8b20884f8deb2") //need to changes id when work with herokuapp
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
                            console.log("Error");
                        } else {
                            console.log("SUCESSS");

                        }

                    });
                });
            }
            else {
                console.log("Wrong File");
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
function uploadDropboxExtronFileXlsxFile(req, res) {

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

            console.log("Error");

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
                                            companyId: mongoose.Types.ObjectId("5936895125da631546bfb13e"),
                                            createdBy: "HIVE",
                                            itemTypeId: mongoose.Types.ObjectId("599809774fd8b20884f8deb2") //need to changes id when work with herokuapp
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
                            console.log("Error");

                        } else {
                            console.log("SUCESSS RESPONSE");

                        }

                    });
                });
            }
            else {
                console.log("SUCESSS");
            }
        }
    });
}