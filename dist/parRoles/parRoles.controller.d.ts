import { ability, parRolesDTO } from './dtos/parRoleDto';
import { parRolesService } from './parRoles.service';
export declare class parRolesController {
    private parRolesService;
    constructor(parRolesService: parRolesService);
    AddRole(parRolesDTO: parRolesDTO): Promise<any>;
    addAbility(ability: ability): Promise<any>;
    getRoles(): Promise<import("./parRoles.schema").ParRoles[]>;
    UpdateRole(id: string, parRolesDTO: parRolesDTO): Promise<any>;
    getRole(name: string): Promise<import("./parRoles.schema").ParRoles>;
    DeleteRole(id: string): Promise<{
        message: string;
    }>;
}
