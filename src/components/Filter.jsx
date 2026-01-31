import React, { useState, useEffect } from 'react';
import client from "@/aws.js";

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
        

const Filters = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  
  const toggleDrawer = (isOpen) => (event) => {
    setIsOpen(!isOpen)
  };

  const selectionSet = ['id', 'nombre'];

  const fetchClientes = async () => {
      try {
          const {data, errors} = await    client.models.DimCliente.list({selectionSet});
          setClientes(data);
          console.log(data)
          } catch (err) {
          console.error("Error fetching clientes:", err);
      }
  };

  useEffect(() => {
      fetchClientes();
  }, []);


  const handleChangeForm = (field) => (event, value) => {
        const new_filters = {...filters,
          [field]: value ? value : event.target.value
        }
        setFilters(new_filters);
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
              onChange={handleChangeForm("provincias")}
              renderInput={(params) => (
                <TextField {...params} label="Provincia" />
              )}
            />
            <Autocomplete
              multiple
              id="filtro-cliente"
              options={clientes}
              getOptionLabel={(option) => option.nombre}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={handleChangeForm("clientes")}
              renderInput={(params) => (
                <TextField {...params} label="Cliente" />
              )}
            />
          </Stack>
          <div className={filters.fechas ? "pt-5" : "pt-2"}>
          <FloatLabel className="w-full">
              <Calendar inputId="filtro_fecha" value={filters.fechas} onChange={handleChangeForm("fechas")} selectionMode="range" readOnlyInput hideOnRangeSelection locale="es" className="w-full p-3" showButtonBar/>
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