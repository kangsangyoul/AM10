import React from 'react';

const RiskBadgeCard = ({ score, state, x, y, highlight }) => (
  <g transform={`translate(${x},${y})`} fontFamily="Pretendard,sans-serif" textAnchor="middle">
    <rect
      x="0"
      y="0"
      width="60"
      height="34"
      rx="7"
      fill="#232b3b"
      stroke={highlight ? '#ff5a47' : 'none'}
      style={highlight ? { filter: 'drop-shadow(0 0 8px #ff5a47aa)' } : undefined}
    />
    <text x="30" y="16" fontSize="1.1rem" fontWeight="bold" fill={highlight ? '#ff5a47' : '#54e9f8'} dy="0.35em">
      {score}
    </text>
    <text x="30" y="28" fontSize="10" fill="#a2acc9">
      {state}
    </text>
  </g>
);

export default RiskBadgeCard;
