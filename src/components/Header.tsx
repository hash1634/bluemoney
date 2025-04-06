
import React from 'react';
import { CreditCard, PiggyBank } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 px-4 sm:px-6 bg-primary text-primary-foreground shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6" />
          <h1 className="text-xl font-bold">Lend-it Track-it</h1>
        </div>
        <div className="flex items-center">
          <PiggyBank className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
