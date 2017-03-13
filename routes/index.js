/*
 * GET home page.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("./employee/employee");
const appRouter = (app) => {
    app.use('/api/employee', employee_1.employeeRouter);
};
exports.appRouter = appRouter;
//# sourceMappingURL=index.js.map