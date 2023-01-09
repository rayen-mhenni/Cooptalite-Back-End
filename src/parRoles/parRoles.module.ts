import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { parRolesController } from './parRoles.controller';
import { ParRolesSchema } from './parRoles.schema';
import { parRolesService } from './parRoles.service';


@Module({
  imports: [MongooseModule.forFeature([{
    name: 'ParRoles',
    schema: ParRolesSchema
  }])],
  providers: [parRolesService],
  controllers: [parRolesController],
  exports: [parRolesService],
})
export class ParRoleModule { }
