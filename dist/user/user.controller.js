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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create-user-dto");
const user_service_1 = require("./user.service");
const ResetUserPasswordDto_1 = require("./dtos/ResetUserPasswordDto");
const jwt_1 = require("@nestjs/jwt");
require("dotenv/config");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async UpdateProfile(id, UserDTO) {
        const user = await this.userService.updateuserprofile(id, UserDTO);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
    async calculateScoreCoopt(id) {
        const score = await this.userService.calculateScoreCoopt(id);
        return { score, userId: id };
    }
    async updateCooptationstatus(memberId, cooptationId, status) {
        const cooptation = await this.userService.updateCooptationstatus(memberId, cooptationId, status);
        if (!cooptation)
            throw new common_1.NotFoundException('cooptation does not exist!');
        return cooptation;
    }
    async getuserByEmail(email) {
        const user = await this.userService.findUser(email.email);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        const payload = {
            email: user.profileData.userAbout.email,
            sub: user._id,
            role: user.profileData.role,
        };
        const access_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
        });
        return { user, token: access_token };
    }
    async updateuser(id, UserDTO) {
        const user = await this.userService.updateuser(id, UserDTO);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
    async activate(id) {
        const user = await this.userService.activate(id);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
    async deactivate(id) {
        const user = await this.userService.deactivate(id);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
    async ResetUserPassword(restpassDto) {
        const user = await this.userService.ResetUserPassword(restpassDto);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
    async ResetMyPassword(password, id) {
        const user = await this.userService.ResetMyPassword(id, password);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
    async DeleteUser(id) {
        const user = await this.userService.deleteuser(id);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return { message: 'USER DELETED ' };
    }
    async findUserByRole() {
        const user = await this.userService.findUserByRole();
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
    async findUsers() {
        const user = await this.userService.findUsers();
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
    async findUsersById(id) {
        const user = await this.userService.findUserById(id);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return user;
    }
};
__decorate([
    (0, common_1.Put)('/myprofile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateProfile", null);
__decorate([
    (0, common_1.Get)('/MyScore/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "calculateScoreCoopt", null);
__decorate([
    (0, common_1.Put)('/updateCooptation/status/:memberId/:cooptationId/:status'),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, common_1.Param)('cooptationId')),
    __param(2, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateCooptationstatus", null);
__decorate([
    (0, common_1.Post)('/email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getuserByEmail", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateuser", null);
__decorate([
    (0, common_1.Put)('/activate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "activate", null);
__decorate([
    (0, common_1.Put)('/deactivate/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Put)('/reset/password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetUserPasswordDto_1.ResetUserPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ResetUserPassword", null);
__decorate([
    (0, common_1.Put)('/reset/mypassword/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ResetMyPassword", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "DeleteUser", null);
__decorate([
    (0, common_1.Get)('/role'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserByRole", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsersById", null);
UserController = __decorate([
    (0, common_1.Controller)('/api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map