'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, TrendingUp, Wallet, Banknote } from 'lucide-react';
import HowToUseGuide from '@/components/how-to-use-guide';
import { motion, AnimatePresence } from 'framer-motion';

interface Entry {
  id: number;
  name: string;
  value: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
};

export default function NetWorthTrackerTool() {
  const [assets, setAssets] = useState<Entry[]>([{ id: 1, name: 'Savings Account', value: 500000 }]);
  const [liabilities, setLiabilities] = useState<Entry[]>([{ id: 1, name: 'Credit Card Debt', value: 50000 }]);
  const [nextAssetId, setNextAssetId] = useState(2);
  const [nextLiabilityId, setNextLiabilityId] = useState(2);
  
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [netWorth, setNetWorth] = useState(0);

  useEffect(() => {
    const assetsTotal = assets.reduce((sum, item) => sum + item.value, 0);
    const liabilitiesTotal = liabilities.reduce((sum, item) => sum + item.value, 0);
    setTotalAssets(assetsTotal);
    setTotalLiabilities(liabilitiesTotal);
    setNetWorth(assetsTotal - liabilitiesTotal);
  }, [assets, liabilities]);

  const handleListChange = (list: Entry[], setList: (list: Entry[]) => void, id: number, field: 'name' | 'value', value: string | number) => {
    setList(list.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  
  const addToList = (setList: (list: Entry[]) => void, nextId: number, setNextId: (id: number) => void) => {
    setList(prev => [...prev, { id: nextId, name: '', value: 0 }]);
    setNextId(nextId + 1);
  };
  
  const removeFromList = (list: Entry[], setList: (list: Entry[]) => void, id: number) => {
    setList(list.filter(item => item.id !== id));
  };
  
  const guideProps = {
    title: "How to Use the Net Worth Tracker",
    steps: [
      { title: "List Your Assets", description: "Add everything you own that has value, like savings, investments, and property." },
      { title: "List Your Liabilities", description: "Add everything you owe, such as loans, credit card debt, and mortgages." },
      { title: "Track Your Net Worth", description: "The tool automatically calculates your total net worth, giving you a snapshot of your financial health." }
    ],
    features: [
      { icon: Wallet, title: "Financial Snapshot", description: "Get a clear, real-time picture of your overall financial position by tracking what you own versus what you owe." },
      { icon: Banknote, title: "Client-Side Privacy", description: "All your financial data is stored locally in your browser and is never sent to our servers, ensuring complete privacy." },
      { icon: TrendingUp, title: "Goal Setting", description: "Use your net worth as a key metric to track your progress towards financial goals like retirement or wealth accumulation." }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle className="text-center text-2xl font-headline text-green-600">Assets (What you Own)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <AnimatePresence>
            {assets.map(item => (
                <motion.div key={item.id} layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex gap-2">
                    <Input value={item.name} onChange={(e) => handleListChange(assets, setAssets, item.id, 'name', e.target.value)} placeholder="e.g., Mutual Funds" />
                    <Input type="number" value={item.value || ''} onChange={(e) => handleListChange(assets, setAssets, item.id, 'value', parseFloat(e.target.value) || 0)} className="w-40" />
                    <Button variant="ghost" size="icon" onClick={() => removeFromList(assets, setAssets, item.id)} disabled={assets.length <= 1}><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                </motion.div>
            ))}
            </AnimatePresence>
            <Button variant="outline" onClick={() => addToList(setAssets, nextAssetId, setNextAssetId)} className="w-full mt-2"><PlusCircle className="mr-2" /> Add Asset</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-center text-2xl font-headline text-red-600">Liabilities (What you Owe)</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <AnimatePresence>
            {liabilities.map(item => (
                 <motion.div key={item.id} layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex gap-2">
                    <Input value={item.name} onChange={(e) => handleListChange(liabilities, setLiabilities, item.id, 'name', e.target.value)} placeholder="e.g., Home Loan" />
                    <Input type="number" value={item.value || ''} onChange={(e) => handleListChange(liabilities, setLiabilities, item.id, 'value', parseFloat(e.target.value) || 0)} className="w-40" />
                    <Button variant="ghost" size="icon" onClick={() => removeFromList(liabilities, setLiabilities, item.id)} disabled={liabilities.length <= 1}><Trash2 className="w-4 h-4 text-muted-foreground" /></Button>
                </motion.div>
            ))}
             </AnimatePresence>
            <Button variant="outline" onClick={() => addToList(setLiabilities, nextLiabilityId, setNextLiabilityId)} className="w-full mt-2"><PlusCircle className="mr-2" /> Add Liability</Button>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
          <CardHeader><CardTitle className="text-center text-3xl font-headline">Your Financial Position</CardTitle></CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30"><p className="text-green-800 dark:text-green-200">Total Assets</p><p className="text-2xl font-bold text-green-600">{formatCurrency(totalAssets)}</p></div>
                <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30"><p className="text-red-800 dark:text-red-200">Total Liabilities</p><p className="text-2xl font-bold text-red-600">{formatCurrency(totalLiabilities)}</p></div>
                <div className="p-4 rounded-lg bg-primary/10"><p className="text-primary/80">Net Worth</p><p className="text-2xl font-bold text-primary">{formatCurrency(netWorth)}</p></div>
            </div>
          </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
