import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CooptEngineModule } from 'src/coopt-engine/coopt-engine.module';
import { CagnotteController } from './cagnotte.controller';
import { CagnotteSchema } from './cagnotte.schema';
import { CagnotteService } from './cagnotte.service';

@Module({
  imports: [
    CooptEngineModule,
    MongooseModule.forFeature([
      {
        name: 'Cagnotte',
        schema: CagnotteSchema,
      },
    ]),
  ],
  providers: [CagnotteService],
  exports: [CagnotteService],
  controllers: [CagnotteController],
})
export class CagnotteModule {}
