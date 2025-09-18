
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Shield, Target, Code, BrainCircuit } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About D2ools</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our mission is to provide a comprehensive suite of high-quality, fast, and free online tools that empower everyone to accomplish their digital tasks with ease and security.
          </p>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold font-headline mb-4">Our Story</h2>
            <p className="text-lg leading-relaxed">
              D2ools was born from a simple yet powerful idea: to create a single, reliable destination for the countless small digital tasks we face every day. We were tired of navigating dozens of ad-filled, slow, and insecure websites just to convert a file, resize an image, or format a piece of code.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              We envisioned a world where powerful utilities were accessible to everyone—students, professional developers, marketers, writers, and anyone in between—without the frustration. We are committed to building a library of over 500 tools that are not only powerful and free but also prioritize user privacy and security above all else. For many of our tools, all processing happens directly in your browser, meaning your files never leave your computer.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Our Core Principles</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Users className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
            <p className="text-muted-foreground">No sign-ups, no limits. Our tools are designed to be intuitive and useful for everyone, regardless of technical skill.</p>
          </div>
          <div className="p-6">
            <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">By processing data on your device where possible and using optimized server infrastructure for complex tasks, we provide instant results.</p>
          </div>
          <div className="p-6">
            <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">Your files and data are your own. We never upload or store your sensitive information unnecessarily. Your privacy is paramount.</p>
          </div>
        </div>

         <div className="text-center my-12 pt-8 border-t">
            <h2 className="text-3xl font-bold font-headline">The Technology Behind D2ools</h2>
             <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">We leverage modern, powerful, and often open-source technologies to bring you the best experience.</p>
        </div>

         <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Target className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Client-Side Processing</h3>
            <p className="text-muted-foreground">For tasks like password generation, text manipulation, and simple calculations, all work is done in your browser for maximum speed and privacy.</p>
          </div>
          <div className="p-6">
            <Code className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Server-Side Power</h3>
            <p className="text-muted-foreground">For heavy lifting like file conversions and SEO analysis, we use powerful server-side libraries like LibreOffice and Puppeteer.</p>
          </div>
          <div className="p-6">
            <BrainCircuit className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Artificial Intelligence</h3>
            <p className="text-muted-foreground">We use cutting-edge AI models like Google's Gemini for features like OCR, summarization, and intelligent background removal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
