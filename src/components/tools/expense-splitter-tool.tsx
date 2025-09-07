'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Users, IndianRupee } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import HowToUseGuide from '@/components/how-to-use-guide';

interface Person {
  id: number;
  name: string;
  amount: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export default function ExpenseSplitterTool() {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: 'Alice', amount: 500 },
    { id: 2, name: 'Bob', amount: 200 },
    { id: 3, name: 'Charlie', amount: 300 },
  ]);
  const [transactions, setTransactions] = useState<string[]>([]);
  
  const addPerson = () => {
    setPeople([...people, { id: Date.now(), name: '', amount: 0 }]);
  };

  const handlePersonChange = (id: number, field: 'name' | 'amount', value: string | number) => {
    setPeople(people.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  
  const removePerson = (id: number) => {
    setPeople(people.filter(p => p.id !== id));
  }
  
  useEffect(() => {
    if (people.length < 2) {
      setTransactions([]);
      return;
    }
    const total = people.reduce((sum, p) => sum + p.amount, 0);
    const average = total / people.length;
    
    const balances = people.map(p => ({ ...p, balance: p.amount - average }));
    
    const debtors = balances.filter(p => p.balance < 0).sort((a,b) => a.balance - b.balance);
    const creditors = balances.filter(p => p.balance > 0).sort((a,b) => b.balance - a.balance);
    
    const newTransactions: string[] = [];
    
    let i = 0, j = 0;
    while(i < debtors.length && j < creditors.length){
        const debt = -debtors[i].balance;
        const credit = creditors[j].balance;
        const payment = Math.min(debt, credit);
        
        newTransactions.push(`${debtors[i].name} owes ${creditors[j].name} ${formatCurrency(payment)}`);
        
        debtors[i].balance += payment;
        creditors[j].balance -= payment;
        
        if (debtors[i].balance > -0.01) i++;
        if (creditors[j].balance < 0.01) j++;
    }
    setTransactions(newTransactions);

  }, [people]);

  const guideProps = {
    title: "How to Use the Expense Splitter",
    steps: [
      { title: "Add People", description: "Add each person involved and enter the total amount each person paid." },
      { title: "View the Plan", description: "The calculator figures out the simplest way for everyone to settle up." },
      { title: "Settle Debts", description: "Follow the transaction list to easily pay back what is owed." }
    ],
    features: [
      { icon: Users, title: "Group Expenses", description: "Perfect for trips with friends, shared housing bills, or any group activity involving shared costs." },
      { icon: IndianRupee, title: "Simplify Debt", description: "Calculates the most efficient way to settle debts, minimizing the number of transactions needed." },
      { icon: PlusCircle, title: "Dynamic & Easy", description: "Add or remove people on the fly. The settlement plan updates instantly." }
    ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Who Paid What?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <AnimatePresence>
                {people.map(person => (
                    <motion.div layout key={person.id} className="flex gap-2 items-center">
                        <Input value={person.name} onChange={e => handlePersonChange(person.id, 'name', e.target.value)} placeholder="Name"/>
                        <Input type="number" value={person.amount || ''} onChange={e => handlePersonChange(person.id, 'amount', parseFloat(e.target.value) || 0)} placeholder="Amount Paid"/>
                        <Button variant="ghost" size="icon" onClick={() => removePerson(person.id)} disabled={people.length <=1}><Trash2 className="w-4 h-4"/></Button>
                    </motion.div>
                ))}
            </AnimatePresence>
             <Button variant="outline" onClick={addPerson} className="w-full"><PlusCircle className="mr-2"/> Add Person</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>How to Settle Up</CardTitle>
        </CardHeader>
        <CardContent>
            {transactions.length > 0 ? (
                <ul className="space-y-2">
                    {transactions.map((t,i) => <li key={i} className="p-2 bg-secondary rounded-md text-sm font-medium">{t}</li>)}
                </ul>
            ) : (
                <div className="text-center text-muted-foreground py-8">
                    <Users className="mx-auto w-12 h-12 mb-2"/>
                    <p>Add people and their expenses to see who owes whom.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
