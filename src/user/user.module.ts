import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CooptationSchema } from 'src/cooptation/Cooptation.schema';
import { ParRoleModule } from 'src/parRoles/parRoles.module';
import { parRolesService } from 'src/parRoles/parRoles.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    ParRoleModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      {
        name: 'cooptation',
        schema: CooptationSchema,
      },
    ]),
  ],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [UserService, JwtService],
})
export class UserModule {}
