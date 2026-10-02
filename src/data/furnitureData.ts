import { FurnitureItem } from '../types';

export const INITIAL_FURNITURE_ITEMS: FurnitureItem[] = [
  // Salon / Séjour
  { id: 'canape_3p', name: 'Canapé 3 places', category: 'salon', volumeM3: 2.5, count: 0, iconName: 'Armchair' },
  { id: 'canape_angle', name: 'Canapé d\'angle', category: 'salon', volumeM3: 3.5, count: 0, iconName: 'Sofa' },
  { id: 'fauteuil', name: 'Fauteuil', category: 'salon', volumeM3: 0.8, count: 0, iconName: 'Armchair' },
  { id: 'table_basse', name: 'Table basse', category: 'salon', volumeM3: 0.4, count: 0, iconName: 'Table' },
  { id: 'meuble_tv', name: 'Meuble TV & Télévision', category: 'salon', volumeM3: 1.0, count: 0, iconName: 'Tv' },
  { id: 'buffet', name: 'Buffet / Enfilade', category: 'salon', volumeM3: 2.0, count: 0, iconName: 'Layers' },
  { id: 'table_chaises', name: 'Table à manger + 4 chaises', category: 'salon', volumeM3: 1.8, count: 0, iconName: 'Utensils' },
  { id: 'bibliotheque', name: 'Grande bibliothèque', category: 'salon', volumeM3: 2.0, count: 0, iconName: 'BookOpen' },

  // Chambre
  { id: 'lit_double', name: 'Lit double (140/160 cm) + matelas', category: 'chambre', volumeM3: 2.2, count: 0, iconName: 'Bed' },
  { id: 'lit_simple', name: 'Lit simple (90 cm)', category: 'chambre', volumeM3: 1.2, count: 0, iconName: 'Bed' },
  { id: 'armoire_2p', name: 'Armoire 2 portes', category: 'chambre', volumeM3: 2.5, count: 0, iconName: 'DoorClosed' },
  { id: 'commode', name: 'Commode 3-4 tiroirs', category: 'chambre', volumeM3: 1.0, count: 0, iconName: 'Archive' },
  { id: 'chevet', name: 'Table de chevet', category: 'chambre', volumeM3: 0.2, count: 0, iconName: 'Square' },
  { id: 'dressing', name: 'Grand dressing penderie', category: 'chambre', volumeM3: 3.5, count: 0, iconName: 'FolderCheck' },

  // Cuisine & Électroménager
  { id: 'refrigerateur', name: 'Réfrigérateur standard', category: 'cuisine', volumeM3: 1.0, count: 0, iconName: 'Refrigerator' },
  { id: 'frigo_americain', name: 'Réfrigérateur américain', category: 'cuisine', volumeM3: 2.2, count: 0, iconName: 'Refrigerator' },
  { id: 'lave_linge', name: 'Lave-linge / Sèche-linge', category: 'cuisine', volumeM3: 0.6, count: 0, iconName: 'WashingMachine' },
  { id: 'lave_vaisselle', name: 'Lave-vaisselle', category: 'cuisine', volumeM3: 0.6, count: 0, iconName: 'Disc' },
  { id: 'cuisiniere', name: 'Cuisinière / Four', category: 'cuisine', volumeM3: 0.6, count: 0, iconName: 'Flame' },
  { id: 'micro_ondes', name: 'Four micro-ondes / Petit électro', category: 'cuisine', volumeM3: 0.2, count: 0, iconName: 'Zap' },

  // Bureau
  { id: 'grand_bureau', name: 'Bureau de travail', category: 'bureau', volumeM3: 1.2, count: 0, iconName: 'Laptop' },
  { id: 'fauteuil_bureau', name: 'Siège de bureau ergonomique', category: 'bureau', volumeM3: 0.4, count: 0, iconName: 'Armchair' },
  { id: 'meuble_classement', name: 'Caisson / Armoire à rideaux', category: 'bureau', volumeM3: 0.8, count: 0, iconName: 'Folder' },

  // Cartons & Divers
  { id: 'cartons_standard', name: 'Pack 10 cartons standard', category: 'divers', volumeM3: 1.0, count: 0, iconName: 'Package' },
  { id: 'cartons_livres', name: 'Pack 10 cartons livres / lourds', category: 'divers', volumeM3: 0.6, count: 0, iconName: 'PackageCheck' },
  { id: 'velo', name: 'Vélo / Trottinette', category: 'divers', volumeM3: 0.5, count: 0, iconName: 'Bike' },
  { id: 'miroir_tableau', name: 'Grand miroir / Tableau', category: 'divers', volumeM3: 0.3, count: 0, iconName: 'Image' },
  { id: 'valise', name: 'Grande valise / Malle', category: 'divers', volumeM3: 0.3, count: 0, iconName: 'Briefcase' }
];

