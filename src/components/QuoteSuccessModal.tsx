import React from 'react';
import { CheckCircle, X, Printer, Phone, Calendar, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { DevisState } from '../types';

interface QuoteSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossierId: string;
  state: DevisState;
}

export const QuoteSuccessModal: React.FC<QuoteSuccessModalProps> = ({
  isOpen,
  onClose,
  dossierId,
  state
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with celebration */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50/50">
            <CheckCircle className="w-9 h-9 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
            Demande Transmise avec Succès
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-display">
            Merci {state.contact.firstName} !
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Votre dossier de déménagement n° <strong className="font-mono text-slate-900">{dossierId}</strong> a bien été enregistré par l'équipe 1ST Déménagement (14 Rue Laugier, 75017 Paris).
          </p>
        </div>

        {/* Steps roadmap */}
        <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3 text-xs">
          <div className="font-bold text-slate-900 text-xs">Les 3 prochaines étapes de votre déménagement :</div>
          
          <div className="space-y-2.5">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong className="text-slate-900">Accusé de réception par e-mail :</strong>
                <p className="text-slate-500 text-[11px]">Un récapitulatif détaillé a été envoyé à <u>{state.contact.email}</u>.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong className="text-slate-900">Appel de votre conseiller dédié (sous 24h) :</strong>
                <p className="text-slate-500 text-[11px]">Nous vous contacterons au {state.contact.phone} pour valider les accès et caler votre visite technique gratuite.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong className="text-slate-900">Visite technique offerte & devis définitif :</strong>
                <p className="text-slate-500 text-[11px]">En visio (15 min) ou à domicile pour bloquer votre tarif ferme sans mauvaise surprise le jour J.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimer le reçu</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
          >
            <span>Fermer et continuer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center text-[11px] text-slate-400">
          Besoin urgent ? Contactez directement 1ST Déménagement au <a href="tel:+33140909304" className="text-blue-600 font-semibold underline">01 40 90 93 04</a> (14 Rue Laugier, 75017 Paris)
        </div>
      </div>
    </div>
  );
};
