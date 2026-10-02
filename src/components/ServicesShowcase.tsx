import React from 'react';
import monteMeubleImg from '../assets/images/moving_monte_meuble_service_1790982205895.jpg';
import packingImg from '../assets/images/moving_packing_protection_1790982216206.jpg';
import { ArrowUpRight, ShieldCheck, Truck, Warehouse, PackageCheck, CheckCircle } from 'lucide-react';

interface ServicesShowcaseProps {
  onSelectMonteMeuble: () => void;
  onScrollToDevis: () => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({
  onSelectMonteMeuble,
  onScrollToDevis
}) => {
  return (
    <section id="equipements" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Moyens Techniques & Logistique
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-display">
              Des Équipements Professionnels pour Chaque Défi
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Que vous habitiez un 6e étage sans ascenseur ou ayez besoin de stocker vos meubles pendant des travaux, nous disposons de l'ensemble des moyens matériels certifiés.
            </p>
          </div>

          <button
            type="button"
            onClick={onScrollToDevis}
            className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shrink-0 self-start md:self-auto cursor-pointer"
          >
            Obtenir mon estimation personnalisée
          </button>
        </div>

        {/* Bento Grid: 2 Marquee cards + 2 secondary feature cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Monte-Meubles */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={monteMeubleImg}
                alt="Monte-meubles 1ST Déménagement en opération sur façade d'immeuble"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Jusqu'au 10ème étage (33 mètres)
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Location de Monte-Meubles avec Technicien Opérateur
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Indispensable pour les passages étroits, escaliers parisiens en colimaçon, charges jusqu'à 400 kg (canapés non démontables, pianos, marbre). Réduit le temps de chargement de 50%.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Opérateur qualifié inclus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Sécurisation de la voirie</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Disponible à la 1/2 journée</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Conforme normes CE</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-bold text-blue-600">Dès 280 € TTC</span>
                <button
                  type="button"
                  onClick={onSelectMonteMeuble}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>Ajouter au devis</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Emballages & Protection Renforcée */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={packingImg}
                alt="Emballage méticuleux de mobilier et cartons renforcés 1ST Déménagement"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Matériel Haute Protection
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Emballages Spécialisés & Fournitures Professionnelles
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Cartons double cannelure, croisillons verres et bouteilles, housses matelas hermétiques et couvertures molletonnées de protection pour zéro rayure.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Cartons standard & livres</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Valises penderies sur cintres</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Adhésif silencieux & bulles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Livraison à domicile sous 48h</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-bold text-emerald-600">Inclus en formule Standard & Confort</span>
                <button
                  type="button"
                  onClick={onScrollToDevis}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>Configurer mes options</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Card 3: Garde-Meubles */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Warehouse className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Garde-Meubles Sécurisé Île-de-France</h4>
                <p className="text-xs text-slate-500">Stockage temporaire ou longue durée</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vos biens sont entreposés dans des caisses en bois ventilées de 8 m³ ou 12 m³, scellées et plombées sous votre contrôle. Entrepôt sécurisé avec télésurveillance 24/7, hygrométrie contrôlée et détection incendie.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-900">Dès 75 € TTC / mois</span>
              <span className="text-slate-500">Sans durée minimale</span>
            </div>
          </div>

          {/* Secondary Card 4: Entreprises & Transferts de Bureaux */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Transferts d'Entreprises & Bureaux</h4>
                <p className="text-xs text-slate-500">Continuité d'activité garantie</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Déménagement de parcs informatiques, archives confidentielles, mobilier de bureau en soirée ou week-end pour éviter tout temps d'arrêt. Chef de projet dédié et inventaire codifié par poste de travail.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-blue-600">Devis entreprise sous 24h</span>
              <span className="text-slate-500">Visite technique préalable obligatoire</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
