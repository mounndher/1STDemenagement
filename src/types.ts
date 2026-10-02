export type CustomerType = 'particulier' | 'entreprise';

export type HousingType = 'appartement' | 'maison' | 'bureaux';

export type ElevatorType = 'non' | 'oui_petit' | 'oui_standard' | 'monte_charge';

export type PortageDistance = 'moins_10m' | '10_25m' | 'plus_25m';

export type MovingFormula = 'eco' | 'standard' | 'confort' | 'luxe';

export type DateFlexibility = 'exact' | 'flexible_3j' | 'periode_mois';

export interface LocationInfo {
  address: string;
  postalCode: string;
  city: string;
  housingType: HousingType;
  floor: number;
  elevator: ElevatorType;
  portageDistance: PortageDistance;
  lat?: number;
  lng?: number;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'salon' | 'chambre' | 'cuisine' | 'bureau' | 'divers';
  volumeM3: number;
  count: number;
  iconName: string;
}

export interface AddonServices {
  monteMeuble: boolean;
  gardeMeuble: boolean;
  gardeMeubleDurationMonths?: number;
  cartonsPack: boolean;
  cartonsPackType?: 't2' | 't3_t4' | 'maison';
  pianoTransport: boolean;
  pianoType?: 'droit' | 'queue';
  assuranceRenforcee: boolean;
}

export interface ContactInfo {
  civility: 'Mme' | 'M.';
  firstName: string;
  lastName: string;
  companyName?: string;
  phone: string;
  email: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  date: string;
  dateFlexibility: DateFlexibility;
  comments: string;
}

export interface DevisState {
  customerType: CustomerType;
  origin: LocationInfo;
  destination: LocationInfo;
  calculatedDistanceKm: number;
  volumeMethod: 'surface' | 'room_inventory' | 'direct';
  surfaceM2: number;
  customVolumeM3: number;
  inventory: FurnitureItem[];
  selectedFormula: MovingFormula;
  addons: AddonServices;
  contact: ContactInfo;
  technicalVisitRequested: boolean;
  technicalVisitType?: 'domicile' | 'visio';
}

export interface PriceEstimate {
  minPrice: number;
  maxPrice: number;
  estimatedPrice: number;
  distanceKm: number;
  volumeM3: number;
  formulaBaseCost: number;
  addonsCost: number;
  discountPercentage: number;
  breakdown: {
    label: string;
    amount: number;
  }[];
}
