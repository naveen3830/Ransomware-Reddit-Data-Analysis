// src/components/SerpChart.js (Corrected)
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { CategoryData } from '../types';

// The mockData and COLORS constant can remain the same
const mockData = [
  // ... your mock data
];
const COLORS = [
  '#06b6d4', '#818cf8', '#fbbf24', '#34d399', '#f472b6', '#f87171', '#a78bfa', '#facc15', '#38bdf8', '#f59e42'
];

// The CustomTooltip component can remain the same
const CustomTooltip: React.FC<{ active?: boolean; payload?: any[] }> = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    const { name, threadsInTop10 } = payload[0].payload;
    return (
      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-600 backdrop-blur-sm">
        <p className="text-white font-semibold">{name}</p>
        <p className="text-teal-400">Top 10 Threads: {threadsInTop10.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};


interface SerpChartProps {
  data: CategoryData[];
}

export const SerpChart: React.FC<SerpChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.threadsInTop10 - a.threadsInTop10);

  // --- FIX IS HERE ---
  // Change the style from fixed pixels to 100% to make it responsive.
  // This div will now correctly fill the space provided by the parent flex container in App.js.
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          // Adjusted margin to give more space for the long Y-axis labels
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            type="number"
            stroke="#94a3b8"
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#94a3b8"
            // Set a generous width for the Y-axis to prevent label cropping
            width={180}
            tick={{ fontSize: 14, fill: '#cbd5e1' }}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} />
          <Bar dataKey="threadsInTop10" barSize={30}>
            {sortedData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};