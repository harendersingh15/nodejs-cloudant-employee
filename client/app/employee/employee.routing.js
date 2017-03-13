"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const employee_component_1 = require("./employee.component");
const employee_list_component_1 = require("./employee-list.component");
const employee_detail_component_1 = require("./employee-detail.component");
const routes = [
    { path: '',
        component: employee_component_1.EmployeeComponent,
        children: [
            { path: '', component: employee_list_component_1.EmployeeListComponent },
            { path: ':id', component: employee_detail_component_1.EmployeeDetailComponent }
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=employee.routing.js.map