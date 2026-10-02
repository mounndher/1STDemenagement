import React from 'react';
import { DevisState, MovingFormula } from '../../types';
import { FORMULAS_DETAILS } from '../../data/furnitureData';
import { Check, X, Shield, ArrowRight, ArrowLeft, Sparkles, Box, Wrench, HelpCircle } from 'lucide-react';

interface Step3FormulasProps {
  state: DevisState;
  onChange: (updated: Partial<DevisState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3Formulas: React.FC<Step3FormulasProps> = ({
  state,
  onChange,
  onNext,
  onPrev
}) => {
  const selectFormula = (formula: MovingFormula) => {
    onChange({ selectedFormula: formula });
  };

  const toggleAddon = (addonKey: keyof typeof state.addons, value: any) => {
    onChange({
      addons: {
        ...state.addons,
        [addonKey]: value
      }
    });
  };

  const formulasList = [
    { key: 'eco' as const, data: FORMULAS_DETAILS.eco, isPopular: false },
    { key: 'standard' as const, data: FORMULAS_DETAILS.standard, isPopular: true },
    { key: 'confort' as const, data: FORMULAS_DETAILS.confort, isPopular: false },
    { key: 'luxe' as const, data: FORMULAS_DETAILS.luxe, isPopular: false },
  ];

  return (
    <div className="space-y-8">
      {/* Editorial Intro */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          03. Choix de la formule & prestations
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Sélectionnez le niveau de prestation désiré selon votre budget et votre disponibilité pour préparer les cartons.
        </p>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {formulasList.map(({ key, data, isPopular }) => {
          const isSelected = state.selectedFormula === key;

          return (
            <div
              key={key}
              onClick={() => selectFormula(key)}
              className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/20 shadow-md ring-2 ring-blue-600/20'
                  : isPopular
                  ? 'border-slate-300 bg-white hover:border-slate-400 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-xs">
                  Recommandé par 85% de nos clients
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 font-display">
                    {data.name}
                  </h3>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  {data.subtitle}
                </p>

                {/* Features List */}
                <ul className="mt-4 space-y-2 text-xs">
                  {data.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      {feat.included ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span className={feat.included ? 'text-slate-800 font-medium' : 'text-slate-400 line-through'}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For Tagline */}
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
                {data.bestFor}
              </div>
            </div>
          );
        })}
      </div>

      {/* Addon Services Section */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Services & Équipements Complémentaires
            </h3>
            <p className="text-xs text-slate-500">
              Personnalisez votre déménagement avec des options modulaires selon vos contraintes d'accès ou vos objets précieux.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 hidden sm:inline">
            Modifiable à tout moment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Addon: Monte-Meubles */}
          <div
            onClick={() => toggleAddon('monteMeuble', !state.addons.monteMeuble)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              state.addons.monteMeuble
                ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-600'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${state.addons.monteMeuble ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Wrench className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Monte-meubles & Technicien</span>
                <span className="font-bold text-blue-600">+280 €</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Passage par fenêtre jusqu'au 10e étage (33m). Évite d'abîmer escaliers et meubles.
              </p>
            </div>
          </div>

          {/* Addon: Pack Cartons & Fournitures */}
          <div
            onClick={() => toggleAddon('cartonsPack', !state.addons.cartonsPack)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              state.addons.cartonsPack
                ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-600'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${state.addons.cartonsPack ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Box className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Pack Cartons & Fournitures</span>
                <span className="font-bold text-blue-600">+65 €</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                30 cartons renforcés, 3 rouleaux adhésifs silencieux, dévidoir et 50m papier bulles.
              </p>
            </div>
          </div>

          {/* Addon: Garde-meubles */}
          <div
            onClick={() => toggleAddon('gardeMeuble', !state.addons.gardeMeuble)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              state.addons.gardeMeuble
                ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-600'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${state.addons.gardeMeuble ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Garde-meubles sécurisé</span>
                <span className="font-bold text-blue-600">Dès 75 €/m</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Caisses individuelles en bois ventilé, vidéo-surveillance 24/7 et alarme incendie.
              </p>
            </div>
          </div>

          {/* Addon: Piano transport */}
          <div
            onClick={() => toggleAddon('pianoTransport', !state.addons.pianoTransport)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              state.addons.pianoTransport
                ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-600'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${state.addons.pianoTransport ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Transport Piano & Poids Lourd</span>
                <span className="font-bold text-blue-600">+250 €</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Équipement chenillette, patins téflon et sangles haute résistance pour piano droit.
              </p>
            </div>
          </div>

          {/* Addon: Assurance Renforcée */}
          <div
            onClick={() => toggleAddon('assuranceRenforcee', !state.addons.assuranceRenforcee)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              state.addons.assuranceRenforcee
                ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-600'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-lg ${state.addons.assuranceRenforcee ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Garantie Valeur à Neuf</span>
                <span className="font-bold text-blue-600">+75 €</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Remboursement sans décote de vétusté sur votre mobilier et appareils électroniques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour volume</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Continuer vers date & coordonnées</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
