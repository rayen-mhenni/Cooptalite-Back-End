import { ability } from './dtos/parRoleDto';
import { parRolesService } from './parRoles.service';
export declare class abilityController {
    private parRolesService;
    constructor(parRolesService: parRolesService);
    addAbility(ability: ability): Promise<any>;
    DeleteAbility(id: string): Promise<{
        message: string;
    }>;
    findAbility(): Promise<import("../ability/ability.schema").Ability[]>;
    findAvailableAbility(): Promise<import("../ability/ability.schema").Ability[]>;
    updateAbility(id: string, ability: ability): Promise<any>;
    deleteAbilityBySubject(subject: string): Promise<{
        message: string;
    }>;
}
