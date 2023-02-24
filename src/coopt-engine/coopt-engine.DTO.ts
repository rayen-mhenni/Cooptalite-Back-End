export type others = {
  percentage: string;
  amount: string;
  TJM: string;
};
export type Noeud = {
  name: string;
  level: number; //level of parentNoeud + 1
  parentNoeudId: string; // ref mongo
  listOfChildId: string[]; // ref mongo
  others: others & any;
};
