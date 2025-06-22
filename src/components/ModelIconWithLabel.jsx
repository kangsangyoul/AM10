import React from 'react';

const ModelIconWithLabel = ({ Icon, label, x, y }) => (
  <g transform={`translate(${x},${y})`} fontFamily="Pretendard,sans-serif" fill="#a2acc9" textAnchor="middle">
    <circle cx="0" cy="0" r="16" fill="url(#iconGrad)" filter="url(#iconGlow)" />
    <Icon x="-8" y="-8" size={16} color="#131926" />
    <text x="0" y="26" fontSize="11" fontWeight="bold">{label}</text>
  </g>
);

export default ModelIconWithLabel;
