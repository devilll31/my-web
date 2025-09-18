
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Are the tools on D2ools completely free to use?",
    answer: "Yes, absolutely! All the tools available on our website are completely free. We are committed to providing accessible utilities for everyone without hidden charges, subscription fees, or usage limits."
  },
  {
    question: "How do you handle my privacy and data security?",
    answer: "Your privacy is our top priority. For many of our tools (like text manipulation, password generation, etc.), all processing is done entirely in your browser using client-side JavaScript. This means your data never leaves your computer. For tools that require server-side processing (like AI-powered conversions or file analysis), we use secure, encrypted connections. We do not store your files or data on our servers after the processing is complete. Please see our Privacy Policy for more details."
  },
  {
    question: "Do I need to create an account or sign up?",
    answer: "No. All our tools are designed for immediate access without any registration. We believe in a quick, hassle-free experience so you can get your tasks done and move on."
  },
  {
    question: "What kind of tools do you offer?",
    answer: "We aim to provide a comprehensive suite of over 500 tools across more than 15 categories. This includes PDF tools, image converters, text utilities, finance calculators, SEO tools, developer utilities, and much more. Our goal is to be the ultimate online toolkit for all your digital needs."
  },
  {
    question: "Why are some tools marked as 'Under Development'?",
    answer: "Some advanced tools, like those requiring heavy server-side processing (e.g., website crawlers, complex file conversions like DOCX to PDF), need a robust backend infrastructure. We believe in providing high-quality, reliable tools, and we will only launch them when they meet our stringent performance and security standards. We appreciate your patience as we build these features!"
  },
  {
    question: "Can I suggest a new tool?",
    answer: "Of course! We are always looking for new ideas to make D2ools more useful. Please use our Contact page to send us your suggestions. We'd love to hear from you."
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions about D2ools, our policies, and how our tools work.</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg text-left font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
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
