import React from 'react';

const FlowCurve = ({ d, color = 'url(#emerald)', width = 4 }) => (
  <path
    d={d}
    stroke={color}
    strokeWidth={width}
    fill="none"
    strokeDasharray="13 10"
    className="flow-curve"
  />
);

export default FlowCurve;
