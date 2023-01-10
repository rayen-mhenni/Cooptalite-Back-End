import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { abilityController } from './ability.controller';
import { AbilitySchema } from './ability.schema';
import { parRolesController } from './parRoles.controller';
import { ParRolesSchema } from './parRoles.schema';
import { parRolesService } from './parRoles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ParRoles',
        schema: ParRolesSchema,
      },
      {
        name: 'Ability',
        schema: AbilitySchema,
      },
    ]),
  ],
  providers: [parRolesService],
  controllers: [parRolesController, abilityController],
  exports: [parRolesService],
})
export class ParRoleModule {}
