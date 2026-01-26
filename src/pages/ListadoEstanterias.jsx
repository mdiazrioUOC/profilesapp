import { useEffect } from 'react';
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

const equiposAlmacenajeMock = [
  { id: 0, nombre: "Equipo almacenaje 1", status: 'pending' },
  { id: 1, nombre: "Equipo almacenaje 2", status: 'reviewed' },
  { id: 2, nombre: "Equipo almacenaje 3", status: 'pending' },
  { id: 3, nombre: "Equipo almacenaje 4", status: 'pending' },
  { id: 4, nombre: "Equipo almacenaje 5", status: 'pending' },
  { id: 5, nombre: "Equipo almacenaje 6", status: 'reviewed' },
  { id: 6, nombre: "Equipo almacenaje 7", status: 'reviewed' },
  { id: 7, nombre: "Equipo almacenaje 8", status: 'reviewed' },
  { id: 8, nombre: "Equipo almacenaje 9", status: 'pending' },
  { id: 9, nombre: "Equipo almacenaje 10", status: 'pending' },
];

function ListadoEstanterias() {
    const { id } = useParams();
    const { state } = useLocation();
    const inspection = state.inspection;

    const { setNavLink, setHeader, setGoBack } = useOutletContext();
  
    const navigate = useNavigate();

    useEffect(() => {
        setNavLink("/new-shelf");
        setHeader("Estanterías");
        setGoBack(true)
        return () => {
          setNavLink(null)
          setHeader(null)
          setGoBack(null)
        };
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
                    {inspection.date}
                </p>
            </Box>
            <Box sx={{ justifySelf: "center" }}>
                <p className="font-roboto font-medium text-xl text-center text-navy-900">
                    {inspection.clientName}
                </p>
            </Box>
            <Box sx={{ justifySelf: "end" }}>
                <IconButton color="primary" aria-label="ajustes de la inspección">
                    <SettingsIcon/>
                </IconButton>
            </Box>
        </Box>
        <List>
        {equiposAlmacenajeMock.map((estanteria) => (
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
                primary={estanteria.nombre}
            />
            <ListItemIcon sx={{ minWidth: 'auto', ml: 2 }}>
                {getStatusIcon(estanteria.status)}
            </ListItemIcon>
            </ListItem>
        ))}
        </List>
    </div>);
}

export default ListadoEstanterias;