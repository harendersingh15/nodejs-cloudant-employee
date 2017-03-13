"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
exports.routes = [
    { path: '', redirectTo: '/employee', pathMatch: 'full' },
    { path: 'employee', loadChildren: 'app/employee/employee.module#EmployeeModule' }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routing.js.map