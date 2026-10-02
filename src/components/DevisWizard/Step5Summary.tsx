import React, { useState } from 'react';
import { DevisState } from '../../types';
import { computeDevisEstimate } from '../../utils/pricingCalculator';
import { FORMULAS_DETAILS } from '../../data/furnitureData';
import { 
  Printer, 
  Send, 
  Video, 
  MapPin, 
  Truck, 
  Calendar, 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle,
  HelpCircle,
  Check
} from 'lucide-react';

interface Step5SummaryProps {
  state: DevisState;
  onPrev: () => void;
  onSubmitQuote: (dossierId: string) => void;
  onBookTechnicalVisit: (type: 'domicile' | 'visio') => void;
}

export const Step5Summary: React.FC<Step5SummaryProps> = ({
  state,
  onPrev,
  onSubmitQuote,
  onBookTechnicalVisit
}) => {
  const [dossierId] = useState(`1ST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVisitType, setSelectedVisitType] = useState<'visio' | 'domicile'>('visio');

  const estimate = computeDevisEstimate(state);
  const formulaInfo = FORMULAS_DETAILS[state.selectedFormula];

  const handleConfirmQuote = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitQuote(dossierId);
    }, 700);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Editorial Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Estimation Immédiate Chiffrée
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-display">
            05. Votre Devis de Déménagement
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dossier n° <span className="font-mono font-bold text-slate-700">{dossierId}</span> · Établi pour {state.contact.civility} {state.contact.firstName} {state.contact.lastName}
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="no-print inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimer / PDF</span>
        </button>
      </div>

      {/* Main Quote Result Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Price Range Display */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              Fourchette tarifaire indicative TTC
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight tabular-nums">
                {estimate.minPrice} € – {estimate.maxPrice} €
              </span>
              <span className="text-sm font-medium text-slate-400">TTC</span>
            </div>

            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Prix estimé basé sur <strong>{estimate.volumeM3} m³</strong> de mobilier, une distance de <strong>{estimate.distanceKm} km</strong> en formule <strong>{formulaInfo.name}</strong> avec assurance Tous Risques incluse.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Aucun acompte requis en ligne
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Visite technique offerte
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Prix garanti sans surprise
              </span>
            </div>
          </div>

          {/* Quick Action Button Box */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 space-y-4">
            <div className="text-xs text-slate-200">
              <span className="font-bold text-white block text-sm">Recevez votre devis contractuel</span>
              Un conseiller 1ST Déménagement étudie votre dossier sous 24h ouvrées et confirme la date.
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmQuote}
              className="w-full py-3.5 px-4 text-sm font-extrabold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Send className="w-4 h-4 text-slate-900" />
              <span>{isSubmitting ? 'Validation en cours...' : 'Valider ma demande de devis ferme'}</span>
            </button>

            <div className="text-center">
              <span className="text-[11px] text-slate-400">
                Ou contact direct au <a href="tel:+33140909304" className="text-blue-300 underline font-semibold">01 40 90 93 04</a> (Agence 75017 Paris)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Cost Breakdown and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Summary Cards */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card 1: Route & Access */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Trajet & Conditions d'accès</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="font-bold text-slate-900">Départ : {state.origin.city} ({state.origin.postalCode})</div>
                <div className="text-slate-600 mt-1">
                  {state.origin.housingType} · Étage {state.origin.floor} · Ascenseur : {state.origin.elevator}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">Portage : {state.origin.portageDistance}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="font-bold text-slate-900">Arrivée : {state.destination.city} ({state.destination.postalCode})</div>
                <div className="text-slate-600 mt-1">
                  {state.destination.housingType} · Étage {state.destination.floor} · Ascenseur : {state.destination.elevator}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">Portage : {state.destination.portageDistance}</div>
              </div>
            </div>
          </div>

          {/* Card 2: Volume & Formula */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Volume & Prestations retenues</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-500">Cubage total :</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{estimate.volumeM3} m³</div>
                <div className="text-slate-500 text-[11px] mt-1">
                  Méthode : {state.volumeMethod === 'surface' ? 'Surface m²' : state.volumeMethod === 'room_inventory' ? 'Inventaire meuble' : 'Directe'}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-500">Formule choisie :</div>
                <div className="text-lg font-bold text-blue-600">{formulaInfo.name}</div>
                <div className="text-slate-500 text-[11px] mt-1">{formulaInfo.subtitle}</div>
              </div>
            </div>

            {/* Inclusions summary */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-700 mb-2">Principaux services inclus :</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                {formulaInfo.features.filter(f => f.included).slice(0, 6).map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Free Technical Visit Booking */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-xl border border-blue-200 p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span>Programmer une Visite Technique Gratuite</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Sans engagement : un expert déménageur évalue votre cubage exact et vérifie les accès pour bloquer un tarif définitif ferme.
                </p>
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                Offert 100%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedVisitType('visio')}
                className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  selectedVisitType === 'visio'
                    ? 'border-blue-600 bg-white shadow-xs font-bold text-blue-900 ring-1 ring-blue-600'
                    : 'border-blue-200/80 bg-white/60 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-blue-600" />
                  <span>Visio 15 min (Rapide)</span>
                </div>
                <div className="text-[11px] text-slate-500 font-normal mt-1">
                  Directement avec votre smartphone (WhatsApp / FaceTime)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedVisitType('domicile')}
                className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  selectedVisitType === 'domicile'
                    ? 'border-blue-600 bg-white shadow-xs font-bold text-blue-900 ring-1 ring-blue-600'
                    : 'border-blue-200/80 bg-white/60 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>À votre domicile</span>
                </div>
                <div className="text-[11px] text-slate-500 font-normal mt-1">
                  Déplacement physique d'un conseiller TDI chez vous
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onBookTechnicalVisit(selectedVisitType)}
              className="w-full py-2.5 px-4 text-xs font-bold text-blue-700 bg-white border border-blue-300 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
            >
              Je souhaite planifier ma visite {selectedVisitType === 'visio' ? 'en visio' : 'à domicile'}
            </button>
          </div>
        </div>

        {/* Right: Transparent Price Breakdown Table */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center justify-between">
              <span>Détail du calcul tarifaire</span>
              <span className="text-xs text-slate-400 font-normal">Montants HT/TTC</span>
            </h3>

            <div className="space-y-3 text-xs">
              {estimate.breakdown.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100/80">
                  <span className={item.amount < 0 ? 'text-emerald-700 font-semibold' : 'text-slate-600'}>
                    {item.label}
                  </span>
                  <span className={`font-mono tabular-nums font-bold ${item.amount < 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {item.amount > 0 ? `${item.amount} €` : `${item.amount} €`}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Highlight */}
            <div className="pt-3 border-t-2 border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Estimation moyenne indicative :</span>
                <span className="font-mono tabular-nums text-slate-700">{estimate.estimatedPrice} € TTC</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Fourchette de référence :</span>
                <span className="font-display font-extrabold text-blue-600 tabular-nums text-base">
                  {estimate.minPrice} € – {estimate.maxPrice} € TTC
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 leading-relaxed">
              * Ce chiffrage automatisé constitue une base d'évaluation contractuelle sous réserve de la validation des accès et des inventaires définitifs lors de la visite technique.
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Vos garanties contractuelles 1ST Déménagement</span>
            </h4>

            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Certification Qualité AFNOR & respect strict des procédures</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Assurance Marchandises Transportées jusqu'à 80 000 € incluse</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Personnel qualifié, soigneux et formé au démontage/remontage délicat</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Agence physique à Paris 17e (14 Rue Laugier) & suivi dédié</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 no-print">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modifier mes coordonnées</span>
        </button>

        <button
          type="button"
          onClick={handleConfirmQuote}
          className="px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Confirmer ma demande de devis</span>
        </button>
      </div>
    </div>
  );
};
