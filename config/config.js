'use strict';
var data = '';
module.exports = {
    SECRET: 'crm@$12&*01',
    //    webUrl: 'http://52.34.207.5:5058',
    // webUrl: 'http://172.10.55.117:5000', //ramiz ip
    // webUrl:'http://172.10.92.129:5000',
    webUrl:'http://localhost:5000',
    WebFrontEndUrl: 'http://52.34.207.5:5057',
    frontEndIp: 'http://172.10.92.129:3000',
    //webUrl: 'http://52.39.212.226:5058',
    //WebFrontEndUrl: 'http://52.39.212.226:5057',
    //DIR_NAME: '/app',
    //Azure credential
    clientID: 'c3b4419e-3512-4e7d-9696-021ea1bba9fe',
    clientSecret: 'QfkvJUmVNbE3FRF2yCTl9b0KP3L7vilChA2wAybZbDU=', // if you are doing code or id_token code,
    azureEndUrl: 'https://login.windows.net/tel-pro.net/oauth2/token',
    azureResource: 'https://graph.windows.net/',
    MAILGUN: {
        api_key: 'key-48693eebb39808122245d8a272d6030c',
        secret: '5c6812ffffaaba8be41ccfeb2c6df4cc',
        domain_name: 'tel-pro.net'
        //domain_name: 'sandbox3249234.mailgun.org'
    },
    EMAIL_FROM: 'flex@tel-pro.net',
    EMAIL_BCC: 'flex@tel-pro.net',
    EMAIL_TEMP: 'sarveshd@smartdatainc.net',
    SUCCESS_CODE: 200,
    ERROR_CODE: 401,

    //Db Connections Urls
    // dbURL: 'mongodb://smartdata:Integr8ed@ds127123-a0.mlab.com:27123,ds127123-a1.mlab.com:27123/hive-prod1?replicaSet=rs-ds127123', //Db - Production
    dbURL: 'mongodb://telprofilemaker:telprofilemaker@ds157621.mlab.com:57621/telprofilemaker', //Db - Stagging
//    dbURL: 'mongodb://filemakerapp:filemakerapp@ds127132.mlab.com:27132/filemakerapp', // Db - Local


    AUTH0_TENANT: 'flex-auth',
    AUTH0_CLIENT_ID: 'xBBQ84BgP6Xp5qm93Zr7p17VzD5iP9l7',
    AUTH0_CONNECTION: 'tel-pro-net',
    AUTH0_REQUEST_LANGUAGE: 'en-US,en;q=0.8',
    shortidCharacters: {
        "characters": "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
    },
    data: '',

    extronItemSheet: {
        manufacturer: data["Manufacturer Name"],
        itemName: data["Item Description - Long"],
        modal: data["Model Name"],
        itemCategory: data["Manufacturer Item Category Code"],
        mfgUrl: data["Manufacturer Website Link/URL"],
        itemStatus: data["Item Status"],
    },
    extronSupplierSheet: {
        supplierName: data["Manufacturer Name"],
        listPrice: data["MSRP Price"],
        dealerPrice: data["Cost Column 1"],
        priceDate: data["Price Sheet Date"]
    }

};