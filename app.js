"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const express = require("express");
const path = require("path");
const body_parser_1 = require("body-parser");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const multipart = require("connect-multiparty");
const methodOverride = require("method-override");
const fs = require("fs");
// var express = require('express'),
//     routes = require('./routes'),
//     user = require('./routes/user'),
//     http = require('http'),
//     path = require('path'),
//     fs = require('fs');
var app = express();
var db;
var cloudant;
var fileToUpload;
var dbCredentials = {
    dbName: 'my_sample_db'
};
var multipartMiddleware = multipart();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(body_parser_1.urlencoded({
    extended: true
}));
app.use(body_parser_1.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/client', express.static(path.join(__dirname, '/client/app')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));
app.use(express.static(path.join(__dirname, 'node_modules')));
// development only
if ('development' == app.get('env')) {
    console.log('in to the development area');
    //app.use(express.static(path.join(__dirname, 'node_modules')));
    app.use(errorHandler());
}

function getDBCredentialsUrl(jsonData) {
    var vcapServices = JSON.parse(jsonData);
    // Pattern match to find the first instance of a Cloudant service in
    // VCAP_SERVICES. If you know your service key, you can access the
    // service credentials directly by using the vcapServices object.
    for (var vcapService in vcapServices) {
        if (vcapService.match(/cloudant/i)) {
            return vcapServices[vcapService][0].credentials.url;
        }
    }
}

function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
    } else {
        // When running this app locally you can get your Cloudant credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
        dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
    }
    cloudant = require('cloudant')(dbCredentials.url);
    // check if DB exists if not create
    cloudant.db.create(dbCredentials.dbName, function(err, res) {
        if (err) {
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
    });
    db = cloudant.use(dbCredentials.dbName);
}
initDBConnection();
// app.get('/', routes.index);
app.get('/test', function(request, response) {
    var rowData = [];
    db.list({ include_docs: true }, function(err, result) {
        if (err) {
            console.log(err);
            response.send('Something happend wrong!!!');
        } else {
            result.rows.forEach(function(item) {
                rowData.push(item.doc);
            });
            response.send(rowData);
        }
    });
});
app.get('/api/employee', function(request, response) {
    var rowData = [];
    db.list({ include_docs: true }, function(err, result) {
        if (err) {
            console.log(err);
            response.send('Something happend wrong!!!');
        } else {
            result.rows.forEach(function(item) {
                rowData.push(item.doc);
            });
            response.send(rowData);
        }
    });
});
app.get('/api/employee/employee/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.get(id, {
        revs_info: true
    }, function(err, doc) {
        if (!err) {
            res.send(doc);
        } else {
            res.status(404).send('Doc not found');
        }
    });
});
app.post('/api/employee/employee', function(request, response) {
    console.log('hello new emp');
    var data = request.body.data || request.body;
    var emp = {
        'name': data.name,
        'age': data.age,
        'mobile': data.mobile
    };
    db.insert(emp, function(err, doc) {
        if (err) {
            console.log(err);
            response.status(500).send('some thing happen wrong');
        } else {
            db.get(doc.id, function(err, data) {
                if (err) {
                    response.send(err);
                } else {
                    response.send(data);
                }
            });
        }
    });
});
app.delete('/api/employee/employee/:id', function(request, response) {
    var id = request.params.id;
    db.get(id, {
        revs_info: true
    }, function(err, doc) {
        if (!err) {
            db.destroy(doc._id, doc._rev, function(err, res) {
                // Handle response
                if (err) {
                    console.log(err);
                    response.sendStatus(500);
                } else {
                    response.sendStatus(200);
                }
            });
        }
    });
});
app.listen(app.get('port'), () => {
    console.log('server is running on port number' + app.get('port'));
});
// http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
//     console.log('Express server listening on port ' + app.get('port'));
// }); 
//# sourceMappingURL=app.js.map