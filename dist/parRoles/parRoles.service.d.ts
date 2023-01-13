import { Model } from 'mongoose';
import { parRolesDTO } from './dtos/parRoleDto';
import { ParRoles, parRolesDocument } from './parRoles.schema';
export declare class parRolesService {
    private readonly ParRoleModule;
    constructor(ParRoleModule: Model<parRolesDocument>);
    addParRoles(parRolesDTO: parRolesDTO): Promise<any>;
    updateParRoles(name: string, parRolesDTO: parRolesDTO): Promise<any>;
    findRole(name: string): Promise<ParRoles | undefined>;
    findRoles(): Promise<ParRoles[] | undefined>;
    deleteRole(id: string): Promise<ParRoles | undefined>;
}
