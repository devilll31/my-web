'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Edit, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HowToUseGuide from '@/components/how-to-use-guide';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function SimpleCrmTool() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem('d2ools-crm-contacts');
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }
    } catch(e) { console.error(e); }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('d2ools-crm-contacts', JSON.stringify(contacts));
    } catch(e) { console.error(e); }
  }, [contacts]);

  const addContact = () => {
    const newContact: Contact = { id: Date.now(), name: 'New Contact', email: '', phone: '', notes: '' };
    setContacts([newContact, ...contacts]);
    setSelectedContact(newContact);
  };
  
  const updateContact = (id: number, updatedFields: Partial<Contact>) => {
    const updatedContacts = contacts.map(c => c.id === id ? { ...c, ...updatedFields } : c);
    setContacts(updatedContacts);
    if(selectedContact?.id === id) {
        setSelectedContact(updatedContacts.find(c => c.id === id) || null);
    }
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  };

  const guideProps = {
    title: "How to Use the Simple CRM",
    steps: [
      { title: "Add a Contact", description: "Click the '+' button to add a new contact to your list." },
      { title: "Select to Edit", description: "Click on any contact in the list to view and edit their details in the main panel." },
      { title: "Save and Manage", description: "All changes are saved automatically to your browser. Use the delete button to remove contacts." }
    ],
    features: [
      { icon: User, title: "Contact Management", description: "A simple, lightweight tool to keep track of your customer or personal contacts without a complex system." },
      { icon: Trash2, title: "Local Storage", description: "Your contact data is saved securely in your browser's local storage and is not sent to any server, ensuring your privacy." },
      { icon: Edit, title: "Quick & Easy Editing", description: "A clean, two-panel layout makes it fast and easy to add, view, and update contact information." }
    ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[70vh]">
      <Card className="md:col-span-1 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contacts</CardTitle>
          <Button size="icon" onClick={addContact}><PlusCircle /></Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto pr-2 space-y-2">
            <AnimatePresence>
                {contacts.map(contact => (
                    <motion.div
                        key={contact.id}
                        layout
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedContact(contact)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedContact?.id === contact.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                    >
                        <p className="font-bold truncate">{contact.name}</p>
                        <p className="text-sm truncate">{contact.email}</p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardContent className="p-6 h-full">
          {selectedContact ? (
            <div className="space-y-4 h-full flex flex-col">
              <Input
                value={selectedContact.name}
                onChange={e => updateContact(selectedContact.id, { name: e.target.value })}
                className="text-2xl font-bold h-12"
              />
              <Input
                value={selectedContact.email}
                onChange={e => updateContact(selectedContact.id, { email: e.target.value })}
                placeholder="Email"
              />
              <Input
                value={selectedContact.phone}
                onChange={e => updateContact(selectedContact.id, { phone: e.target.value })}
                placeholder="Phone"
              />
              <Textarea
                value={selectedContact.notes}
                onChange={e => updateContact(selectedContact.id, { notes: e.target.value })}
                placeholder="Notes..."
                className="flex-1"
              />
              <Button variant="destructive" onClick={() => removeContact(selectedContact.id)} className="w-full">
                <Trash2 className="mr-2"/> Delete Contact
              </Button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <User className="w-16 h-16 mb-4"/>
                <p>Select a contact to view or edit,</p>
                <p>or add a new one.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
     <p className="text-xs text-center text-muted-foreground pt-4">Your data is saved in your browser.</p>
     <HowToUseGuide {...guideProps} />
    </>
  );
}
