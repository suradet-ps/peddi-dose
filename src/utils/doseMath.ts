import type { Drug } from '@/types/drug';
import type {
  DoseRangeOutput,
  ManualDoseOutput,
  WeightValidationResult,
} from '@/types/calculation';

/**
 * Plausible pediatric weight bounds (kg).
 * Based on: WHO LBW/VLBW/ELBW definitions, 22-week viability threshold
 * (~0.45-0.57 kg mean birth weight), CDC growth charts 2-20y
 * (97th percentile ~125 kg boys / ~104 kg girls at 20y), and documented
 * severe adolescent obesity up to ~177 kg.
 */
export const MIN_PLAUSIBLE_WEIGHT_KG = 0.1;
export const MAX_PLAUSIBLE_WEIGHT_KG = 200;
export const WARN_LOW_WEIGHT_KG = 1;
export const WARN_HIGH_WEIGHT_KG = 100;

const WEIGHT_ERROR_MESSAGE = 'น้ำหนักไม่สมเหตุสมผล โปรดตรวจสอบ (ช่วงที่ยอมรับ: 0.1-200 กก.)';
const WEIGHT_WARN_LOW_MESSAGE =
  'น้ำหนักน้อยกว่า 1 กก. - พบได้เฉพาะทารกคลอดก่อนกำหนดมาก (ELBW) โปรดยืนยันน้ำหนักอีกครั้ง';
const WEIGHT_WARN_HIGH_MESSAGE =
  'น้ำหนักมากกว่า 100 กก. - เกินช่วงปกติของเด็กส่วนใหญ่ โปรดยืนยันน้ำหนักอีกครั้ง';

export function validateWeight(weight: number): WeightValidationResult {
  if (
    !Number.isFinite(weight) ||
    weight < MIN_PLAUSIBLE_WEIGHT_KG ||
    weight > MAX_PLAUSIBLE_WEIGHT_KG
  ) {
    return { status: 'error', message: WEIGHT_ERROR_MESSAGE };
  }
  if (weight < WARN_LOW_WEIGHT_KG) {
    return { status: 'warning', message: WEIGHT_WARN_LOW_MESSAGE };
  }
  if (weight > WARN_HIGH_WEIGHT_KG) {
    return { status: 'warning', message: WEIGHT_WARN_HIGH_MESSAGE };
  }
  return { status: 'ok', message: null };
}

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
