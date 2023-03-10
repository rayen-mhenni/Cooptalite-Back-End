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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const app_service_1 = require("./app.service");
const utils_1 = require("./utils");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    seeUploadedFile(image, res) {
        try {
            return res.sendFile(image, { root: utils_1.multerConfig.dest });
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.NOT_FOUND);
        }
    }
    DeleteUploadedFile(filename) {
        try {
            const filePath = utils_1.multerConfig.dest + '/' + filename;
            fs.unlinkSync(filePath);
            return 'file deleted';
        }
        catch (err) {
            throw new common_1.HttpException(err, common_1.HttpStatus.NOT_FOUND);
        }
    }
    uploadFile(file) {
        const response = {
            originalname: file === null || file === void 0 ? void 0 : file.originalname,
            filename: file.filename,
        };
        return response;
    }
    async uploadMultipleFiles(files) {
        const response = [];
        files.forEach((file) => {
            const fileReponse = {
                originalname: file === null || file === void 0 ? void 0 : file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }
};
__decorate([
    (0, common_1.Get)('upload/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "seeUploadedFile", null);
__decorate([
    (0, common_1.Delete)('upload/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "DeleteUploadedFile", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', utils_1.multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload/multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 20, utils_1.multerOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadMultipleFiles", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map