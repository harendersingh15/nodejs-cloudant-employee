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
const employee_service_1 = require("./employee.service");
let EmployeeListComponent = class EmployeeListComponent {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.addNewUser = false;
        this.userName = '';
        this.userMobileNumber = '';
    }
    ngOnInit() {
        this.getAllEmployee();
    }
    getAllEmployee() {
        this.employeeService
            .getEmployees()
            .subscribe((data => {
            this.employees = data;
        }), (error) => {
            console.log(error);
        });
    }
    saveEmployee() {
        if (this.userName && this.userAge && this.userMobileNumber) {
            let emp = new employee_service_1.Employee(0, this.userName, this.userAge, this.userMobileNumber);
            this.employeeService
                .newEmployee(emp)
                .subscribe((data => {
                this.employees.push(data.json());
                this.addNewUser = false;
                this.userAge = null;
                this.userMobileNumber = '';
                this.userName = '';
            }), (error) => {
                console.log(error);
            });
        }
        else {
            window.alert('Please fill all fields');
        }
    }
    deleteEmployee(id) {
        this.employeeService
            .deleteEmployeeById(id)
            .subscribe((data => {
            this.getAllEmployee();
        }), (error) => {
            console.log(error);
        });
    }
};
EmployeeListComponent = __decorate([
    core_1.Component({
        template: `
    <h3 highlight>Employee List</h3>
       <table class="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Mobile</th>
        <th>Age</th>
        <th><a href="javascript:void(0)" (click)="addNewUser = !addNewUser">Add New</a></th>
      </tr>
    </thead>
    <tbody>
    <tr *ngIf="addNewUser">
    <td>
      <input type="text" [(ngModel)]="userName" required  focused="true" placeholder="name...">
    </td>
    <td>
      <input type="text" [(ngModel)]="userMobileNumber" maxlength="10" minlenght = "10"  required placeholder="mobile...">
    </td>
    <td>
      <input type="text" [(ngModel)]="userAge" required placeholder="age...">
    </td>
    <td>
      <a href="javascript:void(0)" (click)="saveEmployee()" >save</a> |
      <a href="javascript:void(0)" (click)="addNewUser = !addNewUser" >X</a>
    </td>
    </tr>
      <tr  *ngFor='let employee of employees'>
        <td> <a routerLink="/employee/{{employee._id}}">{{employee.name}}</a></td>
        <td>{{employee.mobile}}</td>
        <td>{{employee.age}}</td>
        <td><a href="javascript:void(0)" (click)="deleteEmployee(employee._id)" >X</a></td>
      </tr>
    </tbody>
  </table>
  `
    }),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeListComponent);
exports.EmployeeListComponent = EmployeeListComponent;
//# sourceMappingURL=employee-list.component.js.map