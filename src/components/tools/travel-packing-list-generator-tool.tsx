'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, PlusCircle, Trash2 } from 'lucide-react';

const categories = {
  'Clothing': ['T-shirts', 'Pants', 'Shorts', 'Socks', 'Underwear'],
  'Toiletries': ['Toothbrush', 'Toothpaste', 'Shampoo', 'Soap'],
  'Electronics': ['Phone charger', 'Power bank', 'Headphones'],
  'Documents': ['Passport/ID', 'Tickets', 'Hotel confirmation'],
  'Miscellaneous': ['Sunglasses', 'Book', 'Snacks'],
};

export default function TravelPackingListGeneratorTool() {
  const [destination, setDestination] = useState('Beach Vacation');
  const [duration, setDuration] = useState(7);
  const [list, setList] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState('');

  const generateList = () => {
    let generated = [...categories.Clothing, ...categories.Toiletries, ...categories.Electronics, ...categories.Documents, ...categories.Miscellaneous];
    if (destination.toLowerCase().includes('beach')) {
        generated.push('Swimsuit', 'Sunscreen', 'Beach towel');
    }
    if (destination.toLowerCase().includes('city')) {
        generated.push('Comfortable walking shoes', 'Jacket');
    }
    setList(generated);
  };
  
  const addCustomItem = () => {
    if (customItem && !list.includes(customItem)) {
      setList([...list, customItem]);
      setCustomItem('');
    }
  };

  const removeItem = (itemToRemove: string) => {
    setList(list.filter(item => item !== itemToRemove));
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="destination">Destination/Type</Label>
            <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g., Beach, City Break"/>
          </div>
           <div>
            <Label htmlFor="duration">Duration (days)</Label>
            <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value, 10))} />
          </div>
          <Button onClick={generateList} className="w-full">Generate Packing List</Button>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Your Packing List</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {list.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                        <Checkbox id={`item-${index}`} />
                        <Label htmlFor={`item-${index}`} className="flex-1">{item}</Label>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
             <div className="flex gap-2 pt-4 border-t mt-4">
                <Input value={customItem} onChange={(e) => setCustomItem(e.target.value)} placeholder="Add a custom item" onKeyDown={e => e.key === 'Enter' && addCustomItem()} />
                <Button onClick={addCustomItem}><PlusCircle className="mr-2"/>Add</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
