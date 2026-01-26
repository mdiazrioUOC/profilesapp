import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import {List,
        ListItem,
        ListItemText,
        ListItemIcon
} from "@mui/material";

export default function SettingsMenu (){
    const navigate = useNavigate()

    const { setNavLink, setHeader, setGoBack } = useOutletContext();

    useEffect(() => {
        setHeader("Ajustes");
        setGoBack(false)
        return () => {
          setNavLink(null)
          setHeader(null)
          setGoBack(null)
        };
      }, []);

    const settings = [
        {id: "clients", onClick: ()=>navigate("/clients"), title:"Administrar Clientes"},
        {id: "new-template", onClick: ()=>navigate("/new-template"), title:"Modificar plantilla del informe"}
    ]

    return (
         <List>
            {settings.map(x => 
            <ListItem
                    key={x.id}
                    component="button"
                    onClick={x.onClick}
                    className="bg-white hover:shadow-lg transition-shadow cursor-pointer mb-4 rounded-lg border border-navy-900"
                    sx={{
                        borderRadius: '8px',
                        mb: 2,
                        '&:hover': {
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        },
                    }}
                    >
                    <ListItemText
                        primary={x.title}
                        className="text-navy-900"
                    />
                    <ListItemIcon sx={{ minWidth: 'auto', ml: 2 }} className="text-navy-900">
                        <EastOutlinedIcon/>
                    </ListItemIcon>
            </ListItem>)}
        </List>
    )
}