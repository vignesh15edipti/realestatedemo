import React from 'react';

const DashboardCard = ({ title, value, icon, color = 'amber' }) => {
  const colorMap = {
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      iconBg: 'bg-amber-100 text-amber-600',
    },
    slate: {
      bg: 'bg-slate-50',
      text: 'text-slate-800',
      border: 'border-slate-100',
      iconBg: 'bg-slate-200 text-slate-700',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
  };

  const theme = colorMap[color] || colorMap.amber;

  return (
    <div className={`bg-white p-6 rounded-xl border ${theme.border} shadow-sm flex items-center justify-between transition-all duration-300 hover:shadow-md`}>
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">{title}</span>
        <span className="text-3xl font-black text-slate-900 block">{value}</span>
      </div>
      <div className={`p-4 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
