import React from 'react';

const ModelIconWithLabel = ({ Icon, label, x, y, align = 'center', pulse = 1 }) => (
  <g transform={`translate(${x},${y})`} fontFamily="Pretendard,sans-serif">
    <g
      style={{
        transform: `scale(${pulse})`,
        filter: 'drop-shadow(0 0 8px #54e9f8cc)',
        transition: 'transform 0.3s',
      }}
    >
      <circle cx="0" cy="0" r="20" fill="url(#iconGrad)" filter="url(#iconGlow)" />
      <Icon x="-10" y="-10" size={20} color="#131926" />
    </g>
    <text
      x={align === 'left' ? -18 : align === 'right' ? 18 : 0}
      y="34"
      textAnchor={align === 'left' ? 'end' : align === 'right' ? 'start' : 'middle'}
      fontSize="11"
      fontWeight="bold"
      fill="#a2acc9"
      opacity="0.9"
    >
      {label}
    </text>
  </g>
);

export default ModelIconWithLabel;
