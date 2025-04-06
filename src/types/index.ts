
export type TransactionType = 'lend' | 'borrow';

export interface Person {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  personId: string;
  description: string;
  date: string;
  isPaid: boolean;
}

export interface TransactionWithPerson extends Transaction {
  person: Person;
}
