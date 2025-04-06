
import React, { useState } from 'react';
import { useTransactions } from '@/store/TransactionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Person, TransactionType } from '@/types';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const TransactionForm = () => {
  const { addTransaction, persons, addPerson } = useTransactions();
  
  const [type, setType] = useState<TransactionType>('lend');
  const [amount, setAmount] = useState('');
  const [personId, setPersonId] = useState('');
  const [description, setDescription] = useState('');
  const [newPersonName, setNewPersonName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !personId || !description) {
      return;
    }
    
    addTransaction({
      type,
      amount: parseFloat(amount),
      personId,
      description,
      date: new Date().toISOString(),
      isPaid: false,
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setPersonId('');
  };
  
  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      addPerson(newPersonName.trim());
      setNewPersonName('');
      setIsDialogOpen(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transaction-type">Transaction Type</Label>
            <RadioGroup 
              id="transaction-type" 
              defaultValue="lend" 
              className="flex space-x-2"
              value={type}
              onValueChange={(value) => setType(value as TransactionType)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lend" id="lend" />
                <Label htmlFor="lend" className="cursor-pointer">I lent money</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="borrow" id="borrow" />
                <Label htmlFor="borrow" className="cursor-pointer">I borrowed money</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="person">Person</Label>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Add New Person</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Person</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newPersonName}
                        onChange={(e) => setNewPersonName(e.target.value)}
                        placeholder="Enter name"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddPerson}>Add Person</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Select value={personId} onValueChange={setPersonId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a person" />
              </SelectTrigger>
              <SelectContent>
                {persons.length > 0 ? (
                  persons.map((person: Person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-person" disabled>
                    No persons added yet
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Record {type === 'lend' ? 'Lent' : 'Borrowed'} Money
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
