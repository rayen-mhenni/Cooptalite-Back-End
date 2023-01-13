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
        var _a, _b;
        const email = (_b = (_a = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _a === void 0 ? void 0 : _a.userAbout) === null || _b === void 0 ? void 0 : _b.email;
        const OldUser = await this.userModel.find({
            'profileData.userAbout.email': email,
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
        const user = await this.userModel.findById(id);
        if (user) {
            const newUser = await this.userModel.findByIdAndUpdate(user._id, {
                'profileData.userAbout.email': ((_b = (_a = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _a === void 0 ? void 0 : _a.userAbout) === null || _b === void 0 ? void 0 : _b.email) ||
                    ((_c = user.profileData.userAbout) === null || _c === void 0 ? void 0 : _c.email),
                'profileData.header.username': ((_e = (_d = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _d === void 0 ? void 0 : _d.header) === null || _e === void 0 ? void 0 : _e.username) ||
                    ((_f = user.profileData.header) === null || _f === void 0 ? void 0 : _f.username),
                'profileData.header.avatar': ((_h = (_g = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _g === void 0 ? void 0 : _g.header) === null || _h === void 0 ? void 0 : _h.avatar) ||
                    ((_j = user.profileData.header) === null || _j === void 0 ? void 0 : _j.avatar),
                'profileData.cvfile': ((_k = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _k === void 0 ? void 0 : _k.cvfile) || ((_l = user.profileData) === null || _l === void 0 ? void 0 : _l.cvfile),
                'profileData.header.contact': ((_m = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.header) === null || _m === void 0 ? void 0 : _m.contact) ||
                    ((_o = user.profileData.header) === null || _o === void 0 ? void 0 : _o.contact),
                'profileData.header.designation': ((_p = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.header) === null || _p === void 0 ? void 0 : _p.designation) ||
                    ((_q = user.profileData.header) === null || _q === void 0 ? void 0 : _q.designation),
                'profileData.header.coverImg': ((_r = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.header) === null || _r === void 0 ? void 0 : _r.coverImg) ||
                    ((_s = user.profileData.header) === null || _s === void 0 ? void 0 : _s.coverImg),
                'profileData.userAbout.about': ((_u = (_t = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _t === void 0 ? void 0 : _t.userAbout) === null || _u === void 0 ? void 0 : _u.about) ||
                    ((_v = user.profileData.userAbout) === null || _v === void 0 ? void 0 : _v.about),
                'profileData.userAbout.joined': ((_x = (_w = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _w === void 0 ? void 0 : _w.userAbout) === null || _x === void 0 ? void 0 : _x.joined) ||
                    ((_y = user.profileData.userAbout) === null || _y === void 0 ? void 0 : _y.joined),
                'profileData.userAbout.lives': ((_0 = (_z = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _z === void 0 ? void 0 : _z.userAbout) === null || _0 === void 0 ? void 0 : _0.lives) ||
                    ((_1 = user.profileData.userAbout) === null || _1 === void 0 ? void 0 : _1.lives),
                'profileData.userAbout.website': ((_3 = (_2 = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _2 === void 0 ? void 0 : _2.userAbout) === null || _3 === void 0 ? void 0 : _3.website) ||
                    ((_4 = user.profileData.userAbout) === null || _4 === void 0 ? void 0 : _4.website),
            });
            return newUser;
        }
        else {
            throw new exceptions_1.HttpException('User Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateuser(id, createUserDTO) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const user = await this.userModel.findById(id);
        if (user) {
            const newpassword = await bcrypt.hash(createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.password, 10);
            const newUser = await this.userModel.findByIdAndUpdate(user._id, {
                'profileData.userAbout.email': ((_b = (_a = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _a === void 0 ? void 0 : _a.userAbout) === null || _b === void 0 ? void 0 : _b.email) ||
                    ((_c = user.profileData.userAbout) === null || _c === void 0 ? void 0 : _c.email),
                'profileData.header.username': ((_e = (_d = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _d === void 0 ? void 0 : _d.header) === null || _e === void 0 ? void 0 : _e.username) ||
                    ((_f = user.profileData.header) === null || _f === void 0 ? void 0 : _f.username),
                'profileData.header.contact': ((_g = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.header) === null || _g === void 0 ? void 0 : _g.contact) ||
                    ((_h = user.profileData.header) === null || _h === void 0 ? void 0 : _h.contact),
                'profileData.header.designation': ((_j = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.header) === null || _j === void 0 ? void 0 : _j.designation) ||
                    ((_k = user.profileData.header) === null || _k === void 0 ? void 0 : _k.designation),
                'profileData.userAbout.lives': ((_m = (_l = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _l === void 0 ? void 0 : _l.userAbout) === null || _m === void 0 ? void 0 : _m.lives) ||
                    ((_o = user.profileData.userAbout) === null || _o === void 0 ? void 0 : _o.lives),
                'profileData.ability': (createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.ability) || user.ability,
                'profileData.password': newpassword || user.password,
            });
            return newUser;
        }
        else {
            throw new exceptions_1.HttpException('User Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async findUser(email) {
        const OldUser = await this.userModel.find({
            'profileData.userAbout.email': email,
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
        const user = await this.userModel.find({
            'profileData.userAbout.email': restpassDto.email,
        });
        if (user[0]) {
            const isPasswordMatch = await bcrypt.compare(restpassDto.oldPassword, user[0].password);
            if (isPasswordMatch) {
                const newpassword = await bcrypt.hash(restpassDto.newPassword, 10);
                await this.userModel.findByIdAndUpdate(user[0]._id, {
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