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
      className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-5 px-8 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center space-x-4 text-xl hover:shadow-3xl transform hover:scale-[1.02] active:scale-95 disabled:transform-none disabled:hover:scale-100 relative overflow-hidden group"
    >
      {/* Background pattern for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      {/* Icon with enhanced styling */}
      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-white/30 relative z-10">
        <Calculator size={24} className="text-white drop-shadow-sm" />
      </div>
      
      {/* Text with enhanced styling */}
      <span className="font-bold tracking-wide relative z-10 drop-shadow-sm">
        CALCULATE COST
      </span>
      
      {/* Enhanced focus ring */}
      <div className="absolute inset-0 rounded-2xl ring-4 ring-green-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </button>
  );
};