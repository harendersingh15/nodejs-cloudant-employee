"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = require("../../app");
const employeeRouter = express_1.Router();
exports.employeeRouter = employeeRouter;
employeeRouter.get('/', function (request, response) {
    var rowData = [];
    app_1.db.list({ include_docs: true }, function (err, result) {
        if (err) {
            console.log(err);
            response.send('Something happend wrong!!!');
        }
        else {
            result.rows.forEach(function (item) {
                rowData.push(item.doc);
            });
            response.send(rowData);
        }
    });
});
employeeRouter.get('/employee/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    app_1.db.get(id, {
        revs_info: true
    }, function (err, doc) {
        if (!err) {
            res.send(doc);
        }
        else {
            res.status(404).send('Doc not found');
        }
    });
});
employeeRouter.post('/employee', function (request, response) {
    console.log('hello new emp');
    var data = request.body.data || request.body;
    var emp = {
        'name': data.name,
        'age': data.age,
        'mobile': data.mobile
    };
    app_1.db.insert(emp, function (err, doc) {
        if (err) {
            console.log(err);
            response.status(500).send('some thing happen wrong');
        }
        else {
            app_1.db.get(doc.id, function (err, data) {
                if (err) {
                    response.send(err);
                }
                else {
                    response.send(data);
                }
            });
        }
    });
});
employeeRouter.delete('/employee/:id', function (request, response) {
    var id = request.params.id;
    app_1.db.get(id, {
        revs_info: true
    }, function (err, doc) {
        if (!err) {
            app_1.db.destroy(doc._id, doc._rev, function (err, res) {
                // Handle response
                if (err) {
                    console.log(err);
                    response.sendStatus(500);
                }
                else {
                    response.sendStatus(200);
                }
            });
        }
    });
});
//# sourceMappingURL=employee.js.map