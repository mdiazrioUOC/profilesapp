import React from "react";
import {useState, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Stack,
         Backdrop,
         CircularProgress,
         Snackbar, 
         Alert,
         Chip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import SaveIcon from '@mui/icons-material/Save';

function CustomForm({ titulo, saveFunction, formData, setFormData, children, new: isNew = true, originalData }){
    const { setNavLink, setHeader, setGoBack } = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const navigate = useNavigate();

    const handleChangeForm = (field) => (event, value) => {
        setFormData((prev) => ({
        ...prev,
        [field]: event?.target ? event.target.value : value,
        }));
    };

    const handleSaveForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Formatear la fecha si existe (convertir dayjs a string YYYY-MM-DD)
            const dataToSave = { ...formData };
            if (dataToSave.fecha && typeof dataToSave.fecha === 'object' && dataToSave.fecha.format) {
                dataToSave.fecha = dataToSave.fecha.format('YYYY-MM-DD');
            }

            await saveFunction(dataToSave);
            setSuccess(true);

            setTimeout(() => {
                navigate(-1);
                }, 1500);
        } catch (err) {
            console.error("Error creando registro:", err);
            console.error("Detalles del error:", err.errors || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUndoChanges = () => {
        if (originalData) {
            setFormData(originalData);
        }
    };

    // Verificar si hay cambios comparando formData con originalData
    const hasChanges = useMemo(() => {
        if (!originalData) return false;
        return JSON.stringify(formData) !== JSON.stringify(originalData);
    }, [formData, originalData]);

    // Clonamos los hijos para pasarles la prop saveForm
    const childrenWithProps = React.Children.map(children, (child) => {
        // Solo pasamos props si es un elemento React válido
        if (React.isValidElement(child)) {
        return React.cloneElement(child, {handleChangeForm });
        }
        return child;
    });

    useEffect(() => {
        setHeader(titulo);
        setGoBack(true);
        return () => {
          setNavLink(null);
          setHeader(null);
          setGoBack(null);
        };
      }, []);


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
            {childrenWithProps}
            {isNew ? (
                <Chip
                    label="Crear"
                    clickable
                    className="bg-primary text-white hover:bg-primary/80"
                    sx={{
                        fontSize: "1rem", // tamaño de letra
                        padding: "1rem"
                    }}
                    onClick={handleSaveForm}
                />
            ) : hasChanges ? (
                <Stack direction="row" gap={2} className="pt-4">
                    <Chip
                        label="Deshacer"
                        icon={<UndoOutlinedIcon />}
                        clickable
                        variant="outlined"
                        color="primary"
                        sx={{
                            fontSize: "1rem",
                            padding: "1rem"
                        }}
                        onClick={handleUndoChanges}
                    />
                    <Chip
                        label="Guardar"
                        clickable
                        className="bg-primary text-white hover:bg-primary/80"
                        icon={<SaveIcon sx={{color: '#fff !important'}} />}
                        sx={{
                            fontSize: "1rem",
                            padding: "1rem",
                            '& .MuiChip-icon': {
                                color: '#fff !important'
                            }
                        }}
                        onClick={handleSaveForm}
                    />
                </Stack>
            ) : null}
        </Stack>

        <Snackbar
        open={success}
        anchorOrigin={{vertical:"top",horizontal:"right" }}
        onClose={() => setSuccess(false)}
        sx={{
                top: 45,
                right: 30
        }}
        >
            <Alert severity="success">
                Registro guardado correctamente
            </Alert>
        </Snackbar>
    </div>);
}

export default CustomForm;