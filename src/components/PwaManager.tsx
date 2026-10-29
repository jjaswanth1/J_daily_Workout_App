'use client';

import React, { useEffect, useState } from 'react';
import { Download, Share2, PlusSquare, X, Smartphone, Check } from 'lucide-react';

export function PwaManager() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already running in standalone (installed) mode
    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      
      setIsStandalone(isStandaloneMode);
      return isStandaloneMode;
    };

    if (checkStandalone()) {
      return;
    }

    // Register Service Worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.log('SW registration error:', err);
        });
      });
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Check if user dismissed prompt previously in this session
    const hasDismissed = sessionStorage.getItem('titan_pwa_dismissed');

    // Android / Chrome beforeinstallprompt event
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!hasDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // App installed handler
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    // If on iOS and not standalone, show subtle install hint after 3 seconds
    if (isIosDevice && !hasDismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('titan_pwa_dismissed', 'true');
  };

  // Don't render anything if already installed
  if (isStandalone || isInstalled || (!showPrompt && !showIosGuide)) {
    return null;
  }

  return (
    <>
      {/* Floating Subtle Mobile Install Banner (Apple Liquid Glass) */}
      {showPrompt && !showIosGuide && (
        <div
          style={{
            position: 'fixed',
            top: 'max(12px, env(safe-area-inset-top, 12px))',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 24px)',
            maxWidth: '430px',
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(30px) saturate(200%)',
            WebkitBackdropFilter: 'blur(30px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(255,255,255,0.95) inset',
            borderRadius: '20px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
            <img
              src="/icons/icon-192.png"
              alt="TITAN App Icon"
              style={{ width: '36px', height: '36px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Install TITAN App
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Full-screen liquid glass & offline coach
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={handleInstallClick}
              style={{
                background: 'var(--accent-red)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 3px 12px rgba(255, 45, 85, 0.25)'
              }}
            >
              <Download size={13} strokeWidth={2.5} />
              <span>{isIos ? 'Install' : 'Add'}</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)'
              }}
              title="Dismiss"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      {/* iOS "Add to Home Screen" Visual Guide Sheet */}
      {showIosGuide && (
        <div
          onClick={() => setShowIosGuide(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '400px',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(36px) saturate(210%)',
              WebkitBackdropFilter: 'blur(36px) saturate(210%)',
              border: '1px solid rgba(255, 255, 255, 0.98)',
              borderRadius: '24px',
              padding: '20px 20px 24px 20px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              marginBottom: 'max(10px, env(safe-area-inset-bottom, 10px))'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src="/icons/icon-192.png"
                  alt="TITAN App"
                  style={{ width: '40px', height: '40px', borderRadius: '11px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Install on iPhone
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Add to Home Screen in 2 quick steps
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0 20px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.03)', padding: '12px 14px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-blue-dim)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Share2 size={16} />
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  <span style={{ fontWeight: 700 }}>Step 1: </span>Tap Safari's <strong>Share</strong> button at the bottom of your screen.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.03)', padding: '12px 14px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.04)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-red-dim)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PlusSquare size={16} />
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  <span style={{ fontWeight: 700 }}>Step 2: </span>Scroll down and tap <strong>"Add to Home Screen"</strong>.
                </div>
              </div>
            </div>

            {/* Done button */}
            <button
              type="button"
              onClick={() => {
                setShowIosGuide(false);
                setShowPrompt(false);
                sessionStorage.setItem('titan_pwa_dismissed', 'true');
              }}
              style={{
                width: '100%',
                background: 'var(--text-primary)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '14px',
                padding: '12px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
