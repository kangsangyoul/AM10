import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const modelStats = [
  { name: 'Fraud Detector', accuracy: 94.8, drift: 2.1, biasScore: 0.3 },
  { name: 'Language Model', accuracy: 78.2, drift: 4.6, biasScore: 0.7 },
  { name: 'Forecast Engine', accuracy: 70.3, drift: 1.9, biasScore: 0.4 },
];

const ModelRisk = () => {
  return (
    <Card className="w-full bg-slate-900 text-white p-6 rounded-2xl shadow-xl mt-6">
      <CardHeader className="text-2xl font-semibold pb-4">Model Risk Monitor</CardHeader>
      <CardContent>
        <table className="w-full text-left border-t border-slate-700">
          <thead>
            <tr className="text-slate-300">
              <th className="py-2">Model</th>
            <th>Accuracy (%)</th>
            <th>Drift (%)</th>
            <th>Bias Score</th>
          </tr>
        </thead>
        <tbody>
          {modelStats.map((model) => (
            <tr key={model.name} className="border-t border-slate-700 hover:bg-slate-800">
              <td className="py-2">{model.name}</td>
              <td>{model.accuracy}</td>
              <td>{model.drift}</td>
              <td>{model.biasScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </CardContent>
    </Card>
  );
};

export default ModelRisk;
