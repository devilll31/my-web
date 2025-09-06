
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Scale, ShoppingCart, Trash2, PlusCircle, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Item {
  id: number;
  price: number;
  units: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export default function UnitPriceCalculatorTool() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, price: 10, units: 100 },
    { id: 2, price: 15, units: 160 },
  ]);
  const [nextId, setNextId] = useState(3);
  const [bestBuyId, setBestBuyId] = useState<number | null>(null);

  useEffect(() => {
    let bestId: number | null = null;
    let minUnitPrice = Infinity;

    items.forEach(item => {
      if (item.price > 0 && item.units > 0) {
        const unitPrice = item.price / item.units;
        if (unitPrice < minUnitPrice) {
          minUnitPrice = unitPrice;
          bestId = item.id;
        }
      }
    });
    setBestBuyId(bestId);
  }, [items]);

  const handleItemChange = (id: number, field: 'price' | 'units', value: number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: nextId, price: 0, units: 0 }]);
    setNextId(nextId + 1);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const guideProps = {
    title: "How to Use the Unit Price Calculator",
    steps: [
      { title: "Enter Item Details", description: "For each item, input its total price and the number of units (e.g., grams, ml, pieces)." },
      { title: "Add More Items", description: "Click 'Add Item' to compare multiple products at once." },
      { title: "Find the Best Buy", description: "The calculator instantly highlights the item with the lowest price per unit, helping you save money." }
    ],
    features: [
      { icon: ShoppingCart, title: "Smart Shopping", description: "Make informed decisions at the grocery store by comparing the true cost of different product sizes." },
      { icon: Scale, title: "Flexible Units", description: "Compare items by weight, volume, or count. Just keep the unit consistent across all items." },
      { icon: CheckCircle, title: "Clear Winner", description: "The best value item is clearly marked, taking the guesswork out of finding the best deal." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <CardHeader>
            <CardTitle className="text-center text-3xl font-headline">Which one is the better deal?</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4 items-center transition-colors ${bestBuyId === item.id ? 'bg-green-100 dark:bg-green-900/30 border-green-500' : 'bg-muted/50'}`}
              >
                <div className="space-y-1">
                  <Label htmlFor={`price-${item.id}`}>Price</Label>
                  <Input type="number" id={`price-${item.id}`} value={item.price || ''} onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} placeholder="e.g., 10.99" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`units-${item.id}`}>Units (e.g., oz, g, count)</Label>
                  <Input type="number" id={`units-${item.id}`} value={item.units || ''} onChange={(e) => handleItemChange(item.id, 'units', parseFloat(e.target.value) || 0)} placeholder="e.g., 100" />
                </div>
                <div className="flex items-end h-full gap-2">
                    <div className="flex-1 text-center">
                        <Label>Unit Price</Label>
                        <p className="font-bold text-lg text-primary">{item.price > 0 && item.units > 0 ? formatCurrency(item.price / item.units) : '-'}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={items.length <= 1}>
                        <Trash2 className="w-5 h-5 text-destructive" />
                    </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex justify-center">
            <Button onClick={addItem}><PlusCircle className="mr-2" /> Add Item</Button>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
