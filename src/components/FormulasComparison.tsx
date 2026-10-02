import React from 'react';
import { MovingFormula } from '../types';
import { Check, X } from 'lucide-react';

interface FormulasComparisonProps {
  onSelectFormula: (formula: MovingFormula) => void;
  selectedFormula: MovingFormula;
}

const COMPARISON_ROWS = [
  { label: 'Véhicule capitonné avec chauffeur & carburant', eco: true, std: true, cnf: true, lux: true },
  { label: 'Chargement, arrimage professionnel & déchargement', eco: true, std: true, cnf: true, lux: true },
  { label: 'Protection du mobilier sous couvertures épaisses & housses', eco: true, std: true, cnf: true, lux: true },
  { label: 'Assurance transport de base incluse (AXA / Allianz)', eco: true, std: true, cnf: true, lux: true },
  { label: 'Démontage & remontage du mobilier volumineux', eco: false, std: true, cnf: true, lux: true },
  { label: 'Emballage & déballage des objets fragiles (vaisselle, miroirs)', eco: false, std: true, cnf: true, lux: true },
  { label: 'Penderies portables pour vêtements sur cintres', eco: false, std: true, cnf: true, lux: true },
  { label: 'Fourniture de cartons & matériel d\'emballage livrés à domicile', eco: false, std: false, cnf: true, lux: true },
  { label: 'Emballage intégral de l\'ensemble des biens (linge, livres, etc.)', eco: false, std: false, cnf: true, lux: true },
  { label: 'Déballage de l\'intégralité des cartons à l\'arrivée', eco: false, std: false, cnf: false, lux: true },
  { label: 'Rangement complet dans les placards et dressings', eco: false, std: false, cnf: false, lux: true },
  { label: 'Dépose & repose tringles, tableaux et luminaires', eco: false, std: false, cnf: false, lux: true },
  { label: 'Nettoyage de fin de chantier & évacuation des déchets', eco: false, std: false, cnf: false, lux: true },
];

export const FormulasComparison: React.FC<FormulasComparisonProps> = ({
  onSelectFormula,
  selectedFormula
}) => {
  return (
    <section id="formules" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Transparence Tarifaire Complète
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
            Tableau Comparatif Détaillé de nos Formules
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Chez 1ST Déménagement, chaque formule est clairement définie sans frais cachés. Choisissez l'option qui correspond exactement à vos besoins.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 divide-x divide-slate-200">
                <th className="p-4 sm:p-5 font-bold text-slate-900 w-1/3">Prestations & Services</th>
                <th className="p-4 sm:p-5 text-center font-bold text-slate-900">
                  <div>Économique</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Budget optimisé</div>
                </th>
                <th className="p-4 sm:p-5 text-center font-bold text-blue-600 bg-blue-50/50">
                  <div className="flex items-center justify-center gap-1">
                    <span>Standard</span>
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-semibold">Top</span>
                  </div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Équilibre parfait</div>
                </th>
                <th className="p-4 sm:p-5 text-center font-bold text-slate-900">
                  <div>Confort</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Clé en main</div>
                </th>
                <th className="p-4 sm:p-5 text-center font-bold text-slate-900">
                  <div>Luxe / VIP</div>
                  <div className="text-[11px] font-normal text-slate-500 mt-0.5">Zéro effort</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors divide-x divide-slate-100">
                  <td className="p-3.5 sm:p-4 text-slate-800 font-medium text-xs sm:text-sm">{row.label}</td>
                  <td className="p-3 text-center">
                    {row.eco ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="p-3 text-center bg-blue-50/20">
                    {row.std ? <Check className="w-4 h-4 text-emerald-600 mx-auto stroke-[2.5]" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="p-3 text-center">
                    {row.cnf ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="p-3 text-center">
                    {row.lux ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50/90 border-t border-slate-200 divide-x divide-slate-200">
                <td className="p-4 font-bold text-slate-900 text-xs">Sélectionner dans mon devis :</td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectFormula('eco')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      selectedFormula === 'eco' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Choisir Éco
                  </button>
                </td>
                <td className="p-3 text-center bg-blue-50/50">
                  <button
                    type="button"
                    onClick={() => onSelectFormula('standard')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      selectedFormula === 'standard' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-blue-300 text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    Choisir Standard
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectFormula('confort')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      selectedFormula === 'confort' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Choisir Confort
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectFormula('luxe')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      selectedFormula === 'luxe' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Choisir Luxe
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};
