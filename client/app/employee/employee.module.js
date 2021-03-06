"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../shared/shared.module");
const employee_component_1 = require("./employee.component");
const employee_detail_component_1 = require("./employee-detail.component");
const employee_list_component_1 = require("./employee-list.component");
const employee_routing_1 = require("./employee.routing");
let EmployeeModule = class EmployeeModule {
};
EmployeeModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule, employee_routing_1.routing],
        declarations: [
            employee_component_1.EmployeeComponent,
            employee_detail_component_1.EmployeeDetailComponent,
            employee_list_component_1.EmployeeListComponent,
        ]
    })
], EmployeeModule);
exports.EmployeeModule = EmployeeModule;
//# sourceMappingURL=employee.module.js.map