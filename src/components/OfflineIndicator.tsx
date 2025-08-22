import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
      
      // Hide offline message after 5 seconds
      setTimeout(() => {
        setShowOfflineMessage(false);
      }, 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <>
      {/* Persistent offline indicator */}
      <div className="fixed top-4 right-4 z-50 bg-yellow-500 text-white px-3 py-2 rounded-full shadow-lg flex items-center space-x-2">
        <WifiOff size={16} />
        <span className="text-sm font-medium">Offline</span>
      </div>

      {/* Offline message banner */}
      {showOfflineMessage && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-3 shadow-lg">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <WifiOff size={20} />
              <div>
                <p className="font-medium">You're currently offline</p>
                <p className="text-sm text-yellow-100">Calculator will work offline</p>
              </div>
            </div>
            <button
              onClick={() => setShowOfflineMessage(false)}
              className="text-yellow-100 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};
