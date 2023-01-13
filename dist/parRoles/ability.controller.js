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
exports.abilityController = void 0;
const common_1 = require("@nestjs/common");
const parRoles_service_1 = require("./parRoles.service");
let abilityController = class abilityController {
    constructor(parRolesService) {
        this.parRolesService = parRolesService;
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
        const ability = await this.parRolesService.findAbility();
        if (!ability)
            throw new common_1.NotFoundException('Ability does not exist!');
        return ability;
    }
    async findAvailableAbility() {
        const ability = await this.parRolesService.findAvailableAbility();
        if (!ability)
            throw new common_1.NotFoundException('Ability does not exist!');
        return ability;
    }
    async updateAbility(id, ability) {
        const uability = await this.parRolesService.updateAbility(id, ability);
        if (!uability)
            throw new common_1.NotFoundException('Ability does not exist!');
        return uability;
    }
    async deleteAbilityBySubject(subject) {
        const Ability = await this.parRolesService.deleteAbilityBySubject(subject);
        if (!Ability)
            throw new common_1.NotFoundException('Subject does not exist!');
        return { message: 'Ability DELETED ' };
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], abilityController.prototype, "addAbility", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], abilityController.prototype, "DeleteAbility", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], abilityController.prototype, "findAbility", null);
__decorate([
    (0, common_1.Get)('/active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], abilityController.prototype, "findAvailableAbility", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], abilityController.prototype, "updateAbility", null);
__decorate([
    (0, common_1.Delete)('/deleteAll/:subject'),
    __param(0, (0, common_1.Param)('subject')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], abilityController.prototype, "deleteAbilityBySubject", null);
abilityController = __decorate([
    (0, common_1.Controller)('api/ability'),
    __metadata("design:paramtypes", [parRoles_service_1.parRolesService])
], abilityController);
exports.abilityController = abilityController;
//# sourceMappingURL=ability.controller.js.map