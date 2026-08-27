import { formatDoseRange, formatMgRange } from '@/utils/doseMath';
import type { ResultCardProps } from '@/types/components';

export function ResultCard({ result, isManualMode }: ResultCardProps) {
  if (result === null) {
    const message = isManualMode ? 'กรุณากรอกขนาดยา (mg/kg/dose)' : 'กรุณากรอกน้ำหนัก';
    return (
      <div className="result result--empty" role="status" aria-live="polite">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="8" y2="10" />
          <line x1="12" y1="10" x2="12" y2="10" />
          <line x1="16" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="8" y2="14" />
          <line x1="12" y1="14" x2="12" y2="14" />
          <line x1="16" y1="14" x2="16" y2="14" />
          <line x1="8" y1="18" x2="8" y2="18" />
          <line x1="12" y1="18" x2="12" y2="18" />
          <line x1="16" y1="18" x2="16" y2="18" />
        </svg>
        <p>{message}</p>
      </div>
    );
  }

  const value =
    result.mode === 'auto' ? formatDoseRange(result.min, result.max) : `${result.finalMl} ml`;

  const secondary =
    result.mode === 'auto'
      ? formatMgRange(result.totalMinMg, result.totalMaxMg)
      : `${result.totalMg} mg/dose`;

  return (
    <div className="result" role="status" aria-live="polite">
      <span className="result__label">ผลลัพธ์</span>
      <div className="result__value">{value}</div>
      <div className="result__secondary">{secondary}</div>
      <p className="result__notes">
        <span className="result__notes-label">คำแนะนำ</span>
        {result.notes}
      </p>
    </div>
  );
}
