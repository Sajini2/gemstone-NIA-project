import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { projectData } from '../data';

export default function MetricsDashboard() {
  const [sortConfig, setSortConfig] = useState({ key: 'r2', direction: 'desc' });

  const sortedComparison = [...projectData.comparison].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <span className="opacity-0 group-hover:opacity-40 ml-2">↕</span>;
    return sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4 ml-2 text-rose-400" /> : <ChevronDown className="inline w-4 h-4 ml-2 text-rose-400" />;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#292524]/90 backdrop-blur-md border border-stone-700 p-4 rounded-2xl shadow-xl shadow-black/50">
          <p className="text-stone-300 font-bold mb-2 text-sm">{`Generation: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm font-bold">
              {`${entry.name}: ${entry.value.toFixed(4)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Convergence Chart */}
      <section id="convergence" className="scroll-mt-32 lg:col-span-12 xl:col-span-5 h-full">
        <div className="h-full bg-[#292524]/80 backdrop-blur-3xl border border-stone-700/50 rounded-[40px] p-8 md:p-10 flex flex-col shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <h3 className="text-2xl font-black text-stone-100 mb-8 relative z-10 tracking-tight">Evolutionary Convergence</h3>
          
          <div className="flex-1 min-h-[350px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectData.convergence} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#44403c" vertical={false} />
                <XAxis dataKey="iteration" stroke="#78716c" tick={{ fill: '#a8a29e', fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#78716c" tick={{ fill: '#a8a29e', fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 600, color: '#d6d3d1' }} />
                <Line 
                  type="monotone" 
                  dataKey="ga_fitness" 
                  name="GA (Diamonds)" 
                  stroke="#fb7185" 
                  strokeWidth={4}
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#fb7185' }}
                  animationDuration={1500}
                />
                <Line 
                  type="monotone" 
                  dataKey="pso_fitness" 
                  name="PSO (Gemstone)" 
                  stroke="#fb923c" 
                  strokeWidth={4}
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#fb923c' }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="results" className="scroll-mt-32 lg:col-span-12 xl:col-span-7 h-full">
        <div className="h-full bg-[#292524]/80 backdrop-blur-3xl border border-stone-700/50 rounded-[40px] overflow-hidden p-8 md:p-10 flex flex-col shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
          <h3 className="text-2xl font-black text-stone-100 mb-8 tracking-tight">Performance Metrics</h3>
          
          <div className="overflow-x-auto flex-1 bg-[#1c1917] rounded-3xl border border-stone-800 shadow-inner">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#292524] text-stone-400 text-xs font-bold tracking-widest uppercase border-b border-stone-800">
                  <th className="px-6 py-5 cursor-pointer hover:bg-stone-800/50 transition-colors group" onClick={() => handleSort('model')}>
                    Model <SortIcon column="model" />
                  </th>
                  <th className="px-6 py-5">Dataset</th>
                  <th className="px-6 py-5 cursor-pointer hover:bg-stone-800/50 transition-colors group" onClick={() => handleSort('r2')}>
                    R² <SortIcon column="r2" />
                  </th>
                  <th className="px-6 py-5 cursor-pointer hover:bg-stone-800/50 transition-colors group" onClick={() => handleSort('rmse')}>
                    RMSE <SortIcon column="rmse" />
                  </th>
                  <th className="px-6 py-5 cursor-pointer hover:bg-stone-800/50 transition-colors group" onClick={() => handleSort('features')}>
                    Features <SortIcon column="features" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-400 text-sm font-medium">
                {sortedComparison.map((row) => (
                  <tr key={row.id} className="hover:bg-rose-500/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-stone-200">{row.model}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${row.dataset === 'Diamonds' ? 'bg-orange-500/20 text-orange-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {row.dataset}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-stone-100 text-base">
                      {row.r2.toFixed(4)}
                    </td>
                    <td className="px-6 py-4">{row.rmse.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{row.features}</span>
                        {row.method !== 'None' && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md uppercase font-bold tracking-wider">Reduced</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
