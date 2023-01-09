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
exports.parRolesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const exceptions_1 = require("@nestjs/common/exceptions");
const enums_1 = require("@nestjs/common/enums");
let parRolesService = class parRolesService {
    constructor(ParRoleModule) {
        this.ParRoleModule = ParRoleModule;
    }
    async addParRoles(parRolesDTO) {
        const OldRole = await this.ParRoleModule.findOne({
            name: parRolesDTO.name,
        });
        if (!OldRole) {
            const newRole = await this.ParRoleModule.create(parRolesDTO);
            return newRole.save();
        }
        else {
            throw new exceptions_1.HttpException('OldRole already exist', enums_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateParRoles(id, parRolesDTO) {
        const role = await this.ParRoleModule.findById(id);
        if (role) {
            await this.ParRoleModule.findByIdAndUpdate(role._id, {
                name: parRolesDTO.name || role.name,
                status: parRolesDTO.status || role.status,
            });
            return role;
        }
        else {
            throw new exceptions_1.HttpException('Role Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async findRole(name) {
        const role = await this.ParRoleModule.findOne({ name: name });
        if (!role) {
            throw new exceptions_1.HttpException('Role Not Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            return role;
        }
    }
    async findRoles() {
        const roles = await this.ParRoleModule.find();
        if (!roles) {
            throw new exceptions_1.HttpException('No Roles is Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            return roles;
        }
    }
    async deleteRole(id) {
        const role = await this.ParRoleModule.findOneAndDelete({ _id: id });
        if (!role) {
            throw new exceptions_1.HttpException('Role Not Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            return role;
        }
    }
};
parRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('parRoles')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], parRolesService);
exports.parRolesService = parRolesService;
//# sourceMappingURL=parRoles.service.js.map