import React from 'react';

const FlowCurve = ({ d, color = 'url(#emerald)', width = 4, marker = '' }) => (
  <path
    d={d}
    stroke={color}
    strokeWidth={width}
    fill="none"
    strokeDasharray="13 10"
    markerEnd={marker}
    className="flow-curve"
  />
);

export default FlowCurve;
