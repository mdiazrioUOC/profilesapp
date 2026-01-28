import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Stack,
         TextField,
         FormControlLabel,
         Switch,
         FormLabel,
         Checkbox,
         Box
} from "@mui/material";
import NumberField from "@/components/NumberField";

function NewClient(){
    const { setNavLink, setHeader, setGoBack } = useOutletContext();
    const [formData, setFormData] = useState({
        "nombre": "",
        "direccion": "",
        "nif": "",
        "fotos": true, 
        "perioricidad": 12
    });

    const commonStyles = {
        border: 1,
        px:1,
        bgcolor: 'background.paper',
        borderColor: '#bbbdc0',
        display:'flex'
        };

    useEffect(() => {
        setHeader("Nuevo Cliente");
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

    return (
    <Stack gap={2} className="pt-6">
        <TextField
            label="Nombre del cliente"
            value={formData.tecnico}
            onChange={handleChange("nombre")}
            required
            color='primary'
            className="w-full"
            sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
            }}
        />
        <TextField
            label="Dirección Fiscal"
            value={formData.tecnico}
            onChange={handleChange("direccion")}
            required
            color='primary'
            className="w-full"
            sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
            }}
        />
        <TextField
            label="NIF"
            value={formData.tecnico}
            onChange={handleChange("nif")}
            required
            color='primary'
            className="w-full"
            sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
            }}
        />
            {/* <div> */}
            {/* <FormLabel component="legend" size="big">Label placement</FormLabel>

            <FormControlLabel control={<Switch defaultChecked />}
/></div> */}
            <Stack direction='row' justifyContent="space-between" alignItems='flex-end'>
            <div className="max-w-[100px]">
                <NumberField
                    label="Perioricidad"
                    value={formData.perioricidad}
                    other = {{min:0}}
                    unit = "meses"
                    onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, perioricidad: value }));
                    }}
                    showButtons={false}
                    showLabels = {true}
                />
            </div>
            <Box sx={{ ...commonStyles, borderRadius: '4px' }}>
            <FormControlLabel control={<Switch defaultChecked />} label="Fotos" />
            </Box> 
</Stack>
    </Stack>);
}

export default NewClient;