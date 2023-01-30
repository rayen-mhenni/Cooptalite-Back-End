import { Module } from '@nestjs/common';
import { CRAService } from './cra.service';
import { CRAController } from './cra.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { craSchema } from './cra.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'CRA',
        schema: craSchema,
      },
    ]),
  ],
  providers: [CRAService],
  controllers: [CRAController],
  exports: [CRAService],
})
export class CRAModule {}
