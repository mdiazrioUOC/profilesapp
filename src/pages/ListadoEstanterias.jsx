import { useState, useEffect } from 'react';
import { useParams,useLocation, useOutletContext } from 'react-router-dom';
import {List,
        ListItem,
        ListItemText,
        ListItemIcon,
        IconButton} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useNavigate } from 'react-router-dom';

import client from "@/aws.js";

function ListadoEstanterias() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    // Validate state exists
    if (!state || !state.inspection) {
        console.error("No inspection data provided");
        navigate(-1);
        return null;
    }

    const inspection = state.inspection;
    const [inspectionData, setInspectionData] = useState({
        cliente:{
            nombre:""
        },
        fecha: "",
        estanterias:[]
    });
    const { setNavLink, setHeader, setGoBack } = useOutletContext();

    useEffect(() => {
        setNavLink({
            pathname: `/new-shelf`,
            state: {
                inspection,
                from: "listadoEstanterias",
            },
        });
        setHeader("Estanterías");
        setGoBack(true)
        return () => {
          setNavLink(null)
          setHeader(null)
          setGoBack(null)
        };
      }, []);
    
    const selectionSet = ["estanterias.id", "estanterias.idExterno", "cliente.nombre", "fecha"]
    const fetchEstanterias = async () => {
        try {
            const {data, errors} = await client.models.DimInspeccion.get(
                {id: inspection.id},{selectionSet});
            setInspectionData(data);
            } catch (err) {
            console.error("Error fetching estanterías:", err);
        }
    };

    useEffect(() => {
        fetchEstanterias();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
        case 'pending':
            return <CheckCircleOutlineIcon className="text-navy-900" />;
        case 'reviewed':
            return <PendingActionsIcon className="text-gray" />;
        default:
            return null;
        }
    };

    const handleShelfClick = (estanteria) => {
        navigate(`/estanteria/${estanteria.id}`,{
            state: {
            estanteria,
            from: "listadoEstanterias",
            },
        });
    }

    return (
    
    <div>
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Box sx={{ justifySelf: "start" }}>
                <p className="text-navy-900">
                    {inspectionData.fecha}
                </p>
            </Box>
            <Box sx={{ justifySelf: "center" }}>
                <p className="font-roboto font-medium text-xl text-center text-navy-900">
                    {inspectionData.cliente.nombre}
                </p>
            </Box>
            <Box sx={{ justifySelf: "end" }}>
                <IconButton color="primary" aria-label="ajustes de la inspección">
                    <SettingsIcon/>
                </IconButton>
            </Box>
        </Box>
        <List>
        {inspectionData.estanterias.map((estanteria) => (
            <ListItem
            key={estanteria.id}
            component="button"
            onClick={() => handleShelfClick(estanteria)}
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
                primary={estanteria.idExterno}
            />
            <ListItemIcon sx={{ minWidth: 'auto', ml: 2 }}>
                {getStatusIcon('pending')}
            </ListItemIcon>
            </ListItem>
        ))}
        </List>
    </div>);
}

export default ListadoEstanterias;