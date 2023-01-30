import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ParRoleModule } from './parRoles/parRoles.module';
import { OfferModule } from './offer/offer.module';
import { InterviewModule } from './interview/interview.module';
import { ActualiteModule } from './actualite/actualite.module';
import { AbilityModule } from './ability/ability.module';
import { EmailModule } from './emails/email.module';
import { ChatModule } from './socketIO/chat.module';
import { CommentModule } from './comments/comments.module';
import { EventModule } from './event/event.module';
import { ParListModule } from './configuration/parListSelect/parList.module';
import { cooptationModule } from './cooptation/cooptation.module';
import { CRAModule } from './CRA/cra.module';
import { CRAConfigModule } from './configuration/CRAconfig/craConfig.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Cooptalite:Cooptalite2023@cooptalite.xi4yjp1.mongodb.net/?retryWrites=true&w=majority',
    ),
    ChatModule,
    UserModule,
    AuthModule,
    ParRoleModule,
    OfferModule,
    ActualiteModule,
    InterviewModule,
    AbilityModule,
    EmailModule,
    CommentModule,
    EventModule,
    ParListModule,
    cooptationModule,
    CRAModule,
    CRAConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
