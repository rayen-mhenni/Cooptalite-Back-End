export type Noeud = {
  userId: string;
  level: number; //level of parentNoeud + 1
  parentId: string; // ref mongo
  listOfChildId: string[]; // ref mongo
  percentage: string;
  amount: string;
  TJM: string;
};
