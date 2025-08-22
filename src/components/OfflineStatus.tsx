import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { getPWAStatus, getOfflineReadiness, isReadyForOffline } from '../utils/pwa';

export const OfflineStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineReadiness, setOfflineReadiness] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const readiness = await getOfflineReadiness();
      const ready = await isReadyForOffline();
      setOfflineReadiness(readiness);
      setIsReady(ready);
    };

    const handleOnline = () => {
      setIsOnline(true);
      checkStatus();
    };

    const handleOffline = () => {
      setIsOnline(false);
      checkStatus();
    };

    // Check initial status
    checkStatus();

    // Listen for network changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check status periodically
    const interval = setInterval(checkStatus, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const getStatusColor = () => {
    if (isOnline && isReady) return 'bg-green-500';
    if (isOnline && !isReady) return 'bg-yellow-500';
    if (!isOnline && isReady) return 'bg-blue-500';
    return 'bg-red-500';
  };

  const getStatusIcon = () => {
    if (isOnline && isReady) return <CheckCircle size={16} />;
    if (isOnline && !isReady) return <Download size={16} />;
    if (!isOnline && isReady) return <WifiOff size={16} />;
    return <AlertCircle size={16} />;
  };

  const getStatusText = () => {
    if (isOnline && isReady) return 'Ready Offline';
    if (isOnline && !isReady) return 'Caching...';
    if (!isOnline && isReady) return 'Offline Ready';
    return 'Not Ready';
  };

  const getStatusDescription = () => {
    if (isOnline && isReady) return 'App is fully cached and ready for offline use';
    if (isOnline && !isReady) return 'App is still downloading resources for offline use';
    if (!isOnline && isReady) return 'App is working offline - no internet needed';
    return 'App needs internet connection to work properly';
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Main Status Indicator */}
      <div 
        className={`${getStatusColor()} text-white px-3 py-2 rounded-full shadow-lg flex items-center space-x-2 cursor-pointer transition-all duration-200 hover:scale-105`}
        onClick={() => setShowDetails(!showDetails)}
        title="Click for details"
      >
        {getStatusIcon()}
        <span className="text-sm font-medium">{getStatusText()}</span>
      </div>

      {/* Detailed Status Panel */}
      {showDetails && (
        <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 w-80">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Offline Status</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Network Status */}
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-700">
                {isOnline ? 'Internet Connected' : 'Internet Disconnected'}
              </span>
            </div>

            {/* Offline Readiness */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Offline Readiness</span>
                <span className="text-sm font-medium text-gray-900">{offlineReadiness}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    offlineReadiness >= 80 ? 'bg-green-500' : 
                    offlineReadiness >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${offlineReadiness}%` }}
                ></div>
              </div>
            </div>

            {/* Status Description */}
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
              {getStatusDescription()}
            </div>

            {/* Features Status */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Offline Features:</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-700">Rental calculations</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-700">Rate selection</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-700">Calculation history</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-700">Full app functionality</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            {!isReady && isOnline && (
              <div className="text-xs text-blue-600 bg-blue-50 p-3 rounded-lg">
                💡 <strong>Tip:</strong> Keep this page open for a few minutes to download all resources for offline use.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
