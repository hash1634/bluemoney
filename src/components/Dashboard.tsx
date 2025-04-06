
import React from 'react';
import { useTransactions } from '@/store/TransactionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft, Scale } from 'lucide-react';

const Dashboard = () => {
  const { getLentAmount, getBorrowedAmount, getNetBalance } = useTransactions();
  
  const lentAmount = getLentAmount();
  const borrowedAmount = getBorrowedAmount();
  const netBalance = getNetBalance();
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">People Owe You</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold positive-amount">${lentAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Money you lent to others</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">You Owe</CardTitle>
          <ArrowDownLeft className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold negative-amount">${borrowedAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Money you borrowed from others</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          <Scale className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${netBalance >= 0 ? 'positive-amount' : 'negative-amount'}`}>
            ${netBalance.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {netBalance >= 0 ? "Overall, others owe you" : "Overall, you owe others"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
