
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import HowToUseGuide from '../how-to-use-guide';
import { Calendar, Globe } from 'lucide-react';
import { format } from 'date-fns';

const locales = ['en-US', 'en-GB', 'de-DE', 'fr-FR', 'es-ES', 'ja-JP', 'hi-IN'];
const dateStyleOptions: Intl.DateTimeFormatOptions['dateStyle'][] = ['full', 'long', 'medium', 'short'];
const timeStyleOptions: Intl.DateTimeFormatOptions['timeStyle'][] = ['full', 'long', 'medium', 'short'];


export default function DateLocalizationFormatterTool() {
  const [locale, setLocale] = useState('en-US');
  const [dateStyle, setDateStyle] = useState<Intl.DateTimeFormatOptions['dateStyle']>('long');
  const [timeStyle, setTimeStyle] = useState<Intl.DateTimeFormatOptions['timeStyle']>('short');
  const now = new Date();

  const formattedDate = new Intl.DateTimeFormat(locale, { 
      dateStyle: dateStyle, 
      timeStyle: timeStyle 
  }).format(now);

  const guideProps = {
    title: "How to Use the Date Localization Formatter",
    steps: [
      { title: "Select a Locale", description: "Choose a language and region from the dropdown (e.g., 'en-US' for American English, 'hi-IN' for Hindi)." },
      { title: "Choose Styles", description: "Select the desired date and time formatting styles (e.g., 'long' date, 'short' time)." },
      { title: "View the Result", description: "The current date and time are instantly displayed in the chosen localized format." }
    ],
    features: [
      { icon: Globe, title: "Global Formats", description: "Preview how dates and times are written in different countries and languages." },
      { icon: Calendar, title: "Standard Styles", description: "Uses the native browser `Intl` API for accurate, standardized formatting." },
    ]
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader><CardTitle className="text-center">Date Localization Formatter</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Locale</Label>
              <Select value={locale} onValueChange={setLocale}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{locales.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
            </div>
            <div>
              <Label>Date Style</Label>
              <Select value={dateStyle} onValueChange={(v) => setDateStyle(v as any)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{dateStyleOptions.map(s => <SelectItem key={s} value={s!}>{s}</SelectItem>)}</SelectContent></Select>
            </div>
            <div>
              <Label>Time Style</Label>
              <Select value={timeStyle} onValueChange={(v) => setTimeStyle(v as any)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{timeStyleOptions.map(s => <SelectItem key={s} value={s!}>{s}</SelectItem>)}</SelectContent></Select>
            </div>
          </div>
          <div className="pt-4 text-center">
            <Label>Formatted Output</Label>
            <div className="p-4 mt-2 text-2xl font-bold text-primary bg-primary/10 rounded-lg">{formattedDate}</div>
          </div>
        </CardContent>
      </Card>
      <HowToUseGuide {...guideProps} />
    </>
  );
}
