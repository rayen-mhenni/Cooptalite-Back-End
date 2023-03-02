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
const lodash_1 = require("lodash");
const moment = require("moment");
const parRoles_service_1 = require("./../parRoles/parRoles.service");
let UserService = class UserService {
    constructor(userModel, cooptationModule, parRolesService) {
        this.userModel = userModel;
        this.cooptationModule = cooptationModule;
        this.parRolesService = parRolesService;
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
    async addUserCandidat(createUserDTO, id, offerid, trustrate, cooptationId) {
        var _a, _b;
        const email = (_b = (_a = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _a === void 0 ? void 0 : _a.userAbout) === null || _b === void 0 ? void 0 : _b.email;
        const OldUser = await this.userModel.find({
            'profileData.userAbout.email': email,
        });
        if (!OldUser[0]) {
            const newUser = await this.userModel.create(createUserDTO);
            newUser.password = await bcrypt.hash(newUser.password, 10);
            newUser.save();
            const member = await this.userModel.findById(id);
            member.linkedUsers.push(newUser._id);
            member.save();
            const currentMemberScore = await this.calculateScoreCoopt(id);
            const cooptation = await this.cooptationModule.findByIdAndUpdate(cooptationId, {
                member: id,
                candidat: newUser._id,
                cvs: null,
                trustrate,
                status: 'accepted',
                currentMemberScore: `${currentMemberScore}`,
                data: moment().format('MMMM Do, YYYY, hh:mm a'),
            });
            return member;
        }
        else {
            throw new exceptions_1.HttpException('Email already exist', enums_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateCooptationstatus(memberId, cooptationId, status) {
        const currentMemberScore = await this.calculateScoreCoopt(memberId);
        const cooptation = await this.cooptationModule.findByIdAndUpdate(cooptationId, {
            status,
            currentMemberScore: `${currentMemberScore}`,
            data: moment().format('MMMM Do, YYYY, hh:mm a'),
        });
        return cooptation;
    }
    async updateuserprofile(id, createUserDTO) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
        const user = await this.userModel.findById(id);
        if (user) {
            const newUser = await this.userModel.findByIdAndUpdate(user._id, {
                'profileData.userAbout.email': ((_b = (_a = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _a === void 0 ? void 0 : _a.userAbout) === null || _b === void 0 ? void 0 : _b.email) ||
                    ((_c = user.profileData.userAbout) === null || _c === void 0 ? void 0 : _c.email),
                'profileData.header.username': ((_e = (_d = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _d === void 0 ? void 0 : _d.header) === null || _e === void 0 ? void 0 : _e.username) ||
                    ((_f = user.profileData.header) === null || _f === void 0 ? void 0 : _f.username),
                'profileData.header.avatar': ((_h = (_g = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _g === void 0 ? void 0 : _g.header) === null || _h === void 0 ? void 0 : _h.avatar) ||
                    ((_j = user.profileData.header) === null || _j === void 0 ? void 0 : _j.avatar),
                'profileData.cvfile': (0, lodash_1.isNil)((_k = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _k === void 0 ? void 0 : _k.cvfile)
                    ? (_l = user.profileData) === null || _l === void 0 ? void 0 : _l.cvfile
                    : (_m = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _m === void 0 ? void 0 : _m.cvfile,
                'profileData.header.contact': ((_o = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.header) === null || _o === void 0 ? void 0 : _o.contact) ||
                    ((_p = user.profileData.header) === null || _p === void 0 ? void 0 : _p.contact),
                'profileData.header.designation': ((_q = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.header) === null || _q === void 0 ? void 0 : _q.designation) ||
                    ((_r = user.profileData.header) === null || _r === void 0 ? void 0 : _r.designation),
                'profileData.header.coverImg': ((_s = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.header) === null || _s === void 0 ? void 0 : _s.coverImg) ||
                    ((_t = user.profileData.header) === null || _t === void 0 ? void 0 : _t.coverImg),
                'profileData.userAbout.about': ((_v = (_u = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _u === void 0 ? void 0 : _u.userAbout) === null || _v === void 0 ? void 0 : _v.about) ||
                    ((_w = user.profileData.userAbout) === null || _w === void 0 ? void 0 : _w.about),
                'profileData.userAbout.joined': ((_y = (_x = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _x === void 0 ? void 0 : _x.userAbout) === null || _y === void 0 ? void 0 : _y.joined) ||
                    ((_z = user.profileData.userAbout) === null || _z === void 0 ? void 0 : _z.joined),
                'profileData.userAbout.lives': ((_1 = (_0 = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _0 === void 0 ? void 0 : _0.userAbout) === null || _1 === void 0 ? void 0 : _1.lives) ||
                    ((_2 = user.profileData.userAbout) === null || _2 === void 0 ? void 0 : _2.lives),
                'profileData.userAbout.website': ((_4 = (_3 = createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData) === null || _3 === void 0 ? void 0 : _3.userAbout) === null || _4 === void 0 ? void 0 : _4.website) ||
                    ((_5 = user.profileData.userAbout) === null || _5 === void 0 ? void 0 : _5.website),
                client: createUserDTO.client || user.client,
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
            console.log('new pass', createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.password);
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
                client: createUserDTO.client || user.client,
                'profileData.role': (createUserDTO === null || createUserDTO === void 0 ? void 0 : createUserDTO.profileData.role) || user.profileData.role,
            });
            return newUser;
        }
        else {
            throw new exceptions_1.HttpException('User Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateCondidat(id, cooptationId) {
        const user = await this.userModel.findById(id);
        if (user) {
            const ability = this.parRolesService.findRole('member');
            const newUser = await this.userModel.findByIdAndUpdate(user._id, {
                'profileData.ability': ability || user.ability,
                'profileData.role': 'member',
            });
            const cooptation = await this.cooptationModule.findByIdAndUpdate(cooptationId, {
                status: 'done',
                data: moment().format('MMMM Do, YYYY, hh:mm a'),
            });
            return newUser;
        }
        else {
            throw new exceptions_1.HttpException('User Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async activate(id) {
        const user = await this.userModel.findById(id);
        if (user) {
            const newUser = await this.userModel.findByIdAndUpdate(user._id, {
                status: 'active',
            });
            return newUser;
        }
        else {
            throw new exceptions_1.HttpException('User Not exist', enums_1.HttpStatus.NOT_FOUND);
        }
    }
    async deactivate(id) {
        const user = await this.userModel.findById(id);
        if (user) {
            const newUser = await this.userModel.findByIdAndUpdate(user._id, {
                status: 'inactive',
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
        const user = await this.userModel.findById(id).populate({
            path: 'linkedUsers',
            model: 'User',
            select: ['profileData.header', 'profileData.userAbout'],
        });
        if (!user) {
            throw new exceptions_1.HttpException('Not Data Found ', enums_1.HttpStatus.NOT_FOUND);
        }
        else {
            const score = await this.calculateScoreCoopt(user._id);
            return { user, score };
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
    async ResetMyPassword(id, password) {
        const user = await this.userModel.findById(id);
        if (user) {
            const newpassword = await bcrypt.hash(password.password, 10);
            await this.userModel.findByIdAndUpdate(user._id, {
                password: newpassword,
            });
            return { message: 'Password updated with success' };
        }
        else {
            throw new exceptions_1.HttpException('Password not match', enums_1.HttpStatus.BAD_REQUEST);
        }
    }
    async calculateScoreCoopt(id) {
        const nbcoop = await this.cooptationModule.find({ member: id }).count();
        let nbcoopsucc = 0;
        const coopsucc = await this.cooptationModule.find({ member: id }).populate({
            path: 'candidat',
            select: ['profileData.role'],
        });
        if (coopsucc) {
            coopsucc.forEach((coo) => {
                var _a, _b;
                if (coo &&
                    coo.candidat != null &&
                    ((_b = (_a = coo === null || coo === void 0 ? void 0 : coo.candidat) === null || _a === void 0 ? void 0 : _a.profileData) === null || _b === void 0 ? void 0 : _b.role) === 'member') {
                    nbcoopsucc++;
                }
            });
        }
        let currentMemberScore = 0;
        if (nbcoopsucc != 0) {
            currentMemberScore = (nbcoopsucc / nbcoop) * 100;
        }
        return `${currentMemberScore}%`;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('cooptation')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        parRoles_service_1.parRolesService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map