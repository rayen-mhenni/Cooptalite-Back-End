import { Module } from '@nestjs/common';
import { CooptEngineController } from './coopt-engine.controller';

@Module({
  controllers: [CooptEngineController],
})
export class CooptEngineModule {}
