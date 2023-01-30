import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { cooptationController } from './cooptation.controller';
import { CooptationSchema } from './cooptation.schema';
import { cooptationService } from './cooptation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'cooptation',
        schema: CooptationSchema,
      },
    ]),
  ],
  providers: [cooptationService],
  controllers: [cooptationController],
  exports: [cooptationService],
})
export class cooptationModule {}
