import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import BorderGlow from './BorderGlow';

const data = [
  { name: 'S1', Optimizacion: 30, Merma: 8.0 },
  { name: 'S2', Optimizacion: 45, Merma: 7.2 },
  { name: 'S3', Optimizacion: 50, Merma: 5.5 },
  { name: 'S4', Optimizacion: 70, Merma: 3.8 },
  { name: 'S5', Optimizacion: 85, Merma: 2.1 },
  { name: 'S6', Optimizacion: 100, Merma: 1.5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#16191f] border border-white/10 rounded-xl p-4 shadow-xl">
        <p className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">{label}</p>
        <p className="text-indigo-400 text-sm font-bold flex justify-between gap-4">
          <span>Eficiencia ETL:</span> 
          <span>{payload[0].value}%</span>
        </p>
        <p className="text-rose-400 text-sm font-bold flex justify-between gap-4 mt-1">
          <span>Pérdida de Stock:</span> 
          <span>{payload[1].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const StatsChart = () => {
    return (
        <BorderGlow glowColor="#4f46e5" containerClassName="w-full h-72 group hover:shadow-2xl transition-all" className="p-6 bg-[#16191f]">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Caso: Optimización DIA %</h4>
            <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 5, right: 10, left: -25, bottom: 25 }}
                    >
                    <defs>
                        <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.05} vertical={false} />
                    <XAxis 
                        dataKey="name" 
                        stroke="#718096" 
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis 
                        stroke="#718096" 
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                        dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '5 5' }} />
                    <Area 
                        type="monotone" 
                        dataKey="Optimizacion" 
                        stroke="#4f46e5" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorOpt)" 
                        activeDot={{ r: 6, fill: "#4f46e5", stroke: "#16191f", strokeWidth: 2 }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="Merma" 
                        stroke="#f43f5e" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorLoss)" 
                        activeDot={{ r: 6, fill: "#f43f5e", stroke: "#16191f", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </BorderGlow>
    );
};

export default StatsChart;