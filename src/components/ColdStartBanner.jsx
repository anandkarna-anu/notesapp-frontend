import React from 'react';

export default function ColdStartBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-center space-x-4">
        {/* Kung Fu Panda Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white text-xl">🐼</span>
        </div>
        
        {/* Message Content */}
        <div className="flex-grow">
          <p className="text-gray-700 text-sm leading-relaxed">
            Please hang on for about 30 seconds; a cold start has been initiated for the backend server (Render's free tier service).
          </p>
        </div>
        
        {/* Loading Animation */}
        <div className="flex space-x-1 flex-shrink-0">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}