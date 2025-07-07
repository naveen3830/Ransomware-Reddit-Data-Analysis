import React from 'react';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';
import { CategoryData } from '../types';
import type { TreemapNode } from 'recharts/types/chart/Treemap';

interface TrafficChartProps {
  data: CategoryData[];
}

// Color palette for up to 10 categories
const COLORS = [
  '#06b6d4', '#818cf8', '#fbbf24', '#34d399', '#f472b6', '#f87171', '#a78bfa', '#facc15', '#38bdf8', '#f59e42'
];

const CustomTreemapContent = (props: TreemapNode) => {
  const { x, y, width, height, index, payload } = props;
  const name = payload?.name;
  const value = payload?.sumOfTraffic;
  const color = COLORS[index % COLORS.length];
  const showLabel = width > 80 && height > 40;
  const showValue = width > 60 && height > 24;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        stroke="#334155"
        rx={10}
        style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.10))' }}
      />
      {showLabel && name && (
        <text
          x={x + width / 2}
          y={y + height / 2 - 6}
          textAnchor="middle"
          fill="#fff"
          fontSize={16}
          fontWeight="bold"
          style={{ pointerEvents: 'none' }}
        >
          {name.length > 18 ? name.slice(0, 16) + '…' : name}
        </text>
      )}
      {showValue && value !== undefined && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 16}
          textAnchor="middle"
          fill="#e0e7ef"
          fontSize={14}
          fontWeight="bold"
          style={{ pointerEvents: 'none' }}
        >
          {value.toLocaleString()}
        </text>
      )}
    </g>
  );
};

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
  const sortedData = [...data]
    .sort((a, b) => b.sumOfTraffic - a.sumOfTraffic)
    .slice(0, 10)
    .map((item, idx) => ({ ...item, size: item.sumOfTraffic, color: COLORS[idx % COLORS.length] }));

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <Treemap
          data={sortedData}
          dataKey="size"
          nameKey="name"
          stroke="#334155"
          aspectRatio={4 / 3}
          content={CustomTreemapContent}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};
