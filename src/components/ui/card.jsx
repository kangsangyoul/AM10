import React from 'react';

export function Card({ className = '', ...props }) {
  return (
    <div className={`rounded-2xl bg-[#1a1f29] shadow-lg p-6 ${className}`} {...props} />
  );
}

export function CardHeader({ className = '', ...props }) {
  return <div className={`font-semibold text-xl mb-4 ${className}`} {...props} />;
}

export function CardContent({ className = '', ...props }) {
  return <div className={className} {...props} />;
}
