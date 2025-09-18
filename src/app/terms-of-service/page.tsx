
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              By accessing and using D2ools (the "Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Service Provision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our tools are provided on an "as is" and "as available" basis. We make no warranty that the service will be uninterrupted, timely, secure, or error-free. Some tools are still under development and may not be fully functional.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Conduct</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              You agree not to use the service for any illegal purposes or to upload any content that is unlawful, harmful, or infringes on the rights of others. You are solely responsible for the data you process through our tools.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>4. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              In no event shall D2ools or its owners be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service. We are not responsible for any loss of data.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should review this page periodically. Your continued use of the Website after any such change constitutes your acceptance of the new Terms.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
