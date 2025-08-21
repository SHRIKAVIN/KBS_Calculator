import React, { useState } from 'react';
import { Sparkles, Calculator, History } from 'lucide-react';
import { RateSelector } from './components/RateSelector';
import { TimeInputs } from './components/TimeInputs';
import { CalculationResult } from './components/CalculationResult';
import { CalculationHistory } from './components/CalculationHistory';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateRentalCost } from './utils/calculations';
import { HourlyRate } from './data/rateChart';
import { CalculationHistory as HistoryType } from './types/calculator';

function App() {
  const [selectedRate, setSelectedRate] = useState<HourlyRate>(2300);
  const [hours, setHours] = useState<number | ''>('');
  const [minutes, setMinutes] = useState<number | ''>('');
  const [result, setResult] = useState({ hoursCost: 0, minutesCost: 0, totalCost: 0 });
  const [history, setHistory] = useLocalStorage<HistoryType[]>('kbs-calculator-history', []);
  const [activeTab, setActiveTab] = useState<'calculator' | 'history'>('calculator');

  const handleCalculate = () => {
    const hoursNum = typeof hours === 'number' ? hours : 0;
    const minutesNum = typeof minutes === 'number' ? minutes : 0;
    
    if (hoursNum === 0 && minutesNum === 0) {
      return;
    }

    const calculationResult = calculateRentalCost(selectedRate, hoursNum, minutesNum);
    setResult(calculationResult);

    // Add to history
    const historyItem: HistoryType = {
      id: Date.now().toString(),
      hourlyRate: selectedRate,
      hours: hoursNum,
      minutes: minutesNum,
      totalCost: calculationResult.totalCost,
      timestamp: new Date()
    };

    setHistory([...history, historyItem]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleReset = () => {
    setHours('');
    setMinutes('');
    setResult({ hoursCost: 0, minutesCost: 0, totalCost: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header with enhanced depth */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 shadow-2xl relative overflow-hidden">
        {/* Background pattern for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="max-w-md mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col items-center text-white">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-4 shadow-2xl border border-white/30 transform hover:scale-105 transition-all duration-300">
              <Sparkles size={28} className="text-white drop-shadow-lg" />
            </div>
            <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">KBS Harvester</h1>
            <p className="text-green-100 text-lg drop-shadow-md">Rental Calculator</p>
          </div>
        </div>
      </div>

      {/* Main Content with enhanced depth */}
      <div className="max-w-md mx-auto px-4 py-8 space-y-6 relative">
        {/* Floating effect container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-3xl blur-xl"></div>
          
          {activeTab === 'calculator' ? (
            <div className="relative space-y-6">
              {/* Rate Selection Card with enhanced depth */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-3xl">
                <RateSelector
                  selectedRate={selectedRate}
                  onRateChange={setSelectedRate}
                />
              </div>

              {/* Time Input Card with enhanced depth */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-3xl">
                <TimeInputs
                  hours={hours}
                  minutes={minutes}
                  onHoursChange={setHours}
                  onMinutesChange={setMinutes}
                />
              </div>

              {/* Result Display with enhanced depth */}
              {result.totalCost > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-200/50 p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-3xl">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Calculation Result</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                      ₹{result.totalCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 bg-white/60 px-4 py-2 rounded-full">
                      Rate: ₹{selectedRate.toLocaleString()}/hr • Duration: {typeof hours === 'number' ? hours : 0}h {typeof minutes === 'number' ? minutes : 0}m
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons with enhanced depth */}
              <div className="space-y-4">
                <CalculationResult
                  result={result}
                  hourlyRate={selectedRate}
                  hours={hours}
                  minutes={minutes}
                  onCalculate={handleCalculate}
                />
                
                <button
                  onClick={handleReset}
                  className="w-full bg-white/80 backdrop-blur-sm border border-gray-300/50 text-gray-700 font-semibold py-4 px-6 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center text-lg hover:shadow-2xl hover:scale-[1.02] hover:bg-white/90 transform active:scale-95"
                >
                  RESET
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-3xl">
              <CalculationHistory
                history={history}
                onClearHistory={handleClearHistory}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation with enhanced depth */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/50 shadow-2xl">
        <div className="max-w-md mx-auto flex relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
          
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 flex flex-col items-center py-4 px-4 transition-all duration-300 relative z-10 ${
              activeTab === 'calculator' 
                ? 'text-green-600 transform scale-110' 
                : 'text-gray-500 hover:text-gray-700 hover:scale-105'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              activeTab === 'calculator' 
                ? 'bg-green-100 shadow-lg' 
                : 'hover:bg-gray-100'
            }`}>
              <Calculator size={22} className="relative z-20" />
            </div>
            <span className="text-xs mt-1 font-medium relative z-20">Calculator</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex flex-col items-center py-4 px-4 transition-all duration-300 relative z-10 ${
              activeTab === 'history' 
                ? 'text-green-600 transform scale-110' 
                : 'text-gray-500 hover:text-gray-700 hover:scale-105'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              activeTab === 'history' 
                ? 'bg-green-100 shadow-lg' 
                : 'hover:bg-gray-100'
            }`}>
              <History size={22} className="relative z-20" />
            </div>
            <span className="text-xs mt-1 font-medium relative z-20">History</span>
          </button>
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-24"></div>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}

export default App;