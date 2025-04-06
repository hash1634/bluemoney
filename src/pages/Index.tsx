
import React from 'react';
import { TransactionProvider } from '@/store/TransactionContext';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import PersonList from '@/components/PersonList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-8">
            <Dashboard />
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-8">
                <Tabs defaultValue="transactions" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="new">Add New</TabsTrigger>
                  </TabsList>
                  <TabsContent value="transactions">
                    <TransactionList />
                  </TabsContent>
                  <TabsContent value="new">
                    <TransactionForm />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <PersonList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </TransactionProvider>
  );
};

export default Index;
