import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from 'aws-amplify/data'
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { useOutletContext } from "react-router-dom";
import {
  TextField,
  Chip,
  MenuItem,
  Stack,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PROVINCIAS from '@/data/provincias'

// Amplify.configure(outputs);

// const client = generateClient()

export default function NewInspection() {

  const { setNavLink, setHeader, setGoBack } = useOutletContext();

  const [formData, setFormData] = useState({
    tecnico: "",
    cliente: "",
    nombrePlanta: "",
    direccion: "",
    provincia: "",
    numeroInforme: "",
    fecha: null,
    estado: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    setHeader("Nueva Inspección");
    setGoBack(true)
    return () => {
      setNavLink(null)
      setHeader(null)
      setGoBack(null)
    };
  }, []);

  const handleChange = (field) => (event, value) => {
    console.log(event, value)
    setFormData((prev) => ({
      ...prev,
      [field]: event?.target ? event.target.value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate(-1)
  };

  // const [clientes, setClientes] = useState([]);
  // const [selectedCliente, setSelectedCliente] = useState("");
  // const [showNewClienteForm, setShowNewClienteForm] = useState(false);
  // const [newClienteName, setNewClienteName] = useState("");
  // const [date, setDate] = useState("");

  // const fetchClientes = async () => {
  //   try {
  //     const result = await client.models.DimCliente.list();
  //     console.log(result)
  //     setClientes(result.data);
  //   } catch (err) {
  //     console.error("Error fetching clientes:", err);
  //   }
  // };
  // useEffect(() => {
  //   fetchClientes();
  // }, []);

  // const handleCreateInspeccion = async (e) => {
  //   e.preventDefault();
  //   if (!selectedCliente || !date) return;

  //   try {
  //     await client.models.DimInspeccion.create({
  //       id_client: selectedCliente,
  //       date: date
  //     });
  //     alert("Inspección creada con éxito ✅");
  //     setSelectedCliente("");
  //     setDate("");
  //   } catch (err) {
  //     console.error("Error creando inspección:", err);
  //   }
  // };

const countries = ["Spain", "France", "Germany", "Italy"];
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
      <Stack
        gap={2}
        sx={{
          alignItems: "center",
        }}
        className="pt-6"
      >

        <TextField
          select
          label="Técnico Responsable"
          value={formData.tecnico}
          onChange={handleChange("tecnico")}
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
          value={formData.cliente}
          onChange={handleChange("cliente")}
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

        {/* Text input */}
        <TextField
          label="Nombre de la Planta"
          value={formData.nombrePlanta}
          onChange={handleChange("nombrePlanta")}
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
          onChange={handleChange("direccion")}
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
          onInputChange={handleChange("provincia")}
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
          onChange={handleChange("numeroInforme")}
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
          onChange={handleChange("estado")}
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

      <Chip
        label="Crear"
        clickable
        className="bg-primary text-white hover:bg-primary/80"
        sx={{ 
          width: "fit-content" , 
          fontSize: "1rem", // tamaño de letra
          }} 
        onClick={handleSubmit}
      />
      </Stack>
    </LocalizationProvider>
  );
}