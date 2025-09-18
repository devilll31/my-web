
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mt-2">Last updated: September 17, 2025</p>
        </div>

        <Card>
          <CardHeader><CardTitle>1. Acceptance of Terms</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              By accessing and using D2ools (the "Website" or "Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>2. Service Provision</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              Our tools are provided on an "as is" and "as available" basis. We make no warranty that the service will be uninterrupted, timely, secure, or error-free. Some tools are experimental or under development and may not function as expected. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>3. User Conduct and Responsibilities</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              You agree not to use the Service for any illegal or unauthorized purposes. You must not upload or process any content that is unlawful, harmful, defamatory, or infringes on the intellectual property rights of others. You are solely responsible for the data you process through our tools and for complying with all applicable laws in your jurisdiction.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>4. Limitation of Liability</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              In no event shall D2ools, its owners, or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service. This includes, but is not limited to, damages for loss of profits, data, or other intangibles. We are not responsible for any loss of data or damage to your files. You use the service at your own risk.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>5. Intellectual Property</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              The Website and its original content, features, and functionality are and will remain the exclusive property of D2ools. Our trademarks may not be used in connection with any product or service without our prior written consent.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>6. Privacy</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              Your use of the Website is also governed by our <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link>, which is incorporated into these Terms of Service by this reference.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>7. Changes to Terms</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              We reserve the right to modify these terms at our sole discretion. Therefore, you should review this page periodically. Your continued use of the Website after any such change constitutes your acceptance of the new Terms.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
