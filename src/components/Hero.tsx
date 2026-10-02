import React from 'react';
import { CustomerType } from '../types';
import { CheckCircle2, Shield, CalendarCheck, Award, ArrowRight } from 'lucide-react';
import heroTruckImg from '../assets/images/hero_moving_truck_team_1790982196003.jpg';

interface HeroProps {
  customerType: CustomerType;
  onCustomerTypeChange: (type: CustomerType) => void;
  onStartQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  customerType,
  onCustomerTypeChange,
  onStartQuote
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-50 pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Proposition and Quick Toggle */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              1ST Déménagement · 14 Rue Laugier, 75017 Paris · Devis en ligne immédiat
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] font-display">
              1ST Déménagement : Votre Déménagement Sérénité, <span className="text-blue-600">Certifié AFNOR</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Basée au 14 Rue Laugier dans le 17e arrondissement de Paris, notre équipe certifiée AFNOR prend soin de vos meubles et effets personnels. Calculez votre volume en m³, choisissez votre formule et obtenez votre estimation transparente en moins de 3 minutes.
            </p>

            {/* Profile Selector (Particulier vs Entreprise) */}
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs max-w-md">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onCustomerTypeChange('particulier')}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    customerType === 'particulier'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Particulier
                  {customerType === 'particulier' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </button>
                <button
                  type="button"
                  onClick={() => onCustomerTypeChange('entreprise')}
                  className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    customerType === 'entreprise'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Entreprise / Bureaux
                  {customerType === 'entreprise' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </button>
              </div>
            </div>

            {/* CTAs and Direct Action */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onStartQuote}
                className="px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/25 flex items-center gap-2.5 group cursor-pointer active:scale-[0.98]"
              >
                <span>Calculer mon devis maintenant</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Gratuit
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Sans engagement
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Visite technique offerte
                </span>
              </div>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-xl font-extrabold text-blue-600 font-display tabular-nums">4,8 / 5</div>
                <div className="text-xs text-slate-500 mt-0.5">53 avis Google vérifiés</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 font-display">AFNOR</div>
                <div className="text-xs text-slate-500 mt-0.5">Certification Qualité</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 font-display tabular-nums">Paris 17e</div>
                <div className="text-xs text-slate-500 mt-0.5">14 Rue Laugier</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 font-display tabular-nums">80 000 €</div>
                <div className="text-xs text-slate-500 mt-0.5">Assurance AXA incluse</div>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Photographic Asset with Key Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-[4/3] bg-slate-900">
              <img
                src={heroTruckImg}
                alt="Équipe professionnelle de 1ST Déménagement et camion capitonné"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    Certifié AFNOR · 1ST DÉMÉNAGEMENT PARIS
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-snug">
                  Protection soignée des objets fragiles, démontage-remontage de mobilier et matériel d'emballage haut de gamme.
                </p>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-xl shadow-lg border border-slate-200 hidden sm:flex items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">Garantie Dommages & Vol</div>
                <div className="text-slate-500 text-[11px]">Contrat officiel d'assurance AXA / Allianz inclus</div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white py-2 px-3 rounded-lg shadow-md border border-slate-200 hidden sm:flex items-center gap-2 text-xs font-bold text-slate-800">
              <CalendarCheck className="w-4 h-4 text-blue-600" />
              <span>Réponse garantie sous 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
