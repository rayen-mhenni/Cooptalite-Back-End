export class Step {
  level: number;
  percentage: string;
}
export class CooptEngineSettingsDTO {
  maxLevel: number; // max level of tree
  name: number;
  status: boolean;
  amount: string;
  percentage: string;
  mode: string;
  manualSteps: Step[];
}
