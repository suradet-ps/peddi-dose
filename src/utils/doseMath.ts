import type { Drug } from '@/types/drug';
import type { DoseRangeOutput, ManualDoseOutput } from '@/types/calculation';

export function roundToHalf(num: number): number {
  return Math.round(num * 2) / 2;
}

export function calculateDoseRange(weight: number, drug: Drug): DoseRangeOutput {
  const totalMinMg = weight * drug.minDosePerKg;
  const totalMaxMg = weight * drug.maxDosePerKg;
  const minMl = (totalMinMg * drug.volume) / drug.concentration;
  const maxMl = (totalMaxMg * drug.volume) / drug.concentration;

  return {
    min: roundToHalf(minMl).toFixed(1),
    max: roundToHalf(maxMl).toFixed(1),
    totalMinMg,
    totalMaxMg,
  };
}

export function calculateManualDose(
  weight: number,
  dosePerKg: number,
  drug: Drug,
): ManualDoseOutput {
  const totalMg = weight * dosePerKg;
  const finalMl = (totalMg * drug.volume) / drug.concentration;
  return {
    finalMl: roundToHalf(finalMl).toFixed(1),
    totalMg,
  };
}

export function formatDoseRange(min: string, max: string): string {
  if (parseFloat(min) === parseFloat(max)) return `${min} ml`;
  return `${min} - ${max} ml`;
}

export function formatMgRange(min: number, max: number): string {
  const a = min.toFixed(1);
  const b = max.toFixed(1);
  if (a === b) return `${a} mg/dose`;
  return `${a} - ${b} mg/dose`;
}
