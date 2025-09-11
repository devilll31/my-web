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
import PrintableQrPosterCreatorTool from '@/components/tools/printable-qr-poster-creator-tool';
import ImageToTextOcrTool from '@/components/tools/image-to-text-ocr-tool';
import PdfToTextOcrTool from '@/components/tools/pdf-to-text-ocr-tool';
import BusinessCardOcrTool from '@/components/tools/business-card-ocr-tool';
import LanguageDetectorTool from '@/components/tools/language-detector-tool';
import TransliterationTool from '@/components/tools/transliteration-tool';
import NumberToWordsConverterTool from '@/components/tools/number-to-words-converter-tool';
import WordsToNumberConverterTool from '@/components/tools/words-to-number-converter-tool';
import DateLocalizationFormatterTool from '@/components/tools/date-localization-formatter-tool';
import CurrencyLocalizationFormatterTool from '@/components/tools/currency-localization-formatter-tool';
import RightToLeftLayoutTesterTool from '@/components/tools/right-to-left-layout-tester-tool';
import PunycodeConverterTool from '@/components/tools/punycode-converter-tool';
import UnicodeGraphemeSplitterTool from '@/components/tools/unicode-grapheme-splitter-tool';
import EmojiStripperNormalizerTool from '@/components/tools/emoji-stripper-normalizer-tool';
import RegexAccentInsensitiveHelperTool from '@/components/tools/regex-accent-insensitive-helper-tool';
import IcuMessagePreviewerTool from '@/components/tools/icu-message-previewer-tool';
import CsvLanguageColumnsMergerTool from '@/components/tools/csv-language-columns-merger-tool';
import TableOcrTool from '@/components/tools/table-ocr-tool';
import MathOcrTool from '@/components/tools/math-ocr-tool';
import PassportMrzReaderTool from '@/components/tools/passport-mrz-reader-tool';
import IdCardOcrRedactorTool from '@/components/tools/id-card-ocr-redactor-tool';
import SlugifyInternationalCharactersTool from '@/components/tools/slugify-international-characters-tool';
import PluralsInflectionsHelperTool from '@/components/tools/plurals-inflections-helper-tool';
import SpellOutNumbersTool from '@/components/tools/spell-out-numbers-tool';
import TextAnalyzerTool from '@/components/tools/text-analyzer-tool';
import ReadabilityCheckerTool from '@/components/tools/readability-checker-tool';
import GrammarCheckerTool from '@/components/tools/grammar-checker-tool';
import SpellingCheckerTool from '@/components/tools/spelling-checker-tool';
import PunctuationFixerTool from '@/components/tools/punctuation-fixer-tool';
import CaseConverterTool from '@/components/tools/case-converter-tool';
import RemoveExtraSpacesTool from '@/components/tools/remove-extra-spaces-tool';
import RemoveLineBreaksTool from '@/components/tools/remove-line-breaks-tool';
import SortLinesTool from '@/components/tools/sort-lines-tool';
import UniqueLinesTool from '@/components/tools/unique-lines-tool';
import FindReplaceTool from '@/components/tools/find-replace-tool';
import UrlExtractorTool from '@/components/tools/url-extractor-tool';
import EmailExtractorTool from '@/components/tools/email-extractor-tool';
import LoremIpsumGeneratorTool from '@/components/tools/lorem-ipsum-generator-tool';
import BlogTitleGeneratorTool from '@/components/tools/blog-title-generator-tool';
import MetaDescriptionGeneratorTool from '@/components/tools/meta-description-generator-tool';
import ParaphraserTool from '@/components/tools/paraphraser-tool';
import SummarizerTool from '@/components/tools/summarizer-tool';
import KeywordExtractorTool from '@/components/tools/keyword-extractor-tool';
import HashtagGeneratorTool from '@/components/tools/hashtag-generator-tool';
import SlugGeneratorTool from '@/components/tools/slug-generator-tool';
import TextDiffTool from '@/components/tools/text-diff-tool';
import MarkdownEditorTool from '@/components/tools/markdown-editor-tool';
import HtmlEntitiesEncoderDecoderTool from '@/components/tools/html-entities-encoder-decoder-tool';
import Base64TextEncoderDecoderTool from '@/components/tools/base64-text-encoder-decoder-tool';
import Rot13EncoderDecoderTool from '@/components/tools/rot13-encoder-decoder-tool';
import UtmBuilderTool from '@/components/tools/utm-builder-tool';
import StopwordsRemoverTool from '@/components/tools/stopwords-remover-tool';
import CaseStyleConverterTool from '@/components/tools/case-style-converter-tool';
import DiacriticsRemoverTool from '@/components/tools/diacritics-remover-tool';
import JsonEscapeTool from '@/components/tools/json-escape-tool';
import CsvEscapeTool from '@/components/tools/csv-escape-tool';
import DomainAvailabilityCheckerTool from '@/components/tools/domain-availability-checker-tool';
import DomainAgeCheckerTool from '@/components/tools/domain-age-checker-tool';
import WhoisLookupTool from '@/components/tools/whois-lookup-tool';
import DnsLookupTool from '@/components/tools/dns-lookup-tool';
import ReverseDnsLookupTool from '@/components/tools/reverse-dns-lookup-tool';
import SslCertificateCheckerTool from '@/components/tools/ssl-certificate-checker-tool';
import Http2HttpsCheckerTool from '@/components/tools/http2-https-checker-tool';
import WebsiteSpeedTestTool from '@/components/tools/website-speed-test-tool';
import MobileFriendlyTestTool from '@/components/tools/mobile-friendly-test-tool';
import RedirectChainCheckerTool from '@/components/tools/redirect-chain-checker-tool';
import BrokenLinkCheckerTool from '@/components/tools/broken-link-checker-tool';
import SitemapGeneratorTool from '@/components/tools/sitemap-generator-tool';
import RobotsTxtGeneratorTool from '@/components/tools/robots-txt-generator-tool';
import HreflangGeneratorTool from '@/components/tools/hreflang-generator-tool';
import MetaTagAnalyzerTool from '@/components/tools/meta-tag-analyzer-tool';
import OpenGraphGeneratorTool from '@/components/tools/open-graph-generator-tool';
import TwitterCardValidatorTool from '@/components/tools/twitter-card-validator-tool';
import CanonicalUrlAuditorTool from '@/components/tools/canonical-url-auditor-tool';
import KeywordDensityCheckerTool from '@/components/tools/keyword-density-checker-tool';
import StructuredDataTesterTool from '@/components/tools/structured-data-tester-tool';
import FaviconsAppManifestGeneratorTool from '@/components/tools/favicons-app-manifest-generator-tool';
import PageSizeCheckerTool from '@/components/tools/page-size-checker-tool';
import PageHeaderAnalyzerTool from '@/components/tools/page-header-analyzer-tool';
import ServerStatusCheckerTool from '@/components/tools/server-status-checker-tool';
import HostLocationFinderTool from '@/components/tools/host-location-finder-tool';
import UptimeMonitorTool from '@/components/tools/uptime-monitor-tool';
import SerpSnippetPreviewTool from '@/components/tools/serp-snippet-preview-tool';
import AmpValidatorHelperTool from '@/components/tools/amp-validator-helper-tool';
import CoreWebVitalsHintsTool from '@/components/tools/core-web-vitals-hints-tool';
import LinkExtractorTool from '@/components/tools/link-extractor-tool';
import XmlSitemapSplitterMergerTool from '@/components/tools/xml-sitemap-splitter-merger-tool';
import NofollowLinkHighlighterTool from '@/components/tools/nofollow-link-highlighter-tool';
import HeadingStructureAnalyzerTool from '@/components/tools/heading-structure-analyzer-tool';
import ImageAltAuditorTool from '@/components/tools/image-alt-auditor-tool';
import DuplicateContentFinderTool from '@/components/tools/duplicate-content-finder-tool';
import ImageResizerTool from '@/components/tools/image-resizer-tool';
import ImageCropperTool from '@/components/tools/image-cropper-tool';
import JsonFormatterTool from '@/components/tools/json-formatter-tool';
import PasswordGeneratorTool from '@/components/tools/password-generator-tool';

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
    case 'printable-qr-poster-creator':
      return <PrintableQrPosterCreatorTool />;
    case 'image-to-text-ocr':
      return <ImageToTextOcrTool />;
    case 'pdf-to-text-ocr':
      return <PdfToTextOcrTool />;
    case 'handwriting-ocr':
      return <ImageToTextOcrTool />; // Reusing the same component
    case 'business-card-ocr-to-vcf':
      return <BusinessCardOcrTool />;
    case 'language-detector':
      return <LanguageDetectorTool />;
    case 'transliteration-tool':
      return <TransliterationTool />;
    case 'number-to-words-converter':
      return <NumberToWordsConverterTool />;
    case 'words-to-number-converter':
      return <WordsToNumberConverterTool />;
    case 'date-localization-formatter':
      return <DateLocalizationFormatterTool />;
    case 'currency-localization-formatter':
      return <CurrencyLocalizationFormatterTool />;
    case 'right-to-left-layout-tester':
      return <RightToLeftLayoutTesterTool />;
    case 'punycode-converter':
      return <PunycodeConverterTool />;
    case 'unicode-grapheme-splitter':
      return <UnicodeGraphemeSplitterTool />;
    case 'emoji-stripper-normalizer':
      return <EmojiStripperNormalizerTool />;
    case 'regex-accent-insensitive-helper':
      return <RegexAccentInsensitiveHelperTool />;
    case 'icu-message-previewer':
      return <IcuMessagePreviewerTool />;
    case 'csv-language-columns-merger':
      return <CsvLanguageColumnsMergerTool />;
    case 'table-ocr':
        return <TableOcrTool />;
    case 'math-ocr':
        return <MathOcrTool />;
    case 'passport-mrz-reader':
        return <PassportMrzReaderTool />;
    case 'id-card-ocr-redactor':
        return <IdCardOcrRedactorTool />;
    case 'slugify-international-characters':
        return <SlugifyInternationalCharactersTool />;
    case 'plurals-inflections-helper':
        return <PluralsInflectionsHelperTool />;
    case 'spell-out-numbers':
        return <SpellOutNumbersTool />;
    case 'word-counter':
      return <TextAnalyzerTool highlight="words" />;
    case 'character-counter':
      return <TextAnalyzerTool highlight="characters" />;
    case 'sentence-counter':
      return <TextAnalyzerTool highlight="sentences" />;
    case 'reading-time-estimator':
      return <TextAnalyzerTool />;
    case 'readability-checker':
      return <ReadabilityCheckerTool />;
    case 'grammar-checker':
      return <GrammarCheckerTool />;
    case 'spelling-checker':
      return <SpellingCheckerTool />;
    case 'punctuation-fixer':
      return <PunctuationFixerTool />;
    case 'case-converter':
      return <CaseConverterTool />;
    case 'remove-extra-spaces':
      return <RemoveExtraSpacesTool />;
    case 'remove-line-breaks':
      return <RemoveLineBreaksTool />;
    case 'sort-lines':
      return <SortLinesTool />;
    case 'unique-lines':
      return <UniqueLinesTool />;
    case 'find-and-replace':
      return <FindReplaceTool />;
    case 'url-extractor':
      return <UrlExtractorTool />;
    case 'email-extractor':
        return <EmailExtractorTool />;
    case 'lorem-ipsum-generator':
        return <LoremIpsumGeneratorTool />;
    case 'blog-title-generator':
        return <BlogTitleGeneratorTool />;
    case 'meta-description-generator':
        return <MetaDescriptionGeneratorTool />;
    case 'paraphraser':
        return <ParaphraserTool />;
    case 'summarizer':
        return <SummarizerTool />;
    case 'keyword-extractor':
        return <KeywordExtractorTool />;
    case 'hashtag-generator':
        return <HashtagGeneratorTool />;
    case 'slug-generator':
        return <SlugGeneratorTool />;
    case 'text-diff':
        return <TextDiffTool />;
    case 'markdown-editor':
        return <MarkdownEditorTool />;
    case 'html-entities-encoder-decoder':
        return <HtmlEntitiesEncoderDecoderTool />;
    case 'base64-text-encoder-decoder':
        return <Base64TextEncoderDecoderTool />;
    case 'rot13-encoder-decoder':
        return <Rot13EncoderDecoderTool />;
    case 'utm-builder':
        return <UtmBuilderTool />;
    case 'stopwords-remover':
        return <StopwordsRemoverTool />;
    case 'case-style-converter':
        return <CaseStyleConverterTool />;
    case 'diacritics-remover':
        return <DiacriticsRemoverTool />;
    case 'json-escape-unescape':
        return <JsonEscapeTool />;
    case 'csv-escape-unescape':
        return <CsvEscapeTool />;
    case 'domain-availability-checker':
      return <DomainAvailabilityCheckerTool />;
    case 'domain-age-checker':
      return <DomainAgeCheckerTool />;
    case 'whois-lookup':
      return <WhoisLookupTool />;
    case 'dns-lookup':
      return <DnsLookupTool />;
    case 'reverse-dns-lookup':
      return <ReverseDnsLookupTool />;
    case 'ssl-certificate-checker':
      return <SslCertificateCheckerTool />;
    case 'http2-https-checker':
      return <Http2HttpsCheckerTool />;
    case 'website-speed-test':
      return <WebsiteSpeedTestTool />;
    case 'mobile-friendly-test':
      return <MobileFriendlyTestTool />;
    case 'redirect-chain-checker':
      return <RedirectChainCheckerTool />;
    case 'broken-link-checker':
      return <BrokenLinkCheckerTool />;
    case 'sitemap-generator':
      return <SitemapGeneratorTool />;
    case 'robots-txt-generator':
      return <RobotsTxtGeneratorTool />;
    case 'hreflang-generator':
      return <HreflangGeneratorTool />;
    case 'meta-tag-analyzer':
      return <MetaTagAnalyzerTool />;
    case 'open-graph-generator':
      return <OpenGraphGeneratorTool />;
    case 'twitter-card-validator':
      return <TwitterCardValidatorTool />;
    case 'canonical-url-auditor':
      return <CanonicalUrlAuditorTool />;
    case 'keyword-density-checker':
      return <KeywordDensityCheckerTool />;
    case 'structured-data-tester':
      return <StructuredDataTesterTool />;
    case 'favicons-app-manifest-generator':
      return <FaviconsAppManifestGeneratorTool />;
    case 'page-size-checker':
      return <PageSizeCheckerTool />;
    case 'page-header-analyzer':
      return <PageHeaderAnalyzerTool />;
    case 'server-status-checker':
      return <ServerStatusCheckerTool />;
    case 'host-location-finder':
      return <HostLocationFinderTool />;
    case 'uptime-monitor':
      return <UptimeMonitorTool />;
    case 'serp-snippet-preview':
      return <SerpSnippetPreviewTool />;
    case 'amp-validator-helper':
      return <AmpValidatorHelperTool />;
    case 'core-web-vitals-hints':
      return <CoreWebVitalsHintsTool />;
    case 'link-extractor':
      return <LinkExtractorTool />;
    case 'xml-sitemap-splitter-merger':
      return <XmlSitemapSplitterMergerTool />;
    case 'nofollow-link-highlighter':
      return <NofollowLinkHighlighterTool />;
    case 'heading-structure-analyzer':
      return <HeadingStructureAnalyzerTool />;
    case 'image-alt-auditor':
      return <ImageAltAuditorTool />;
    case 'duplicate-content-finder':
      return <DuplicateContentFinderTool />;
    case 'image-resizer':
      return <ImageResizerTool />;
    case 'image-cropper':
      return <ImageCropperTool />;
    case 'json-formatter':
      return <JsonFormatterTool />;
    case 'password-generator':
      return <PasswordGeneratorTool />;
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
