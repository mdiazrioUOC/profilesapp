import { useState, useEffect } from 'react';
import {Stack,
        Box,
        List,
        TextField, 
        Autocomplete,
        Divider, 
        IconButton} from '@mui/material';
import NumberField from '@/components/NumberField';
import AddIcon from '@mui/icons-material/Add';
import client from '@/aws.js';
import IncidentReport from '@/components/IncidentReport';

export default function NewShelfForm({formData, handleChangeForm, setFormData, defaultOpen=true}){

    const tipos = ["Paletización", "Cantilever", "Drive-in", "Push-back", "Shuttle", "Picking"]

    const [incidenciasPredeterminadas, setIncidenciaPredeterminadas] = useState([]);

    const newModule = () =>{
        setFormData((prev) => ({
            ...prev,
            ["modulos"] : [...prev["modulos"], {
                                                    'numero':0,
                                                    'longitud':0,
                                                    'fondo':0,
                                                    'altura':0
                                                }]
        }))
    }

    const selectionSet = ["id", "tipo", "medida", "descripcion"];

    const fetchIncidenciasPredeterminadas = async () => {
        try {
            const {data, errors} = await    client.models.IncidenciaPredeterminada.list({selectionSet});
            const results = data.reduce((acc, item) => {
                    const { tipo, id, medida, descripcion } = item;
                    if (!acc[tipo]) {
                        acc[tipo] = [];
                    }
                    acc[tipo].push({ id, medida, descripcion });
                    return acc;
                }, {});
            setIncidenciaPredeterminadas(results);
            } catch (err) {
            console.error("Error fetching incidencias predeterminadas:", err);
        }
    };

    useEffect(() => {
        fetchIncidenciasPredeterminadas();
    }, []);

    const changeIncidencias = (type) =>(formIncidencia) =>{
        if (formIncidencia.filled){
            setFormData((prev) => ({
                ...prev,
                incidencias: {...prev["incidencias"],
                    [type]: formIncidencia.incident}
            }));
        }
        else {
            setFormData((prev) => {
            const { [type]: _, ...restIncidencias } = prev.incidencias || {};
            return {
                ...prev,
                incidencias: restIncidencias,
            };
        });
        }
    }

    return (
        <Stack gap={2} className="w-full">
            <TextField
                    label="ID de la estantería"
                    value={formData.idExterno}
                    onChange={handleChangeForm("idExterno")}
                    required
                    color='primary'
                    className="w-full"
                    sx = {{ 
                        boxShadow: 1,
                        borderColor: 'primary.main'
                    }}
                />

            <Autocomplete
                options={tipos}
                value={formData.tipo || null}
                onChange={(_, newValue) => {
                    console.log(newValue)
                    handleChangeForm("tipo")(null, newValue)}}
                renderInput={(params) => (
                    <TextField {...params} label="Tipo Estantería" />
                )}
                color='primary'
                className="w-full"
                sx = {{
                    boxShadow: 1,
                    borderColor: 'primary.main'
                }}
            />
            <NumberField
                label="Niveles de carga"
                value={formData.nivelCarga}
                onValueChange={(value)=> handleChangeForm("nivelCarga")(null,value)}
            />
            <div>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <Divider textAlign="left" sx={{ flexGrow: 1 }}>Módulos</Divider>
                    <IconButton 
                        color="primary" 
                        aria-label="añadir módulo" 
                        onClick = {() => newModule()}>
                        <AddIcon/>
                    </IconButton>
                </Box>
                <Stack gap={1}>
                {formData.modulos.map((modulo, index) => (
                        <Stack key={index} direction="row" gap={1}>
                            <NumberField
                                label="Módulos"
                                value={modulo.numero}
                                other = {{min:0}}
                                onValueChange={(value) => {
                                    const newModulos = [...formData.modulos];
                                    newModulos[index].numero = value;
                                    setFormData(prev => ({ ...prev, modulos: newModulos }));
                                }}
                                showButtons={false}
                                showLabels = {index==0}
                                sx={{ flex: 1 }}
                            />
                            <NumberField
                                label="Longitud"
                                value={modulo.longitud}
                                unit="m"
                                onValueChange={(value) => {
                                    const newModulos = [...formData.modulos];
                                    newModulos[index].longitud = value;
                                    setFormData(prev => ({ ...prev, modulos: newModulos }));
                                }}
                                showButtons={false}
                                showLabels = {index==0}
                                className="flex-1"
                            />
                            <NumberField
                                label="Fondo"
                                value={modulo.fondo}
                                unit="m"
                                onValueChange={(value) => {
                                    const newModulos = [...formData.modulos];
                                    newModulos[index].fondo = value;
                                    setFormData(prev => ({ ...prev, modulos: newModulos }));
                                }}
                                showButtons={false}
                                showLabels = {index==0}
                                className="flex-1"
                            />
                            <NumberField
                                label="Altura"
                                value={modulo.altura}
                                unit="m"
                                onValueChange={(value) => {
                                    const newModulos = [...formData.modulos];
                                    newModulos[index].altura = value;
                                    setFormData(prev => ({ ...prev, modulos: newModulos }));
                                }}
                                showButtons={false}
                                showLabels = {index==0}
                                sx={{ flex: 1 }}
                            />
                        </Stack>
                ))}
                </Stack>
            </div>
            <div>
                <Divider textAlign="left">Incidencias</Divider>
                <List>
                    <IncidentReport title={"Ins. Estática"} withPosition={true} formData={formData.incidencias?.estatica} changeIncidencias={changeIncidencias("estatica")} incidenciasPredeterminadas={incidenciasPredeterminadas.ESTATICA} defaultOpen={defaultOpen}/>
                    <IncidentReport title={"Ins. Estado de la Carga"} withPosition={false} formData={formData.incidencias?.carga} changeIncidencias={changeIncidencias("carga")} incidenciasPredeterminadas={incidenciasPredeterminadas.CARGA} defaultOpen={defaultOpen}/>
                    <IncidentReport title={"Ins. de Montaje"} withPosition={false} formData={formData.incidencias?.montaje} changeIncidencias={changeIncidencias("montaje")} incidenciasPredeterminadas={incidenciasPredeterminadas.MONTAJE} defaultOpen={defaultOpen}/>
                    <IncidentReport title={"Ins. Documental"} withPosition={false} formData={formData.incidencias?.documental} changeIncidencias={changeIncidencias("documental")} incidenciasPredeterminadas={incidenciasPredeterminadas.DOCUMENTAL} defaultOpen={defaultOpen}
                        />
                </List>
            </div>
        </Stack>
    )
}