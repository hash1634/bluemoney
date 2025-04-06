
import React from 'react';
import { useTransactions } from '@/store/TransactionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const PersonList = () => {
  const { persons, getPersonBalance, getTransactionsForPerson } = useTransactions();
  
  // Sort persons with non-zero balances first, then alphabetically
  const sortedPersons = [...persons].sort((a, b) => {
    const balanceA = Math.abs(getPersonBalance(a.id));
    const balanceB = Math.abs(getPersonBalance(b.id));
    
    if (balanceA === 0 && balanceB !== 0) return 1;
    if (balanceA !== 0 && balanceB === 0) return -1;
    
    return a.name.localeCompare(b.name);
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>People</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {sortedPersons.length > 0 ? (
            sortedPersons.map((person) => {
              const balance = getPersonBalance(person.id);
              const transactionCount = getTransactionsForPerson(person.id).length;
              
              return (
                <li key={person.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {person.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {transactionCount} transaction{transactionCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {balance !== 0 && (
                    <div className={balance > 0 ? 'positive-amount' : 'negative-amount'}>
                      {balance > 0 ? `+$${balance.toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`}
                      <div className="text-xs font-normal text-muted-foreground">
                        {balance > 0 ? 'They owe you' : 'You owe them'}
                      </div>
                    </div>
                  )}
                </li>
              );
            })
          ) : (
            <li className="p-4 text-center text-muted-foreground">
              No people added yet
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PersonList;
