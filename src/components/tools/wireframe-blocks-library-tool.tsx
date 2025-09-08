'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Eye } from 'lucide-react';
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const wireframeBlocks = [
  {
    name: 'Hero Section',
    code: `<section class="w-full py-12 md:py-24 lg:py-32">
  <div class="container px-4 md:px-6 text-center">
    <div class="space-y-4">
      <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Hero Title</h1>
      <p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
        Hero subtitle describing the main value proposition.
      </p>
      <button class="bg-primary text-primary-foreground h-10 px-8 rounded-md">Call to Action</button>
    </div>
  </div>
</section>`
  },
  {
    name: 'Feature List',
    code: `<section class="w-full py-12 md:py-24">
  <div class="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-3 lg:gap-10">
    <div class="space-y-2 text-center">
      <div class="bg-muted rounded-full w-12 h-12 mx-auto"></div>
      <h3 class="text-xl font-bold">Feature One</h3>
      <p class="text-muted-foreground">Description of feature one.</p>
    </div>
    <div class="space-y-2 text-center">
      <div class="bg-muted rounded-full w-12 h-12 mx-auto"></div>
      <h3 class="text-xl font-bold">Feature Two</h3>
      <p class="text-muted-foreground">Description of feature two.</p>
    </div>
    <div class="space-y-2 text-center">
      <div class="bg-muted rounded-full w-12 h-12 mx-auto"></div>
      <h3 class="text-xl font-bold">Feature Three</h3>
      <p class="text-muted-foreground">Description of feature three.</p>
    </div>
  </div>
</section>`
  },
  {
    name: 'Pricing Table',
    code: `<section class="w-full py-12 md:py-24">
  <div class="container grid gap-6 md:grid-cols-3 md:gap-8 px-4 md:px-6">
    <div class="border rounded-lg p-6 space-y-4">
      <h3 class="text-2xl font-bold">Basic</h3>
      <p class="text-4xl font-bold">$10<span class="text-lg font-normal text-muted-foreground">/mo</span></p>
      <ul class="space-y-2 text-muted-foreground"><li>Feature A</li><li>Feature B</li></ul>
      <button class="w-full bg-primary text-primary-foreground h-10 rounded-md">Get Started</button>
    </div>
    <div class="border-2 border-primary rounded-lg p-6 space-y-4">
      <h3 class="text-2xl font-bold">Pro</h3>
      <p class="text-4xl font-bold">$25<span class="text-lg font-normal text-muted-foreground">/mo</span></p>
      <ul class="space-y-2 text-muted-foreground"><li>Feature A, C, D</li></ul>
      <button class="w-full bg-primary text-primary-foreground h-10 rounded-md">Get Started</button>
    </div>
    <div class="border rounded-lg p-6 space-y-4">
      <h3 class="text-2xl font-bold">Enterprise</h3>
      <p class="text-4xl font-bold">Contact Us</p>
      <ul class="space-y-2 text-muted-foreground"><li>All Features</li></ul>
      <button class="w-full bg-primary text-primary-foreground h-10 rounded-md">Contact Us</button>
    </div>
  </div>
</section>`
  }
];

export default function WireframeBlocksLibraryTool() {
    const { toast } = useToast();

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({title: 'Code copied to clipboard!'});
    }

  return (
    <div className="space-y-8">
      {wireframeBlocks.map((block) => (
        <Card key={block.name}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{block.name}</CardTitle>
            <Button variant="ghost" onClick={() => copyCode(block.code)}><Code className="mr-2"/> Copy Code</Button>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg border">
                <div dangerouslySetInnerHTML={{ __html: block.code }}/>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
