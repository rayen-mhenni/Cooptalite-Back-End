import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CooptEngineController } from './coopt-engine.controller';
import { CooptEngineService } from './coopt-engine.service';
import { CooptEngineSchema } from './coopt-engine.schema';
import { CooptationModule } from 'src/cooptation/Cooptation.module';

@Module({
  imports: [
    CooptationModule,
    MongooseModule.forFeature([
      {
        name: 'CooptEngine',
        schema: CooptEngineSchema,
      },
    ]),
  ],
  providers: [CooptEngineService],
  exports: [CooptEngineService],
  controllers: [CooptEngineController],
})
export class CooptEngineModule {}
