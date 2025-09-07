
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Note {
  id: number;
  text: string;
  color: string;
  position: { x: number; y: number };
}

const colors = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200'];

export default function StickyNotesBoardTool() {
  const [notes, setNotes] = useState<Note[]>([]);
  
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('d2ools-sticky-notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-sticky-notes', JSON.stringify(notes));
    } catch (e) { console.error(e); }
  }, [notes]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      text: 'New Note',
      color: colors[Math.floor(Math.random() * colors.length)],
      position: { x: 50, y: 50 },
    };
    setNotes([...notes, newNote]);
  };

  const updateNoteText = (id: number, newText: string) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, text: newText } : note)));
  };

  const updateNotePosition = (id: number, newPosition: { x: number, y: number }) => {
     setNotes(notes.map(note => (note.id === id ? { ...note, position: newPosition } : note)));
  }

  const removeNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="w-full h-[70vh] border rounded-lg bg-muted/30 relative overflow-hidden">
        <div className="absolute top-2 left-2 z-10">
            <Button onClick={addNote}><PlusCircle className="mr-2"/> Add Note</Button>
        </div>
      <AnimatePresence>
        {notes.map(note => (
          <motion.div
            key={note.id}
            drag
            dragMomentum={false}
            onDragEnd={(event, info) => updateNotePosition(note.id, info.point)}
            initial={{ x: note.position.x, y: note.position.y, scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className={`absolute w-48 h-48 p-2 shadow-lg cursor-grab active:cursor-grabbing flex flex-col ${note.color}`}
          >
            <Textarea
              value={note.text}
              onChange={(e) => updateNoteText(note.id, e.target.value)}
              className="flex-1 w-full bg-transparent border-none focus:ring-0 text-black placeholder:text-black/50"
            />
            <Button size="icon" variant="ghost" className="absolute top-0 right-0 h-6 w-6" onClick={() => removeNote(note.id)}>
                <Trash2 className="w-3 h-3 text-black/50 hover:text-black"/>
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
       <p className="absolute bottom-2 right-2 text-xs text-muted-foreground z-10">Your notes are saved in your browser.</p>
    </div>
  );
}
