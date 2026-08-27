import { describe, expect, it } from 'vitest';
import {
  calculateDoseRange,
  calculateManualDose,
  formatDoseRange,
  formatMgRange,
  roundToHalf,
  validateWeight,
  MAX_PLAUSIBLE_WEIGHT_KG,
  MIN_PLAUSIBLE_WEIGHT_KG,
  WARN_HIGH_WEIGHT_KG,
  WARN_LOW_WEIGHT_KG,
} from '@/utils/doseMath';
import { drugList } from '@/data/drugData';
import type { Drug } from '@/types/drug';

function getDrug(name: string): Drug {
  const drug = drugList.find((d) => d.name === name);
  if (drug === undefined) {
    throw new Error(`Drug not found in drugList: ${name}`);
  }
  return drug;
}

describe('roundToHalf', () => {
  it('rounds to the nearest 0.5', () => {
    expect(roundToHalf(1.2)).toBe(1);
    expect(roundToHalf(1.3)).toBe(1.5);
    expect(roundToHalf(1.7)).toBe(1.5);
    expect(roundToHalf(1.75)).toBe(2);
    expect(roundToHalf(4.1667)).toBe(4);
    expect(roundToHalf(6.25)).toBe(6.5);
  });

  it('keeps exact half and integer values unchanged', () => {
    expect(roundToHalf(0)).toBe(0);
    expect(roundToHalf(2)).toBe(2);
    expect(roundToHalf(2.5)).toBe(2.5);
  });

  it('handles negative values', () => {
    expect(roundToHalf(-1.3)).toBe(-1.5);
  });
});

describe('calculateDoseRange', () => {
  it('computes ml and mg ranges for Paracetamol (120mg/5ml, 10-15 mg/kg)', () => {
    const result = calculateDoseRange(10, getDrug('Paracetamol'));
    expect(result.totalMinMg).toBe(100);
    expect(result.totalMaxMg).toBe(150);
    expect(result.min).toBe('4.0'); // 100 * 5 / 120 = 4.17 -> 4.0
    expect(result.max).toBe('6.5'); // 150 * 5 / 120 = 6.25 -> 6.5
  });

  it('scales linearly with weight', () => {
    const result = calculateDoseRange(20, getDrug('Paracetamol'));
    expect(result.totalMinMg).toBe(200);
    expect(result.totalMaxMg).toBe(300);
    expect(result.min).toBe('8.5');
    expect(result.max).toBe('12.5');
  });

  it('computes fixed-dose drugs (CPM 0.12 mg/kg)', () => {
    const result = calculateDoseRange(10, getDrug('CPM'));
    expect(result.totalMinMg).toBe(1.2);
    expect(result.totalMaxMg).toBe(1.2);
    expect(result.min).toBe('3.0'); // 1.2 * 5 / 2 = 3.0
    expect(result.max).toBe('3.0');
  });

  it('returns zero ranges for zero weight', () => {
    const result = calculateDoseRange(0, getDrug('Paracetamol'));
    expect(result.totalMinMg).toBe(0);
    expect(result.totalMaxMg).toBe(0);
    expect(result.min).toBe('0.0');
    expect(result.max).toBe('0.0');
  });
});

describe('calculateManualDose', () => {
  it('computes manual dose from custom mg/kg/dose', () => {
    const result = calculateManualDose(10, 15, getDrug('Paracetamol'));
    expect(result.totalMg).toBe(150);
    expect(result.finalMl).toBe('6.5'); // 150 * 5 / 120 = 6.25 -> 6.5
  });

  it('rounds fractional ml to 0.5', () => {
    const result = calculateManualDose(7.5, 10, getDrug('Paracetamol'));
    expect(result.totalMg).toBe(75);
    expect(result.finalMl).toBe('3.0'); // 75 * 5 / 120 = 3.125 -> 3.0
  });
});

describe('formatDoseRange', () => {
  it('formats a range with separator', () => {
    expect(formatDoseRange('4.0', '6.5')).toBe('4.0 - 6.5 ml');
  });

  it('formats a single value without separator', () => {
    expect(formatDoseRange('4.0', '4.0')).toBe('4.0 ml');
  });
});

describe('formatMgRange', () => {
  it('formats a range with separator', () => {
    expect(formatMgRange(100, 150)).toBe('100.0 - 150.0 mg/dose');
  });

  it('formats a single value without separator', () => {
    expect(formatMgRange(150, 150)).toBe('150.0 mg/dose');
  });

  it('keeps one decimal place', () => {
    expect(formatMgRange(12.34, 12.36)).toBe('12.3 - 12.4 mg/dose');
  });
});

describe('plausible weight bounds', () => {
  it('exposes documented research-based thresholds', () => {
    expect(MIN_PLAUSIBLE_WEIGHT_KG).toBe(0.1);
    expect(WARN_LOW_WEIGHT_KG).toBe(1);
    expect(WARN_HIGH_WEIGHT_KG).toBe(100);
    expect(MAX_PLAUSIBLE_WEIGHT_KG).toBe(200);
  });
});

describe('validateWeight', () => {
  it('rejects impossible values with an error', () => {
    const invalidValues = [
      Number.NaN,
      0,
      -0.5,
      0.01,
      0.09,
      200.01,
      350,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ];
    for (const value of invalidValues) {
      const result = validateWeight(value);
      expect(result.status).toBe('error');
      expect(result.message).not.toBeNull();
    }
  });

  it('flags extremely low weights (ELBW) as warnings', () => {
    for (const value of [0.1, 0.5, 0.99]) {
      const result = validateWeight(value);
      expect(result.status).toBe('warning');
      expect(result.message).toContain('ELBW');
    }
  });

  it('flags extremely high weights as warnings', () => {
    for (const value of [100.1, 150, 200]) {
      const result = validateWeight(value);
      expect(result.status).toBe('warning');
      expect(result.message).toContain('น้ำหนัก');
    }
  });

  it('accepts normal pediatric weights silently', () => {
    for (const value of [1, 2.5, 15, 60, 100]) {
      const result = validateWeight(value);
      expect(result.status).toBe('ok');
      expect(result.message).toBeNull();
    }
  });

  it('treats boundaries exactly as documented', () => {
    expect(validateWeight(0.1).status).toBe('warning');
    expect(validateWeight(1).status).toBe('ok');
    expect(validateWeight(100).status).toBe('ok');
    expect(validateWeight(200).status).toBe('warning');
  });
});
