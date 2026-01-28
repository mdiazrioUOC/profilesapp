import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Stack,
         TextField,
         FormControlLabel,
         Switch,
         Box,
         Chip,
         Backdrop,
        CircularProgress,
        Snackbar, 
        Alert
} from "@mui/material";
import NumberField from "@/components/NumberField";
import { generateClient } from 'aws-amplify/data'
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { useNavigate } from "react-router-dom";

Amplify.configure(outputs);

const client = generateClient()

function NewClient(){
    const { setNavLink, setHeader, setGoBack } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        "nombre": "",
        "direccion": "",
        "nif": "",
        "fotos": true, 
        "perioricidad": 12
    });

    const handleCreateClient = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await client.models.DimCliente.create(formData);
            setSuccess(true);

            setTimeout(() => {
                navigate(-1);
                }, 1500);
        } catch (err) {
            console.error("Error creando cliente:", err);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div >
        <Backdrop
            open={loading}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(4px)",
            }}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
        
        <Stack gap={2} className="pt-6" alignItems="center">
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
                <Stack direction='row' justifyContent="space-between" alignItems='flex-end' className="w-full">
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
            <Chip
                label="Crear"
                clickable
                className="bg-primary text-white hover:bg-primary/80"
                sx={{ 
                    fontSize: "1rem", // tamaño de letra
                    padding: "1rem"
                }} 
                onClick={handleCreateClient}
            />
        </Stack>

        <Snackbar
        open={success}
        anchorOrigin={{vertical:"top",horizontal:"right" }}
        onClose={() => setSuccess(false)}
        sx={{
                top: 45, // 👈 píxeles desde arriba
                right: 30
        }}
        >
            <Alert severity="success">
                Cliente guardado correctamente
            </Alert>
        </Snackbar>
    </div>);
}

export default NewClient;