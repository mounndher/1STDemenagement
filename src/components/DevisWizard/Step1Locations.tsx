import React, { useState } from 'react';
import { DevisState, LocationInfo, HousingType, ElevatorType, PortageDistance } from '../../types';
import { searchCities, FrenchCity, calculateEstimatedDistanceKm } from '../../utils/frenchCities';
import { MapPin, Navigation, Building2, Home, Building, ArrowRight, Info, Check } from 'lucide-react';

interface Step1LocationsProps {
  state: DevisState;
  onChange: (updated: Partial<DevisState>) => void;
  onNext: () => void;
}

export const Step1Locations: React.FC<Step1LocationsProps> = ({
  state,
  onChange,
  onNext
}) => {
  const [originQuery, setOriginQuery] = useState(state.origin.city || '');
  const [destQuery, setDestQuery] = useState(state.destination.city || '');
  const [originSuggestions, setOriginSuggestions] = useState<FrenchCity[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<FrenchCity[]>([]);

  const handleOriginQueryChange = (val: string) => {
    setOriginQuery(val);
    setOriginSuggestions(searchCities(val));
    updateOriginField('city', val);
  };

  const handleSelectOriginCity = (city: FrenchCity) => {
    setOriginQuery(`${city.name} (${city.postalCode})`);
    setOriginSuggestions([]);
    const updatedOrigin: LocationInfo = {
      ...state.origin,
      city: city.name,
      postalCode: city.postalCode,
      lat: city.lat,
      lng: city.lng
    };
    const newDist = calculateEstimatedDistanceKm(city.lat, city.lng, state.destination.lat, state.destination.lng);
    onChange({ origin: updatedOrigin, calculatedDistanceKm: newDist });
  };

  const handleDestQueryChange = (val: string) => {
    setDestQuery(val);
    setDestSuggestions(searchCities(val));
    updateDestinationField('city', val);
  };

  const handleSelectDestCity = (city: FrenchCity) => {
    setDestQuery(`${city.name} (${city.postalCode})`);
    setDestSuggestions([]);
    const updatedDest: LocationInfo = {
      ...state.destination,
      city: city.name,
      postalCode: city.postalCode,
      lat: city.lat,
      lng: city.lng
    };
    const newDist = calculateEstimatedDistanceKm(state.origin.lat, state.origin.lng, city.lat, city.lng);
    onChange({ destination: updatedDest, calculatedDistanceKm: newDist });
  };

  const updateOriginField = <K extends keyof LocationInfo>(field: K, value: LocationInfo[K]) => {
    onChange({
      origin: {
        ...state.origin,
        [field]: value
      }
    });
  };

  const updateDestinationField = <K extends keyof LocationInfo>(field: K, value: LocationInfo[K]) => {
    onChange({
      destination: {
        ...state.destination,
        [field]: value
      }
    });
  };

  const isValid = state.origin.city.trim().length > 1 && state.destination.city.trim().length > 1;

  const isLongDistance = state.calculatedDistanceKm > 80;

  return (
    <div className="space-y-8">
      {/* Editorial Step Intro */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          01. Lieux de départ et d'arrivée
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Renseignez vos adresses et conditions d'accès pour que nous puissions évaluer la distance et les besoins en manutention.
        </p>
      </div>

      {/* Grid: Origin vs Destination */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ORIGIN CARD */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Adresse de DÉPART</h3>
              <p className="text-xs text-slate-500">Logement actuel à déménager</p>
            </div>
          </div>

          {/* City / Postal Code with Auto-suggest */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Ville ou Code Postal <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={originQuery}
                onChange={(e) => handleOriginQueryChange(e.target.value)}
                placeholder="Ex: Paris 75011, Saint-Denis, Versailles..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>

            {/* Suggestions list */}
            {originSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 overflow-hidden divide-y divide-slate-100">
                {originSuggestions.map((c) => (
                  <button
                    key={`${c.name}-${c.postalCode}`}
                    type="button"
                    onClick={() => handleSelectOriginCity(c)}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-blue-50 transition-colors flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-800">{c.name} ({c.postalCode})</span>
                    <span className="text-[11px] text-slate-400">Dép. {c.department}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Rue & Numéro (facultatif à ce stade)
            </label>
            <input
              type="text"
              value={state.origin.address}
              onChange={(e) => updateOriginField('address', e.target.value)}
              placeholder="Ex: 14 rue de la République"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          {/* Housing Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Type de logement
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'appartement', label: 'Appartement', icon: Building2 },
                { id: 'maison', label: 'Maison / Pavillon', icon: Home },
                { id: 'bureaux', label: 'Bureaux / Locaux', icon: Building }
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = state.origin.housingType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => updateOriginField('housingType', t.id as HousingType)}
                    className={`p-2.5 rounded-lg border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="text-xs font-medium text-center">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floor & Elevator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Étage
              </label>
              <select
                value={state.origin.floor}
                onChange={(e) => updateOriginField('floor', parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              >
                <option value={0}>Rez-de-chaussée (RDC)</option>
                <option value={1}>1er étage</option>
                <option value={2}>2ème étage</option>
                <option value={3}>3ème étage</option>
                <option value={4}>4ème étage</option>
                <option value={5}>5ème étage</option>
                <option value={6}>6ème étage ou plus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ascenseur
              </label>
              <select
                value={state.origin.elevator}
                onChange={(e) => updateOriginField('elevator', e.target.value as ElevatorType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              >
                <option value="non">Non / Pas d'ascenseur</option>
                <option value="oui_petit">Oui, petit ascenseur</option>
                <option value="oui_standard">Oui, ascenseur standard (meubles)</option>
                <option value="monte_charge">Monte-charge immeuble</option>
              </select>
            </div>
          </div>

          {/* Portage Distance */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Distance de stationnement camion
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'moins_10m', label: '< 10 m (Facile)' },
                { id: '10_25m', label: '10 à 25 m' },
                { id: 'plus_25m', label: '> 25 m (Cour/Allée)' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => updateOriginField('portageDistance', p.id as PortageDistance)}
                  className={`p-2 rounded-lg border text-center text-xs font-medium transition-all cursor-pointer ${
                    state.origin.portageDistance === p.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DESTINATION CARD */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              B
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Adresse d'ARRIVÉE</h3>
              <p className="text-xs text-slate-500">Nouveau logement où emménager</p>
            </div>
          </div>

          {/* City / Postal Code with Auto-suggest */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Ville ou Code Postal <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={destQuery}
                onChange={(e) => handleDestQueryChange(e.target.value)}
                placeholder="Ex: Lyon, Marseille, Bordeaux, Lille, Nantes..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>

            {/* Suggestions list */}
            {destSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 overflow-hidden divide-y divide-slate-100">
                {destSuggestions.map((c) => (
                  <button
                    key={`${c.name}-${c.postalCode}`}
                    type="button"
                    onClick={() => handleSelectDestCity(c)}
                    className="w-full text-left px-3.5 py-2 text-xs hover:bg-emerald-50 transition-colors flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-800">{c.name} ({c.postalCode})</span>
                    <span className="text-[11px] text-slate-400">Dép. {c.department}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Rue & Numéro (facultatif si non encore fixé)
            </label>
            <input
              type="text"
              value={state.destination.address}
              onChange={(e) => updateDestinationField('address', e.target.value)}
              placeholder="Ex: 8 avenue des Fleurs"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          {/* Housing Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Type de logement d'arrivée
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'appartement', label: 'Appartement', icon: Building2 },
                { id: 'maison', label: 'Maison / Pavillon', icon: Home },
                { id: 'bureaux', label: 'Bureaux / Locaux', icon: Building }
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = state.destination.housingType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => updateDestinationField('housingType', t.id as HousingType)}
                    className={`p-2.5 rounded-lg border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <span className="text-xs font-medium text-center">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floor & Elevator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Étage d'arrivée
              </label>
              <select
                value={state.destination.floor}
                onChange={(e) => updateDestinationField('floor', parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              >
                <option value={0}>Rez-de-chaussée (RDC)</option>
                <option value={1}>1er étage</option>
                <option value={2}>2ème étage</option>
                <option value={3}>3ème étage</option>
                <option value={4}>4ème étage</option>
                <option value={5}>5ème étage</option>
                <option value={6}>6ème étage ou plus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ascenseur d'arrivée
              </label>
              <select
                value={state.destination.elevator}
                onChange={(e) => updateDestinationField('elevator', e.target.value as ElevatorType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              >
                <option value="non">Non / Pas d'ascenseur</option>
                <option value="oui_petit">Oui, petit ascenseur</option>
                <option value="oui_standard">Oui, ascenseur standard</option>
                <option value="monte_charge">Monte-charge immeuble</option>
              </select>
            </div>
          </div>

          {/* Portage Distance */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Distance de stationnement camion
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'moins_10m', label: '< 10 m (Facile)' },
                { id: '10_25m', label: '10 à 25 m' },
                { id: 'plus_25m', label: '> 25 m (Cour/Allée)' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => updateDestinationField('portageDistance', p.id as PortageDistance)}
                  className={`p-2 rounded-lg border text-center text-xs font-medium transition-all cursor-pointer ${
                    state.destination.portageDistance === p.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calculated Route Distance Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Itinéraire calculé en temps réel</div>
            <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{state.origin.city || 'Départ non saisi'}</span>
              <span>→</span>
              <span>{state.destination.city || 'Arrivée non saisie'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:border-l sm:border-slate-700 sm:pl-6">
          <div>
            <div className="text-xs text-slate-400">Distance routière estimée</div>
            <div className="text-lg font-extrabold text-blue-400 tabular-nums">
              ~{state.calculatedDistanceKm} km
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            {isLongDistance ? 'Trajet National / Longue distance' : 'Déménagement Local / Île-de-France'}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-blue-600" />
          <span>Une autorisation de stationnement peut être gérée par nos équipes auprès de la mairie.</span>
        </div>

        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className="px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Continuer vers le calcul du volume</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
