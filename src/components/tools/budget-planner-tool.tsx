'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, BarChart, PieChart, Wallet } from 'lucide-react';
import HowToUseGuide from '@/components/how-to-use-guide';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface Entry {
  id: number;
  name: string;
  value: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function BudgetPlannerTool() {
  const [income, setIncome] = useState(75000);
  const [expenses, setExpenses] = useState<Entry[]>([{ id: 1, name: 'Rent', value: 20000 }]);
  const [nextExpenseId, setNextExpenseId] = useState(2);
  
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const expensesTotal = expenses.reduce((sum, item) => sum + item.value, 0);
    setTotalExpenses(expensesTotal);
    setRemaining(income - expensesTotal);
  }, [income, expenses]);

  const handleExpenseChange = (id: number, field: 'name' | 'value', value: string | number) => {
    setExpenses(expenses.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  
  const addExpense = () => {
    setExpenses(prev => [...prev, { id: nextExpenseId, name: '', value: 0 }]);
    setNextExpenseId(nextExpenseId + 1);
  };
  
  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };
  
  const guideProps = {
    title: "How to Use the Budget Planner",
    steps: [
      { title: "Set Your Income", description: "Start by entering your total monthly income." },
      { title: "List Your Expenses", description: "Add all your recurring monthly expenses, like rent, bills, and groceries." },
      { title: "Track Your Balance", description: "The tool automatically calculates your total expenses and shows how much money you have remaining." }
    ],
    features: [
      { icon: Wallet, title: "Cashflow Clarity", description: "Get a clear view of your monthly income versus your expenses to understand where your money is going." },
      { icon: BarChart, title: "Expense Tracking", description: "Dynamically add or remove expense categories to create a budget that fits your lifestyle." },
      { icon: PieChart, title: "Client-Side Privacy", description: "Your financial data is processed and stored only in your browser, ensuring your privacy is protected." }
    ]
  };

  const expensePercentage = totalExpenses > 0 ? (totalExpenses / income) * 100 : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle className="text-center text-2xl font-headline">Monthly Budget</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Total Monthly Income</Label>
              <Input type="number" value={income || ''} onChange={(e) => setIncome(parseFloat(e.target.value) || 0)} />
            </div>
            <hr className="my-4"/>
            <Label>Monthly Expenses</Label>
            <AnimatePresence>
            {expenses.map(item => (
                <motion.div key={item.id} layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex gap-2">
                    <Input value={item.name} onChange={(e) => handleExpenseChange(item.id, 'name', e.target.value)} placeholder="e.g., Groceries" />
                    <Input type="number" value={item.value || ''} onChange={(e) => handleExpenseChange(item.id, 'value', parseFloat(e.target.value) || 0)} className="w-40" />
                    <Button variant="ghost" size="icon" onClick={() => removeExpense(item.id)} disabled={expenses.length <= 1}><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                </motion.div>
            ))}
            </AnimatePresence>
            <Button variant="outline" onClick={addExpense} className="w-full mt-2"><PlusCircle className="mr-2" /> Add Expense</Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader><CardTitle className="text-center text-2xl font-headline">Summary</CardTitle></CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center text-center gap-6">
             <div>
                <p className="text-lg text-muted-foreground">Total Expenses</p>
                <motion.div key={`exp-${totalExpenses}`} initial={{opacity:0}} animate={{opacity:1}} className="text-4xl font-bold text-red-600">{formatCurrency(totalExpenses)}</motion.div>
             </div>
             <div>
                <p className="text-lg text-muted-foreground">Remaining Balance</p>
                <motion.div key={`rem-${remaining}`} initial={{opacity:0}} animate={{opacity:1}} className={`text-4xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(remaining)}</motion.div>
             </div>
              <div>
                  <Label>Expenses as % of Income</Label>
                  <Progress value={expensePercentage} className="mt-2" />
                  <p className="text-sm font-bold mt-1">{expensePercentage.toFixed(1)}%</p>
              </div>
          </CardContent>
        </Card>
      </div>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
