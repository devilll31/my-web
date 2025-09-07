'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

export default function QuoteEstimateBuilderTool() {
  const [quoteNumber, setQuoteNumber] = useState('QUOTE-001');
  const [from, setFrom] = useState('Your Company\n123 Street, City');
  const [to, setTo] = useState('Potential Client\n456 Avenue, Town');
  const [lineItems, setLineItems] = useState<LineItem[]>([{ id: 1, description: 'Initial Consultation & Design', quantity: 1, price: 1500 }]);
  
  const total = lineItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), description: '', quantity: 1, price: 0 }]);
  };

  const removeLineItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };
  
  const handleItemChange = (id: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => {
    setLineItems(lineItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  
  const printQuote = () => {
    window.print();
  };

  return (
    <Card className="w-full mx-auto p-4 md:p-8 print:shadow-none print:border-none">
      <div className="grid grid-cols-2 gap-8 mb-8 print:grid-cols-2">
        <Textarea value={from} onChange={e => setFrom(e.target.value)} placeholder="From..." />
        <Textarea value={to} onChange={e => setTo(e.target.value)} placeholder="To..." />
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">QUOTE / ESTIMATE</h1>
        <Input value={quoteNumber} onChange={e => setQuoteNumber(e.target.value)} className="w-48" />
      </div>
      
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 font-bold bg-muted p-2 rounded-t-lg">
          <div>Description</div>
          <div className="w-24 text-right">Quantity</div>
          <div className="w-32 text-right">Price</div>
          <div className="w-32 text-right">Total</div>
        </div>
        {lineItems.map(item => (
          <div key={item.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 items-center">
            <Input value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} />
            <Input type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-24 text-right" />
            <Input type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} className="w-32 text-right" />
            <div className="w-32 text-right font-medium pr-3">{(item.quantity * item.price).toFixed(2)}</div>
            <Button size="icon" variant="ghost" onClick={() => removeLineItem(item.id)} className="print:hidden"><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
         <Button variant="outline" onClick={addLineItem} className="print:hidden"><PlusCircle className="mr-2"/> Add Item</Button>
      </div>

      <div className="flex justify-end mt-8">
        <div className="w-64 space-y-2">
            <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
      </div>
      
      <div className="text-center mt-12 print:hidden">
        <Button onClick={printQuote}>Print Quote</Button>
      </div>
    </Card>
  );
}