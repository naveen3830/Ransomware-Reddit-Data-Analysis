import React, { useState, useMemo, useEffect } from 'react';
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

// Helper to parse CSV and get up to 2 non-archived URLs per category
const getCategoryUrls = async (): Promise<Record<string, string[]>> => {
  const response = await fetch('Reddit_Archived.csv');
  const text = await response.text();
  const lines = text.split('\n');
  const header = lines[0].split(',');
  const urlIdx = header.indexOf('URL');
  const catIdx = header.indexOf('Category');
  const archIdx = header.indexOf('reddit_is_archived');
  const map: Record<string, string[]> = {};
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    if (row.length < Math.max(urlIdx, catIdx, archIdx) + 1) continue;
    if (row[archIdx]?.trim().toLowerCase() === 'no') {
      const cat = row[catIdx]?.trim();
      if (!map[cat]) map[cat] = [];
      if (map[cat].length < 2) map[cat].push(row[urlIdx]);
    }
  }
  return map;
};

export const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [categoryUrls, setCategoryUrls] = useState<Record<string, string[]>>({});

  useEffect(() => {
    getCategoryUrls().then(setCategoryUrls);
  }, []);

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
    } else {
      // Default sort by sumOfTraffic descending
      sortableData.sort((a, b) => b.sumOfTraffic - a.sumOfTraffic);
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
      { key: 'totalThreads', title: 'No of THREADS' },
      { key: 'sumOfTraffic', title: 'Total Traffic' },
      { key: 'sumOfKeywords', title: 'No of Keywords' },
      { key: 'avgKeywordPosition', title: 'Avg. SERP Position' },
      { key: 'threadsInTop10', title: 'No of Threads in Top 10' },
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
            <React.Fragment key={item.name}>
              <tr className="hover:bg-slate-700/40 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                  <button
                    className="mr-2 text-cyan-400 hover:underline"
                    onClick={() => setExpanded(e => ({ ...e, [item.name]: !e[item.name] }))}
                  >
                    {(expanded[item.name] ?? false) ? '▼' : '▶'}
                  </button>
                  {item.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.totalThreads.toLocaleString()}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.sumOfTraffic.toLocaleString()}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.sumOfKeywords.toLocaleString()}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.avgKeywordPosition.toFixed(1)}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300 text-center">{item.threadsInTop10.toLocaleString()}</td>
              </tr>
              {(expanded[item.name] ?? false) && (categoryUrls[item.name] ?? []).length > 0 && (
                <tr>
                  <td colSpan={6} className="px-4 pb-4 pt-0">
                    <div className="bg-slate-700/40 rounded-lg p-3">
                      <div className="font-semibold text-slate-200 mb-1">Sample Reddit Threads:</div>
                      <ul className="list-disc pl-6">
                        {(categoryUrls[item.name] ?? []).map((url, idx) => (
                          <li key={url}>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline break-all">{url}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
