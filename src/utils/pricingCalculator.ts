import { DevisState, PriceEstimate } from '../types';

export function calculateEffectiveVolumeM3(state: DevisState): number {
  if (state.volumeMethod === 'surface') {
    // Standard French ratio: 1 m³ for 2.2 to 2.5 m² of living surface
    return Math.max(5, Math.round(state.surfaceM2 / 2.5));
  } else if (state.volumeMethod === 'direct') {
    return Math.max(5, Math.round(state.customVolumeM3));
  } else {
    // Inventory method
    const sum = state.inventory.reduce((acc, item) => acc + item.count * item.volumeM3, 0);
    // If inventory is empty, fall back to surface estimate
    if (sum <= 0) {
      return Math.max(5, Math.round(state.surfaceM2 / 2.5));
    }
    return Math.max(5, Math.round(sum * 10) / 10);
  }
}

export function computeDevisEstimate(state: DevisState): PriceEstimate {
  const volumeM3 = calculateEffectiveVolumeM3(state);
  const distanceKm = state.calculatedDistanceKm || 25;

  // 1. Base rate per m³ by formula
  const formulaRates: Record<string, number> = {
    eco: 38,
    standard: 52,
    confort: 68,
    luxe: 95
  };
  const baseRatePerM3 = formulaRates[state.selectedFormula] || 52;
  let formulaBaseCost = volumeM3 * baseRatePerM3;

  // Minimum intervention base (team + 20m³ truck deployment)
  const minIntervention = 420;
  if (formulaBaseCost < minIntervention) {
    formulaBaseCost = minIntervention;
  }

  // 2. Distance cost calculation
  let distanceCost = 0;
  if (distanceKm > 30) {
    const extraKm = distanceKm - 30;
    // Longer distances scale with volume/truck payload
    const truckMultiplier = volumeM3 > 30 ? 1.6 : 1.2;
    distanceCost = Math.round(extraKm * truckMultiplier * 1.35);
  }

  // 3. Floor & Accessibility surcharge
  let accessCost = 0;
  // Origin
  if (state.origin.elevator === 'non' && state.origin.floor > 1) {
    accessCost += (state.origin.floor - 1) * 35;
  }
  if (state.origin.portageDistance === 'plus_25m') {
    accessCost += 50;
  }
  // Destination
  if (state.destination.elevator === 'non' && state.destination.floor > 1) {
    accessCost += (state.destination.floor - 1) * 35;
  }
  if (state.destination.portageDistance === 'plus_25m') {
    accessCost += 50;
  }

  // 4. Addons cost
  let addonsCost = 0;
  const breakdown: { label: string; amount: number }[] = [
    { label: `Prestation de base Formule (${volumeM3} m³)`, amount: formulaBaseCost }
  ];

  if (distanceCost > 0) {
    breakdown.push({ label: `Acheminement routier & péages (${distanceKm} km)`, amount: distanceCost });
  }

  if (accessCost > 0) {
    breakdown.push({ label: 'Majoration accès / étages sans ascenseur', amount: accessCost });
  }

  if (state.addons.monteMeuble) {
    const monteMeublePrice = 280;
    addonsCost += monteMeublePrice;
    breakdown.push({ label: 'Location monte-meubles avec technicien', amount: monteMeublePrice });
  }

  if (state.addons.cartonsPack) {
    const cartonsPrice = 65;
    addonsCost += cartonsPrice;
    breakdown.push({ label: 'Kit complet de fournitures (cartons, adhésifs, bulles)', amount: cartonsPrice });
  }

  if (state.addons.gardeMeuble) {
    const months = state.addons.gardeMeubleDurationMonths || 1;
    // caisse 8m3 approx
    const boxesCount = Math.max(1, Math.ceil(volumeM3 / 8));
    const storagePrice = boxesCount * 75 * months;
    addonsCost += storagePrice;
    breakdown.push({ label: `Garde-meubles sécurisé (${boxesCount} caisses × ${months} mois)`, amount: storagePrice });
  }

  if (state.addons.pianoTransport) {
    const pianoCost = state.addons.pianoType === 'queue' ? 450 : 250;
    addonsCost += pianoCost;
    breakdown.push({ label: 'Manutention spécialisée piano avec sangles et patins', amount: pianoCost });
  }

  if (state.addons.assuranceRenforcee) {
    const assuranceCost = 75;
    addonsCost += assuranceCost;
    breakdown.push({ label: 'Garantie sérénité valeur à neuf renforcée', amount: assuranceCost });
  }

  const subtotal = formulaBaseCost + distanceCost + accessCost + addonsCost;

  // 5. Discount based on date flexibility
  let discountPercentage = 0;
  if (state.contact.dateFlexibility === 'flexible_3j') {
    discountPercentage = 8;
  } else if (state.contact.dateFlexibility === 'periode_mois') {
    discountPercentage = 12;
  }

  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  if (discountAmount > 0) {
    breakdown.push({ label: `Remise éco-optimisation tournée (-${discountPercentage}%)`, amount: -discountAmount });
  }

  const estimatedPrice = Math.round(subtotal - discountAmount);
  // Realistic estimate range
  const minPrice = Math.round(estimatedPrice * 0.92);
  const maxPrice = Math.round(estimatedPrice * 1.08);

  return {
    minPrice,
    maxPrice,
    estimatedPrice,
    distanceKm,
    volumeM3,
    formulaBaseCost,
    addonsCost,
    discountPercentage,
    breakdown
  };
}
