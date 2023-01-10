import { ability } from './dtos/parRoleDto';
import { parRolesService } from './parRoles.service';
export declare class abilityController {
    private parRolesService;
    constructor(parRolesService: parRolesService);
    addAbility(ability: ability): Promise<any>;
    DeleteAbility(id: string): Promise<{
        message: string;
    }>;
    findAbility(): Promise<import("./ability.schema").Ability[]>;
    updateAbility(id: string, ability: ability): Promise<any>;
}
