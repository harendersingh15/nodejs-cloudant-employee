"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waterfall = require("async-waterfall");
const app_1 = require("../../app");
const employeeRouter = express_1.Router();
exports.employeeRouter = employeeRouter;
employeeRouter.get('/', (request, response) => {
    let rowData = [];
    app_1.db.list({ include_docs: true }, (err, result) => {
        if (err) {
            console.log(err);
            response.send('Something happend wrong!!!');
        }
        else {
            result.rows.forEach((item) => {
                rowData.push(item.doc);
            });
            response.send(rowData);
        }
    });
});
employeeRouter.get('/employee/:id', (req, res) => {
    let id = req.params.id;
    app_1.db.get(id, {
        revs_info: true
    }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            res.status(404).send('Doc not found');
        }
    });
});
employeeRouter.post('/employee', (request, response) => {
    console.log('hello new emp');
    let data = request.body.data || request.body;
    let emp = {
        'name': data.name,
        'age': data.age,
        'mobile': data.mobile
    };
    app_1.db.insert(emp, (err, doc) => {
        if (err) {
            console.log(err);
            response.status(500).send('some thing happen wrong');
        }
        else {
            app_1.db.get(doc.id, (err, data) => {
                if (err) {
                    response.status(500).send('Something went wrong!!!');
                }
                else {
                    response.send(data);
                }
            });
        }
    });
});
employeeRouter.put('/employee/:id', function (request, response, next) {
    console.log("Update Invoked..");
    let data = request.body.data || request.body;
    let id = request.params.id;
    let name = data.name;
    let age = data.age;
    let mobile = data.mobile;
    waterfall([
        (next) => {
            app_1.db.get(id, {
                revs_info: true
            }, (error, doc) => {
                if (error) {
                    next(error, null);
                }
                else {
                    doc.name = name;
                    doc.age = age;
                    doc.mobile = mobile;
                    next(null, doc);
                }
            });
        },
        (doc, next) => {
            app_1.db.insert(doc, doc.id, (err, res) => {
                if (err) {
                    next(err, null);
                }
                else {
                    next(null, res);
                }
            });
        }
    ], (err, result) => {
        if (err) {
            response.status(404).send('Employee not Found');
        }
        else {
            response.sendStatus(200);
        }
    });
});
employeeRouter.delete('/employee/:id', (request, response, next) => {
    let id = request.params.id;
    waterfall([
        (next) => {
            app_1.db.get(id, (error, doc) => {
                if (error) {
                    next(error, null);
                }
                else {
                    next(null, doc);
                }
            });
        },
        (doc, next) => {
            app_1.db.destroy(doc._id, doc._rev, (err, res) => {
                if (err) {
                    next(err, null);
                }
                else {
                    next(null, res);
                }
            });
        }
    ], (err, result) => {
        if (err) {
            response.status(404).send('Employee not Found');
        }
        else {
            response.sendStatus(200);
        }
    });
});
//# sourceMappingURL=employee.js.map