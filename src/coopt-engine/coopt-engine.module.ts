import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { cooptationModule } from 'src/cooptation/cooptation.module';
import { CooptEngineController } from './coopt-engine.controller';
import { CooptEngineService } from './coopt-engine.service';

@Module({
  imports: [
    cooptationModule,
    MongooseModule.forFeature([
      {
        name: 'CooptEngine',
        schema: CooptationSchema,
      },
    ]),
  ],
  providers: [CooptEngineService],
  exports: [CooptEngineService],
  controllers: [CooptEngineController],
})
export class CooptEngineModule {}
