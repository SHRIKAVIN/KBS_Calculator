import React from 'react';
import { Calculator } from 'lucide-react';

interface CalculationResultProps {
  result: any;
  hourlyRate: number;
  hours: number | '';
  minutes: number | '';
  onCalculate: () => void;
}

export const CalculationResult: React.FC<CalculationResultProps> = ({
  result,
  hourlyRate,
  hours,
  minutes,
  onCalculate
}) => {
  const hoursNum = typeof hours === 'number' ? hours : 0;
  const minutesNum = typeof minutes === 'number' ? minutes : 0;
  const isValidInput = hoursNum > 0 || minutesNum > 0;

  return (
    <button
      onClick={onCalculate}
      disabled={!isValidInput}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 px-8 rounded-2xl shadow-lg transition-all duration-200 ease-out flex items-center justify-center space-x-4 text-xl active:scale-95 active:shadow-md"
    >
      <Calculator size={24} />
      <span>CALCULATE COST</span>
    </button>
  );
};