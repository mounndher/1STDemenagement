import React from 'react';
import { DevisState, ContactInfo, DateFlexibility } from '../../types';
import { Calendar, Phone, Mail, User, Building, MessageSquare, ArrowRight, ArrowLeft, ShieldCheck, Tag } from 'lucide-react';

interface Step4ContactDateProps {
  state: DevisState;
  onChange: (updated: Partial<DevisState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step4ContactDate: React.FC<Step4ContactDateProps> = ({
  state,
  onChange,
  onNext,
  onPrev
}) => {
  const updateContact = <K extends keyof ContactInfo>(field: K, value: ContactInfo[K]) => {
    onChange({
      contact: {
        ...state.contact,
        [field]: value
      }
    });
  };

  const isFormValid =
    state.contact.firstName.trim().length > 1 &&
    state.contact.lastName.trim().length > 1 &&
    state.contact.phone.trim().length >= 9 &&
    state.contact.email.includes('@');

  return (
    <div className="space-y-8">
      {/* Editorial Intro */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          04. Date souhaitée & coordonnées
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Indiquez votre période de déménagement et vos informations pour recevoir votre devis officiel chiffré.
        </p>
      </div>

      {/* Date & Flexibility Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Date prévisionnelle du déménagement</h3>
            <p className="text-xs text-slate-500">Choisissez votre jour ou une période pour bénéficier d'une remise</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Date souhaitée <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={state.contact.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => updateContact('date', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          {/* Flexibility Options with Eco Discount */}
          <div className="md:col-span-7 space-y-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Flexibilité du calendrier (Remise éco-optimisation) :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'exact', label: 'Date fixe précise', discount: null },
                { id: 'flexible_3j', label: '+/- 3 jours', discount: '-8% remise' },
                { id: 'periode_mois', label: 'Dans le mois', discount: '-12% remise' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => updateContact('dateFlexibility', f.id as DateFlexibility)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    state.contact.dateFlexibility === f.id
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold">{f.label}</div>
                  {f.discount && (
                    <div className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {f.discount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Contact Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Vos Coordonnées</h3>
            <p className="text-xs text-slate-500">Pour vous adresser la synthèse tarifaire et fixer votre visite technique</p>
          </div>
        </div>

        {/* Civility and Company (if entreprise) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Civilité</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Mme', 'M.'] as const).map((civ) => (
                <button
                  key={civ}
                  type="button"
                  onClick={() => updateContact('civility', civ)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                    state.contact.civility === civ
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {civ}
                </button>
              ))}
            </div>
          </div>

          {state.customerType === 'entreprise' && (
            <div className="sm:col-span-9">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nom de l'entreprise ou raison sociale <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={state.contact.companyName || ''}
                  onChange={(e) => updateContact('companyName', e.target.value)}
                  placeholder="Ex: SAS Martin & Associés"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
                <Building className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* First & Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={state.contact.firstName}
              onChange={(e) => updateContact('firstName', e.target.value)}
              placeholder="Ex: Thomas"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nom de famille <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={state.contact.lastName}
              onChange={(e) => updateContact('lastName', e.target.value)}
              placeholder="Ex: Dubois"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Téléphone mobile <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={state.contact.phone}
                onChange={(e) => updateContact('phone', e.target.value)}
                placeholder="Ex: 06 12 34 56 78"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white tabular-nums"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Pour confirmation par SMS et validation technique
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Adresse e-mail <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={state.contact.email}
                onChange={(e) => updateContact('email', e.target.value)}
                placeholder="Ex: thomas.dubois@gmail.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Le devis officiel PDF vous sera transmis sur cet email
            </span>
          </div>
        </div>

        {/* Remarks / Comments */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Précisions ou remarques particulières (facultatif)
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={state.contact.comments}
              onChange={(e) => updateContact('comments', e.target.value)}
              placeholder="Ex: Porte d'entrée étroite, stationnement payant, canapé difficile à faire passer, besoin de cartons supplémentaires..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
            <MessageSquare className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* RGPD trust badge */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Données 100% confidentielles, exclusivement traitées par 1ST Déménagement (14 Rue Laugier, 75017 Paris). Zéro démarchage intempestif.
          </span>
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
          <span>Retour formule</span>
        </button>

        <button
          type="button"
          disabled={!isFormValid}
          onClick={onNext}
          className="px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Calculer mon devis immédiat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
