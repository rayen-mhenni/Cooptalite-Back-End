import { Module } from '@nestjs/common';
import { PersonalcalanderService } from './personalcalander.service';
import { PersonalcalanderController } from './personalcalander.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalclanderSchema } from './personalcalander.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Personalcalander',
        schema: PersonalclanderSchema,
      },
    ]),
  ],
  providers: [PersonalcalanderService],
  controllers: [PersonalcalanderController],
  exports: [PersonalcalanderService],
})
export class PersonalcalanderModule {}
