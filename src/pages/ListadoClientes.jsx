import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const clientes =[
    {id:0, nombre:"Cliente 1"}, 
    {id:1, nombre:"Cliente 2"},
    {id:2, nombre:"Cliente 3"},
    {id:3, nombre:"Cliente 4"}]

import {List, 
        ListItem,
        ListItemText,
        ListItemIcon} from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useNavigate } from "react-router-dom";

export default function ListadoClientes(){

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

    const handleClientClick = (client) => {
        navigate(`/cliente/${client.id}`,{
            state: {
            client,
            from: "listadoClientes",
            },
        });
    }

    return (
        <List>
                {clientes.map((cliente) => (
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
        </List>
    );
}