import React from 'react';

const FlowCurve = ({
  d,
  color = 'url(#emerald)',
  width = 3,
  markerStart = '',
  markerEnd = '',
  dash = '13 10',
}) => (
  <path
    d={d}
    stroke={color}
    strokeWidth={width}
    fill="none"
    strokeDasharray={dash}
    markerStart={markerStart}
    markerEnd={markerEnd}
    className="flow-curve"
  />
);

export default FlowCurve;
