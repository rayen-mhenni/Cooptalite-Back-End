import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { abilityController } from './ability.controller';
import { AbilitySchema } from './ability.schema';
import { AbilityService } from './ability.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Ability',
        schema: AbilitySchema,
      },
    ]),
  ],
  providers: [AbilityService],
  controllers: [abilityController],
  exports: [AbilityService],
})
export class AbilityModule {}
