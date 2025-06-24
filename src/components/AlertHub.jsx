import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const alertStream = [
  { time: '10:02:18', type: 'API Failure', detail: 'POST /v1/completions 500 error spike' },
  { time: '10:03:10', type: 'Token Abuse', detail: 'Token-921 triggered rate limit' },
  { time: '10:05:47', type: 'Prompt Injection', detail: "Detected 'Ignore all instructions' input" },
];

const AlertHub = () => {
  return (
    <Card className="w-full bg-red-950 text-white p-6 rounded-2xl shadow-xl mt-6">
      <CardHeader className="text-2xl font-semibold pb-4">\ud83d\udea8 Real-Time Alerts</CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {alertStream.map((alert, idx) => (
            <li key={idx} className="bg-red-800 p-3 rounded-xl border border-red-600">
              <p className="text-sm text-red-200">{alert.time}</p>
              <p className="text-base font-bold">{alert.type}</p>
              <p className="text-sm">{alert.detail}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AlertHub;
