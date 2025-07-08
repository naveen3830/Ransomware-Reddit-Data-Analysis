import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { CategoryData } from '../types';

interface TrafficChartProps {
  data: CategoryData[];
}

// Color palette for up to 10 categories
const COLORS = [
  '#06b6d4', '#818cf8', '#fbbf24', '#34d399', '#f472b6', '#f87171', '#a78bfa', '#facc15', '#38bdf8', '#f59e42'
];

const CustomTooltip: React.FC<{ active?: boolean; payload?: any[] }> = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0].payload) {
    const { name, sumOfTraffic } = payload[0].payload;
    return (
      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-600 backdrop-blur-sm">
        <p className="text-white font-semibold">{name}</p>
        <p className="text-cyan-400">Traffic: {sumOfTraffic.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export const TrafficChart: React.FC<TrafficChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.sumOfTraffic - a.sumOfTraffic);

  return (
    <div style={{ width: '100%', height: 420 }}>
      <ResponsiveContainer>
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            interval={0}
            height={120}
            tick={props => {
              const { x, y, payload } = props;
              const label = payload.value;
              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#cbd5e1"
                    fontSize={12}
                    fontWeight="bold"
                    transform="rotate(-35)"
                  >
                    {label.length > 32 ? label.slice(0, 30) + '…' : label}
                  </text>
                </g>
              );
            }}
          />
          <YAxis
            stroke="#94a3b8"
            allowDecimals={false}
            label={{ value: 'Traffic', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="sumOfTraffic" fill="#06b6d4">
            {sortedData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
