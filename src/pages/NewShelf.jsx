import * as React from 'react';
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {Stack,
        Box,
        List,
        TextField, 
        Autocomplete,
        Divider, 
        IconButton} from '@mui/material';
import NumberField from '@/components/NumberField';
import AddIcon from '@mui/icons-material/Add';

import IncidentReport from '@/components/IncidentReport';

function NewShelf () {
    const { setNavLink, setHeader, setGoBack } = useOutletContext();
    const [formData, setFormData] = useState({
        idEstanteria: "",
        tipo: "",
        nivelesCarga: 0,
        modulos:[{
            'numero':0,
            'longitud':0,
            'fondo':0,
            'altura':0
        }],
        incidencias:[]
    });

    const tipos = ["Paletización", "Cantilever", "Drive-in", "Push-back", "Shuttle", "Picking"]

    useEffect(() => {
        setHeader("Nueva estantería");
        setGoBack(true)
        return () => {
            setNavLink(null)
            setHeader(null)
            setGoBack(null)
        };
        }, []);

    const handleChange = (field) => (event, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value ?? event?.target?.value ?? "",
        }));
    };

    const handleNumberChange = (field) => (value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

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

    return (
        <div className="pt-4">
            <Stack gap={2}>
                <TextField
                    label="ID de la estantería"
                    value={formData.idEstanteria}
                    onChange={handleChange("idEstanteria")}
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
                inputValue={formData.tipo}
                onInputChange={handleChange("tipo")}
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
                value={formData.nivelesCarga}
                onValueChange={handleNumberChange("nivelesCarga")}
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
                    <IncidentReport title={"Ins. Estática"} withPosition={true}/>
                    <IncidentReport title={"Ins. Estado de la Carga"} withPosition={false}/>
                    <IncidentReport title={"Ins. de Montaje"} withPosition={false}/>
                    <IncidentReport title={"Ins. Documental"} withPosition={false}/>
                </List>
            </div>
        </Stack>
        </div>
    );
}

export default NewShelf;