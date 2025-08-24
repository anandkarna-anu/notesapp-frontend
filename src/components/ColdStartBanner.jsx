import React from 'react';

export default function ColdStartBanner() {
  const bannerStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #fed7aa, #fecaca)',
    border: '1px solid #fdba74',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const iconStyle = {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #fb923c, #ef4444)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    flexShrink: 0
  };

  const messageStyle = {
    color: '#374151',
    fontSize: '14px',
    lineHeight: '1.4',
    flexGrow: 1,
    margin: 0
  };

  const loadingContainerStyle = {
    display: 'flex',
    gap: '4px',
    flexShrink: 0
  };

  const dotStyle = {
    width: '6px',
    height: '6px',
    backgroundColor: '#f97316',
    borderRadius: '50%',
    animation: 'bounce 1s infinite'
  };

  const keyframes = `
    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={bannerStyle}>
        <div style={containerStyle}>
          {/* Kung Fu Panda Icon */}
          <div style={iconStyle}>
            <span style={{ color: 'white', fontSize: '20px' }}>🐼</span>
          </div>
          
          {/* Message Content */}
          <p style={messageStyle}>
            Please hang on for about 30 seconds; a cold start has been initiated for the backend server (Render's free tier service).
          </p>
          
          {/* Loading Animation */}
          <div style={loadingContainerStyle}>
            <div style={{ ...dotStyle, animationDelay: '0s' }}></div>
            <div style={{ ...dotStyle, animationDelay: '0.1s' }}></div>
            <div style={{ ...dotStyle, animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}