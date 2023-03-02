import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CooptationController } from './Cooptation.controller';
import { CooptationSchema } from './Cooptation.schema';
import { CooptationService } from './Cooptation.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: 'cooptation',
        schema: CooptationSchema,
      },
    ]),
  ],
  providers: [CooptationService],
  controllers: [CooptationController],
  exports: [CooptationService],
})
export class cooptationModule {}
