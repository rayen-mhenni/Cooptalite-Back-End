import { Model } from 'mongoose';
import { ability, parRolesDTO } from './dtos/parRoleDto';
import { ParRoles, parRolesDocument } from './parRoles.schema';
import { Ability, AbilityDocument } from './ability.schema';
export declare class parRolesService {
    private readonly ParRoleModule;
    private readonly AbilityModule;
    constructor(ParRoleModule: Model<parRolesDocument>, AbilityModule: Model<AbilityDocument>);
    addParRoles(parRolesDTO: parRolesDTO): Promise<any>;
    updateParRoles(name: string, parRolesDTO: parRolesDTO): Promise<any>;
    findRole(name: string): Promise<ParRoles | undefined>;
    findRoles(): Promise<ParRoles[] | undefined>;
    deleteRole(id: string): Promise<ParRoles | undefined>;
    addAbility(ability: ability): Promise<any>;
    updateAbility(id: string, ability: ability): Promise<any>;
    deleteAbility(id: string): Promise<any>;
    findAbility(): Promise<Ability[] | undefined>;
    findAvailableAbility(): Promise<Ability[] | undefined>;
}
