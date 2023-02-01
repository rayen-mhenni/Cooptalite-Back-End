import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CooptationSchema } from 'src/cooptation/cooptation.schema';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
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
