import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionIcon from '@mui/icons-material/Description';

const InspectionList = ({ inspections }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <RefreshIcon className="text-red-600 w-8 h-8" />;
      case 'completed':
        return <CheckCircleIcon className="text-blue-900 w-8 h-8" />;
      case 'scheduled':
        return <EventIcon className="text-blue-900 w-8 h-8" />;
      case 'to-schedule':
        return <EventAvailableIcon className="text-blue-900 w-8 h-8" />;
      case 'report':
        return <DescriptionIcon className="text-blue-900 w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <List className="min-h-screen bg-white">
      {inspections.map((inspection) => (
        <ListItem
          key={inspection.id}
          className="bg-white hover:shadow-lg transition-shadow cursor-pointer mb-4 rounded-lg border border-gray-300"
          sx={{
            borderRadius: '8px',
            mb: 2,
            '&:hover': {
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <ListItemText
            primary={inspection.clientName}
            secondary={inspection.date}
            slotProps={{
              primary: {
                fontWeight: 'bold',
                color: '#051479',
                fontSize: '1rem',
              },
              secondary: {
                color: '#666',
                fontSize: '0.875rem',
              },
            }}
          />
          <ListItemIcon sx={{ minWidth: 'auto', ml: 2 }}>
            {getStatusIcon(inspection.status)}
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
};

export default InspectionList;