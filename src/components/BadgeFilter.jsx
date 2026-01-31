import React, { useState } from 'react';
import { Chip } from '@mui/material';

const BadgeFilter = ({ filters, setFilters }) => {
  // const [activeTab, setActiveTab] = useState('Todas');
  const tabs = [
    'Programada',
    'P. Presupuesto',
    'P. Programación',
    'Recomendadas',
    'Finalizadas'
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const handleChangeForm = (tab) => (event, value) => {
      const exists = filters.estados.includes(tab);

      const new_filters = {...filters,
        estados: exists
        ? filters.estados.filter((e) => e !== tab)
        : [...filters.estados, tab],
      }
      
      setFilters(new_filters);
  };   

  return (
    <nav className="bg-white px-4 py-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            size="small"
            onClick={handleChangeForm(tab)}
            className={`${
              filters.estados.includes(tab)
                ? 'bg-navy-900 text-white'
                : 'bg-blue-50 text-navy-900'
            } px-2 py-2 font-small`}
            sx={{
              bgcolor: filters.estados.includes(tab) ? '#000080' : '#E3F2FD',
              color: filters.estados.includes(tab) ? '#fff' : '#000080',
              '&:hover': {
                bgcolor: filters.estados.includes(tab) ? '#000066' : '#BBDEFB',
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