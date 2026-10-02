import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Truck } from 'lucide-react';

interface FooterProps {
  onScrollToDevis: () => void;
  onScrollToVolume: () => void;
  onScrollToFormulas: () => void;
  onScrollToFAQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToDevis,
  onScrollToVolume,
  onScrollToFormulas,
  onScrollToFAQ
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm tracking-tighter font-display">
                1ST
              </div>
              <span className="text-xl font-black tracking-tight text-white font-display">
                1ST DÉMÉNAGEMENT
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Entreprise certifiée AFNOR basée au 14 Rue Laugier, 75017 Paris. Déménagements soignés pour particuliers et entreprises en Île-de-France et toute la France. Note Google certifiée 4,8/5 sur 53 avis clients.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certification Qualité AFNOR</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>14 Rue Laugier, 75017 Paris (Plus Code: V7JW+3R)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Assurance Transport Tous Risques AXA incluse</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Nos Prestations</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onScrollToDevis} className="hover:text-white transition-colors cursor-pointer">
                  Devis Déménagement Gratuit
                </button>
              </li>
              <li>
                <button onClick={onScrollToVolume} className="hover:text-white transition-colors cursor-pointer">
                  Calculateur de Volume en m³
                </button>
              </li>
              <li>
                <button onClick={onScrollToFormulas} className="hover:text-white transition-colors cursor-pointer">
                  Comparatif des Formules
                </button>
              </li>
              <li>
                <a href="#equipements" className="hover:text-white transition-colors">
                  Location de Monte-Meubles
                </a>
              </li>
              <li>
                <a href="#equipements" className="hover:text-white transition-colors">
                  Garde-Meubles Sécurisé
                </a>
              </li>
            </ul>
          </div>

          {/* Déménagement Partout en France */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Zones d'Intervention</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Paris (75) & toute l'Île-de-France (92, 93, 94, 78, 91, 95, 77)</li>
              <li>Liaisons régulières : Paris ↔ Lyon</li>
              <li>Paris ↔ Marseille / PACA</li>
              <li>Paris ↔ Bordeaux / Nantes</li>
              <li>Groupages économiques provinciaux</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Nous Contacter</h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="tel:+33140909304"
                className="flex items-center gap-2 text-white hover:text-blue-400 font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="tabular-nums font-bold">01 40 90 93 04</span>
              </a>

              <a
                href="mailto:contact@1stdemenagement.com"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                <span>contact@1stdemenagement.com</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Ouvre à 09:30 lun. · Lun - Sam : 09:30 - 18:30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} 1ST Déménagement (14 Rue Laugier, 75017 Paris). Tous droits réservés.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Mentions légales</span>
            <span>·</span>
            <span>Politique de confidentialité</span>
            <span>·</span>
            <span>Conditions générales de vente</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
