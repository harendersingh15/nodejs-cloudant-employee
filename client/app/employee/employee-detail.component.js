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
const router_1 = require("@angular/router");
const employee_service_1 = require("./employee.service");
let EmployeeDetailComponent = class EmployeeDetailComponent {
    constructor(route, employeeService) {
        this.route = route;
        this.employeeService = employeeService;
    }
    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        this.employeeService
            .getEmployee(id).subscribe(employee => {
            this.employee = employee;
        }, (error) => console.log(error));
    }
    updatedEmployee(id) {
        this.employeeService
            .updateEmployee(id, this.employee)
            .subscribe((res => {
            window.alert('updated successfully!!!');
        }), (error) => {
            console.log(error);
        });
    }
};
EmployeeDetailComponent = __decorate([
    core_1.Component({
        template: `
    <h3 highlight>Employee Detail</h3>
    <div *ngIf="employee">
      <div>Id: {{employee._id}}</div><br>
      <label>Name:
        <input [(ngModel)]="employee.name">
      </label>
      <label>Mobile:
         <input maxlength="10" [(ngModel)]="employee.mobile">
      </label>
      <label>Age:
         <input [(ngModel)]="employee.age">
      </label>   
    </div>
    <br>
    <a href="javascript:void(0)" (click)="updatedEmployee(employee._id)">Save</a>|
  
    <a routerLink="../">Employee List</a>
  `
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        employee_service_1.EmployeeService])
], EmployeeDetailComponent);
exports.EmployeeDetailComponent = EmployeeDetailComponent;
//# sourceMappingURL=employee-detail.component.js.map