'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import HowToUseGuide from '@/components/how-to-use-guide';
import { CheckSquare, Edit, Code } from 'lucide-react';

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

  const guideProps = {
    title: "How to Use the Lead Capture Form Builder",
    steps: [
      { title: "Customize Your Form", description: "Set a title, button text, and select the fields you want to include in your form." },
      { title: "Preview Live", description: "See a live preview of your form as you make changes in the builder panel." },
      { title: "Implement on Your Site", description: "While this tool is for design and preview, you can use the layout as a template for your own website's lead capture form." }
    ],
    features: [
      { icon: Edit, title: "Visual Builder", description: "Easily design a lead capture form by toggling fields and editing text, with a real-time preview." },
      { icon: CheckSquare, title: "Selectable Fields", description: "Choose from common lead capture fields like name, email, phone, company, and a message box." },
      { icon: Code, title: "Prototype Tool", description: "Perfect for quickly prototyping and visualizing a contact or lead form for your website or application." }
    ]
  };

  return (
    <>
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
                            <Checkbox id={key} checked={fields[key as keyof typeof fields]} onCheckedChange={checked => setFields({...fields, [key]: checked as boolean})} />
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
                    {fields.name && <div><Label>Name</Label><Input disabled placeholder="e.g., John Doe"/></div>}
                    {fields.email && <div><Label>Email</Label><Input type="email" disabled placeholder="e.g., john.doe@example.com"/></div>}
                    {fields.phone && <div><Label>Phone</Label><Input type="tel" disabled placeholder="e.g., +1 555-123-4567"/></div>}
                    {fields.company && <div><Label>Company</Label><Input disabled placeholder="e.g., Acme Inc."/></div>}
                    {fields.message && <div><Label>Message</Label><Input disabled placeholder="Your message..."/></div>}
                    <Button disabled>{buttonText}</Button>
                </form>
            </div>
        </CardContent>
      </Card>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
