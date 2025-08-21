import React from 'react';
import { History as HistoryIcon, Trash2 } from 'lucide-react';
import { CalculationHistory as History } from '../types/calculator';
import { formatCurrency } from '../utils/calculations';

interface CalculationHistoryProps {
  history: History[];
  onClearHistory: () => void;
}

export const CalculationHistory: React.FC<CalculationHistoryProps> = ({
  history,
  onClearHistory
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-700">
          <HistoryIcon size={20} />
          <span className="font-semibold">Calculation History</span>
        </div>
        <button
          onClick={onClearHistory}
          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
          title="Clear History"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.slice(-10).reverse().map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">
                ₹{item.hourlyRate.toLocaleString()}/hr • {item.hours}h {item.minutes}m
              </span>
              <span className="font-bold text-green-700">
                {formatCurrency(item.totalCost)}
              </span>
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};