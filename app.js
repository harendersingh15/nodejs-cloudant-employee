"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const express = require("express");
const path = require("path");
const body_parser_1 = require("body-parser");
const logger = require("morgan");
const multipart = require("connect-multiparty");
const methodOverride = require("method-override");
const index_1 = require("./routes/index");
const cloudant_connection_1 = require("./routes/db/cloudant-connection");
const app = express();
exports.app = app;
let multipartMiddleware = multipart();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//middleware
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
// app api registration
index_1.appRouter(app);
//db connection
let connection = new cloudant_connection_1.CloudantConnection();
connection.initDBConnection();
let db = connection.db;
exports.db = db;
// error handlers
// development error handler
// will print stacktrace
// development only
if ('development' == app.get('env')) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}
// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});
app.listen(app.get('port'), () => {
    console.log('server is running on port number' + app.get('port'));
});
//# sourceMappingURL=app.js.map