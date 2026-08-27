import { drugList } from '@/data/drugData';
import type { CalculatorProps } from '@/types/components';
import { ResultCard } from './ResultCard';

export function Calculator({
  weight,
  setWeight,
  selectedDrugId,
  handleDrugChange,
  isManualMode,
  setIsManualMode,
  manualDose,
  setManualDose,
  selectedDrug,
  weightValidation,
  result,
}: CalculatorProps) {
  return (
    <section className="calc" aria-label="เครื่องคำนวณขนาดยา">
      <div className="calc__hero">
        <h1 className="calc__title">คำนวณขนาดยาน้ำเด็ก</h1>
        <p className="calc__subtitle">เลือกยาและกรอกน้ำหนักตัว ผลลัพธ์จะอัปเดตทันที</p>
      </div>

      <div className="calc__card">
        <form
          className="calc__form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="field">
            <label className="field__label" htmlFor="drug-select">
              <span className="field__step">1</span>
              เลือกยา
            </label>
            <div className="select-wrap">
              <select
                id="drug-select"
                className="field__input"
                value={selectedDrugId}
                onChange={(e) => {
                  handleDrugChange(Number(e.target.value));
                }}
              >
                {drugList.map((drug) => (
                  <option key={drug.id} value={drug.id}>
                    {drug.name} · {drug.concentration}mg/{drug.volume}ml
                  </option>
                ))}
              </select>
              <svg
                className="select-wrap__icon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className="field">
            <div className="field__row">
              <label className="field__label" htmlFor="weight">
                <span className="field__step">2</span>
                น้ำหนัก (kg)
              </label>
              <button
                type="button"
                className="field__manual-toggle"
                onClick={() => {
                  setIsManualMode(!isManualMode);
                }}
                aria-pressed={isManualMode}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                {isManualMode ? 'ปิด' : 'ระบุเอง'}
              </button>
            </div>
            <div className="input-wrap">
              <input
                type="number"
                id="weight"
                className="field__input"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                placeholder="0.0"
                step="any"
                min="0"
                inputMode="decimal"
              />
              <span className="input-wrap__suffix" aria-hidden="true">
                kg
              </span>
            </div>
            {weightValidation.status === 'warning' && weightValidation.message !== null && (
              <p className="field__message field__message--warning" role="alert">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                {weightValidation.message}
              </p>
            )}
          </div>

          {isManualMode && (
            <div className="field field--manual">
              <label className="field__label" htmlFor="manual-dose">
                mg/kg/dose
              </label>
              <input
                type="number"
                id="manual-dose"
                className="field__input"
                value={manualDose}
                onChange={(e) => {
                  setManualDose(e.target.value);
                }}
                placeholder={`${selectedDrug.minDosePerKg} - ${selectedDrug.maxDosePerKg}`}
                step="any"
                min="0"
                inputMode="decimal"
              />
            </div>
          )}

          <ResultCard
            result={result}
            isManualMode={isManualMode}
            weightValidation={weightValidation}
          />
        </form>
      </div>
    </section>
  );
}
