"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Send,
  Clock,
  MapPin,
  HelpCircle,
  Users,
  Zap,
  ShieldCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContactForm = () => (
  <Card>
    <CardContent className="p-6">
      <form className="space-y-6">
        <h3 className="text-xl font-bold">Send us a Message</h3>
        <p className="text-muted-foreground">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" placeholder="Enter your full name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject *</Label>
          <Input id="subject" placeholder="What's this about?" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" placeholder="Tell us more about your question or feedback..." className="min-h-[250px]" required />
        </div>
        <div className="text-center pt-4">
          <Button type="submit" size="lg" className="w-full md:w-auto btn-gradient text-white group">
            <Send className="mr-2 h-4 w-4 inline-block text-white group-hover:text-black transition-colors duration-300" /> 
            <span className="text-white group-hover:text-black transition-colors duration-300">
              Send Message
            </span>
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
);

const AboutUsContent = () => (
    <div className="space-y-8">
        <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 gradient-text">About D2ools</h1>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed text-justify">
                In a digital world cluttered with single-purpose websites, frustrating user experiences, and questionable privacy practices, D2ools was born from a simple yet powerful idea: to create a single, reliable, and beautiful destination for all the small digital tasks we face every day. Whether you're a developer, a marketer, a student, or just someone trying to convert a file, you shouldn't have to navigate a dozen ad-filled, slow, and insecure websites.
            </p>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed text-justify">
                Our mission is to build the ultimate digital toolkit: a comprehensive library of over 500+ tools that are not only powerful and free but also prioritize user privacy and security above all else. For many of our tools, all processing happens directly in your browser, which means your sensitive files never leave your computer. We believe in speed, security, and a user-friendly experience, and we are committed to making our tools accessible to everyone, everywhere.
            </p>
        </div>

        <div className="text-center pt-8">
            <h3 className="text-2xl font-bold font-headline">Our Core Principles</h3>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2 font-headline">For Everyone</h4>
                <p className="text-muted-foreground">We believe in democratizing access to great tools. That’s why there are no sign-ups, no limits, and no paywalls. Our tools are designed to be intuitive and useful for everyone, regardless of technical skill.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2 font-headline">Lightning Fast</h4>
                <p className="text-muted-foreground">Your time is valuable. By processing data on your device where possible and using an optimized server infrastructure for complex tasks, we provide instant results without the wait.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                <ShieldCheck className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2 font-headline">Privacy First</h4>
                <p className="text-muted-foreground">Your files and data are your own. We never upload or store your sensitive information unnecessarily. For server-side tasks, files are deleted immediately after processing. Your privacy is paramount.</p>
            </div>
        </div>
    </div>
);

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("contact");
  const quickHelpFaqs = [
    { q: "Are all tools free?", a: "Yes, all 500+ tools are completely free to use without any hidden costs or feature walls." },
    { q: "Do I need to register?", a: "No registration is required. All our tools are available for immediate, anonymous use." },
    { q: "Is my data secure?", a: "Absolutely. Many tools run in your browser, so your data never leaves your machine. For tools that require server processing, we use secure connections and delete your files immediately after." },
    { q: "Can I suggest a new tool?", a: "Yes, please! We are always looking to expand our toolkit. Use the contact form to send us your ideas." },
    { q: "How do you make money?", a: "We are funded through non-intrusive advertising. This allows us to keep all tools free while covering our development and server costs." },
    { q: "What happens to my uploaded files?", a: "For tools requiring file uploads for server processing, your files are encrypted in transit, processed, and then permanently deleted from our servers immediately. We do not store your data." },
  ];

  useEffect(() => {
    if (window.location.hash === '#about') {
      setActiveTab('about');
    }
  }, []);

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline gradient-text">Contact & About Us</h1>
            <p className="text-lg text-muted-foreground mt-4">
              Have questions, feedback, or want to learn more about our mission? We're here to help.
            </p>
            <TabsList className="grid w-full grid-cols-2 mt-8">
              <TabsTrigger value="contact">Contact Form</TabsTrigger>
              <TabsTrigger value="about">About Us</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 space-y-8">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary mt-1"/>
                      <div>
                        <h4 className="font-semibold">Email Support</h4>
                        <a href="mailto:support@d2ools.com" className="text-primary hover:underline">support@d2ools.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-primary mt-1"/>
                      <div>
                        <h4 className="font-semibold">Response Time</h4>
                        <p className="text-muted-foreground">24 to 48 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary mt-1"/>
                      <div>
                        <h4 className="font-semibold">Location</h4>
                        <p className="text-muted-foreground">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><HelpCircle className="text-primary"/>Quick Help</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {quickHelpFaqs.map((faq, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-base text-left font-semibold">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <ContactForm />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="about" id="about">
            <div className="py-12">
              <AboutUsContent />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
