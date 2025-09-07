
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Quadrant = 'do' | 'schedule' | 'delegate' | 'delete';

interface Task {
  id: number;
  text: string;
  quadrant: Quadrant;
}

const quadrantConfig = {
    do: { title: "Urgent & Important", description: "Do it now.", color: "bg-red-500" },
    schedule: { title: "Not Urgent & Important", description: "Schedule a time to do it.", color: "bg-blue-500" },
    delegate: { title: "Urgent & Not Important", description: "Delegate it.", color: "bg-yellow-500" },
    delete: { title: "Not Urgent & Not Important", description: "Eliminate it.", color: "bg-gray-500" },
}

const QuadrantColumn = ({ quadrant, tasks, onAddTask, onRemoveTask }: { quadrant: Quadrant, tasks: Task[], onAddTask: (quadrant: Quadrant, text: string) => void, onRemoveTask: (id: number) => void }) => {
  const [inputText, setInputText] = useState('');
  const config = quadrantConfig[quadrant];

  const handleAddTask = () => {
    if (inputText.trim()) {
      onAddTask(quadrant, inputText.trim());
      setInputText('');
    }
  }

  return (
    <Card className="flex flex-col h-full shadow-lg">
      <div className={`p-4 rounded-t-lg text-white ${config.color}`}>
        <h3 className="font-bold text-center">{config.title}</h3>
        <p className="text-xs text-center text-white/80">{config.description}</p>
      </div>
      <CardContent className="p-2 flex-1 flex flex-col">
        <div className="flex-1 space-y-2 py-2">
            <AnimatePresence>
                {tasks.map(task => (
                    <motion.div 
                        key={task.id} 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-2 bg-background rounded-md text-sm"
                    >
                        <span className="flex-1">{task.text}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onRemoveTask(task.id)}>
                            <Trash2 className="w-3 h-3"/>
                        </Button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
        <div className="flex gap-2 pt-2 border-t">
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Add a task..."
            className="h-8"
          />
          <Button size="sm" onClick={handleAddTask}><PlusCircle className="w-4 h-4"/></Button>
        </div>
      </CardContent>
    </Card>
  );
};


export default function EisenhowerMatrixTool() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    try {
        const savedTasks = localStorage.getItem('d2ools-eisenhower-matrix');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    } catch (e) { console.error(e) }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem('d2ools-eisenhower-matrix', JSON.stringify(tasks));
    } catch (e) { console.error(e) }
  }, [tasks]);

  const addTask = (quadrant: Quadrant, text: string) => {
    const newTask: Task = { id: Date.now(), text, quadrant };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuadrantColumn quadrant="do" tasks={tasks.filter(t => t.quadrant === 'do')} onAddTask={addTask} onRemoveTask={removeTask} />
        <QuadrantColumn quadrant="schedule" tasks={tasks.filter(t => t.quadrant === 'schedule')} onAddTask={addTask} onRemoveTask={removeTask} />
        <QuadrantColumn quadrant="delegate" tasks={tasks.filter(t => t.quadrant === 'delegate')} onAddTask={addTask} onRemoveTask={removeTask} />
        <QuadrantColumn quadrant="delete" tasks={tasks.filter(t => t.quadrant === 'delete')} onAddTask={addTask} onRemoveTask={removeTask} />
      </div>
      <p className="text-xs text-center text-muted-foreground pt-4">Your data is saved in your browser and is not sent to our servers.</p>
    </div>
  );
}
