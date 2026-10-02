import React, { useState } from 'react';
import { DevisState, FurnitureItem } from '../../types';
import { calculateEffectiveVolumeM3 } from '../../utils/pricingCalculator';
import { 
  Truck, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Sliders, 
  ListPlus, 
  Binary, 
  Layers, 
  Check, 
  Sparkles,
  Bed,
  Tv,
  Table,
  BookOpen,
  Archive,
  Refrigerator,
  Flame,
  WashingMachine,
  Laptop,
  Folder,
  Package,
  Bike,
  Image as ImageIcon,
  Armchair
} from 'lucide-react';

interface Step2VolumeCalculatorProps {
  state: DevisState;
  onChange: (updated: Partial<DevisState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2VolumeCalculator: React.FC<Step2VolumeCalculatorProps> = ({
  state,
  onChange,
  onNext,
  onPrev
}) => {
  const [activeCategory, setActiveCategory] = useState<'salon' | 'chambre' | 'cuisine' | 'bureau' | 'divers'>('salon');

  const totalVolumeM3 = calculateEffectiveVolumeM3(state);

  // Update surface
  const handleSurfaceChange = (m2: number) => {
    onChange({ surfaceM2: m2, volumeMethod: 'surface' });
  };

  // Update direct cubic meters
  const handleDirectVolumeChange = (m3: number) => {
    onChange({ customVolumeM3: m3, volumeMethod: 'direct' });
  };

  // Modify inventory count
  const handleItemCountChange = (itemId: string, delta: number) => {
    const updatedInventory = state.inventory.map((item) => {
      if (item.id === itemId) {
        const newCount = Math.max(0, item.count + delta);
        return { ...item, count: newCount };
      }
      return item;
    });
    onChange({ inventory: updatedInventory, volumeMethod: 'room_inventory' });
  };

  // Determine truck capacity specs
  const getTruckSpecs = (vol: number) => {
    if (vol <= 16) {
      return {
        type: 'Fourgon utilitaire capitonné (15 m³)',
        crew: '2 Déménageurs qualifiés',
        fillPercent: Math.min(100, Math.round((vol / 16) * 100)),
        badge: 'Idéal Studio & Petit 2 Pièces'
      };
    } else if (vol <= 25) {
      return {
        type: 'Camion 20-22 m³ avec hayon élévateur',
        crew: '2 à 3 Déménageurs professionnels',
        fillPercent: Math.min(100, Math.round((vol / 25) * 100)),
        badge: 'Idéal Appartement T2 / T3'
      };
    } else if (vol <= 45) {
      return {
        type: 'Grand Porteur 40 m³ capitonné',
        crew: '3 à 4 Déménageurs professionnels',
        fillPercent: Math.min(100, Math.round((vol / 45) * 100)),
        badge: 'Idéal Appartement T4 / Maison'
      };
    } else {
      return {
        type: 'Train Routier ou 2 Véhicules Lourds',
        crew: '4 à 5 Déménageurs avec chef d\'équipe',
        fillPercent: 100,
        badge: 'Grande Propriété / Bureaux'
      };
    }
  };

  const truckSpecs = getTruckSpecs(totalVolumeM3);

  // Icon mapping helper
  const getIcon = (name: string) => {
    switch (name) {
      case 'Armchair':
      case 'Sofa':
        return <Armchair className="w-4 h-4 text-blue-600" />;
      case 'Bed':
        return <Bed className="w-4 h-4 text-blue-600" />;
      case 'Tv':
        return <Tv className="w-4 h-4 text-blue-600" />;
      case 'Table':
      case 'Utensils':
        return <Table className="w-4 h-4 text-blue-600" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'Archive':
      case 'DoorClosed':
      case 'FolderCheck':
        return <Archive className="w-4 h-4 text-blue-600" />;
      case 'Refrigerator':
        return <Refrigerator className="w-4 h-4 text-blue-600" />;
      case 'WashingMachine':
      case 'Disc':
        return <WashingMachine className="w-4 h-4 text-blue-600" />;
      case 'Flame':
      case 'Zap':
        return <Flame className="w-4 h-4 text-blue-600" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4 text-blue-600" />;
      case 'Folder':
        return <Folder className="w-4 h-4 text-blue-600" />;
      case 'Package':
      case 'PackageCheck':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'Bike':
        return <Bike className="w-4 h-4 text-blue-600" />;
      default:
        return <Layers className="w-4 h-4 text-blue-600" />;
    }
  };

  const currentCategoryItems = state.inventory.filter((i) => i.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Editorial Step Intro */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          02. Évaluation du volume à déménager
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Le cubage en m³ détermine la taille du camion et le nombre de déménageurs requis. Choisissez la méthode la plus simple pour vous.
        </p>
      </div>

      {/* Method Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => onChange({ volumeMethod: 'surface' })}
          className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            state.volumeMethod === 'surface'
              ? 'bg-white text-blue-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Rapide : Par Surface (m²)</span>
        </button>

        <button
          type="button"
          onClick={() => onChange({ volumeMethod: 'room_inventory' })}
          className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            state.volumeMethod === 'room_inventory'
              ? 'bg-white text-blue-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ListPlus className="w-4 h-4" />
          <span>Précis : Meuble par Meuble</span>
        </button>

        <button
          type="button"
          onClick={() => onChange({ volumeMethod: 'direct' })}
          className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            state.volumeMethod === 'direct'
              ? 'bg-white text-blue-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Binary className="w-4 h-4" />
          <span>Direct : Je connais mon m³</span>
        </button>
      </div>

      {/* Main Grid: Calculator Inputs vs Real-time Truck Capacity Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Section: Inputs based on selected method */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          {/* METHOD 1: SURFACE SLIDER */}
          {state.volumeMethod === 'surface' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Surface totale de votre logement</h3>
                  <p className="text-xs text-slate-500">Ajustez le curseur selon vos mètres carrés habitables</p>
                </div>
                <div className="text-2xl font-extrabold text-blue-600 font-display tabular-nums">
                  {state.surfaceM2} m²
                </div>
              </div>

              {/* Range Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="15"
                  max="220"
                  step="5"
                  value={state.surfaceM2}
                  onChange={(e) => handleSurfaceChange(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Studio 15 m²</span>
                  <span>T2 45 m²</span>
                  <span>T3 75 m²</span>
                  <span>T4 100 m²</span>
                  <span>Maison 150+ m²</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Sélection rapide selon le type de bien :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Studio (25 m²)', m2: 25 },
                    { label: 'T2 (45 m²)', m2: 45 },
                    { label: 'T3 (70 m²)', m2: 70 },
                    { label: 'T4 / Maison (110 m²)', m2: 110 }
                  ].map((p) => (
                    <button
                      key={p.m2}
                      type="button"
                      onClick={() => handleSurfaceChange(p.m2)}
                      className={`p-2 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                        state.surfaceM2 === p.m2
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-900">Norme déménagement :</span> La règle professionnelle appliquée par les déménageurs français équivaut à 1 m³ pour environ 2,5 m² habitables (mobilier moyen + cartons usuels).
              </div>
            </div>
          )}

          {/* METHOD 2: ROOM BY ROOM INVENTORY */}
          {state.volumeMethod === 'room_inventory' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Inventaire interactif du mobilier</h3>
                  <p className="text-xs text-slate-500">Ajoutez ou retirez les meubles que vous possédez</p>
                </div>
              </div>

              {/* Category selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: 'salon', label: 'Salon & Séjour' },
                  { id: 'chambre', label: 'Chambres' },
                  { id: 'cuisine', label: 'Cuisine & Électro' },
                  { id: 'bureau', label: 'Bureau' },
                  { id: 'divers', label: 'Cartons & Divers' }
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategory(c.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      activeCategory === c.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto pr-1">
                {currentCategoryItems.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        {getIcon(item.iconName)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-400">~{item.volumeM3} m³ par unité</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleItemCountChange(item.id, -1)}
                        disabled={item.count === 0}
                        className="w-7 h-7 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-6 text-center text-xs font-bold text-slate-900 tabular-nums">
                        {item.count}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleItemCountChange(item.id, 1)}
                        className="w-7 h-7 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* METHOD 3: DIRECT CUBIC METERS */}
          {state.volumeMethod === 'direct' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Saisie directe de votre cubage</h3>
                <p className="text-xs text-slate-500">Si vous avez déjà une estimation exacte de votre volume</p>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={state.customVolumeM3}
                  onChange={(e) => handleDirectVolumeChange(Math.max(5, parseInt(e.target.value || '5', 10)))}
                  className="w-32 px-4 py-3 text-xl font-bold text-blue-600 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 text-center"
                />
                <span className="text-lg font-bold text-slate-700 font-display">mètres cubes (m³)</span>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-2">
                {[15, 25, 35, 50].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleDirectVolumeChange(v)}
                    className="p-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 cursor-pointer"
                  >
                    {v} m³
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Real-time Truck Capacity & Crew Deployment */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
                Volume total calculé
              </span>
              <div className="text-3xl font-black text-white font-display tabular-nums mt-1">
                {totalVolumeM3} <span className="text-xl font-medium text-slate-400">m³</span>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              {truckSpecs.badge}
            </div>
          </div>

          {/* Truck Gauge Visual */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Truck className="w-4 h-4 text-blue-400" />
                Flotte 1ST Déménagement
              </span>
              <span className="font-semibold text-slate-200 tabular-nums">
                Capacité : {truckSpecs.fillPercent}%
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${truckSpecs.fillPercent}%` }}
              />
            </div>
          </div>

          {/* Truck and Team Specs */}
          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/80 flex items-start gap-3">
              <div className="p-2 rounded-md bg-blue-600/30 text-blue-400 mt-0.5">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Véhicule mobilisé :</div>
                <div className="text-slate-300 mt-0.5">{truckSpecs.type}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/80 flex items-start gap-3">
              <div className="p-2 rounded-md bg-emerald-600/30 text-emerald-400 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Personnel alloué :</div>
                <div className="text-slate-300 mt-0.5">{truckSpecs.crew}</div>
              </div>
            </div>
          </div>

          {/* Free Technical Visit reminder */}
          <div className="p-3.5 bg-blue-950/60 rounded-lg border border-blue-800/50 text-[11px] text-blue-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Doute sur votre volume ?</strong> 1ST Déménagement réalise une visite technique gratuite (à domicile ou en visio 15 min) pour valider le cubage définitif sans surcoût.
            </span>
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
          <span>Retour adresses</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Choisir ma formule de déménagement</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
