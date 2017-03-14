"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const Observable_1 = require("rxjs/Observable");
class Employee {
    constructor(id, name, age, mobile) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.mobile = mobile;
    }
}
exports.Employee = Employee;
const EMPLOYEE = [
    new Employee(11, 'Mr. Nice', 20, '9999999999'),
    new Employee(12, 'Narco', 20, '9999999999'),
    new Employee(13, 'Bombasto', 20, '9999999999'),
    new Employee(14, 'Celeritas', 20, '9999999999'),
    new Employee(15, 'Magneta', 20, '9999999999'),
    new Employee(16, 'RubberMan', 20, '9999999999')
];
const FETCH_LATENCY = 500;
let EmployeeService = class EmployeeService {
    constructor(http) {
        this.http = http;
    }
    getEmployees() {
        return this.http
            .get("/api/employee/")
            .map(data => {
            return data.json();
        })
            .catch((error) => {
            return Observable_1.Observable.throw(error);
        });
    }
    getEmployee(id) {
        return this.http
            .get('/api/employee/employee/' + id)
            .map(data => data.json())
            .catch((error) => {
            return Observable_1.Observable.throw(error);
        });
    }
    newEmployee(newEmp) {
        if (newEmp) {
            return this.http.post("/api/employee/employee", JSON.stringify({ "data": newEmp }), new http_1.RequestOptions({
                headers: new http_1.Headers({ "Content-Type": "application/json" })
            }))
                .map(data => {
                console.log('success');
                console.log(data);
                return data;
            })
                .catch((error) => {
                console.log('error');
                return Observable_1.Observable.throw(error);
            });
        }
        else
            return;
    }
    deleteEmployeeById(id) {
        return this.http.delete("/api/employee/employee/" + id)
            .map(data => data)
            .catch((error) => {
            return Observable_1.Observable.throw(error);
        });
    }
    updateEmployee(id, emp) {
        if (emp) {
            return this.http.put("/api/employee/employee/" + id, JSON.stringify({ "data": emp }), new http_1.RequestOptions({
                headers: new http_1.Headers({ "Content-Type": "application/json" })
            }))
                .map(data => {
                return data;
            })
                .catch((error) => {
                console.log('error');
                return Observable_1.Observable.throw(error);
            });
        }
        else
            return;
    }
};
EmployeeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map