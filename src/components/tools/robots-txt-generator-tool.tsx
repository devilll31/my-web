'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HowToUseGuide from '../how-to-use-guide';
import { FileType, Bot, Ban } from 'lucide-react';

interface Rule {
  id: number;
  type: 'Allow' | 'Disallow';
  path: string;
}

interface AgentRules {
  id: number;
  userAgent: string;
  rules: Rule[];
}

export default function RobotsTxtGeneratorTool() {
  const [agents, setAgents] = useState<AgentRules[]>([
    { id: 1, userAgent: '*', rules: [{ id: 1, type: 'Disallow', path: '/admin/' }] }
  ]);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const { toast } = useToast();

  const addAgent = () => {
    setAgents([...agents, { id: Date.now(), userAgent: '', rules: [] }]);
  };

  const removeAgent = (agentId: number) => {
    setAgents(agents.filter(a => a.id !== agentId));
  };
  
  const updateAgent = (agentId: number, newUserAgent: string) => {
    setAgents(agents.map(a => a.id === agentId ? { ...a, userAgent: newUserAgent } : a));
  };
  
  const addRule = (agentId: number) => {
    setAgents(agents.map(a => 
      a.id === agentId 
        ? { ...a, rules: [...a.rules, { id: Date.now(), type: 'Disallow', path: '' }] }
        : a
    ));
  };

  const removeRule = (agentId: number, ruleId: number) => {
     setAgents(agents.map(a => 
      a.id === agentId 
        ? { ...a, rules: a.rules.filter(r => r.id !== ruleId) }
        : a
    ));
  };

  const updateRule = (agentId: number, ruleId: number, field: 'type' | 'path', value: string) => {
      setAgents(agents.map(a => 
        a.id === agentId 
            ? { ...a, rules: a.rules.map(r => r.id === ruleId ? {...r, [field]: value} : r) }
            : a
    ));
  };

  const generatedRobotsTxt = agents.map(agent => 
    `User-agent: ${agent.userAgent}\n` + 
    agent.rules.map(rule => `${rule.type}: ${rule.path}`).join('\n')
  ).join('\n\n') + (sitemapUrl ? `\n\nSitemap: ${sitemapUrl}` : '');

  const copyToClipboard = () => {
      navigator.clipboard.writeText(generatedRobotsTxt);
      toast({title: 'robots.txt copied to clipboard!'});
  }

  const guideProps = {
    title: "How to Use the Robots.txt Generator",
    steps: [
      { title: "Add User-Agents", description: "Add rules for specific bots (like 'Googlebot') or use '*' for all bots." },
      { title: "Set Rules", description: "For each user-agent, add 'Allow' or 'Disallow' rules for specific paths or directories on your website." },
      { title: "Generate and Copy", description: "The tool generates the complete robots.txt file, which you can copy and place in your website's root directory." }
    ],
    features: [
      { icon: Bot, title: "Control Crawlers", description: "Instruct search engine bots on which pages or sections of your site they should not crawl." },
      { icon: Ban, title: "Prevent Indexing Issues", description: "Avoid indexing of sensitive or duplicate content areas, improving your site's SEO health." },
      { icon: FileType, title: "Simple Syntax", description: "A simple form-based interface to generate the correct robots.txt syntax without manual errors." }
    ]
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Robots.txt Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {agents.map(agent => (
            <div key={agent.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex gap-2 items-center">
                    <Label>User-agent:</Label>
                    <Input value={agent.userAgent} onChange={(e) => updateAgent(agent.id, e.target.value)} placeholder="* for all bots"/>
                    <Button variant="ghost" size="icon" onClick={() => removeAgent(agent.id)} disabled={agents.length <= 1}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                </div>
                {agent.rules.map(rule => (
                    <div key={rule.id} className="flex gap-2 items-center">
                        <Select value={rule.type} onValueChange={(v) => updateRule(agent.id, rule.id, 'type', v)}>
                            <SelectTrigger className="w-32"><SelectValue/></SelectTrigger>
                            <SelectContent><SelectItem value="Allow">Allow</SelectItem><SelectItem value="Disallow">Disallow</SelectItem></SelectContent>
                        </Select>
                        <Input value={rule.path} onChange={e => updateRule(agent.id, rule.id, 'path', e.target.value)} placeholder="/directory/"/>
                        <Button variant="ghost" size="icon" onClick={() => removeRule(agent.id, rule.id)}><Trash2 className="w-4 h-4"/></Button>
                    </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addRule(agent.id)}><PlusCircle className="mr-2"/> Add Rule</Button>
            </div>
          ))}
          <Button variant="outline" onClick={addAgent}><PlusCircle className="mr-2"/> Add User-agent block</Button>
          <div>
            <Label>Sitemap URL (optional)</Label>
            <Input value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} placeholder="https://example.com/sitemap.xml"/>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated robots.txt</CardTitle>
            <Button onClick={copyToClipboard}><Copy className="mr-2"/> Copy</Button>
        </CardHeader>
        <CardContent>
          <Textarea readOnly value={generatedRobotsTxt} className="min-h-[300px] bg-secondary font-mono text-sm"/>
        </CardContent>
      </Card>
    </div>
    <HowToUseGuide {...guideProps} />
    </>
  );
}