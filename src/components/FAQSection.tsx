import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  onOpenCallback: () => void;
}

const FAQ_ITEMS = [
  {
    q: 'Combien de temps à l\'avance dois-je réserver mon déménagement ?',
    a: 'Nous vous recommandons de réserver entre 2 à 4 semaines à l\'avance, particulièrement pour les fins de mois et la période estivale (juin à septembre). Cependant, grâce à l\'étendue de notre flotte de camions en Île-de-France, nous pouvons également organiser des déménagements urgents sous 48h à 72h selon nos disponibilités.'
  },
  {
    q: 'Comment se déroule la visite technique gratuite (à domicile ou en visio) ?',
    a: 'La visite technique est 100% gratuite et sans aucun engagement. Un conseiller expert de 1ST Déménagement évalue précisément le cubage en m³, inspecte les accès (largeur des portes, cages d\'escalier, ascenseur) et détermine si un monte-meubles est nécessaire. Elle peut se faire sur place chez vous (environ 20 min) ou en visio-conférence via votre smartphone (WhatsApp / FaceTime en 15 min).'
  },
  {
    q: 'Qui se charge de l\'autorisation de stationnement pour le camion ?',
    a: '1ST Déménagement peut prendre en charge l\'ensemble des démarches administratives auprès de la Ville de Paris (ou commissariats/mairies de banlieue et province) afin d\'obtenir l\'arrêté municipal d\'interdiction de stationner et poser les panneaux de réservation 48h avant le déménagement.'
  },
  {
    q: 'Quelle est la couverture de l\'assurance incluse ?',
    a: 'Tous nos déménagements font l\'objet d\'un contrat d\'assurance de responsabilité civile et contractuelle des marchandises transportées (compagnie agréée AXA / Allianz) couvrant vos biens jusqu\'à 80 000 € contre tout dommage matériel durant les phases de manutention et de transport routier.'
  },
  {
    q: 'Mes meubles fragiles et mon électroménager sont-ils protégés ?',
    a: 'Absolument. Selon la formule retenue, nos déménageurs enveloppent systématiquement chaque meuble sous couvertures épaisses matelassées et film étirable. Pour la vaisselle et la verrerie, nous utilisons des croisillons alvéolés spécifiques. Vos matelas et sommiers sont placés sous housses étanches à usage unique.'
  },
  {
    q: 'Quelles sont les modalités de règlement ?',
    a: 'Aucun paiement en ligne n\'est requis lors de votre estimation sur notre site. Une fois le devis contractuel signé après la visite technique, un acompte de 30% est versé pour bloquer définitivement l\'équipe et le camion, le solde étant réglé le jour de la livraison finale par chèque, virement ou carte bancaire.'
  }
];

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenCallback }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Questions Fréquentes
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Tout ce qu'il faut savoir sur votre devis
          </h2>
          <p className="text-sm text-slate-500">
            Des réponses claires pour aborder votre déménagement en totale confiance.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden transition-all bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900">{item.q}</span>
                  <div className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Assistance CTA Card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-sm font-bold text-slate-900">Une question sur votre accès ou mobilier ? Contactez 1ST Déménagement</div>
            <div className="text-xs text-slate-500 mt-0.5">Agence 14 Rue Laugier, 75017 Paris · Ouvre à 09:30 lun. (Lun-Sam 9h30 - 18h30)</div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+33140909304"
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>01 40 90 93 04</span>
            </a>

            <button
              type="button"
              onClick={onOpenCallback}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
            >
              Rappel Gratuit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
