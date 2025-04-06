
import React, { createContext, useContext, useState, useEffect } from "react";
import { Transaction, Person, TransactionType } from "@/types";
import { toast } from "@/components/ui/sonner";

interface TransactionContextType {
  transactions: Transaction[];
  persons: Person[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addPerson: (name: string) => void;
  markAsPaid: (id: string) => void;
  deleteTransaction: (id: string) => void;
  getLentAmount: () => number;
  getBorrowedAmount: () => number;
  getNetBalance: () => number;
  getPersonById: (id: string) => Person | undefined;
  getTransactionsForPerson: (personId: string) => Transaction[];
  getPersonBalance: (personId: string) => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [persons, setPersons] = useState<Person[]>(() => {
    const savedPersons = localStorage.getItem("persons");
    return savedPersons ? JSON.parse(savedPersons) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("persons", JSON.stringify(persons));
  }, [persons]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    setTransactions([...transactions, newTransaction]);
    toast(`${transaction.type === 'lend' ? 'Lent' : 'Borrowed'} ${transaction.amount} recorded`);
  };

  const addPerson = (name: string) => {
    if (name.trim() === "") return;
    
    const newPerson = {
      id: Date.now().toString(),
      name,
    };
    
    setPersons([...persons, newPerson]);
    toast(`${name} added to contacts`);
  };

  const markAsPaid = (id: string) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, isPaid: true } : t))
    );
    toast("Transaction marked as paid");
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast("Transaction deleted");
  };

  const getPersonById = (id: string) => {
    return persons.find((p) => p.id === id);
  };

  const getLentAmount = () => {
    return transactions
      .filter((t) => t.type === 'lend' && !t.isPaid)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getBorrowedAmount = () => {
    return transactions
      .filter((t) => t.type === 'borrow' && !t.isPaid)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getNetBalance = () => {
    return getLentAmount() - getBorrowedAmount();
  };

  const getTransactionsForPerson = (personId: string) => {
    return transactions.filter((t) => t.personId === personId);
  };

  const getPersonBalance = (personId: string) => {
    const personTransactions = getTransactionsForPerson(personId);
    const lent = personTransactions
      .filter((t) => t.type === 'lend' && !t.isPaid)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const borrowed = personTransactions
      .filter((t) => t.type === 'borrow' && !t.isPaid)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return lent - borrowed;
  };

  const value = {
    transactions,
    persons,
    addTransaction,
    addPerson,
    markAsPaid,
    deleteTransaction,
    getLentAmount,
    getBorrowedAmount,
    getNetBalance,
    getPersonById,
    getTransactionsForPerson,
    getPersonBalance,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
