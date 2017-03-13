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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:member-ordering no-unused-variable */
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const title_component_1 = require("./title.component");
let CoreModule = CoreModule_1 = class CoreModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot() {
        return {
            ngModule: CoreModule_1,
            providers: []
        };
    }
};
CoreModule = CoreModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [title_component_1.TitleComponent],
        exports: [title_component_1.TitleComponent],
        providers: []
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [CoreModule])
], CoreModule);
exports.CoreModule = CoreModule;
var CoreModule_1;
//# sourceMappingURL=core.module.js.map