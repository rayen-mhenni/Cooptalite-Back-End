import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { craConfigSchema } from './craConfig.schema';
import { CraConfigService } from './craConfig.service';
import { craConfigController } from './craConfig.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'CraConfig',
        schema: craConfigSchema,
      },
    ]),
  ],
  providers: [CraConfigService],
  controllers: [craConfigController],
  exports: [CraConfigService],
})
export class CRAConfigModule {}
