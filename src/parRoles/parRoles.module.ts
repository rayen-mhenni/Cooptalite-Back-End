import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AbilitySchema } from './ability.schema';
import { parRolesController } from './parRoles.controller';
import { ParRolesSchema } from './parRoles.schema';
import { parRolesService } from './parRoles.service';


@Module({
  imports: [MongooseModule.forFeature([{
    name: 'ParRoles',
    schema: ParRolesSchema
  },
  {
    name: 'Ability',
    schema: AbilitySchema
  }])],
  providers: [parRolesService],
  controllers: [parRolesController],
  exports: [parRolesService],
})
export class ParRoleModule { }
