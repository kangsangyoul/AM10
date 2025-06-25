import React from 'react';

const colors = {
  info: '#54a7f8',
  success: '#34b4ff',
  error: '#ff5a47',
};

const Toast = ({ message, type }) => (
  <div
    className="fixed top-4 right-4 px-4 py-2 rounded text-sm font-medium text-white z-50"
    style={{ backgroundColor: colors[type] || '#54a7f8', boxShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
  >
    {message}
  </div>
);

export default Toast;
