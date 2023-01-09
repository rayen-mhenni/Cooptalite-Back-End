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
exports.parRolesController = void 0;
const common_1 = require("@nestjs/common");
const parRoleDto_1 = require("./dtos/parRoleDto");
const parRoles_service_1 = require("./parRoles.service");
let parRolesController = class parRolesController {
    constructor(parRolesService) {
        this.parRolesService = parRolesService;
    }
    async AddRole(parRolesDTO) {
        const role = await this.parRolesService.addParRoles(parRolesDTO);
        return role;
    }
    async getRoles() {
        const role = await this.parRolesService.findRoles();
        return role;
    }
    async UpdateRole(id, parRolesDTO) {
        const role = await this.parRolesService.updateParRoles(id, parRolesDTO);
        if (!role)
            throw new common_1.NotFoundException('Role does not exist!');
        return role;
    }
    async getRole(name) {
        const role = await this.parRolesService.findRole(name);
        if (!role)
            throw new common_1.NotFoundException('Role does not exist!');
        return role;
    }
    async DeleteRole(id) {
        const user = await this.parRolesService.deleteRole(id);
        if (!user)
            throw new common_1.NotFoundException('Role does not exist!');
        return { message: 'ROLE DELETED ' };
    }
    async addAbility(ability) {
        const role = await this.parRolesService.addAbility(ability);
        return role;
    }
    async DeleteAbility(id) {
        const Ability = await this.parRolesService.deleteAbility(id);
        if (!Ability)
            throw new common_1.NotFoundException('Ability does not exist!');
        return { message: 'Ability DELETED ' };
    }
    async findAbility() {
        const role = await this.parRolesService.findAbility();
        if (!role)
            throw new common_1.NotFoundException('Ability does not exist!');
        return role;
    }
    async updateAbility(id, ability) {
        const role = await this.parRolesService.updateAbility(id, ability);
        if (!role)
            throw new common_1.NotFoundException('Ability does not exist!');
        return role;
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parRoleDto_1.parRolesDTO]),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "AddRole", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, parRoleDto_1.parRolesDTO]),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "UpdateRole", null);
__decorate([
    (0, common_1.Get)('/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "getRole", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "DeleteRole", null);
__decorate([
    (0, common_1.Post)('/ability'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "addAbility", null);
__decorate([
    (0, common_1.Delete)('/ability/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "DeleteAbility", null);
__decorate([
    (0, common_1.Get)('/ability'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "findAbility", null);
__decorate([
    (0, common_1.Put)('/ability/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], parRolesController.prototype, "updateAbility", null);
parRolesController = __decorate([
    (0, common_1.Controller)('api/parroles'),
    __metadata("design:paramtypes", [parRoles_service_1.parRolesService])
], parRolesController);
exports.parRolesController = parRolesController;
//# sourceMappingURL=parRoles.controller.js.map