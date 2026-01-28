import { Stack,
         TextField,
         FormControlLabel,
         Switch,
         Box,
         Chip
} from "@mui/material";
import NumberField from "@/components/NumberField";

const commonStyles = {
    border: 1,
    px:1,
    bgcolor: 'background.paper',
    borderColor: '#bbbdc0',
    display:'flex'
    };
    
export default function NewClientForm({formData, setFormData, handleChangeForm}){
    return (
    <>
        <TextField
            label="Nombre del cliente"
            value={formData.tecnico}
            onChange={handleChangeForm("nombre")}
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
            onChange={handleChangeForm("direccion")}
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
            onChange={handleChangeForm("nif")}
            required
            color='primary'
            className="w-full"
            sx = {{ 
            boxShadow: 1,
            borderColor: 'primary.main'
            }}
        />
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
    </>)
}