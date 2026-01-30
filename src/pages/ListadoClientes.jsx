import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import client from "@/aws.js";

import {List, 
        ListItem,
        ListItemText,
        ListItemIcon,
        TextField,
        InputAdornment,
        Typography} from '@mui/material';

import FormControl, { useFormControl } from '@mui/material/FormControl';

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

export default function ListadoClientes(){
    const [clientes, setClientes] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState([]);

    const { setNavLink, setHeader, setGoBack } = useOutletContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        setNavLink("/new-client");
        setHeader("Clientes");
        setGoBack(true)
        return () => {
            setNavLink(null)
            setHeader(null)
            setGoBack(null)
        };
        }, []);

    const selectionSet = ['id', 'nombre'];

    const fetchClientes = async () => {
        try {
            const {data, errors} = await    client.models.DimCliente.list({selectionSet});
            setClientes(data);
            setClientesFiltrados(data);
            } catch (err) {
            console.error("Error fetching clientes:", err);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleClientClick = (client) => {
        navigate(`/cliente/${client.id}`,{
            state: {
            client,
            from: "listadoClientes",
            },
        });
    }

    const filtrarClientes =(valorBusqueda)=>{
        const resultados = clientes.filter((cliente) =>
            cliente.nombre
            .toLowerCase()
            .includes(valorBusqueda.toLowerCase())
        );
        setClientesFiltrados(resultados)
        setBusqueda(valorBusqueda)
    }

    return (
        <>
        <TextField
            fullWidth
            label="Buscar cliente"
            variant="outlined"
            value={busqueda}
            onChange={(e) => filtrarClientes(e.target.value)}
            margin="normal"
            className="bg-white hover:shadow-lg transition-shadow cursor-pointer mb-4 rounded-lg border border-gray-300"
            size="small"
            slotProps={{
                input: {
                    endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                },
            }}
            sx={{
            "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": {
                borderRadius: "20px",
                },
                "&:hover fieldset": {
                borderRadius: "20px",
                },
                "&.Mui-focused fieldset": {
                borderRadius: "20px",
                },
            },
            boxShadow: "none",
            }}
        />
        
        {clientesFiltrados.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          No se encontraron clientes
        </Typography>
      ) : (<List>
                {clientesFiltrados.map((cliente) => (
                    <ListItem
                    key={cliente.id}
                    component="button"
                    onClick={() => handleClientClick(cliente)}
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
                        primary={cliente.nombre}
                    />
                    <ListItemIcon sx={{ minWidth: 'auto', ml: 2 }}>
                        <BorderColorOutlinedIcon/>
                    </ListItemIcon>
                    </ListItem>
                ))}
        </List>)}
    </>
    );
}