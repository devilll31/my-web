'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LeadCaptureFormBuilderTool() {
  const [fields, setFields] = useState({
    name: true,
    email: true,
    phone: false,
    company: false,
    message: true,
  });
  const [title, setTitle] = useState('Contact Us');
  const [buttonText, setButtonText] = useState('Submit');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Form Builder</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label>Form Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} />
            </div>
             <div>
                <Label>Button Text</Label>
                <Input value={buttonText} onChange={e => setButtonText(e.target.value)} />
            </div>
            <div>
                <Label>Include Fields</Label>
                <div className="space-y-2 mt-2">
                    {Object.keys(fields).map(key => (
                        <div key={key} className="flex items-center gap-2">
                            <Checkbox id={key} checked={fields[key as keyof typeof fields]} onCheckedChange={checked => setFields({...fields, [key]: checked})} />
                            <Label htmlFor={key} className="capitalize">{key}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
        <CardContent>
            <div className="p-6 border rounded-lg bg-background">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <form className="space-y-4">
                    {fields.name && <div><Label>Name</Label><Input disabled /></div>}
                    {fields.email && <div><Label>Email</Label><Input type="email" disabled /></div>}
                    {fields.phone && <div><Label>Phone</Label><Input type="tel" disabled /></div>}
                    {fields.company && <div><Label>Company</Label><Input disabled /></div>}
                    {fields.message && <div><Label>Message</Label><Input disabled /></div>}
                    <Button disabled>{buttonText}</Button>
                </form>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
