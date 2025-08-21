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
        <div className="bg-gray-100 p-2 rounded-xl">
          <Clock size={22} className="text-gray-600" />
        </div>
        <span className="font-bold text-gray-900 text-lg">Usage Time</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
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
            className="block w-full px-6 py-5 text-xl font-bold text-gray-800 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-center placeholder-gray-400"
            placeholder="0"
          />
        </div>
        
        <div className="text-3xl font-bold text-gray-700 py-4">
          :
        </div>
        
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
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
            className="block w-full px-6 py-5 text-xl font-bold text-gray-800 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-center placeholder-gray-400"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};