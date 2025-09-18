
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About D2ools</h1>
          <p className="text-lg text-muted-foreground">
            Our mission is to provide fast, free, and easy-to-use online tools for everyone.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed">
              D2ools was born from a simple idea: to create a single, reliable place for all the small digital tasks we face every day. Whether you're a student, a professional developer, a marketer, or just someone who needs to convert a file, we believe you shouldn't have to navigate dozens of ad-filled, slow, and insecure websites.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              We are committed to building a comprehensive suite of over 500 utilities that are powerful, completely free, and respect your privacy. All processing for sensitive tasks is done directly in your browser, meaning your files never leave your computer.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Users className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
            <p className="text-muted-foreground">No sign-ups, no limits. Our tools are designed to be accessible and useful for everyone, regardless of technical skill.</p>
          </div>
          <div className="p-6">
            <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">By processing data on your device, we provide instant results without waiting for uploads or downloads.</p>
          </div>
          <div className="p-6">
            <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">Your files and data are your own. We never upload or store your sensitive information on our servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
