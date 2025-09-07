
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HowToUseGuide from '@/components/how-to-use-guide';
import { Ruler, Weight, Thermometer, Beaker } from 'lucide-react';
import { motion } from 'framer-motion';

type UnitType = 'length' | 'mass' | 'temperature' | 'volume';

const units = {
  length: [
    { id: 'm', name: 'Meter', toBase: 1 },
    { id: 'km', name: 'Kilometer', toBase: 1000 },
    { id: 'cm', name: 'Centimeter', toBase: 0.01 },
    { id: 'mm', name: 'Millimeter', toBase: 0.001 },
    { id: 'ft', name: 'Feet', toBase: 0.3048 },
    { id: 'in', name: 'Inches', toBase: 0.0254 },
  ],
  mass: [
    { id: 'kg', name: 'Kilogram', toBase: 1 },
    { id: 'g', name: 'Gram', toBase: 0.001 },
    { id: 'mg', name: 'Milligram', toBase: 0.000001 },
    { id: 'lb', name: 'Pound', toBase: 0.453592 },
    { id: 'oz', name: 'Ounce', toBase: 0.0283495 },
  ],
  temperature: [
    { id: 'c', name: 'Celsius' },
    { id: 'f', name: 'Fahrenheit' },
    { id: 'k', name: 'Kelvin' },
  ],
  volume: [
    { id: 'l', name: 'Liter', toBase: 1 },
    { id: 'ml', name: 'Milliliter', toBase: 0.001 },
    { id: 'gal', name: 'Gallon (US)', toBase: 3.78541 },
    { id: 'pt', name: 'Pint (US)', toBase: 0.473176 },
  ]
};

const UnitConverterPanel = ({ type }: { type: UnitType }) => {
  const unitSet = units[type];
  const [fromUnit, setFromUnit] = useState(unitSet[0].id);
  const [toUnit, setToUnit] = useState(unitSet[1].id);
  const [inputValue, setInputValue] = useState(1);
  const [outputValue, setOutputValue] = useState(0);

  useEffect(() => {
    let result: number;
    if (type === 'temperature') {
      if (fromUnit === 'c') {
        if (toUnit === 'f') result = inputValue * 9/5 + 32;
        else if (toUnit === 'k') result = inputValue + 273.15;
        else result = inputValue;
      } else if (fromUnit === 'f') {
        if (toUnit === 'c') result = (inputValue - 32) * 5/9;
        else if (toUnit === 'k') result = (inputValue - 32) * 5/9 + 273.15;
        else result = inputValue;
      } else { // Kelvin
        if (toUnit === 'c') result = inputValue - 273.15;
        else if (toUnit === 'f') result = (inputValue - 273.15) * 9/5 + 32;
        else result = inputValue;
      }
    } else {
      const from = unitSet.find(u => u.id === fromUnit) as { toBase: number };
      const to = unitSet.find(u => u.id === toUnit) as { toBase: number };
      const baseValue = inputValue * from.toBase;
      result = baseValue / to.toBase;
    }
    setOutputValue(result);
  }, [inputValue, fromUnit, toUnit, type, unitSet]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>From</Label>
        <Select value={fromUnit} onValueChange={setFromUnit}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{unitSet.map(u => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}</SelectContent>
        </Select>
        <Input type="number" value={inputValue} onChange={e => setInputValue(parseFloat(e.target.value) || 0)} className="text-lg h-12" />
      </div>
       <div className="space-y-2">
        <Label>To</Label>
        <Select value={toUnit} onValueChange={setToUnit}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{unitSet.map(u => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}</SelectContent>
        </Select>
        <div className="w-full h-12 flex items-center px-3 rounded-md border border-input bg-muted text-lg font-bold text-primary">
          {outputValue.toFixed(4)}
        </div>
      </div>
    </div>
  );
};


export default function UnitConverterTool() {
  const guideProps = {
    title: "How to Use the Unit Converter",
    steps: [
      { title: "Select Category", description: "Choose the type of measurement you want to convert, such as Length, Mass, Temperature, or Volume." },
      { title: "Enter Your Value", description: "Input the number you want to convert and select its starting unit." },
      { title: "Choose Target Unit", description: "Select the unit you want to convert to, and the result will appear instantly." }
    ],
    features: [
      { icon: Ruler, title: "Multiple Categories", description: "Easily switch between different types of measurements for comprehensive conversion." },
      { icon: Thermometer, title: "Temperature Logic", description: "Includes specific formulas for accurate temperature conversions between Celsius, Fahrenheit, and Kelvin." }
    ]
  };

  return (
    <>
      <Card className="bg-card shadow-lg border-border/50">
        <Tabs defaultValue="length">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="length" className="py-2"><Ruler className="mr-2"/>Length</TabsTrigger>
              <TabsTrigger value="mass" className="py-2"><Weight className="mr-2"/>Mass</TabsTrigger>
              <TabsTrigger value="temperature" className="py-2"><Thermometer className="mr-2"/>Temperature</TabsTrigger>
              <TabsTrigger value="volume" className="py-2"><Beaker className="mr-2"/>Volume</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <motion.div key="length" initial={{opacity:0}} animate={{opacity:1}}>
              <TabsContent value="length"><UnitConverterPanel type="length" /></TabsContent>
            </motion.div>
            <motion.div key="mass" initial={{opacity:0}} animate={{opacity:1}}>
              <TabsContent value="mass"><UnitConverterPanel type="mass" /></TabsContent>
            </motion.div>
            <motion.div key="temperature" initial={{opacity:0}} animate={{opacity:1}}>
              <TabsContent value="temperature"><UnitConverterPanel type="temperature" /></TabsContent>
            </motion.div>
             <motion.div key="volume" initial={{opacity:0}} animate={{opacity:1}}>
              <TabsContent value="volume"><UnitConverterPanel type="volume" /></TabsContent>
            </motion.div>
          </CardContent>
        </Tabs>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
