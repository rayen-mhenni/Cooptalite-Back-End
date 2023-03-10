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
exports.ParRolesSchema = exports.ParRoles = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ParRoles = class ParRoles {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        type: String,
    }),
    __metadata("design:type", String)
], ParRoles.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", String)
], ParRoles.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: mongoose_2.default.Schema.Types.ObjectId,
            ref: 'Ability',
            required: true,
        },
    ]),
    __metadata("design:type", Array)
], ParRoles.prototype, "ability", void 0);
ParRoles = __decorate([
    (0, mongoose_1.Schema)()
], ParRoles);
exports.ParRoles = ParRoles;
exports.ParRolesSchema = mongoose_1.SchemaFactory.createForClass(ParRoles);
//# sourceMappingURL=parRoles.schema.js.map