export const FORMULAS_DETAILS = {
  eco: {
    id: 'eco' as const,
    name: 'Formule Économique',
    subtitle: 'L\'essentiel au meilleur tarif',
    badge: 'Petit Budget',
    features: [
      { text: 'Mise à disposition du camion capitonné & chauffeur', included: true },
      { text: 'Chargement, arrimage sécurisé & déchargement', included: true },
      { text: 'Protection du mobilier sous couvertures & housses', included: true },
      { text: 'Assurance transport de base incluse', included: true },
      { text: 'Démontage & remontage des meubles', included: false },
      { text: 'Emballage des objets fragiles (vaisselle, miroirs)', included: false },
      { text: 'Emballage des vêtements sous penderies portables', included: false },
      { text: 'Déballage & réinstallation complète', included: false }
    ],
    bestFor: 'Idéal si vous préférez préparer vos cartons et démonter vos meubles vous-même pour réduire la facture.'
  },
  standard: {
    id: 'standard' as const,
    name: 'Formule Standard',
    subtitle: 'Le compromis parfait équilibre & sérénité',
    badge: 'La Plus Choisie',
    features: [
      { text: 'Mise à disposition du camion capitonné & équipe de déménageurs', included: true },
      { text: 'Chargement, transport & déchargement soigné', included: true },
      { text: 'Protection complète du mobilier sous housses épaisses', included: true },
      { text: 'Démontage et remontage des meubles volumineux', included: true },
      { text: 'Emballage & calage par nos soins des objets fragiles', included: true },
      { text: 'Mise sur penderies portables des vêtements sur cintres', included: true },
      { text: 'Assurance contractuelle Tous Risques jusqu\'à 80 000 €', included: true },
      { text: 'Emballage complet du non-fragile (livres, linge)', included: false }
    ],
    bestFor: 'Recommandée pour 85% des déménagements de famille et appartements complets.'
  },
  confort: {
    id: 'confort' as const,
    name: 'Formule Confort',
    subtitle: 'Zéro stress, nos équipes s\'occupent de tout emballer',
    badge: 'Clé en Main',
    features: [
      { text: 'Prise en charge intégrale de l\'emballage (fragile ET non-fragile)', included: true },
      { text: 'Fourniture offerte de tous les cartons, adhésifs et papier bulle', included: true },
      { text: 'Démontage méticuleux et remontage de tout le mobilier', included: true },
      { text: 'Protection de la literie sous housses neuves stériles', included: true },
      { text: 'Manutention, chargement, transport et livraison', included: true },
      { text: 'Déballage intégral de toute la vaisselle et du fragile', included: true },
      { text: 'Remise en place des meubles selon votre plan', included: true },
      { text: 'Assurance Tous Risques renforcée avec certificat', included: true }
    ],
    bestFor: 'Idéal si vous manquez de temps ou déménagez avec des enfants en bas âge.'
  },
  luxe: {
    id: 'luxe' as const,
    name: 'Formule Prestige / Luxe',
    subtitle: 'Service VIP haut de gamme sans le moindre effort',
    badge: 'Service VIP',
    features: [
      { text: 'Tout ce qui est inclus dans la formule Confort', included: true },
      { text: 'Déballage complet de 100% de vos cartons (livres, linge, etc.)', included: true },
      { text: 'Rangement dans les placards et dressings par nos équipes', included: true },
      { text: 'Décrochage & raccrochage tringles, tableaux et luminaires', included: true },
      { text: 'Nettoyage sommaire de sortie du logement quitté', included: true },
      { text: 'Chef de projet dédié & suivi prioritaire en temps réel', included: true },
      { text: 'Enlèvement de tous les déchets et emballages usagés', included: true },
      { text: 'Assurance Tous Risques valeur à neuf 150 000 €', included: true }
    ],
    bestFor: 'Pour un déménagement sans compromis, emménagez directement dans un logement prêt à vivre.'
  }
};
