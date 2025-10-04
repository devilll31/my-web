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
  },
  {
    question: "How do you make money if the tools are free?",
    answer: "We generate revenue through non-intrusive advertisements placed on the website. Our goal is to keep the tools free and accessible to everyone, and advertising helps us cover the server costs and development efforts required to maintain and expand the site."
  },
  {
    question: "Are the AI tools powered by a specific model?",
    answer: "Yes, our AI-powered features for tasks like summarization, background removal, and content generation leverage powerful models like Google's Gemini. This allows us to offer cutting-edge capabilities while maintaining a simple user interface."
  },
  {
    question: "Is there a limit to how many times I can use a tool?",
    answer: "No, there are no usage limits on any of our tools. You can use them as many times as you need, whenever you need them. We believe in providing unrestricted access to empower our users."
  },
  {
    question: "Do you offer an API for your tools?",
    answer: "Currently, we do not offer a public API for our tools. They are designed for direct use through our website. However, we may consider offering API access in the future for developers and businesses."
  },
  {
    question: "Will my files be shared with third parties?",
    answer: "Never. For tools that process files, your files are either handled directly in your browser or are sent securely to our server for processing and are deleted immediately after. We do not share your files or data with any third parties."
  },
  {
    question: "How often do you add new tools?",
    answer: "We are constantly working to expand our toolkit. We aim to release new tools and update existing ones regularly. Keep an eye on our blog and homepage for announcements about new additions!"
  },
  {
    question: "I found a bug or an issue with a tool. What should I do?",
    answer: "We appreciate your help in making D2ools better! If you encounter a bug or have any issues, please report it to us via our Contact page. Please provide as much detail as possible, including the tool you were using and the steps to reproduce the issue."
  },
  {
    question: "Can I use these tools for commercial purposes?",
    answer: "Yes, you are free to use our tools for both personal and commercial purposes. There are no restrictions on the output you generate from our utilities."
  },
  {
    question: "Are the tools mobile-friendly?",
    answer: "Absolutely. Our website is designed to be fully responsive and all our tools are optimized to work seamlessly on desktops, tablets, and smartphones, so you can get things done on any device."
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 gradient-text">Frequently Asked Questions</h1>
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