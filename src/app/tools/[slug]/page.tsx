
import { getToolBySlug, getTools, getToolsByCategory, getToolsByOtherCategories } from '@/lib/tools-data';
import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RotatingToolCarousel from '@/components/rotating-tool-carousel';
import ImageBackgroundRemoverTool from '@/components/tools/image-background-remover-tool';
import ImageUpscalerTool from '@/components/tools/image-upscaler-tool';
import FaceRetouchTool from '@/components/tools/face-retouch-tool';
import GenerativeFillTool from '@/components/tools/generative-fill-tool';
import ImageCompressorTool from '@/components/tools/image-compressor-tool';
import PdfToWordTool from '@/components/tools/pdf-to-word-tool';
import WordToPdfTool from '@/components/tools/word-to-pdf-tool';
import PdfToExcelTool from '@/components/tools/pdf-to-excel-tool';
import ExcelToPdfTool from '@/components/tools/excel-to-pdf-tool';
import EmiCalculatorTool from '@/components/tools/emi-calculator-tool';
import HomeLoanEligibilityCalculatorTool from '@/components/tools/home-loan-eligibility-calculator-tool';
import { Suspense } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import CarLoanEmiCalculatorTool from '@/components/tools/car-loan-emi-calculator-tool';
import EducationLoanEmiCalculatorTool from '@/components/tools/education-loan-emi-calculator-tool';
import PersonalLoanEmiCalculatorTool from '@/components/tools/personal-loan-emi-calculator-tool';
import BusinessLoanEmiCalculatorTool from '@/components/tools/business-loan-emi-calculator-tool';
import LoanAmortizationScheduleTool from '@/components/tools/loan-amortization-schedule-tool';
import CompareLoansTool from '@/components/tools/compare-loans-tool';

export async function generateStaticParams() {
  const tools = getTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return {
      title: 'Tool Not Found'
    }
  }

  return {
    title: `${tool.name} | D2ools`,
    description: tool.description,
  }
}

const ToolComponent = ({ slug }: { slug: string }) => {
  switch (slug) {
    case 'image-background-remover-ai':
      return <ImageBackgroundRemoverTool />;
    case 'image-upscaler-ai':
      return <ImageUpscalerTool />;
    case 'face-retouch-ai':
      return <FaceRetouchTool />;
    case 'generative-fill-ai':
      return <GenerativeFillTool />;
    case 'image-compressor':
        return <ImageCompressorTool />;
    case 'pdf-to-word':
      return <PdfToWordTool />;
    case 'word-to-pdf':
      return <WordToPdfTool />;
    case 'pdf-to-excel':
      return <PdfToExcelTool />;
    case 'excel-to-pdf':
      return <ExcelToPdfTool />;
    case 'emi-calculator':
      return <EmiCalculatorTool />;
    case 'home-loan-eligibility-calculator':
      return <HomeLoanEligibilityCalculatorTool />;
    case 'car-loan-emi-calculator':
      return <CarLoanEmiCalculatorTool />;
    case 'education-loan-emi-calculator':
      return <EducationLoanEmiCalculatorTool />;
    case 'personal-loan-emi-calculator':
        return <PersonalLoanEmiCalculatorTool />;
    case 'business-loan-emi-calculator':
        return <BusinessLoanEmiCalculatorTool />;
    case 'loan-amortization-schedule':
        return <LoanAmortizationScheduleTool />;
    case 'compare-loans':
        return <CompareLoansTool />;
    // Other tools will be added here
    default:
      return (
        <div className="w-full border-2 border-dashed border-border rounded-lg p-12 text-center bg-background/50">
          <h3 className="text-lg font-medium text-foreground">Tool interface coming soon!</h3>
          <p className="mt-1 text-sm text-muted-foreground">This tool is under construction.</p>
        </div>
      );
  }
};

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  
  if (!tool) {
    notFound();
  }

  const relatedTools = getToolsByCategory(tool.category).filter(t => t.slug !== tool.slug);
  const suggestedTools = getToolsByOtherCategories(tool.category);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tools" className="hover:text-primary">Tools</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{tool.name}</span>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">{tool.name}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-2">{tool.description}</p>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <Suspense fallback={<div className="text-center p-20">Loading tool...</div>}>
          <ToolComponent slug={params.slug} />
        </Suspense>
      </div>
      
      {relatedTools.length > 0 && (
        <div className="mt-16">
           <div className="bg-secondary/50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 font-headline">
              Related Tools
            </h2>
            <RotatingToolCarousel tools={relatedTools} itemsPerPage={10} itemsToUpdate={4} interval={10000}/>
          </div>
        </div>
      )}

      {suggestedTools.length > 0 && (
        <div className="mt-16">
          <div className="bg-secondary/50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 font-headline">
              Suggested Tools
            </h2>
            <RotatingToolCarousel tools={suggestedTools} itemsPerPage={10} itemsToUpdate={4} interval={10000}/>
          </div>
        </div>
      )}
    </div>
  );
}
