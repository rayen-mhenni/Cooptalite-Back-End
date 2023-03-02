export type NoeudDTO = {
  userId: string;
  parentId: string; // ref mongo
  listOfChildId: string[]; // ref mongo
  isRoot: boolean;
  amount: string;
};
