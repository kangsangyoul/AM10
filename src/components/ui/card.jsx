import React from 'react';

export const Card = ({ className = '', children }) => (
  <div className={`bg-[#1a1f29] rounded-xl shadow-lg ${className}`}>{children}</div>
);

export const CardHeader = ({ className = '', children }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardContent = ({ className = '', children }) => (
  <div className={className}>{children}</div>
);
