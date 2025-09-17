
'use client';

import React from 'react';
import { Check, Star, Users, FileText, Database, Clock, Zap } from 'lucide-react';

const allStats = [
  { value: '500+ Tools', label: 'Premium Quality', icon: <Star className="w-6 h-6 text-primary" /> },
  { value: '100k+ Users', label: 'Trusted Worldwide', icon: <Users className="w-6 h-6 text-green-500" /> },
  { value: '1M+ Files', label: 'Processed Securely', icon: <FileText className="w-6 h-6 text-purple-500" /> },
  { value: '99.9% Uptime', label: 'Reliable & Fast', icon: <Clock className="w-6 h-6 text-orange-500" /> },
  { value: '10+ Categories', label: 'For Every Need', icon: <Database className="w-6 h-6 text-pink-500" /> },
  { value: '24/7 Free', label: 'No Registration', icon: <Check className="w-6 h-6 text-blue-500" /> },
  { value: '100% Free', label: 'No Limits', icon: <Zap className="w-6 h-6 text-yellow-500" /> },
];

// Function to shuffle an array
const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuickStats = () => {
    // This will shuffle on every render, which is fine for variety across pages.
    // For consistent stats per page load, you might use state with initial shuffle.
    const stats = shuffle([...allStats]).slice(0, 5);

    return (
        <section className="w-full py-12 bg-secondary/50">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center gap-2">
                            <div className="p-3 bg-white rounded-full shadow-md">
                                {stat.icon}
                            </div>
                            <p className="text-xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickStats;
