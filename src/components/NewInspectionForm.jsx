import {useState, useEffect} from "react";
import {
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import client from "@/aws.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import PROVINCIAS from '@/data/provincias'



export default function NewInspectionForm({formData, handleChangeForm, setFormData}){

    const [clientes, setClientes] = useState([]);

    const selectionSet = ['id', 'nombre'];

    const fetchClientes = async () => {
        try {
        const {data, errors} = await client.models.DimCliente.list({selectionSet});
        setClientes(data);
        } catch (err) {
        console.error("Error fetching clientes:", err);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const roles = [
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
    ];
    
    const estados = [
      { value: "programada", label: "Programada" },
      { value: "realizada", label: "Realizada" },
    ]
    
    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TextField
          select
          label="Técnico Responsable"
          value={formData.tecnico}
          onChange={handleChangeForm("tecnico")}
          required
          color='primary'
          className="w-full"
          sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
           }}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Cliente"
          value={formData.id_cliente}
          onChange={handleChangeForm("id_cliente")}
          required
          color='primary'
          className="w-full"
          sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
           }}
        >
          {clientes.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Nombre de la Planta"
          value={formData.nombrePlanta}
          onChange={handleChangeForm("nombrePlanta")}
          required
          color='primary'
          className="w-full"
          sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
           }}
        />

        <TextField
          label="Dirección física"
          value={formData.direccion}
          onChange={handleChangeForm("direccion")}
          required
          color='primary'
          className="w-full"
          sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
           }}
        />

        <Autocomplete
          options={PROVINCIAS.map(x => x.nombre)}
          inputValue={formData.provincia}
          onInputChange={handleChangeForm("provincia")}
          renderInput={(params) => (
            <TextField {...params} label="Provincia" />
          )}
          color='primary'
          className="w-full"
          sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
           }}
        />

        <TextField
          label="Número de informe"
          value={formData.numeroInforme}
          onChange={handleChangeForm("numeroInforme")}
          required
          color='primary'
          className="w-full"
          sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
           }}
        />

        {/* Date Picker */}
        <DatePicker
          label="Fecha"
          value={formData.fecha}
          onChange={(newValue) =>
            setFormData((prev) => ({ ...prev, fecha: newValue }))
          }
          color='primary'
          className="w-full"
          sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
           }}
        />

        <TextField
          select
          label="Estado"
          value={formData.estado}
          onChange={handleChangeForm("estado")}
          required
          color='primary'
          className="w-full"
          sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
           }}
        >
          {estados.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </LocalizationProvider>
    )
}