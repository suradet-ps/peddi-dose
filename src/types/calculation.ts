export type CalculationMode = 'auto' | 'manual';

export interface AutoDoseResult {
  mode: 'auto';
  min: string;
  max: string;
  totalMinMg: number;
  totalMaxMg: number;
  notes: string;
}

export interface ManualDoseResult {
  mode: 'manual';
  finalMl: string;
  totalMg: string;
  notes: string;
}

export type DoseResult = AutoDoseResult | ManualDoseResult;

export interface DoseRangeOutput {
  min: string;
  max: string;
  totalMinMg: number;
  totalMaxMg: number;
}

export interface ManualDoseOutput {
  finalMl: string;
  totalMg: number;
}

export type WeightStatus = 'ok' | 'warning' | 'error';

export interface WeightValidationResult {
  status: WeightStatus;
  message: string | null;
}
