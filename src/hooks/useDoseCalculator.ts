import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useDrugSelector } from './useDrugSelector';
import type { UseDrugSelectorResult } from './useDrugSelector';
import { useManualDose } from './useManualDose';
import type { UseManualDoseResult } from './useManualDose';
import { calculateDoseRange, calculateManualDose, validateWeight } from '@/utils/doseMath';
import type { Drug } from '@/types/drug';
import type { DoseResult, WeightValidationResult } from '@/types/calculation';

export interface UseDoseCalculatorResult {
  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;
  selectedDrugId: number;
  handleDrugChange: (id: number) => void;
  selectedDrug: Drug;
  isManualMode: boolean;
  setIsManualMode: Dispatch<SetStateAction<boolean>>;
  manualDose: string;
  setManualDose: Dispatch<SetStateAction<string>>;
  weightValidation: WeightValidationResult;
  result: DoseResult | null;
}

export function useDoseCalculator(): UseDoseCalculatorResult {
  const [weight, setWeight] = useState<string>('');

  const {
    selectedDrugId,
    selectedDrug,
    handleDrugChange: baseHandleDrugChange,
  }: UseDrugSelectorResult = useDrugSelector();

  const { isManualMode, setIsManualMode, manualDose, setManualDose }: UseManualDoseResult =
    useManualDose();

  const handleDrugChange = (id: number): void => {
    baseHandleDrugChange(id);
    setManualDose('');
  };

  const weightValidation = useMemo<WeightValidationResult>(() => {
    if (weight.trim() === '') return { status: 'ok', message: null };
    return validateWeight(parseFloat(weight));
  }, [weight]);

  const result = useMemo<DoseResult | null>(() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0 || weightValidation.status === 'error') return null;

    if (isManualMode) {
      const d = parseFloat(manualDose);
      if (isNaN(d) || d <= 0) return null;
      const { finalMl, totalMg } = calculateManualDose(w, d, selectedDrug);
      return {
        mode: 'manual',
        finalMl,
        totalMg: totalMg.toFixed(1),
        notes: selectedDrug.notes,
      };
    }

    const { min, max, totalMinMg, totalMaxMg } = calculateDoseRange(w, selectedDrug);
    return {
      mode: 'auto',
      min,
      max,
      totalMinMg,
      totalMaxMg,
      notes: selectedDrug.notes,
    };
  }, [weight, weightValidation.status, selectedDrug, isManualMode, manualDose]);

  return {
    weight,
    setWeight,
    selectedDrugId,
    handleDrugChange,
    selectedDrug,
    isManualMode,
    setIsManualMode,
    manualDose,
    setManualDose,
    weightValidation,
    result,
  };
}
