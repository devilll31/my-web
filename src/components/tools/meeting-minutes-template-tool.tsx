
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const minutesTemplate = `Meeting Minutes
---

Meeting Title: [Your Meeting Title]
Date: [Date]
Time: [Start Time] - [End Time]

Attendees:
- [Name 1]
- [Name 2]
- (absent: [Name 3])

---
### Decisions Made:

1.  **Regarding [Topic 1]:** 
    - Decision: [Briefly state the decision made].
    - Rationale: [Why this decision was made].

2.  **Regarding [Topic 2]:**
    - Decision: [Briefly state the decision made].

---
### Key Discussion Points:

-   **[Topic 1]:** 
    - [Summary of discussion point A].
    - [Summary of discussion point B].

-   **[Topic 2]:**
    - [Summary of discussion point C].

---
### Action Items:

| Task                                 | Assigned To | Due Date   |
| ------------------------------------ | ----------- | ---------- |
| [Specific action item 1]             | [Name]      | [YYYY-MM-DD] |
| [Specific action item 2]             | [Name]      | [YYYY-MM-DD] |

`;

export default function MeetingMinutesTemplateTool() {
  const [minutes, setMinutes] = useState(minutesTemplate);

  return (
    <Card className="w-full mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline">Meeting Minutes Template</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">Use this Markdown template to efficiently record meeting minutes.</p>
        <Textarea
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="min-h-[400px] font-mono text-sm"
        />
        <div className="flex justify-center gap-4">
            <Button onClick={() => navigator.clipboard.writeText(minutes)}>Copy to Clipboard</Button>
            <Button variant="outline" onClick={() => setMinutes(minutesTemplate)}>Reset Template</Button>
        </div>
      </CardContent>
    </Card>
  );
}
