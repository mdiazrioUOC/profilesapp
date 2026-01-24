import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import PROVINCIAS from '@/data/provincias'
import { Calendar } from 'primereact/calendar';
import { addLocale} from 'primereact/api';
import { FloatLabel } from 'primereact/floatlabel';
import { Autocomplete } from '@mui/material';
        
addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar',
    //...
});
        

const Filters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    dateRange: ''
  });

  const [dates, setDates] = useState('');
  
  const toggleDrawer = (isOpen) => (event) => {
    setIsOpen(!isOpen)
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end pt-3 bg-white">
        <button
          onClick={toggleDrawer(isOpen)}
          className="flex items-center gap-2 text-navy-900 font-medium-thin"
        >
          <FilterListAltIcon />
          <span>Filtros</span>
          {!isOpen ? <ExpandMoreIcon />: <ExpandLessIcon/>}
        </button>
      </div>

      <div className={`items-center ${!isOpen ? "hidden" : ""}`}>
        <div className="py-2">
          <Stack spacing={1}>
            <Autocomplete
              multiple
              id="filtro-provincia"
              options={PROVINCIAS}
              getOptionLabel={(option) => option.nombre}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Provincia" />
              )}
            />
            <Autocomplete
              multiple
              id="filtro-cliente"
              options={PROVINCIAS}
              getOptionLabel={(option) => option.nombre}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Cliente" />
              )}
            />
          </Stack>
          <div className={dates=='' ? "pt-2" : "pt-5"}>
          <FloatLabel className="w-full">
              <Calendar inputId="filtro_fecha" value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection locale="es" className="w-full p-3" showButtonBar/>
              <label htmlFor="filtro_fecha">Fecha Inicio - Fecha Fin</label>
          </FloatLabel>
          </div >
        </div>
        <Divider/>
      </div>
    </>
  );
};

export default Filters;