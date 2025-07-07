
import React, { useState, useMemo } from 'react';
import { CategoryData } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './Icons';

interface CategoryTableProps {
  data: CategoryData[];
}

type SortKey = keyof CategoryData;
type SortDirection = 'ascending' | 'descending';

const SortableHeader: React.FC<{
    sortKey: SortKey;
    title: string;
    sortConfig: { key: SortKey; direction: SortDirection } | null;
    requestSort: (key: SortKey) => void;
}> = ({ sortKey, title, sortConfig, requestSort }) => {
    const isSorted = sortConfig?.key === sortKey;
    const directionIcon = isSorted ? (
        sortConfig.direction === 'ascending' ? <ArrowUpIcon /> : <ArrowDownIcon />
    ) : null;

    return (
        <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600 transition-colors"
            onClick={() => requestSort(sortKey)}
        >
            <div className="flex items-center space-x-1">
                <span>{title}</span>
                <span className="w-4 h-4">{directionIcon}</span>
            </div>
        </th>
    );
};


export const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const headers: {key: SortKey, title: string}[] = [
      { key: 'name', title: 'Category Name' },
      { key: 'totalThreads', title: 'Threads' },
      { key: 'sumOfTraffic', title: 'Traffic' },
      { key: 'sumOfKeywords', title: 'Keywords' },
      { key: 'avgKeywordPosition', title: 'Avg. Position' },
      { key: 'threadsInTop10', title: 'Threads in Top 10' },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-700/50">
          <tr>
            {headers.map(header => (
                 <SortableHeader 
                    key={header.key}
                    sortKey={header.key}
                    title={header.title}
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                 />
            ))}
          </tr>
        </thead>
        <tbody className="bg-slate-800 divide-y divide-slate-700">
          {sortedData.map((item) => (
            <tr key={item.name} className="hover:bg-slate-700/40 transition-colors">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{item.name}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.totalThreads.toLocaleString()}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.sumOfTraffic.toLocaleString()}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.sumOfKeywords.toLocaleString()}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.avgKeywordPosition.toFixed(1)}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.threadsInTop10.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
