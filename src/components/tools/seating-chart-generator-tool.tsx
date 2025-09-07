
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function SeatingChartGeneratorTool() {
  const [names, setNames] = useState('Alice\nBob\nCharlie\nDavid\nEve\nFrank\nGrace\nHeidi');
  const [columns, setColumns] = useState(4);
  const [chart, setChart] = useState<string[][]>([]);

  const generateChart = () => {
    let nameList = names.split('\n').filter(n => n.trim() !== '');
    // Shuffle the names
    for (let i = nameList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nameList[i], nameList[j]] = [nameList[j], nameList[i]];
    }

    const newChart: string[][] = [];
    const rows = Math.ceil(nameList.length / columns);
    for (let r = 0; r < rows; r++) {
        newChart.push(nameList.slice(r * columns, (r + 1) * columns));
    }
    setChart(newChart);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="names-list">Names (one per line)</Label>
            <Textarea
              id="names-list"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <div>
            <Label htmlFor="columns">Number of Columns</Label>
            <Input
              id="columns"
              type="number"
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value, 10) || 1)}
              min="1"
            />
          </div>
          <Button onClick={generateChart} className="w-full">Generate Chart</Button>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Seating Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-background min-h-[300px]">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
              {chart.flat().map((name, index) => (
                <div key={index} className="p-3 text-center border rounded-md bg-secondary shadow-sm font-medium">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
