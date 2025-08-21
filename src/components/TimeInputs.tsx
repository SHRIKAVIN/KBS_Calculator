import React from 'react';
import { Clock } from 'lucide-react';

interface TimeInputsProps {
  hours: number | '';
  minutes: number | '';
  onHoursChange: (hours: number | '') => void;
  onMinutesChange: (minutes: number | '') => void;
}

export const TimeInputs: React.FC<TimeInputsProps> = ({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-xl shadow-lg">
          <Clock size={22} className="text-white drop-shadow-sm" />
        </div>
        <span className="font-bold text-gray-900 text-lg">Usage Time</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex-1 group">
          <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider bg-white/60 px-3 py-1 rounded-full shadow-sm">
            HOURS
          </label>
          <input
            type="number"
            min="0"
            max="999"
            value={hours}
            onChange={(e) => {
              const value = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0);
              onHoursChange(value);
            }}
            className="block w-full px-6 py-5 text-xl font-bold text-gray-800 bg-gradient-to-br from-gray-100 to-gray-200 border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-all duration-300 text-center placeholder-gray-400 shadow-lg hover:shadow-xl transform hover:scale-[1.02] group-hover:shadow-2xl"
            placeholder="0"
          />
          {/* Enhanced focus ring effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        
        <div className="text-3xl font-bold text-gray-700 py-4 drop-shadow-sm">
          :
        </div>
        
        <div className="flex-1 group">
          <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider bg-white/60 px-3 py-1 rounded-full shadow-sm">
            MINUTES
          </label>
          <input
            type="number"
            min="0"
            max="60"
            value={minutes}
            onChange={(e) => {
              const value = e.target.value === '' ? '' : Math.max(0, Math.min(60, parseInt(e.target.value) || 0));
              onMinutesChange(value);
            }}
            className="block w-full px-6 py-5 text-xl font-bold text-gray-800 bg-gradient-to-br from-gray-100 to-gray-200 border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-all duration-300 text-center placeholder-gray-400 shadow-lg hover:shadow-xl transform hover:scale-[1.02] group-hover:shadow-2xl"
            placeholder="0"
          />
          {/* Enhanced focus ring effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};