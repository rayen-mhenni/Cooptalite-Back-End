import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ParRoleModule } from './parRoles/parRoles.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rayenmhenni:onepiece@mycluster.fogbl.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
    ParRoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
