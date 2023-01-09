import { Model } from 'mongoose';
import { ability, parRolesDTO } from './dtos/parRoleDto';
import { ParRoles, parRolesDocument } from './parRoles.schema';
import { AbilityDocument } from './ability.schema';
export declare class parRolesService {
    private readonly ParRoleModule;
    private readonly AbilityModule;
    constructor(ParRoleModule: Model<parRolesDocument>, AbilityModule: Model<AbilityDocument>);
    addParRoles(parRolesDTO: parRolesDTO): Promise<any>;
    addAbility(ability: ability): Promise<any>;
    updateParRoles(id: string, parRolesDTO: parRolesDTO): Promise<any>;
    findRole(name: string): Promise<ParRoles | undefined>;
    findRoles(): Promise<ParRoles[] | undefined>;
    deleteRole(id: string): Promise<ParRoles | undefined>;
}
