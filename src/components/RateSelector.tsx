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
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-xl shadow-lg">
          <DollarSign size={22} className="text-white drop-shadow-sm" />
        </div>
        <span className="font-bold text-gray-900 text-lg">Hourly Rate</span>
      </div>
      
      <div className="space-y-3">
        <div className="relative group">
          <select
            value={selectedRate}
            onChange={(e) => onRateChange(Number(e.target.value) as HourlyRate)}
            className="appearance-none w-full px-6 py-5 text-xl font-bold text-gray-800 bg-gradient-to-br from-gray-100 to-gray-200 border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-all duration-300 cursor-pointer pr-16 shadow-lg hover:shadow-xl transform hover:scale-[1.02] group-hover:shadow-2xl"
          >
            {hourlyRateOptions.map((rate) => (
              <option key={rate} value={rate}>
                ₹{rate.toLocaleString()}.00
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
            <div className="bg-gradient-to-br from-gray-300 to-gray-400 p-1 rounded-lg shadow-inner">
              <ChevronDown size={18} className="text-gray-600 drop-shadow-sm" />
            </div>
          </div>
          
          {/* Enhanced focus ring effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        
        <div className="px-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-white/60 px-3 py-1 rounded-full shadow-sm">
            PER HOUR
          </span>
        </div>
      </div>
    </div>
  );
};