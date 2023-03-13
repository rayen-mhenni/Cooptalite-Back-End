export class Cagnotte {
  user: string;
  craStatus: string;
  workedDays: number;
  gain: number;
  totalGainAmount: number;
  TJM: string;
  status: string;
  remainingAmount: number;
  payedAmount: number;
}

export class CagnotteDTO {
  list: Cagnotte[];
  userId: string;
  month: string;
}
