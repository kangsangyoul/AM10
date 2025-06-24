import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const costData = {
  monthlyBudget: 1000,
  currentSpent: 786,
  dailyUsage: [
    { date: '2025-06-20', cost: 110 },
    { date: '2025-06-21', cost: 98 },
    { date: '2025-06-22', cost: 85 },
    { date: '2025-06-23', cost: 74 },
    { date: '2025-06-24', cost: 60 },
  ],
};

const CostMonitor = () => {
  return (
    <Card className="w-full bg-slate-900 text-white p-6 rounded-2xl shadow-xl mt-6">
      <CardHeader className="text-2xl font-semibold pb-4">Cost & Budget Tracker</CardHeader>
      <CardContent>
        <div className="mb-4">
          <p>💰 Monthly Budget: ${costData.monthlyBudget}</p>
          <p>📊 Current Spent: ${costData.currentSpent}</p>
          <p>
            📉 Remaining Budget: ${costData.monthlyBudget - costData.currentSpent}
          </p>
        </div>
        <h3 className="text-xl font-semibold mb-2">Daily Usage</h3>
        <table className="w-full text-left border-t border-slate-700">
          <thead>
            <tr className="text-slate-300">
              <th className="py-2">Date</th>
              <th>Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {costData.dailyUsage.map((day) => (
              <tr key={day.date} className="border-t border-slate-700 hover:bg-slate-800">
                <td className="py-2">{day.date}</td>
                <td>{day.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default CostMonitor;
