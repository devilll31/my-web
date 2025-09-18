
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Welcome to D2ools ("we", "our", "us"). We are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our website and its tools.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Information We Do Not Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our core principle is to minimize data collection. For the vast majority of our tools, especially those that process files or sensitive data, all processing happens **directly in your browser** (client-side).
            </p>
            <p>
              This means:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>We **do not** upload your files to our servers.</li>
                <li>We **do not** store your personal documents, images, or data.</li>
                <li>We **do not** require you to create an account, so we do not collect personal information like your name or email address.</li>
              </ul>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>AI-Powered Tools:</strong> For a small subset of our advanced AI tools, we may need to send your input (e.g., text to be summarized, an image for background removal) to our third-party AI service providers (like Google's Gemini). This data is used solely for the purpose of providing the service and is not stored by us.
            </p>
             <p>
              <strong>Usage Analytics:</strong> We may collect anonymous usage data, such as which tools are most popular and how they are used, to help us improve our services. This data is aggregated and cannot be used to identify you personally.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We may use third-party services for analytics and advertising. These services may use cookies to collect information about your visit. Please refer to their respective privacy policies for more details.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our contact page.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
