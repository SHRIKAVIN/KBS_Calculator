import React from 'react';
import { DollarSign, ChevronDown } from 'lucide-react';
import { hourlyRateOptions, HourlyRate } from '../data/rateChart';

interface RateSelectorProps {
  selectedRate: HourlyRate;
  onRateChange: (rate: HourlyRate) => void;
}

export const RateSelector: React.FC<RateSelectorProps> = ({ selectedRate, onRateChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="bg-gray-100 p-2 rounded-xl">
          <DollarSign size={22} className="text-gray-600" />
        </div>
        <span className="font-bold text-gray-900 text-lg">Hourly Rate</span>
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <select
            value={selectedRate}
            onChange={(e) => onRateChange(Number(e.target.value) as HourlyRate)}
            className="appearance-none w-full px-6 py-5 text-xl font-bold text-gray-800 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer pr-16"
          >
            {hourlyRateOptions.map((rate) => (
              <option key={rate} value={rate}>
                ₹{rate.toLocaleString()}
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
            <div className="bg-gray-300 p-1 rounded-lg">
              <ChevronDown size={18} className="text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="px-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            PER HOUR
          </span>
        </div>
      </div>
    </div>
  );
};