import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionIcon from '@mui/icons-material/Description';

const InspectionList = ({ inspections }) => {
  const navigate = useNavigate();

  const handleInspectionClick = (inspection) => {
    navigate(`/inspection/${inspection.id}`,{
        state: {
          inspection,
          from: "listadoInspecciones",
        },
      });
  };
  const getestadoIcon = (estado) => {
    switch (estado) {
      case 'pendiente':
        return <RefreshIcon className="text-red-600 w-8 h-8" />;
      case 'realizada':
        return <CheckCircleIcon className="text-navy-900 w-8 h-8" />;
      case 'programada':
        return <EventIcon className="text-navy-900 w-8 h-8" />;
      case 'presupuesto':
        return <EventAvailableIcon className="text-navy-900 w-8 h-8" />;
      case 'finalizada':
        return <DescriptionIcon className="text-navy-900 w-8 h-8" />;
      default:
        return null;
    }
  };
  const opciones = { day: "numeric", month: "short", year: "numeric" };

  return (
    <List className="min-h-screen bg-white">
      {inspections.map((inspection) => (
        <ListItem
          key={inspection.id}
          component="button"
          onClick={() => handleInspectionClick(inspection)}
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
            primary={inspection.cliente.nombre}
            secondary={inspection.provincia + ", " + inspection.fecha.toLocaleDateString("es-ES", opciones)}
            className="text-navy-900"
            slotProps={{
              primary: {
                fontWeight: 500,
              }
            }}
          />
          <ListItemIcon sx={{ minWidth: 'auto', ml: 2 }}>
            {getestadoIcon(inspection.estado)}
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
};

export default InspectionList;