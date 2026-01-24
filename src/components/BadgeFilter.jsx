import React, { useState } from 'react';
import { Chip } from '@mui/material';

const BadgeFilter = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Todas');

  const tabs = [
    'Todas',
    'Programadas',
    'P. Presupuesto',
    'Recomendadas',
    'Finalizadas'
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <nav className="bg-white px-4 py-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            size="small"
            onClick={() => handleTabClick(tab)}
            className={`${
              activeTab === tab
                ? 'bg-navy-900 text-white'
                : 'bg-blue-50 text-navy-900'
            } px-4 py-2 font-small`}
            sx={{
              bgcolor: activeTab === tab ? '#000080' : '#E3F2FD',
              color: activeTab === tab ? '#fff' : '#000080',
              '&:hover': {
                bgcolor: activeTab === tab ? '#000066' : '#BBDEFB',
              },
              fontSize: '0.95rem',
              fontWeight: 500,
            }}
          />
        ))}
      </div>
    </nav>
  );
};

export default BadgeFilter;