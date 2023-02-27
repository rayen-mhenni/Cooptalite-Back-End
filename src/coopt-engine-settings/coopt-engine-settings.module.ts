import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CooptEngineSettingsController } from './coopt-engine-settings.controller';
import { CooptEngineSettingsSchema } from './coopt-engine-settings.schema';
import { CooptEngineSettingsService } from './coopt-engine-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CooptEngineSettings', schema: CooptEngineSettingsSchema },
    ]),
  ],
  providers: [CooptEngineSettingsService],
  controllers: [CooptEngineSettingsController],
  exports: [CooptEngineSettingsService],
})
export class CooptEngineSettingsModule {}
