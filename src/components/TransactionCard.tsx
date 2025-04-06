
import React from 'react';
import { useTransactions } from '@/store/TransactionContext';
import { Transaction } from '@/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Check, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const { getPersonById, markAsPaid, deleteTransaction } = useTransactions();
  const person = getPersonById(transaction.personId);
  
  if (!person) return null;
  
  const formattedDate = format(new Date(transaction.date), 'MMM d, yyyy');
  const isLend = transaction.type === 'lend';
  
  return (
    <Card className={transaction.isPaid ? "opacity-70" : ""}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              {isLend ? 
                <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
                <ArrowDownLeft className="h-4 w-4 text-red-500" />
              }
              <h3 className="font-medium">
                {isLend ? `Lent to ${person.name}` : `Borrowed from ${person.name}`}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{transaction.description}</p>
          </div>
          
          <div className="text-right">
            <p className={`font-bold ${isLend ? 'positive-amount' : 'negative-amount'}`}>
              ${transaction.amount.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          {transaction.isPaid ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Check className="h-3 w-3 mr-1" /> Paid
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Outstanding
            </Badge>
          )}
        </div>
      </CardContent>
      
      {!transaction.isPaid && (
        <CardFooter className="px-4 py-3 border-t flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => markAsPaid(transaction.id)}
          >
            <Check className="h-4 w-4 mr-1" /> Mark as Paid
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this transaction.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => deleteTransaction(transaction.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default TransactionCard;
