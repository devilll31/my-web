
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface GuideStep {
  title: string;
  description: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface HowToUseGuideProps {
  steps: GuideStep[];
  features: Feature[];
  title: string;
}

const HowToUseGuide: React.FC<HowToUseGuideProps> = ({ steps, features, title }) => {
  return (
    <div className="mt-16 w-full max-w-5xl mx-auto">
       <Card className="p-8 bg-card shadow-lg border-border/50">
          <h2 className="text-2xl font-bold text-center mb-8 font-headline">{title}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-10 text-center">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center flex flex-col items-center shadow-lg border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{feature.description}</p>
              </Card>
            ))}
        </div>
    </div>
  );
};

export default HowToUseGuide;
