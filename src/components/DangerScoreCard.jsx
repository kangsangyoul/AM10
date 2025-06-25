import React from 'react';

const DangerScoreCard = ({ score, state }) => (
  <div
    className="flex flex-col items-center justify-center text-center bg-[#262e3e] rounded-lg"
    style={{ width: 72, height: 48, boxShadow: '0 0 12px rgba(255,90,71,0.6)', animation: 'heart 1.2s infinite' }}
  >
    <div className="text-[2.2rem] font-bold leading-none" style={{ color: '#ff5a47' }}>
      {score}
    </div>
    <div className="text-xs text-[#a2acc9] mt-1">{state}</div>
    <style>{`
      @keyframes heart { 0%{transform:scale(1);}50%{transform:scale(1.05);}100%{transform:scale(1);} }
    `}</style>
  </div>
);

export default DangerScoreCard;
