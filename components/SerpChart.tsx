import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CategoryData } from '../types';

interface SerpChartProps {
  data: CategoryData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-600 backdrop-blur-sm">
        <p className="text-white font-semibold">{`${label}`}</p>
        <p className="text-teal-400">{`Top 10 Threads: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const label = payload.value;
  // Truncate if too long
  const display = label.length > 22 ? label.slice(0, 20) + '…' : label;
  return (
    <text x={x} y={y + 8} width={120} textAnchor="end" fill="#cbd5e1" fontSize={11} fontWeight="bold">
      {display}
    </text>
  );
};

export const SerpChart: React.FC<SerpChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.threadsInTop10 - a.threadsInTop10).slice(0, 10);

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 20, left: 120, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" stroke="#94a3b8" allowDecimals={false} />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="#94a3b8"
            width={170}
            tick={<CustomYAxisTick />}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.2)' }} />
          <Bar dataKey="threadsInTop10" fill="#2dd4bf" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
