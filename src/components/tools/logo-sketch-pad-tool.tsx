'use client';

import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eraser, Pencil, Palette } from 'lucide-react';

export default function LogoSketchPadTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  };

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = getCanvasContext();
    if (context) {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    const context = getCanvasContext();
    if (context) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = getCanvasContext();
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      context.lineCap = 'round';
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };
  
  const clearCanvas = () => {
      const context = getCanvasContext();
      const canvas = canvasRef.current;
      if(context && canvas) {
          context.clearRect(0,0, canvas.width, canvas.height);
      }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader><CardTitle>Tools</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
                <Input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-16 h-12 p-1" />
                <Button variant={color === '#000000' ? 'secondary' : 'outline'} onClick={() => setColor('#000000')}><Pencil /></Button>
                 <Button variant={color === '#FFFFFF' ? 'secondary' : 'outline'} onClick={() => setColor('#FFFFFF')}><Eraser /></Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Brush Size: {brushSize}px</Label>
            <Input type="range" min="1" max="50" value={brushSize} onChange={e => setBrushSize(Number(e.target.value))} />
          </div>
          <Button onClick={clearCanvas} variant="destructive" className="w-full">Clear Canvas</Button>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader><CardTitle>Logo Sketch Pad</CardTitle></CardHeader>
        <CardContent>
          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseLeave={finishDrawing}
            className="border rounded-lg bg-white"
          />
        </CardContent>
      </Card>
    </div>
  );
}
