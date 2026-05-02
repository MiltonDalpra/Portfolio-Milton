import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import BorderGlow from './BorderGlow';

const data = [
  { name: 'Trimestre 1', Operacion: 20, Rentabilidad: 10 },
  { name: 'Trimestre 2', Operacion: 45, Rentabilidad: 25 },
  { name: 'Trimestre 3', Operacion: 75, Rentabilidad: 60 },
  { name: 'Trimestre 4', Operacion: 95, Rentabilidad: 85 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#16191f] border border-white/10 rounded-xl p-4 shadow-xl">
        <p className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest">{label}</p>
        <p className="text-[#0ea5e9] text-sm font-bold flex justify-between gap-6">
          <span>Eficiencia Operativa:</span> 
          <span>+{payload[0].value}%</span>
        </p>
        <p className="text-[#10b981] text-sm font-bold flex justify-between gap-6 mt-1">
          <span>Rentabilidad (ROI):</span> 
          <span>+{payload[1].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const ProfitChart = () => {
    return (
        <BorderGlow glowColor="#10b981" containerClassName="w-full h-72 group hover:shadow-2xl transition-all" className="p-6 bg-[#16191f]">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Caso: Impacto Directo en Facturación</h4>
            <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 10, left: -25, bottom: 25 }}
                    >
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
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                    <Bar 
                        dataKey="Operacion" 
                        fill="#0ea5e9" 
                        radius={[4, 4, 0, 0]} 
                        barSize={20}
                    />
                    <Bar 
                        dataKey="Rentabilidad" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]} 
                        barSize={20}
                    />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </BorderGlow>
    );
};

export default ProfitChart;
