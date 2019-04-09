'use strict';
var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = require('express')();
var compression = require('compression');
module.exports = app; // for testing
var path = require('path');
require('./config/db');
var environmentConfig = require('./config/environmentConfig');

var utils = require('./api/lib/util');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(compression());
app.use('/images', express.static(path.join(__dirname, './images')));
app.use('/pdfImages', express.static(path.join(__dirname, './pdfImages')));
app.use('/Timages', express.static(path.join(__dirname, './htmlPdf')));
app.use('/sampleFiles', express.static(path.join(__dirname, './sampleFiles')));
app.use('/documentFile', express.static(path.join(__dirname, './documentFile')));
app.use('/emailTemplate', express.static(path.join(__dirname, './emailTemplate')));
app.use('/pdf', express.static(path.join(__dirname, './pdf')));
app.use('/csv/estimate', express.static(path.join(__dirname, './csv/estimate')));
var config = {
    appRoot: __dirname // required config
};var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    console.log('User connected',socket.id)

//    socket.on('update estimate', function(msg){
//        console.log('Message received: ', msg);
//        // socket.emit('update estimate', msg);
//        socket.broadcast.emit('update estimate', msg);
//    });
     socket.on('update estimate', function(modifiedBy){
        console.log('Message received: ', modifiedBy);
        // socket.emit('update estimate', msg);
        socket.broadcast.emit('update estimate', modifiedBy);
    });

    socket.on('disconnect', function(){
        console.log('User has disconnected');
    });
});
http.listen(4001, function(){
  console.log('listening on *:4001');
});



SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // All api requests
    app.use(function (req, res, next) {

        // res.header('Access-Control-Allow-Origin',  'http://172.10.55.135:5000');
        res.header("Access-Control-Allow-Origin", "*");

        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization');

        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }

    });

    //Check to call web services where token is not required//
    if (process.env.NODE_ENV !== 'development') {
        app.use('/api/*', function (req, res, next) {
            var freeAuthPath = [
                '/api/signIn',
                '/api/azureSignIn',
                '/api/checkToken'
            ];

            var available = false;
            for (var i = 0; i < freeAuthPath.length; i++) {
                if (freeAuthPath[i] === req.baseUrl) {
                    available = true;
                    break;
                }
            }
            if (!available) {
                utils.ensureAuthorized(req, res, next);
            } else {
                next();
            }
        });
    }


    // enable SwaggerUI
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

    // install middleware
    swaggerExpress.register(app);

    app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
    //app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    if (process.env.NODE_ENV !== 'development') {
        var SERVERPORT = environmentConfig.development.port;
        var SERVERURL = environmentConfig.development.host;
    }
    
    else {
        var SERVERPORT = environmentConfig.production.port;
        var SERVERURL = environmentConfig.production.host;
    }


    var port = process.env.PORT || SERVERPORT;

// increase the timeout to 30 minutes
//    var server = app.listen(port)
    app.listen(port).timeout = 1800000;


    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl ' + SERVERURL + ':' + port);
    }
});