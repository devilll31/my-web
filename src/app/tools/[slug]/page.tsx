

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
import SIPCalculatorTool from '@/components/tools/sip-calculator-tool';
import LumpsumCalculatorTool from '@/components/tools/lumpsum-calculator-tool';
import MutualFundReturnsCalculatorTool from '@/components/tools/mutual-fund-returns-calculator-tool';
import NpsCalculatorTool from '@/components/tools/nps-calculator-tool';
import FdCalculatorTool from '@/components/tools/fd-calculator-tool';
import RdCalculatorTool from '@/components/tools/rd-calculator-tool';
import CompoundInterestCalculatorTool from '@/components/tools/compound-interest-calculator-tool';
import SimpleInterestCalculatorTool from '@/components/tools/simple-interest-calculator-tool';
import CagrCalculatorTool from '@/components/tools/cagr-calculator-tool';
import InflationAdjustedReturnsCalculatorTool from '@/components/tools/inflation-adjusted-returns-calculator-tool';
import IncomeTaxCalculatorTool from '@/components/tools/income-tax-calculator-tool';
import HraExemptionCalculatorTool from '@/components/tools/hra-exemption-calculator-tool';
import GstCalculatorTool from '@/components/tools/gst-calculator-tool';
import VatSalesTaxCalculatorTool from '@/components/tools/vat-sales-tax-calculator-tool';
import CurrencyConverterTool from '@/components/tools/currency-converter-tool';
import UnitPriceCalculatorTool from '@/components/tools/unit-price-calculator-tool';
import DiscountCalculatorTool from '@/components/tools/discount-calculator-tool';
import MarginMarkupCalculatorTool from '@/components/tools/margin-markup-calculator-tool';
import BreakEvenPointCalculatorTool from '@/components/tools/break-even-point-calculator-tool';
import ProfitLossCalculatorTool from '@/components/tools/profit-loss-calculator-tool';
import FreelanceHourlyRateCalculatorTool from '@/components/tools/freelance-hourly-rate-calculator-tool';
import SalaryToHourlyConverterTool from '@/components/tools/salary-to-hourly-converter-tool';
import OvertimePayCalculatorTool from '@/components/tools/overtime-pay-calculator-tool';
import RetirementCorpusCalculatorTool from '@/components/tools/retirement-corpus-calculator-tool';
import FireCalculatorTool from '@/components/tools/fire-calculator-tool';
import GratuityCalculatorTool from '@/components/tools/gratuity-calculator-tool';
import LoanVsLeaseCalculatorTool from '@/components/tools/loan-vs-lease-calculator-tool';
import RentVsBuyCalculatorTool from '@/components/tools/rent-vs-buy-calculator-tool';
import CreditCardPayoffCalculatorTool from '@/components/tools/credit-card-payoff-calculator-tool';
import MortgageRefinanceSavingsTool from '@/components/tools/mortgage-refinance-savings-tool';
import NetWorthTrackerTool from '@/components/tools/net-worth-tracker-tool';
import BudgetPlannerTool from '@/components/tools/budget-planner-tool';
import GstCalculatorQuickTool from '@/components/tools/gst-calculator-quick-tool';
import TipCalculatorTool from '@/components/tools/tip-calculator-tool';
import SimpleInterestCalculatorQuickTool from '@/components/tools/simple-interest-calculator-quick-tool';
import CompoundInterestCalculatorQuickTool from '@/components/tools/compound-interest-calculator-quick-tool';
import AgeDifferenceCalculatorTool from '@/components/tools/age-difference-calculator-tool';
import PercentageCalculatorTool from '@/components/tools/percentage-calculator-tool';
import AverageMeanCalculatorTool from '@/components/tools/average-mean-calculator-tool';
import MedianModeCalculatorTool from '@/components/tools/median-mode-calculator-tool';
import RatioCalculatorTool from '@/components/tools/ratio-calculator-tool';
import ProportionCalculatorTool from '@/components/tools/proportion-calculator-tool';
import StandardDeviationCalculatorTool from '@/components/tools/standard-deviation-calculator-tool';
import VarianceCalculatorTool from '@/components/tools/variance-calculator-tool';
import ZScoreCalculatorTool from '@/components/tools/z-score-calculator-tool';
import LinearInterpolationCalculatorTool from '@/components/tools/linear-interpolation-calculator-tool';
import ScientificCalculatorTool from '@/components/tools/scientific-calculator-tool';
import QuadraticEquationSolverTool from '@/components/tools/quadratic-equation-solver-tool';
import MatrixCalculatorTool from '@/components/tools/matrix-calculator-tool';
import DeterminantCalculatorTool from '@/components/tools/determinant-calculator-tool';
import VectorCalculatorTool from '@/components/tools/vector-calculator-tool';
import UnitConverterTool from '@/components/tools/unit-converter-tool';
import TimeDurationCalculatorTool from '@/components/tools/time-duration-calculator-tool';
import SpeedDistanceTimeCalculatorTool from '@/components/tools/speed-distance-time-calculator-tool';
import DensityCalculatorTool from '@/components/tools/density-calculator-tool';
import BmiCalculatorTool from '@/components/tools/bmi-calculator-tool';
import BmrTdeeCalculatorTool from '@/components/tools/bmr-tdee-calculator-tool';
import BodyFatEstimatorTool from '@/components/tools/body-fat-estimator-tool';
import CalorieTrackerTool from '@/components/tools/calorie-tracker-tool';
import ProbabilityCalculatorTool from '@/components/tools/probability-calculator-tool';
import PermutationCombinationCalculatorTool from '@/components/tools/permutation-combination-calculator-tool';
import PrimeNumberCheckerTool from '@/components/tools/prime-number-checker-tool';
import FactorizationTool from '@/components/tools/factorization-tool';
import LcmGcdCalculatorTool from '@/components/tools/lcm-gcd-calculator-tool';
import RomanNumeralConverterTool from '@/components/tools/roman-numeral-converter-tool';
import BaseConverterTool from '@/components/tools/base-converter-tool';
import SignificantFiguresCalculatorTool from '@/components/tools/significant-figures-calculator-tool';
import PercentageChangeDifferenceTool from '@/components/tools/percentage-change-difference-tool';
import ExponentPowerCalculatorTool from '@/components/tools/exponent-power-calculator-tool';
import LogarithmCalculatorTool from '@/components/tools/logarithm-calculator-tool';
import AngleConverterTool from '@/components/tools/angle-converter-tool';
import ScientificNotationConverterTool from '@/components/tools/scientific-notation-converter-tool';
import PomodoroTimerTool from '@/components/tools/pomodoro-timer-tool';
import HabitTrackerTool from '@/components/tools/habit-tracker-tool';
import GoalTrackerTool from '@/components/tools/goal-tracker-tool';
import EisenhowerMatrixTool from '@/components/tools/eisenhower-matrix-tool';
import KanbanBoardTool from '@/components/tools/kanban-board-tool';
import MeetingAgendaGeneratorTool from '@/components/tools/meeting-agenda-generator-tool';
import MeetingMinutesTemplateTool from '@/components/tools/meeting-minutes-template-tool';
import TimeZoneConverterTool from '@/components/tools/time-zone-converter-tool';
import WorldClockBoardTool from '@/components/tools/world-clock-board-tool';
import CalendarEventBuilderTool from '@/components/tools/calendar-event-builder-tool';
import BirthdayReminderTool from '@/components/tools/birthday-reminder-tool';
import RandomNamePickerTool from '@/components/tools/random-name-picker-tool';
import SeatingChartGeneratorTool from '@/components/tools/seating-chart-generator-tool';
import ChecklistMakerTool from '@/components/tools/checklist-maker-tool';
import DecisionCoinSpinnerTool from '@/components/tools/decision-coin-spinner-tool';
import MindMapTool from '@/components/tools/mind-map-tool';
import NotesMarkdownPadTool from '@/components/tools/notes-markdown-pad-tool';
import StickyNotesBoardTool from '@/components/tools/sticky-notes-board-tool';
import FocusNoiseTool from '@/components/tools/focus-noise-tool';
import BreakReminderTool from '@/components/tools/break-reminder-tool';
import TravelPackingListGeneratorTool from '@/components/tools/travel-packing-list-generator-tool';
import ShoppingListMakerTool from '@/components/tools/shopping-list-maker-tool';
import InvoiceGeneratorTool from '@/components/tools/invoice-generator-tool';
import QuoteEstimateBuilderTool from '@/components/tools/quote-estimate-builder-tool';
import ExpenseSplitterTool from '@/components/tools/expense-splitter-tool';
import SimpleCrmTool from '@/components/tools/simple-crm-tool';
import LeadCaptureFormBuilderTool from '@/components/tools/lead-capture-form-builder-tool';
import StepCounterTool from '@/components/tools/step-counter-tool';
import TypingSpeedTestTool from '@/components/tools/typing-speed-test-tool';
import IpLocationFinderTool from '@/components/tools/ip-location-finder-tool';
import ColorPickerTool from '@/components/tools/color-picker-tool';
import ContrastCheckerTool from '@/components/tools/contrast-checker-tool';
import PaletteGeneratorFromImageTool from '@/components/tools/palette-generator-from-image-tool';
import PaletteHarmoniesTool from '@/components/tools/palette-harmonies-tool';
import GradientGeneratorTool from '@/components/tools/gradient-generator-tool';
import GlassmorphismGeneratorTool from '@/components/tools/glassmorphism-generator-tool';
import NeumorphismGeneratorTool from '@/components/tools/neumorphism-generator-tool';
import ShadowGeneratorTool from '@/components/tools/shadow-generator-tool';
import BorderRadiusVisualizerTool from '@/components/tools/border-radius-visualizer-tool';
import CssClipPathMakerTool from '@/components/tools/css-clip-path-maker-tool';
import SvgWaveBlobGeneratorTool from '@/components/tools/svg-wave-blob-generator-tool';
import FaviconGeneratorTool from '@/components/tools/favicon-generator-tool';
import AppIconGeneratorTool from '@/components/tools/app-icon-generator-tool';
import SocialMediaBannerResizerTool from '@/components/tools/social-media-banner-resizer-tool';
import LogoSketchPadTool from '@/components/tools/logo-sketch-pad-tool';
import BrandStyleGuideStarterTool from '@/components/tools/brand-style-guide-starter-tool';
import FontPairingSuggestionsTool from '@/components/tools/font-pairing-suggestions-tool';
import WebfontConverterTool from '@/components/tools/webfont-converter-tool';
import PlaceholderImageGeneratorTool from '@/components/tools/placeholder-image-generator-tool';
import PlaceholderTextAvatarGeneratorTool from '@/components/tools/placeholder-text-avatar-generator-tool';
import WireframeBlocksLibraryTool from '@/components/tools/wireframe-blocks-library-tool';
import UiComponentShadowTokensTool from '@/components/tools/ui-component-shadow-tokens-tool';
import CssVariablePaletteExporterTool from '@/components/tools/css-variable-palette-exporter-tool';
import AccessibilityLandmarksCheckerTool from '@/components/tools/accessibility-landmarks-checker-tool';

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
    case 'sip-calculator':
        return <SIPCalculatorTool />;
    case 'lumpsum-investment-calculator':
        return <LumpsumCalculatorTool />;
    case 'mutual-fund-returns-calculator':
        return <MutualFundReturnsCalculatorTool />;
    case 'nps-returns-calculator':
        return <NpsCalculatorTool />;
    case 'fd-calculator':
        return <FdCalculatorTool />;
    case 'rd-calculator':
        return <RdCalculatorTool />;
    case 'compound-interest-calculator':
        return <CompoundInterestCalculatorTool />;
    case 'simple-interest-calculator':
        return <SimpleInterestCalculatorTool />;
    case 'cagr-calculator':
        return <CagrCalculatorTool />;
    case 'inflation-adjusted-returns':
        return <InflationAdjustedReturnsCalculatorTool />;
    case 'income-tax-calculator':
        return <IncomeTaxCalculatorTool />;
    case 'hra-exemption-calculator':
        return <HraExemptionCalculatorTool />;
    case 'gst-calculator':
        return <GstCalculatorTool />;
    case 'vat-sales-tax-calculator':
        return <VatSalesTaxCalculatorTool />;
    case 'currency-converter':
        return <CurrencyConverterTool />;
    case 'unit-price-calculator':
        return <UnitPriceCalculatorTool />;
    case 'discount-calculator':
      return <DiscountCalculatorTool />;
    case 'margin-markup-calculator':
      return <MarginMarkupCalculatorTool />;
    case 'break-even-point-calculator':
      return <BreakEvenPointCalculatorTool />;
    case 'profit-loss-calculator':
      return <ProfitLossCalculatorTool />;
    case 'freelance-hourly-rate-calculator':
      return <FreelanceHourlyRateCalculatorTool />;
    case 'salary-to-hourly-converter':
      return <SalaryToHourlyConverterTool />;
    case 'overtime-pay-calculator':
      return <OvertimePayCalculatorTool />;
    case 'retirement-corpus-calculator':
      return <RetirementCorpusCalculatorTool />;
    case 'fire-calculator':
      return <FireCalculatorTool />;
    case 'gratuity-calculator':
      return <GratuityCalculatorTool />;
    case 'loan-vs-lease-calculator':
      return <LoanVsLeaseCalculatorTool />;
    case 'rent-vs-buy-calculator':
      return <RentVsBuyCalculatorTool />;
    case 'credit-card-payoff-calculator':
      return <CreditCardPayoffCalculatorTool />;
    case 'mortgage-refinance-savings':
        return <MortgageRefinanceSavingsTool />;
    case 'net-worth-tracker':
        return <NetWorthTrackerTool />;
    case 'budget-planner':
        return <BudgetPlannerTool />;
    case 'gst-calculator-quick':
        return <GstCalculatorQuickTool />;
    case 'tip-calculator':
        return <TipCalculatorTool />;
    case 'simple-interest-calculator-quick':
        return <SimpleInterestCalculatorQuickTool />;
    case 'compound-interest-calculator-quick':
        return <CompoundInterestCalculatorQuickTool />;
    case 'age-difference-calculator':
        return <AgeDifferenceCalculatorTool />;
    case 'percentage-calculator':
      return <PercentageCalculatorTool />;
    case 'average-mean-calculator':
      return <AverageMeanCalculatorTool />;
    case 'median-mode-calculator':
      return <MedianModeCalculatorTool />;
    case 'ratio-calculator':
      return <RatioCalculatorTool />;
    case 'proportion-calculator':
      return <ProportionCalculatorTool />;
    case 'standard-deviation-calculator':
      return <StandardDeviationCalculatorTool />;
    case 'variance-calculator':
      return <VarianceCalculatorTool />;
    case 'z-score-calculator':
      return <ZScoreCalculatorTool />;
    case 'linear-interpolation-calculator':
      return <LinearInterpolationCalculatorTool />;
    case 'scientific-calculator':
      return <ScientificCalculatorTool />;
    case 'quadratic-equation-solver':
      return <QuadraticEquationSolverTool />;
    case 'matrix-calculator':
      return <MatrixCalculatorTool />;
    case 'determinant-calculator':
      return <DeterminantCalculatorTool />;
    case 'vector-calculator':
      return <VectorCalculatorTool />;
    case 'unit-converter':
      return <UnitConverterTool />;
    case 'time-duration-calculator':
      return <TimeDurationCalculatorTool />;
    case 'speed-distance-time-calculator':
      return <SpeedDistanceTimeCalculatorTool />;
    case 'density-calculator':
        return <DensityCalculatorTool />;
    case 'bmi-calculator':
        return <BmiCalculatorTool />;
    case 'bmr-tdee-calculator':
        return <BmrTdeeCalculatorTool />;
    case 'body-fat-estimator':
        return <BodyFatEstimatorTool />;
    case 'calorie-tracker':
        return <CalorieTrackerTool />;
    case 'probability-calculator':
        return <ProbabilityCalculatorTool />;
    case 'permutation-combination-calculator':
        return <PermutationCombinationCalculatorTool />;
    case 'prime-number-checker':
        return <PrimeNumberCheckerTool />;
    case 'factorization-tool':
        return <FactorizationTool />;
    case 'lcm-gcd-calculator':
        return <LcmGcdCalculatorTool />;
    case 'roman-numeral-converter':
        return <RomanNumeralConverterTool />;
    case 'base-converter':
        return <BaseConverterTool />;
    case 'significant-figures-calculator':
        return <SignificantFiguresCalculatorTool />;
    case 'percentage-change-difference':
        return <PercentageChangeDifferenceTool />;
    case 'exponent-power-calculator':
        return <ExponentPowerCalculatorTool />;
    case 'logarithm-calculator':
        return <LogarithmCalculatorTool />;
    case 'angle-converter':
        return <AngleConverterTool />;
    case 'scientific-notation-converter':
        return <ScientificNotationConverterTool />;
    case 'bmr-calculator':
        return <BmrTdeeCalculatorTool />;
    case 'pomodoro-timer':
      return <PomodoroTimerTool />;
    case 'habit-tracker':
      return <HabitTrackerTool />;
    case 'goal-tracker':
      return <GoalTrackerTool />;
    case 'eisenhower-matrix-tool':
      return <EisenhowerMatrixTool />;
    case 'kanban-board':
      return <KanbanBoardTool />;
    case 'meeting-agenda-generator':
      return <MeetingAgendaGeneratorTool />;
    case 'meeting-minutes-template':
      return <MeetingMinutesTemplateTool />;
    case 'time-zone-converter':
      return <TimeZoneConverterTool />;
    case 'world-clock-board':
      return <WorldClockBoardTool />;
    case 'calendar-event-builder':
      return <CalendarEventBuilderTool />;
    case 'birthday-reminder':
      return <BirthdayReminderTool />;
    case 'random-name-picker':
      return <RandomNamePickerTool />;
    case 'seating-chart-generator':
      return <SeatingChartGeneratorTool />;
    case 'checklist-maker':
      return <ChecklistMakerTool />;
    case 'decision-coin-spinner':
      return <DecisionCoinSpinnerTool />;
    case 'mind-map':
      return <MindMapTool />;
    case 'notes-markdown-pad':
      return <NotesMarkdownPadTool />;
    case 'sticky-notes-board':
      return <StickyNotesBoardTool />;
    case 'focus-noise':
      return <FocusNoiseTool />;
    case 'break-reminder':
      return <BreakReminderTool />;
    case 'travel-packing-list-generator':
      return <TravelPackingListGeneratorTool />;
    case 'shopping-list-maker':
      return <ShoppingListMakerTool />;
    case 'invoice-generator':
      return <InvoiceGeneratorTool />;
    case 'quote-estimate-builder':
      return <QuoteEstimateBuilderTool />;
    case 'expense-splitter':
      return <ExpenseSplitterTool />;
    case 'simple-crm-contacts':
      return <SimpleCrmTool />;
    case 'lead-capture-form-builder':
      return <LeadCaptureFormBuilderTool />;
    case 'step-counter':
      return <StepCounterTool />;
    case 'typing-speed-test':
      return <TypingSpeedTestTool />;
    case 'ip-location-finder':
        return <IpLocationFinderTool />;
    case 'color-picker':
        return <ColorPickerTool />;
    case 'contrast-checker':
        return <ContrastCheckerTool />;
    case 'palette-generator-from-image':
        return <PaletteGeneratorFromImageTool />;
    case 'palette-harmonies':
        return <PaletteHarmoniesTool />;
    case 'gradient-generator':
        return <GradientGeneratorTool />;
    case 'glassmorphism-generator':
        return <GlassmorphismGeneratorTool />;
    case 'neumorphism-generator':
        return <NeumorphismGeneratorTool />;
    case 'shadow-generator':
        return <ShadowGeneratorTool />;
    case 'border-radius-visualizer':
        return <BorderRadiusVisualizerTool />;
    case 'css-clip-path-maker':
        return <CssClipPathMakerTool />;
    case 'svg-wave-blob-generator':
        return <SvgWaveBlobGeneratorTool />;
    case 'favicon-generator':
        return <FaviconGeneratorTool />;
    case 'app-icon-generator':
        return <AppIconGeneratorTool />;
    case 'social-media-banner-resizer':
        return <SocialMediaBannerResizerTool />;
    case 'logo-sketch-pad':
        return <LogoSketchPadTool />;
    case 'brand-style-guide-starter':
        return <BrandStyleGuideStarterTool />;
    case 'font-pairing-suggestions':
        return <FontPairingSuggestionsTool />;
    case 'webfont-converter':
        return <WebfontConverterTool />;
    case 'placeholder-image-generator':
        return <PlaceholderImageGeneratorTool />;
    case 'placeholder-text-avatar-generator':
        return <PlaceholderTextAvatarGeneratorTool />;
    case 'wireframe-blocks-library':
        return <WireframeBlocksLibraryTool />;
    case 'ui-component-shadow-tokens':
        return <UiComponentShadowTokensTool />;
    case 'css-variable-palette-exporter':
        return <CssVariablePaletteExporterTool />;
    case 'accessibility-landmarks-checker':
        return <AccessibilityLandmarksCheckerTool />;
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
