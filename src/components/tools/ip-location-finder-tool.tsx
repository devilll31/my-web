'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Wifi } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import HowToUseGuide from '../how-to-use-guide';

export default function IpLocationFinderTool() {
  const [ipData, setIpData] = useState<{ ip: string; city: string; region: string; country: string; } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setIpData({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country_name,
        });
        setLoading(false);
      })
      .catch(() => {
        setIpData(null);
        setLoading(false);
      });
  }, []);
  
  const guideProps = {
      title: "How to Use the IP Location Finder",
      steps: [
          { title: "Load the Tool", description: "The tool automatically fetches your public IP address and its estimated location upon loading." },
          { title: "View Your IP", description: "Your public IP address is displayed prominently." },
          { title: "See Location", description: "The estimated city, region, and country based on your IP are shown below." }
      ],
      features: [
          { icon: Wifi, title: "Automatic Detection", description: "No input required. The tool instantly finds your public IP address." },
          { icon: MapPin, title: "Geolocation Data", description: "Provides an approximate geographical location based on your IP, useful for checking your network's public presence." },
          { icon: Globe, title: "Simple & Fast", description: "A quick and easy way to find your IP address and see how it's perceived geographically on the internet." }
      ]
  };

  return (
    <>
    <Card className="w-full max-w-lg mx-auto bg-card shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-headline flex items-center justify-center gap-2">
          <Globe /> IP Location Finder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-1/3 mx-auto" />
          </div>
        ) : ipData ? (
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">Your Public IP Address is:</p>
            <p className="text-3xl font-bold text-primary font-mono">{ipData.ip}</p>
            <p className="text-lg text-muted-foreground pt-4">Estimated Location:</p>
            <p className="text-2xl font-semibold">{ipData.city}, {ipData.region}, {ipData.country}</p>
          </div>
        ) : (
          <p className="text-destructive">Could not fetch IP location data.</p>
        )}
      </CardContent>
    </Card>
    <HowToUseGuide {...guideProps} />
    </>
  );
}
