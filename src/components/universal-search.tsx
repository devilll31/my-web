
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, FileText, Image as ImageIcon, Star } from 'lucide-react';
import { getTools, getCategories, Tool, Category, getCategoryBySlug } from '@/lib/tools-data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Moved outside the component to prevent re-creation on every render
const allTools = getTools();
const allCategories = getCategories();

const UniversalSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<(Tool | Category)[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const lowerCaseQuery = query.toLowerCase();
      
      const toolSuggestions = allTools.filter(tool => 
        tool.name.toLowerCase().includes(lowerCaseQuery) ||
        tool.slug.toLowerCase().includes(lowerCaseQuery) ||
        tool.description.toLowerCase().includes(lowerCaseQuery)
      ).slice(0, 10);

      const categorySuggestions = allCategories.filter(category => 
        category.name.toLowerCase().includes(lowerCaseQuery)
      ).slice(0, 3);

      // Simple semantic suggestions
      if (lowerCaseQuery.startsWith('p')) {
        const pdfTools = allTools.filter(t => t.slug.includes('pdf')).slice(0,3);
        toolSuggestions.unshift(...pdfTools);
      }
      if (lowerCaseQuery.startsWith('i')) {
        const imageTools = allTools.filter(t => t.slug.includes('image') || t.slug.includes('background-remover')).slice(0,3);
        toolSuggestions.unshift(...imageTools);
      }
      
      const combined = [...categorySuggestions, ...toolSuggestions];
      const uniqueSuggestions = Array.from(new Map(combined.map(item => [(item as any).slug, item])).values());
      
      setSuggestions(uniqueSuggestions.slice(0, 10));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isCategory = (item: Tool | Category): item is Category => 'tools' in item;

  return (
    <div className="relative w-full max-w-xl" ref={searchContainerRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search tools... (e.g., 'PDF to Word', 'Image Resizer')"
          className="w-full rounded-full pl-11 pr-4 py-2.5 text-sm bg-background/50 border-2 border-transparent focus:bg-white focus:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if(query.length > 0) setShowSuggestions(true); }}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-border/50 overflow-hidden z-50">
          <ul className="divide-y divide-border/50">
            {suggestions.map(item => {
              const href = isCategory(item) ? `/tools#${item.slug}` : `/tools/${item.slug}`;
              const categoryDetails = getCategoryBySlug(item.category);
              const iconColor = categoryDetails ? `hsl(${categoryDetails.color})` : 'hsl(var(--secondary-foreground))';
              const iconBgColor = categoryDetails ? `hsla(${categoryDetails.color}, 70%, 50%, 0.1)` : 'hsl(var(--muted))';
              
              const icon = categoryDetails ? <categoryDetails.icon className="h-5 w-5" style={{ color: iconColor }} /> : <Star className="h-5 w-5 text-secondary-foreground" />;
              
              const name = item.name;
              const description = isCategory(item) ? `${(item as Category).tools.length} tools` : item.description;

              return (
                <li key={item.slug}>
                  <Link href={href} onClick={() => setShowSuggestions(false)} className="flex items-center gap-4 p-3 hover:bg-primary/5 transition-colors">
                    <div className={cn("p-2 rounded-md")} style={{ backgroundColor: iconBgColor}}>
                      {icon}
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <p className="font-semibold text-sm truncate">{name}</p>
                       <p className="text-xs text-muted-foreground truncate">{description}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UniversalSearch;
