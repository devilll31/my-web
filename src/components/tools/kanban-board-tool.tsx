
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ColumnId = 'todo' | 'inprogress' | 'done';

interface Task {
  id: number;
  text: string;
  column: ColumnId;
}

const Column = ({ title, columnId, tasks, onAddTask, onRemoveTask, onMoveTask }: { 
    title: string; 
    columnId: ColumnId;
    tasks: Task[]; 
    onAddTask: (text: string, column: ColumnId) => void;
    onRemoveTask: (id: number) => void;
    onMoveTask: (id: number, targetColumn: ColumnId) => void;
}) => {
  const [inputText, setInputText] = useState('');

  const handleAddTask = () => {
    if (inputText.trim()) {
      onAddTask(inputText.trim(), columnId);
      setInputText('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("taskId"));
    onMoveTask(taskId, columnId);
  }

  return (
    <Card className="flex flex-col h-full bg-secondary/50" onDragOver={handleDragOver} onDrop={handleDrop}>
      <CardHeader className="py-4">
        <CardTitle className="text-center text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 flex-1 flex flex-col">
        <div className="flex-1 space-y-2 py-2 overflow-y-auto">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("taskId", String(task.id))}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 bg-card rounded-md text-sm shadow cursor-grab active:cursor-grabbing"
              >
                <span className="flex-1">{task.text}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onRemoveTask(task.id)}>
                  <Trash2 className="w-3 h-3 text-destructive" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex gap-2 pt-2 border-t mt-auto">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="New task..."
            className="h-8"
          />
          <Button size="sm" onClick={handleAddTask}><PlusCircle className="w-4 h-4"/></Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function KanbanBoardTool() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    try {
        const savedTasks = localStorage.getItem('d2ools-kanban-board');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            // Default tasks
            setTasks([
                { id: 1, text: 'Design the UI', column: 'done' },
                { id: 2, text: 'Develop the frontend', column: 'inprogress' },
                { id: 3, text: 'Deploy the application', column: 'todo' },
            ]);
        }
    } catch (e) { console.error(e) }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem('d2ools-kanban-board', JSON.stringify(tasks));
    } catch (e) { console.error(e) }
  }, [tasks]);

  const addTask = (text: string, column: ColumnId) => {
    const newTask: Task = { id: Date.now(), text, column };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const moveTask = (id: number, targetColumn: ColumnId) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, column: targetColumn } : task));
  }

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh]">
        <Column 
          title="To Do" 
          columnId="todo"
          tasks={tasks.filter(t => t.column === 'todo')}
          onAddTask={addTask}
          onRemoveTask={removeTask}
          onMoveTask={moveTask}
        />
        <Column 
          title="In Progress" 
          columnId="inprogress"
          tasks={tasks.filter(t => t.column === 'inprogress')}
          onAddTask={addTask}
          onRemoveTask={removeTask}
          onMoveTask={moveTask}
        />
        <Column 
          title="Done" 
          columnId="done"
          tasks={tasks.filter(t => t.column === 'done')}
          onAddTask={addTask}
          onRemoveTask={removeTask}
          onMoveTask={moveTask}
        />
      </div>
      <p className="text-xs text-center text-muted-foreground pt-4">Your data is saved in your browser and is not sent to our servers.</p>
    </div>
  );
}
