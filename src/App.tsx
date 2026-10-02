import React, { useState, useRef } from 'react';
import { DevisState, CustomerType, MovingFormula } from './types';
import { INITIAL_FURNITURE_ITEMS } from './data/furnitureData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WizardProgress } from './components/DevisWizard/WizardProgress';
import { Step1Locations } from './components/DevisWizard/Step1Locations';
import { Step2VolumeCalculator } from './components/DevisWizard/Step2VolumeCalculator';
import { Step3Formulas } from './components/DevisWizard/Step3Formulas';
import { Step4ContactDate } from './components/DevisWizard/Step4ContactDate';
import { Step5Summary } from './components/DevisWizard/Step5Summary';
import { FormulasComparison } from './components/FormulasComparison';
import { ServicesShowcase } from './components/ServicesShowcase';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { CallbackModal } from './components/CallbackModal';
import { QuoteSuccessModal } from './components/QuoteSuccessModal';
import { Footer } from './components/Footer';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const INITIAL_DEVIS_STATE: DevisState = {
  customerType: 'particulier',
  origin: {
    address: '14 Rue Laugier',
    postalCode: '75017',
    city: 'Paris 17e',
    housingType: 'appartement',
    floor: 2,
    elevator: 'oui_petit',
    portageDistance: 'moins_10m',
    lat: 48.8842,
    lng: 2.3015
  },
  destination: {
    address: '',
    postalCode: '69001',
    city: 'Lyon',
    housingType: 'appartement',
    floor: 3,
    elevator: 'oui_standard',
    portageDistance: 'moins_10m',
    lat: 45.7640,
    lng: 4.8357
  },
  calculatedDistanceKm: 465,
  volumeMethod: 'surface',
  surfaceM2: 65,
  customVolumeM3: 26,
  inventory: INITIAL_FURNITURE_ITEMS,
  selectedFormula: 'standard',
  addons: {
    monteMeuble: false,
    gardeMeuble: false,
    cartonsPack: false,
    pianoTransport: false,
    assuranceRenforcee: false
  },
  contact: {
    civility: 'M.',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    preferredContact: 'phone',
    date: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0],
    dateFlexibility: 'flexible_3j',
    comments: ''
  },
  technicalVisitRequested: false,
  technicalVisitType: 'visio'
};

export default function App() {
  const [devisState, setDevisState] = useState<DevisState>(INITIAL_DEVIS_STATE);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);
  const [isCallbackOpen, setIsCallbackOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [submittedDossierId, setSubmittedDossierId] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const devisSectionRef = useRef<HTMLDivElement>(null);
  const formulasSectionRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpdateDevis = (updated: Partial<DevisState>) => {
    setDevisState((prev) => ({ ...prev, ...updated }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (step > maxReachedStep) {
      setMaxReachedStep(step);
    }
    devisSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNextStep = () => {
    goToStep(Math.min(5, currentStep + 1));
  };

  const handlePrevStep = () => {
    goToStep(Math.max(1, currentStep - 1));
  };

  const scrollToDevis = () => {
    devisSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVolume = () => {
    devisSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    goToStep(2);
  };

  const scrollToFormulas = () => {
    formulasSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFAQ = () => {
    faqSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectFormula = (formula: MovingFormula) => {
    handleUpdateDevis({ selectedFormula: formula });
    showToast(`Formule ${formula.toUpperCase()} sélectionnée pour votre devis !`);
    goToStep(3);
  };

  const handleSelectMonteMeuble = () => {
    handleUpdateDevis({
      addons: {
        ...devisState.addons,
        monteMeuble: true
      }
    });
    showToast('Option Monte-meubles avec technicien ajoutée à votre devis !');
    goToStep(3);
  };

  const handleSubmitQuote = (dossierId: string) => {
    setSubmittedDossierId(dossierId);
    setIsSuccessModalOpen(true);
  };

  const handleBookTechnicalVisit = (type: 'domicile' | 'visio') => {
    handleUpdateDevis({
      technicalVisitRequested: true,
      technicalVisitType: type
    });
    showToast(`Visite technique (${type === 'visio' ? 'Visio 15 min' : 'À domicile'}) prise en compte !`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenCallback={() => setIsCallbackOpen(true)}
        onScrollToDevis={scrollToDevis}
        onScrollToVolume={scrollToVolume}
        onScrollToFormulas={scrollToFormulas}
        onScrollToFAQ={scrollToFAQ}
      />

      {/* Hero Section */}
      <Hero
        customerType={devisState.customerType}
        onCustomerTypeChange={(type: CustomerType) => handleUpdateDevis({ customerType: type })}
        onStartQuote={scrollToDevis}
      />

      {/* Main Interactive Devis Wizard Section */}
      <main ref={devisSectionRef} id="devis" className="py-12 lg:py-16 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Wizard Step Indicator */}
            <WizardProgress
              currentStep={currentStep}
              onStepClick={goToStep}
              maxReachedStep={maxReachedStep}
            />

            {/* Wizard Content Body */}
            <div className="p-6 sm:p-8 lg:p-10">
              {currentStep === 1 && (
                <Step1Locations
                  state={devisState}
                  onChange={handleUpdateDevis}
                  onNext={handleNextStep}
                />
              )}

              {currentStep === 2 && (
                <Step2VolumeCalculator
                  state={devisState}
                  onChange={handleUpdateDevis}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                />
              )}

              {currentStep === 3 && (
                <Step3Formulas
                  state={devisState}
                  onChange={handleUpdateDevis}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                />
              )}

              {currentStep === 4 && (
                <Step4ContactDate
                  state={devisState}
                  onChange={handleUpdateDevis}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                />
              )}

              {currentStep === 5 && (
                <Step5Summary
                  state={devisState}
                  onPrev={handlePrevStep}
                  onSubmitQuote={handleSubmitQuote}
                  onBookTechnicalVisit={handleBookTechnicalVisit}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Detailed Formulas Comparison */}
      <div ref={formulasSectionRef}>
        <FormulasComparison
          onSelectFormula={handleSelectFormula}
          selectedFormula={devisState.selectedFormula}
        />
      </div>

      {/* Services Showcase (Monte-Meubles, Garde-meubles, Packing) */}
      <ServicesShowcase
        onSelectMonteMeuble={handleSelectMonteMeuble}
        onScrollToDevis={scrollToDevis}
      />

      {/* Real Google Reviews (4.8/5 sur 53 avis) */}
      <ReviewsSection />

      {/* FAQ & Reassurance */}
      <div ref={faqSectionRef}>
        <FAQSection onOpenCallback={() => setIsCallbackOpen(true)} />
      </div>

      {/* Footer */}
      <Footer
        onScrollToDevis={scrollToDevis}
        onScrollToVolume={scrollToVolume}
        onScrollToFormulas={scrollToFormulas}
        onScrollToFAQ={scrollToFAQ}
      />

      {/* Free Callback Modal */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />

      {/* Quote Submission Confirmation Modal */}
      <QuoteSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        dossierId={submittedDossierId}
        state={devisState}
      />
    </div>
  );
}
