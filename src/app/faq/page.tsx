
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const faqs = [
  {
    question: "Are the tools on D2ools really free?",
    answer: "Yes, absolutely! All the tools available on our website are completely free to use. There are no hidden charges, subscription fees, or usage limits."
  },
  {
    question: "Is it safe to upload my files?",
    answer: "For many of our tools, especially those that handle potentially sensitive data, the processing is done entirely in your browser. This means your files are never uploaded to our servers, ensuring your data remains private and secure. For AI-powered tools that require server processing, we use secure connections and do not store your files after the conversion is complete."
  },
  {
    question: "Do I need to create an account to use the tools?",
    answer: "No, you do not need to register or create an account. All our tools are accessible to everyone without any registration required, providing a quick and hassle-free experience."
  },
  {
    question: "What kind of tools do you offer?",
    answer: "We offer a wide range of over 500+ tools across various categories, including PDF tools, image converters, text utilities, finance calculators, developer tools, and much more. Our goal is to be the ultimate online toolkit for all your digital needs."
  },
  {
    question: "Why are some tools marked as 'under development'?",
    answer: "Some advanced tools, like those requiring heavy server-side processing (e.g., website crawlers, complex file conversions), are still in development. We believe in providing high-quality, reliable tools, and we will only launch them when they meet our standards. We appreciate your patience!"
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions about D2ools.</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
