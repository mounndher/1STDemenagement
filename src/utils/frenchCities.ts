export interface FrenchCity {
  name: string;
  postalCode: string;
  department: string;
  lat: number;
  lng: number;
}

export const POPULAR_FRENCH_CITIES: FrenchCity[] = [
  // Île-de-France (1ST Déménagement headquarters & regional coverage)
  { name: 'Paris 17e', postalCode: '75017', department: '75', lat: 48.8842, lng: 2.3015 },
  { name: 'Paris', postalCode: '75001', department: '75', lat: 48.8566, lng: 2.3522 },
  { name: 'Paris 11e', postalCode: '75011', department: '75', lat: 48.8592, lng: 2.3783 },
  { name: 'Paris 15e', postalCode: '75015', department: '75', lat: 48.8412, lng: 2.2998 },
  { name: 'Paris 16e', postalCode: '75016', department: '75', lat: 48.8606, lng: 2.2748 },
  { name: 'Neuilly-sur-Seine', postalCode: '92200', department: '92', lat: 48.8847, lng: 2.2694 },
  { name: 'Levallois-Perret', postalCode: '92300', department: '92', lat: 48.8932, lng: 2.2878 },
  { name: 'Clichy', postalCode: '92110', department: '92', lat: 48.9044, lng: 2.3061 },
  { name: 'Saint-Denis', postalCode: '93200', department: '93', lat: 48.9362, lng: 2.3574 },
  { name: 'Montreuil', postalCode: '93100', department: '93', lat: 48.8638, lng: 2.4484 },
  { name: 'Boulogne-Billancourt', postalCode: '92100', department: '92', lat: 48.8397, lng: 2.2399 },
  { name: 'Nanterre', postalCode: '92000', department: '92', lat: 48.8924, lng: 2.2071 },
  { name: 'Créteil', postalCode: '94000', department: '94', lat: 48.7904, lng: 2.4556 },
  { name: 'Versailles', postalCode: '78000', department: '78', lat: 48.8049, lng: 2.1204 },
  { name: 'Argenteuil', postalCode: '95100', department: '95', lat: 48.9478, lng: 2.2475 },
  { name: 'Évry-Courcouronnes', postalCode: '91000', department: '91', lat: 48.6298, lng: 2.4418 },
  { name: 'Cergy', postalCode: '95000', department: '95', lat: 49.0389, lng: 2.0779 },
  { name: 'Meaux', postalCode: '77100', department: '77', lat: 48.9599, lng: 2.8883 },

  // Grandes métropoles nationales
  { name: 'Lyon', postalCode: '69001', department: '69', lat: 45.7640, lng: 4.8357 },
  { name: 'Marseille', postalCode: '13001', department: '13', lat: 43.2965, lng: 5.3698 },
  { name: 'Toulouse', postalCode: '31000', department: '31', lat: 43.6047, lng: 1.4442 },
  { name: 'Nice', postalCode: '06000', department: '06', lat: 43.7102, lng: 7.2620 },
  { name: 'Nantes', postalCode: '44000', department: '44', lat: 47.2184, lng: -1.5536 },
  { name: 'Strasbourg', postalCode: '67000', department: '67', lat: 48.5734, lng: 7.7521 },
  { name: 'Montpellier', postalCode: '34000', department: '34', lat: 43.6108, lng: 3.8767 },
  { name: 'Bordeaux', postalCode: '33000', department: '33', lat: 44.8378, lng: -0.5792 },
  { name: 'Lille', postalCode: '59000', department: '59', lat: 50.6292, lng: 3.0573 },
  { name: 'Rennes', postalCode: '35000', department: '35', lat: 48.1173, lng: -1.6778 },
  { name: 'Reims', postalCode: '51100', department: '51', lat: 49.2583, lng: 4.0317 },
  { name: 'Toulon', postalCode: '83000', department: '83', lat: 43.1242, lng: 5.9280 },
  { name: 'Saint-Étienne', postalCode: '42000', department: '42', lat: 45.4397, lng: 4.3872 },
  { name: 'Le Havre', postalCode: '76600', department: '76', lat: 49.4944, lng: 0.1079 },
  { name: 'Grenoble', postalCode: '38000', department: '38', lat: 45.1885, lng: 5.7245 },
  { name: 'Dijon', postalCode: '21000', department: '21', lat: 47.3220, lng: 5.0415 },
  { name: 'Angers', postalCode: '49000', department: '49', lat: 47.4784, lng: -0.5632 },
  { name: 'Villeurbanne', postalCode: '69100', department: '69', lat: 45.7667, lng: 4.8833 },
  { name: 'Nîmes', postalCode: '30000', department: '30', lat: 43.8367, lng: 4.3601 },
  { name: 'Clermont-Ferrand', postalCode: '63000', department: '63', lat: 45.7772, lng: 3.0870 },
  { name: 'Aix-en-Provence', postalCode: '13100', department: '13', lat: 43.5297, lng: 5.4474 },
  { name: 'Brest', postalCode: '29200', department: '29', lat: 48.3904, lng: -4.4861 },
  { name: 'Tours', postalCode: '37000', department: '37', lat: 47.3941, lng: 0.6848 },
  { name: 'Amiens', postalCode: '80000', department: '80', lat: 49.8941, lng: 2.2958 },
  { name: 'Limoges', postalCode: '87000', department: '87', lat: 45.8336, lng: 1.2611 },
  { name: 'Annecy', postalCode: '74000', department: '74', lat: 45.8992, lng: 6.1294 },
  { name: 'Perpignan', postalCode: '66000', department: '66', lat: 42.6887, lng: 2.8948 },
  { name: 'Besançon', postalCode: '25000', department: '25', lat: 47.2378, lng: 6.0241 },
  { name: 'Metz', postalCode: '57000', department: '57', lat: 49.1193, lng: 6.1757 },
  { name: 'Orléans', postalCode: '45000', department: '45', lat: 47.9029, lng: 1.9093 },
  { name: 'Rouen', postalCode: '76000', department: '76', lat: 49.4432, lng: 1.0999 },
  { name: 'Mulhouse', postalCode: '68100', department: '68', lat: 47.7508, lng: 7.3359 },
  { name: 'Caen', postalCode: '14000', department: '14', lat: 49.1829, lng: -0.3707 },
  { name: 'Nancy', postalCode: '54000', department: '54', lat: 48.6921, lng: 6.1844 },
  { name: 'Avignon', postalCode: '84000', department: '84', lat: 43.9493, lng: 4.8055 },
  { name: 'Poitiers', postalCode: '86000', department: '86', lat: 46.5802, lng: 0.3404 }
];

export function searchCities(query: string): FrenchCity[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  return POPULAR_FRENCH_CITIES.filter(
    c => c.name.toLowerCase().includes(q) || c.postalCode.startsWith(q)
  ).slice(0, 6);
}

// Calculate road distance estimate using Haversine * 1.28 road winding factor
export function calculateEstimatedDistanceKm(
  lat1?: number,
  lon1?: number,
  lat2?: number,
  lon2?: number
): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return 25; // Default local moving distance (IDF)
  }

  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const birdFlyKm = R * c;

  if (birdFlyKm < 3) return 10;
  // Road distance factor in France is typically ~1.25x to 1.30x the straight-line distance
  return Math.round(birdFlyKm * 1.28);
}
