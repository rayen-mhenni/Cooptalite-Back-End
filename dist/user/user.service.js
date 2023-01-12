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
        const email = createUserDTO.profileData.header.email;
        const OldUser = await this.userModel.find({
            'profileData.header.email': email,
        });
        if (!OldUser[0]) {
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
                'profileData.header.email': createUserDTO.profileData.header.email ||
                    user.profileData.header.email,
                'profileData.header.username': createUserDTO.profileData.header.username ||
                    user.profileData.header.username,
                'profileData.header.avatar': createUserDTO.profileData.header.avatar ||
                    user.profileData.header.avatar,
                'profileData.designation.cvfile': createUserDTO.profileData.cvfile || user.profileData.cvfile,
                'profileData.header.contact': createUserDTO.profileData.header.contact ||
                    user.profileData.header.contact,
                'profileData.header.designation': createUserDTO.profileData.header.designation ||
                    user.profileData.header.designation,
                'profileData.header.coverImg': createUserDTO.profileData.header.coverImg ||
                    user.profileData.header.coverImg,
            });
            return newUser;
        }
        else {
            throw new exceptions_1.HttpException('User Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async findUser(email) {
        const OldUser = await this.userModel.find({
            'profileData.header.email': email,
        });
        if (!OldUser[0]) {
            throw new exceptions_1.HttpException('Email Not Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            return OldUser[0];
        }
    }
    async findUserByRole() {
        const user = await this.userModel.aggregate([
            {
                $group: {
                    _id: '$profileData.role',
                    users: { $push: '$$ROOT' },
                    totalUsers: { $count: {} },
                },
            },
        ]);
        if (!user) {
            throw new exceptions_1.HttpException('Not Data Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            return user;
        }
    }
    async findUsers() {
        const user = await this.userModel.find();
        if (!user) {
            throw new exceptions_1.HttpException('Not Data Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            return user;
        }
    }
    async findUserById(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new exceptions_1.HttpException('Not Data Found ', enums_1.HttpStatus.NOT_FOUND);
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
                return { message: 'Password updated with success' };
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