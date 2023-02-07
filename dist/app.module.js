"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const parRoles_module_1 = require("./parRoles/parRoles.module");
const offer_module_1 = require("./offer/offer.module");
const interview_module_1 = require("./interview/interview.module");
const actualite_module_1 = require("./actualite/actualite.module");
const ability_module_1 = require("./ability/ability.module");
const email_module_1 = require("./emails/email.module");
const chat_module_1 = require("./socketIO/chat.module");
const comments_module_1 = require("./comments/comments.module");
const event_module_1 = require("./event/event.module");
const parList_module_1 = require("./configuration/parListSelect/parList.module");
const cooptation_module_1 = require("./cooptation/cooptation.module");
const cra_module_1 = require("./CRA/cra.module");
const craConfig_module_1 = require("./configuration/CRAconfig/craConfig.module");
const company_module_1 = require("./company/company.module");
const cvteck_module_1 = require("./CvTeck/cvteck.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://Cooptalite:Cooptalite2023@cooptalite.xi4yjp1.mongodb.net/?retryWrites=true&w=majority'),
            chat_module_1.ChatModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            parRoles_module_1.ParRoleModule,
            offer_module_1.OfferModule,
            actualite_module_1.ActualiteModule,
            interview_module_1.InterviewModule,
            ability_module_1.AbilityModule,
            email_module_1.EmailModule,
            comments_module_1.CommentModule,
            event_module_1.EventModule,
            company_module_1.CompanyModule,
            parList_module_1.ParListModule,
            cooptation_module_1.cooptationModule,
            cra_module_1.CRAModule,
            craConfig_module_1.CRAConfigModule,
            cvteck_module_1.CvteckModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map