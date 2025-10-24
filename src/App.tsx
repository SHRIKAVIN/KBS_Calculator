import React, { useState } from 'react';
import { Calculator, History } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">

      
      {/* Header */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3b82f6 50%, #1e40af 75%, #1e3a8a 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      }}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-30" style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          transform: 'translateX(-100%)',
          animation: 'shimmer 3s infinite'
        }}></div>
        
        <div className="relative z-10 max-w-md mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-white">
            <div className="mb-4 logo-glow">
              <img 
                src="kbslogo.png" 
                alt="KBS Earthmovers and Harvester Logo" 
                className="h-16 w-auto object-contain logo-3d logo-shadow rounded-xl"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)',
              transform: 'perspective(1000px) rotateX(5deg)',
              transformStyle: 'preserve-3d'
            }}>KBS Harvester</h1>
            <p className="text-blue-100 text-lg" style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4), 0 0 8px rgba(59, 130, 246, 0.2)',
              transform: 'perspective(1000px) rotateX(3deg)',
              transformStyle: 'preserve-3d'
            }}>Rental Calculator</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {activeTab === 'calculator' ? (
          <div className="space-y-6">
            {/* Rate Selection Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <RateSelector
                selectedRate={selectedRate}
                onRateChange={setSelectedRate}
              />
            </div>

            {/* Result Display - Animated Pop-up */}
            {result.totalCost > 0 && (
              <div 
                className="bg-blue-50 rounded-2xl shadow-lg p-6 animate-in slide-in-from-top-4 fade-in duration-500 ease-out"
                style={{
                  animation: 'popUp 0.5s ease-out'
                }}
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Calculation Result</h3>
                  <div className="text-4xl font-bold text-blue-600">
                    ₹{result.totalCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full">
                    Rate: ₹{selectedRate.toLocaleString()}/hr • Duration: {typeof hours === 'number' ? hours : 0}h {typeof minutes === 'number' ? minutes : 0}m
                  </div>
                </div>
              </div>
            )}

            {/* Time Input Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <TimeInputs
                hours={hours}
                minutes={minutes}
                onHoursChange={setHours}
                onMinutesChange={setMinutes}
              />
            </div>

            {/* Action Buttons */}
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
                className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-200 ease-out flex items-center justify-center text-lg hover:bg-gray-50 active:scale-95 active:shadow-md"
              >
                RESET
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <CalculationHistory
              history={history}
              onClearHistory={handleClearHistory}
            />
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-md mx-auto flex">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 flex flex-col items-center py-4 px-4 transition-colors ${
              activeTab === 'calculator' 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`p-2 rounded-xl mb-1 ${
              activeTab === 'calculator' 
                ? 'bg-blue-100' 
                : 'hover:bg-gray-100'
            }`}>
              <Calculator size={22} />
            </div>
            <span className="text-xs font-medium">Calculator</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex flex-col items-center py-4 px-4 transition-colors ${
              activeTab === 'history' 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`p-2 rounded-xl mb-1 ${
              activeTab === 'history' 
                ? 'bg-blue-100' 
                : 'hover:bg-gray-100'
            }`}>
              <History size={22} />
            </div>
            <span className="text-xs font-medium">History</span>
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