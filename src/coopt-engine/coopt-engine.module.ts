import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CooptEngineController } from './coopt-engine.controller';
import { CooptEngineService } from './coopt-engine.service';
import { CooptEngineSchema } from './coopt-engine.schema';
import { CooptationModule } from 'src/cooptation/Cooptation.module';
import { CooptEngineSettingsModule } from 'src/coopt-engine-settings/coopt-engine-settings.module';

@Module({
  imports: [
    CooptationModule,
    CooptEngineSettingsModule,
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
