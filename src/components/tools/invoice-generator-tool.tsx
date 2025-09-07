'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Printer, FileText } from 'lucide-react';
import HowToUseGuide from '@/components/how-to-use-guide';

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export default function InvoiceGeneratorTool() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [from, setFrom] = useState('Your Company Name\n123 Street, City');
  const [to, setTo] = useState('Client Company Name\n456 Avenue, Town');
  const [lineItems, setLineItems] = useState<LineItem[]>([{ id: 1, description: 'Website Development', quantity: 1, price: 5000 }]);
  
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

  const printInvoice = () => {
    window.print();
  };
  
  const guideProps = {
    title: "How to Use the Invoice Generator",
    steps: [
      { title: "Fill in Details", description: "Enter your company's and your client's details, and set an invoice number." },
      { title: "Add Line Items", description: "Add each product or service with its quantity and price. The total is calculated automatically." },
      { title: "Print or Save", description: "Use the 'Print Invoice' button to print a physical copy or save the invoice as a PDF." }
    ],
    features: [
      { icon: FileText, title: "Professional Layout", description: "Generates a clean, standard invoice layout suitable for any business." },
      { icon: PlusCircle, title: "Dynamic Items", description: "Easily add or remove line items to create detailed invoices for any project or sale." },
      { icon: Printer, title: "Print-Friendly", description: "The tool is optimized for printing, ensuring your physical and digital copies look professional." }
    ]
  };

  return (
    <>
    <Card className="w-full mx-auto p-4 md:p-8 print:shadow-none print:border-none">
      <div className="grid grid-cols-2 gap-8 mb-8 print:grid-cols-2">
        <div className="space-y-2">
            <Label>From</Label>
            <Textarea value={from} onChange={e => setFrom(e.target.value)} placeholder="Your Company Details" rows={4}/>
        </div>
        <div className="space-y-2">
            <Label>To</Label>
            <Textarea value={to} onChange={e => setTo(e.target.value)} placeholder="Client Details" rows={4}/>
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">INVOICE</h1>
        <div className="space-y-2">
            <Label htmlFor="invoice-number">Invoice #</Label>
            <Input id="invoice-number" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="w-40" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 font-bold bg-muted p-2 rounded-t-lg print:hidden">
          <div>Description</div>
          <div className="w-24 text-right">Quantity</div>
          <div className="w-32 text-right">Price</div>
          <div className="w-32 text-right">Total</div>
        </div>
        <div className="hidden print:grid print:grid-cols-[1fr_auto_auto_auto] print:gap-2 print:font-bold print:bg-muted print:p-2 print:rounded-t-lg">
           <div>Description</div>
           <div className="w-24 text-right">Quantity</div>
           <div className="w-32 text-right">Price</div>
           <div className="w-32 text-right">Total</div>
        </div>

        {lineItems.map(item => (
          <div key={item.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 items-center print:grid-cols-[1fr_auto_auto_auto] print:gap-4">
            <Input value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} />
            <Input type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-24 text-right" />
            <Input type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} className="w-32 text-right" />
            <div className="w-32 text-right font-medium pr-3">{formatCurrency(item.quantity * item.price)}</div>
            <Button size="icon" variant="ghost" onClick={() => removeLineItem(item.id)} className="print:hidden"><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
         <Button variant="outline" onClick={addLineItem} className="print:hidden"><PlusCircle className="mr-2"/> Add Item</Button>
      </div>

      <div className="flex justify-end mt-8">
        <div className="w-64 space-y-2">
            <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
            </div>
        </div>
      </div>
      
      <div className="text-center mt-12 print:hidden">
        <Button onClick={printInvoice}><Printer className="mr-2" />Print Invoice</Button>
      </div>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
