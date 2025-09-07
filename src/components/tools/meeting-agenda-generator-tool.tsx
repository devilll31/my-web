
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const agendaTemplate = `Meeting Title: [Your Meeting Title]
Date: [Date]
Time: [Start Time] - [End Time]
Location/Link: [Location or URL]

Attendees:
- [Name 1]
- [Name 2]

Agenda:
1.  Opening (5 min)
    - Welcome & brief introductions

2.  Review of Previous Action Items (10 min)
    - [Action Item 1]: [Owner] - [Status]
    - [Action Item 2]: [Owner] - [Status]

3.  Topic 1: [Name of First Topic] (15 min)
    - Discussion point A
    - Discussion point B

4.  Topic 2: [Name of Second Topic] (20 min)
    - Discussion point A
    - Discussion point B

5.  Next Steps & Action Items (5 min)
    - [New Action Item]: [Assigned To] - [Due Date]

6.  Closing Remarks (5 min)
`;

export default function MeetingAgendaGeneratorTool() {
  const [agenda, setAgenda] = useState(agendaTemplate);

  return (
    <Card className="w-full mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Meeting Agenda Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">Use this template to create a clear and effective meeting agenda.</p>
        <Textarea
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
          className="min-h-[400px] font-mono text-sm"
        />
        <div className="flex justify-center gap-4">
            <Button onClick={() => navigator.clipboard.writeText(agenda)}>Copy to Clipboard</Button>
            <Button variant="outline" onClick={() => setAgenda(agendaTemplate)}>Reset Template</Button>
        </div>
      </CardContent>
    </Card>
  );
}
