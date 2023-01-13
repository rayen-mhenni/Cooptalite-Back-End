"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParRoleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const parRoles_controller_1 = require("./parRoles.controller");
const parRoles_schema_1 = require("./parRoles.schema");
const parRoles_service_1 = require("./parRoles.service");
let ParRoleModule = class ParRoleModule {
};
ParRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'ParRoles',
                    schema: parRoles_schema_1.ParRolesSchema,
                },
            ]),
        ],
        providers: [parRoles_service_1.parRolesService],
        controllers: [parRoles_controller_1.parRolesController],
        exports: [parRoles_service_1.parRolesService],
    })
], ParRoleModule);
exports.ParRoleModule = ParRoleModule;
//# sourceMappingURL=parRoles.module.js.map