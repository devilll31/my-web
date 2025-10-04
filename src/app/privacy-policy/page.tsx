import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline gradient-text">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mt-2">Last updated: September 17, 2025</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              Welcome to D2ools ("we", "our", "us"). We are fundamentally committed to protecting your privacy. This Privacy Policy explains what information we collect, what we don't collect, and how we handle your data when you use our website and its tools. Our core principle is to collect the minimum data necessary to provide our service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Information We Do NOT Collect or Store</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              For the vast majority of our tools, all processing happens **directly in your browser** (client-side). This is a crucial aspect of our privacy-first approach.
            </p>
            <div>
              <p>This means:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>We **do not** upload, track, or store the files you use with our tools (e.g., PDFs, images, documents).</li>
                <li>We **do not** store the content you paste into text tools.</li>
                <li>We **do not** require you to create an account, so we do not collect personal information like your name, email address, or phone number.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Information We Collect and Why</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <div>
              <strong>a. AI-Powered Tools:</strong> A small subset of our advanced tools uses third-party AI service providers (like Google's Gemini) for features like summarization, OCR, or complex file conversions. In these cases:
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>The data you provide (e.g., text to be summarized, an image for OCR) is sent to the AI service for processing.</li>
                <li>This data is used solely for the purpose of providing the service and is subject to the privacy policies of the AI provider.</li>
                <li>We **do not** store your input data or the AI-generated output on our servers.</li>
              </ul>
            </div>
             <div>
              <strong>b. Usage Analytics:</strong> We collect anonymous, aggregated usage data to improve our services. This includes:
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Which tools are most popular.</li>
                <li>General usage patterns to identify errors or areas for improvement.</li>
              </ul>
              This data is fully anonymized and **cannot** be used to identify you personally. We use privacy-respecting analytics platforms.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Third-Party Services and Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              We may use third-party services for analytics and advertising. These services may use cookies to collect non-personal information about your visit to serve relevant ads or analyze traffic. You can manage your cookie preferences through your browser settings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>6. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
             We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              If you have any questions about this Privacy Policy, please contact us through our <Link href="/contact" className="text-primary underline">contact page</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
