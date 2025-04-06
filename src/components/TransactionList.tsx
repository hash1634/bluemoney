
import React, { useState } from 'react';
import { useTransactions } from '@/store/TransactionContext';
import { Transaction } from '@/types';
import TransactionCard from './TransactionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

const TransactionList = () => {
  const { transactions, persons } = useTransactions();
  const [filter, setFilter] = useState('all');
  const [personFilter, setPersonFilter] = useState('all');
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    // Filter by type
    if (filter !== 'all' && transaction.type !== filter) {
      return false;
    }
    
    // Filter by person
    if (personFilter !== 'all' && transaction.personId !== personFilter) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="lend">Lent</TabsTrigger>
            <TabsTrigger value="borrow">Borrowed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="w-full sm:w-[180px]">
          <Select value={personFilter} onValueChange={setPersonFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All people" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All people</SelectItem>
              {persons.map((person) => (
                <SelectItem key={person.id} value={person.id}>
                  {person.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No transactions found. Add a new transaction to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
