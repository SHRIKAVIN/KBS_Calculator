import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 p-4 animate-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-xl">
            <Download size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Install KBS Calculator</h3>
            <p className="text-sm text-gray-600">Add to home screen for quick access</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="mt-3 flex space-x-2">
        <button
          onClick={handleInstall}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
};
