import React from 'react';
import { Phone, Clock, ShieldCheck, Truck } from 'lucide-react';

interface HeaderProps {
  onOpenCallback: () => void;
  onScrollToDevis: () => void;
  onScrollToVolume: () => void;
  onScrollToFormulas: () => void;
  onScrollToFAQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCallback,
  onScrollToDevis,
  onScrollToVolume,
  onScrollToFormulas,
  onScrollToFAQ
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Sub-header announcement trust bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Entreprise certifiée AFNOR · 14 Rue Laugier, 75017 Paris
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Devis officiel sous 24h & visite technique gratuite
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              ★ 4,8/5 (53 avis Google)
            </span>
            <span className="text-slate-600">·</span>
            <span>Paris 17e & Toute la France</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly respecting the 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors font-black text-sm tracking-tighter font-display">
            1ST
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 leading-none font-display">
              1ST DÉMÉNAGEMENT
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase mt-1">
              Certifié AFNOR · Paris 17e
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={onScrollToDevis}
            className="hover:text-blue-600 transition-colors text-left cursor-pointer font-semibold text-blue-600"
          >
            Devis Express
          </button>
          <button
            onClick={onScrollToVolume}
            className="hover:text-blue-600 transition-colors text-left cursor-pointer"
          >
            Calculateur m³
          </button>
          <button
            onClick={onScrollToFormulas}
            className="hover:text-blue-600 transition-colors text-left cursor-pointer"
          >
            Nos Formules
          </button>
          <a
            href="#equipements"
            className="hover:text-blue-600 transition-colors"
          >
            Monte-Meubles
          </a>
          <button
            onClick={onScrollToFAQ}
            className="hover:text-blue-600 transition-colors text-left cursor-pointer"
          >
            Tarifs & FAQ
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+33140909304"
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span className="tabular-nums font-bold">01 40 90 93 04</span>
          </a>

          <button
            onClick={onOpenCallback}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 rounded-lg transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Être rappelé
          </button>

          <button
            onClick={onScrollToDevis}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-600/30 whitespace-nowrap active:scale-[0.98]"
          >
            Estimer mon devis
          </button>
        </div>
      </div>
    </header>
  );
};
