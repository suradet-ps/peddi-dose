import { Calculator } from './components/Calculator';
import { useDoseCalculator } from './hooks/useDoseCalculator';

export default function App() {
  const {
    weight,
    setWeight,
    selectedDrugId,
    handleDrugChange,
    selectedDrug,
    isManualMode,
    setIsManualMode,
    manualDose,
    setManualDose,
    result,
  } = useDoseCalculator();

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <main className="app__main" id="main-content">
        <Calculator
          weight={weight}
          setWeight={setWeight}
          selectedDrugId={selectedDrugId}
          handleDrugChange={handleDrugChange}
          isManualMode={isManualMode}
          setIsManualMode={setIsManualMode}
          manualDose={manualDose}
          setManualDose={setManualDose}
          selectedDrug={selectedDrug}
          result={result}
        />
      </main>
    </div>
  );
}
