
"use client";

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
          <Textarea id="message" placeholder="Tell us more about your question or feedback..." className="min-h-[150px]" required />
        </div>
        <div className="text-center pt-4">
          <Button type="submit" size="lg" className="w-full md:w-auto btn-gradient text-white">
            <Send className="mr-2 h-4 w-4" /> Send Message
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
);

const AboutUsContent = () => (
    <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline gradient-text">About D2ools</h2>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                D2ools was born from a simple yet powerful idea: to create a single, reliable destination for the countless small digital tasks we face every day. We were tired of navigating dozens of ad-filled, slow, and insecure websites just to convert a file, resize an image, or format a piece of code.
            </p>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                We envisioned a world where powerful utilities were accessible to everyone—students, professional developers, marketers, writers, and anyone in between—without the frustration. We are committed to building a library of over 500 tools that are not only powerful and free but also prioritize user privacy and security above all else. For many of our tools, all processing happens directly in your browser, meaning your files never leave your computer.
            </p>
        </div>

        <div className="text-center pt-8">
            <h3 className="text-2xl font-bold font-headline">Our Core Principles</h3>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2 font-headline">For Everyone</h4>
                <p className="text-muted-foreground">No sign-ups, no limits. Our tools are designed to be intuitive and useful for everyone, regardless of technical skill.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2 font-headline">Lightning Fast</h4>
                <p className="text-muted-foreground">By processing data on your device where possible and using optimized server infrastructure for complex tasks, we provide instant results.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-lg border border-border/20">
                <ShieldCheck className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="text-xl font-semibold mb-2 font-headline">Privacy First</h4>
                <p className="text-muted-foreground">Your files and data are your own. We never upload or store your sensitive information unnecessarily. Your privacy is paramount.</p>
            </div>
        </div>
    </div>
);

export default function ContactPage() {
  const quickHelpFaqs = [
    { q: "Are all tools free?", a: "Yes, all 500+ tools are completely free to use." },
    { q: "Do I need to register?", a: "No registration required. Use tools instantly." },
    { q: "Is my data secure?", a: "Yes, we process files securely and don't store them." },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Tabs defaultValue="contact" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
          </TabsList>
          <TabsContent value="contact">
            <div className="text-center max-w-3xl mx-auto my-12">
              <h1 className="text-4xl md:text-5xl font-bold font-headline gradient-text">Contact Us</h1>
              <p className="text-lg text-muted-foreground mt-4">
                Have questions, feedback, or need help? We're here to assist you. Reach out to us through any of the channels below.
              </p>
            </div>
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
          <TabsContent value="about">
             <div className="py-12">
                <AboutUsContent />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
