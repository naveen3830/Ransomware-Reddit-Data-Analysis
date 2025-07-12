/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

import React from 'react';
import { CATEGORIES_DATA, TOTALS } from './constants';
import StatCard from './components/StatCard';
import { CategoryTable } from './components/CategoryTable';
import { TrafficChart } from './components/TrafficChart';
import { SerpChart } from './components/SerpChart';
import { ThreadsIcon, TrafficIcon, KeywordIcon, CheckCircleIcon } from './components/Icons';
import { VersionInfo } from './components/VersionInfo';

const App: React.FC = () => {
  const filteredCategories = CATEGORIES_DATA.filter(d => d.name !== 'Other');

  // Top 6 categories by traffic
  const top6ByTraffic = [...filteredCategories]
    .sort((a, b) => b.sumOfTraffic - a.sumOfTraffic)
    .slice(0, 6);

  const filteredTotals = {
    threads: filteredCategories.reduce((sum, cat) => sum + cat.totalThreads, 0),
    traffic: filteredCategories.reduce((sum, cat) => sum + cat.sumOfTraffic, 0),
    keywords: filteredCategories.reduce((sum, cat) => sum + cat.sumOfKeywords, 0),
    serpTop10: filteredCategories.reduce((sum, cat) => sum + cat.threadsInTop10, 0),
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-300 font-sans p-2 sm:p-4 lg:p-6">
      <div className="w-full">
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Reddit data analysis for the keyword Ransomware
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            This dashboard analyzes Reddit data for the keyword "Ransomware". It provides a high-level overview and a detailed breakdown of key categories.
          </p>
        </header>

        <main className="space-y-8">
          {/* Top Level Stats */}
          <div className="space-y-4">
             <h2 className="text-2xl font-semibold text-white">Overall Statistics</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                  title="Total Reddit Threads" 
                  value={TOTALS.threads.toLocaleString()} 
                  icon={<ThreadsIcon />} 
                />
                <StatCard 
                  title="Total Traffic" 
                  value={TOTALS.traffic.toLocaleString()} 
                  icon={<TrafficIcon />}
                />
                <StatCard 
                  title="Total Keywords" 
                  value={TOTALS.keywords.toLocaleString()} 
                  icon={<KeywordIcon />}
                />
              </div>
          </div>
          
          {/* Filtered Category Breakdown */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white border-t border-slate-700 pt-6">Top 6 Sub Categories in Ransomware</h2>
            <p className="text-slate-400">From the total dataset, we've filtered and analyzed several key sub categories. The metrics below represent the data points within these specific groups.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                title="Total Reddit Threads" 
                value={filteredTotals.threads.toLocaleString()} 
                icon={<ThreadsIcon />} 
                />
                <StatCard 
                title="Sum of Traffic" 
                value={filteredTotals.traffic.toLocaleString()} 
                icon={<TrafficIcon />}
                />
                <StatCard 
                title="Sum of Keywords" 
                value={filteredTotals.keywords.toLocaleString()} 
                icon={<KeywordIcon />}
                />
                <StatCard 
                title="Threads in SERP Top 10" 
                value={filteredTotals.serpTop10.toLocaleString()} 
                icon={<CheckCircleIcon />}
                />
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-slate-800 p-2 sm:p-4 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-2">Detailed Subcategory Analysis</h2>
            <CategoryTable data={filteredCategories} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 h-[420px] flex flex-col">
                <h2 className="text-xl font-semibold text-white mb-2">Traffic by Category</h2>
                <div className="flex-1 min-h-0"><TrafficChart data={top6ByTraffic} /></div>
            </div>
             <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 h-[420px] flex flex-col">
                <h2 className="text-xl font-semibold text-white mb-2">Threads in SERP Top 10</h2>
                <div className="flex-1 min-h-0"><SerpChart data={top6ByTraffic} /></div>
            </div>
          </div>

        </main>
      </div>
      <VersionInfo />
    </div>
  );
};

export default App;