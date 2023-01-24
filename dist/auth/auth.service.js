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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const utils_1 = require("../utils");
require("dotenv/config");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findUser(email);
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (user && isPasswordMatch) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = {
            email: user.profileData.userAbout.email,
            sub: user._id,
            role: user.profileData.role,
        };
        const access_token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
        });
        const role = (0, utils_1.encryptString)(user.profileData.role, access_token.slice(0, 16));
        const ability = user.ability.map((ele) => ({
            action: (0, utils_1.encryptString)(ele.action, access_token.slice(0, 16)),
            subject: (0, utils_1.encryptString)(ele.subject, access_token.slice(0, 16)),
        }));
        const userData = Object.assign(Object.assign({}, user), { role: role, ability: ability, landingurl: user.profileData.landingurl });
        return {
            access_token: access_token,
            user_data: Object.assign(Object.assign({}, userData), { avatar: user.profileData.header.avatar, email: user.profileData.userAbout.email, username: user.profileData.header.username, landingurl: user.profileData.landingurl }),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map