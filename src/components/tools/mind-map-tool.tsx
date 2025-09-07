
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: number;
  text: string;
  parentId: number | null;
  position: { x: number; y: number };
}

export default function MindMapTool() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const savedNodes = localStorage.getItem('d2ools-mind-map');
      if (savedNodes) {
        setNodes(JSON.parse(savedNodes));
      } else {
        setNodes([{ id: 1, text: 'Central Idea', parentId: null, position: { x: 300, y: 200 } }]);
      }
    } catch(e) { console.error(e) }
  }, []);

  useEffect(() => {
     try {
      localStorage.setItem('d2ools-mind-map', JSON.stringify(nodes));
    } catch(e) { console.error(e) }
  }, [nodes]);
  
  const addNode = () => {
    if (selectedNodeId === null && nodes.length > 0) return;
    const parentNode = nodes.find(n => n.id === selectedNodeId);
    const newPosition = parentNode 
        ? { x: parentNode.position.x + 150, y: parentNode.position.y + 50 } 
        : { x: 50, y: 50};

    const newNode: Node = {
      id: Date.now(),
      text: 'New Idea',
      parentId: selectedNodeId,
      position: newPosition,
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
  };
  
  const updateNodeText = (id: number, text: string) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, text } : n));
  };
  
  const deleteNode = () => {
    if(selectedNodeId && selectedNodeId !== 1) { // Cannot delete root node
        setNodes(nodes.filter(n => n.id !== selectedNodeId && n.parentId !== selectedNodeId));
        setSelectedNodeId(null);
    }
  }

  const renderLines = () => {
    return nodes.map(node => {
      if (node.parentId === null) return null;
      const parent = nodes.find(p => p.id === node.parentId);
      if (!parent) return null;
      return (
        <line
          key={`${parent.id}-${node.id}`}
          x1={parent.position.x + 75}
          y1={parent.position.y + 25}
          x2={node.position.x + 75}
          y2={node.position.y + 25}
          className="stroke-muted-foreground stroke-2"
        />
      );
    });
  };

  return (
    <Card className="w-full mx-auto shadow-lg border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mind Map</CardTitle>
        <div className="flex gap-2">
            <Button onClick={addNode} disabled={selectedNodeId === null && nodes.length > 0}><Plus className="mr-2"/> Add Node</Button>
            <Button onClick={deleteNode} variant="destructive" disabled={!selectedNodeId || selectedNodeId === 1}><Trash2 className="mr-2"/> Delete Node</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[60vh] bg-background border rounded-lg overflow-hidden">
          <svg className="absolute w-full h-full" style={{ pointerEvents: 'none' }}>
              {renderLines()}
          </svg>
          <AnimatePresence>
            {nodes.map(node => (
                <motion.div
                    key={node.id}
                    drag 
                    dragMomentum={false}
                    onDragEnd={(e, info) => {
                        const newNodes = nodes.map(n => n.id === node.id ? {...n, position: {x: info.point.x, y: info.point.y}} : n);
                        setNodes(newNodes);
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, x: node.position.x, y: node.position.y }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`absolute w-36 h-14 p-2 rounded-lg shadow-md cursor-grab active:cursor-grabbing flex items-center justify-center ${selectedNodeId === node.id ? 'ring-2 ring-primary' : 'ring-1 ring-border'}`}
                    style={{ backgroundColor: node.parentId === null ? 'hsl(var(--primary))' : 'hsl(var(--secondary))', color: node.parentId === null ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))' }}
                >
                    <Input
                        value={node.text}
                        onChange={(e) => updateNodeText(node.id, e.target.value)}
                        className="w-full bg-transparent border-none text-center h-full focus:ring-0"
                    />
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
         <p className="text-xs text-center text-muted-foreground pt-2">Your mind map is saved locally in your browser.</p>
      </CardContent>
    </Card>
  );
}
