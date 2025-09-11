'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search } from 'lucide-react';
import HowToUseGuide from '../how-to-use-guide';
import { Network, Server, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type RecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT';
interface DnsResponse {
  Answer?: { type: number; data: string; name: string; TTL: number }[];
  Status: number;
}

export default function DnsLookupTool() {
  const [domain, setDomain] = useState('d2ools.com');
  const [recordType, setRecordType] = useState<RecordType>('A');
  const [results, setResults] = useState<DnsResponse['Answer']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!domain) {
      setError('Please enter a domain name.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${recordType}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data: DnsResponse = await response.json();
      if (data.Status !== 0) {
        throw new Error('DNS query failed. The domain may not exist or has no such records.');
      }
      setResults(data.Answer || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const guideProps = {
    title: "How to Use the DNS Lookup Tool",
    steps: [
      { title: "Enter Domain", description: "Input the domain name you want to query." },
      { title: "Select Record Type", description: "Choose the DNS record type you want to look up (e.g., A, MX, CNAME)." },
      { title: "View Results", description: "The tool fetches and displays the corresponding DNS records for the domain." }
    ],
    features: [
      { icon: Network, title: "Query DNS Records", description: "Look up common DNS records like A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), and TXT (text)." },
      { icon: Server, title: "Troubleshoot Connectivity", description: "An essential utility for developers and network administrators to diagnose website and email configuration issues." },
      { icon: HelpCircle, title: "Simple Interface", description: "Easily perform DNS queries without using complex command-line tools." },
    ]
  };

  return (
    <>
    <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle className="text-center">DNS Lookup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2">
                <div>
                    <Label htmlFor="domain" className="sr-only">Domain</Label>
                    <Input id="domain" value={domain} onChange={e => setDomain(e.target.value)} placeholder="example.com" />
                </div>
                <Select value={recordType} onValueChange={(v: RecordType) => setRecordType(v)}>
                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="A">A (IPv4)</SelectItem>
                        <SelectItem value="AAAA">AAAA (IPv6)</SelectItem>
                        <SelectItem value="CNAME">CNAME</SelectItem>
                        <SelectItem value="MX">MX</SelectItem>
                        <SelectItem value="TXT">TXT</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleLookup} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
                </Button>
            </div>
            <div className="pt-4 min-h-[150px]">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <p className="text-destructive text-center">{error}</p>
                ) : (
                    <AnimatePresence>
                        {results.length > 0 ? (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-2">
                                {results.map((record, i) => (
                                    <div key={i} className="p-3 bg-secondary rounded-md font-mono text-sm break-all">
                                        <p><strong>{record.name}</strong></p>
                                        <p>TTL: {record.TTL}</p>
                                        <p>Data: {record.data.replace(/"/g, '')}</p>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                           <p className="text-muted-foreground text-center">No records found or lookup not performed yet.</p>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
