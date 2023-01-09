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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const exceptions_1 = require("@nestjs/common/exceptions");
const enums_1 = require("@nestjs/common/enums");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async addUser(createUserDTO) {
        const OldUser = await this.userModel.findOne({
            email: createUserDTO.email,
        });
        if (!OldUser) {
            const newUser = await this.userModel.create(createUserDTO);
            newUser.password = await bcrypt.hash(newUser.password, 10);
            return newUser.save();
        }
        else {
            throw new exceptions_1.HttpException('Email already exist', enums_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateuserprofile(id, createUserDTO) {
        const user = await this.userModel.findById(id);
        if (user) {
            const newUser = await this.userModel.findByIdAndUpdate(user._id, {
                email: createUserDTO.email || user.email,
                username: createUserDTO.username || user.username,
                avatar: createUserDTO.avatar || user.avatar,
                cv: createUserDTO.cv || user.cv,
                phone: createUserDTO.phone || user.phone,
                landingurl: createUserDTO.landingurl || user.landingurl
            });
            return newUser;
        }
        else {
            throw new exceptions_1.HttpException('Email Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateuser(id, createUserDTO) {
        const user = await this.userModel.findById(id);
        if (user) {
            const newpass = await bcrypt.hash(createUserDTO.password, 10);
            const newrole = createUserDTO.roles;
            await this.userModel.findByIdAndUpdate(user._id, {
                email: createUserDTO.email || user.email,
                username: createUserDTO.username || user.username,
                avatar: createUserDTO.avatar || user.avatar,
                password: newpass,
                roles: newrole,
                ability: createUserDTO.ability || user.ability,
                phone: createUserDTO.phone || user.phone,
                landingurl: createUserDTO.landingurl || user.landingurl,
                cv: createUserDTO.cv || user.cv,
            });
            return user;
        }
        else {
            throw new exceptions_1.HttpException('Email Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async findUser(email) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new exceptions_1.HttpException('Email Not Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            return user;
        }
    }
    async deleteuser(id) {
        const user = await this.userModel.findOneAndDelete({ _id: id });
        if (!user) {
            throw new exceptions_1.HttpException('User Not Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            return user;
        }
    }
    async ResetUserPassword(restpassDto) {
        const user = await this.userModel.findOne({ email: restpassDto.email });
        if (user) {
            const isPasswordMatch = await bcrypt.compare(restpassDto.oldPassword, user.password);
            if (isPasswordMatch) {
                const newpassword = await bcrypt.hash(restpassDto.newPassword, 10);
                await this.userModel.findByIdAndUpdate(user._id, {
                    password: newpassword,
                });
                return { message: "Password updated with success" };
            }
            else {
                throw new exceptions_1.HttpException('Password not match', enums_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new exceptions_1.HttpException('User not FOUND', enums_1.HttpStatus.NOT_FOUND);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map