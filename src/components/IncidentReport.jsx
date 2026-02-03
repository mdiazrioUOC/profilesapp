import { useEffect, useState} from "react";
import {
    ListItem,
    Button,
    Card,
    CardContent, 
    ListItemText,
    ListItemIcon,
    IconButton,
    Stack,
    Chip,
    Autocomplete,
    TextField
} from '@mui/material';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import UploadPhotoButton from "@/components/UploadPhotoButton";


const emptyIncident = {
        'nivel':"",
        'idPredeterminada': null,
        'posicion': "",
        'idFotos':[],
        'descripcion': "",
        'medida': "",
        'status':0
    }

const isEmpty = (incident) => (
    incident.nivel === "" && incident.descripcion == "" && incident.medida == "" && incident.idFotos.length==0);

const isIncomplete = (incident) =>(
    (incident.nivel !=="" && ((incident.descripcion !== "" && incident.medida !== "")))
);

function IncidentReported({title, setStatus}){
    return (<div>
        <ListItem
            key={0}
            className={"bg-navy-900 text-white hover:shadow-lg transition-shadow cursor-pointer mb-4 rounded-lg border border-gray-300"}
            onClick={()=> setStatus(1)}
            sx={{
                borderRadius: '8px',
                mb: 2,
                '&:hover': {
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
            }}
            >
            <ListItemText
                primary={title}
            />
            <ListItemIcon className="text-white" sx={{ minWidth: 'auto', ml: 2 }}>
                <CheckCircleOutlineOutlinedIcon className="w-7 h-7"/>
            </ListItemIcon>
        </ListItem>
    </div>);
}

function IncidentIncomplete({title, setStatus}){
    return (<div>
        <ListItem
            key={0}
            className={"bg-secondary text-navy-900 hover:shadow-lg transition-shadow cursor-pointer mb-4 rounded-lg border border-navy-900"}
            onClick={()=> setStatus(1)}
            sx={{
                borderRadius: '8px',
                mb: 2,
                '&:hover': {
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
            }}
            >
            <ListItemText
                primary={title}
            />
            <ListItemIcon className="text-navy-900" sx={{ minWidth: 'auto', ml: 2 }}>
                <ReportOutlinedIcon className="w-7 h-7"/>
            </ListItemIcon>
        </ListItem>
    </div>);
}

function NoIncidentReport({title, setStatus}){
    return (<div>
        <ListItem
            key={0}
            className="bg-white hover:shadow-lg transition-shadow cursor-pointer mb-4 rounded-lg border border-gray-300"
            sx={{
                borderRadius: '8px',
                mb: 2,
                '&:hover': {
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
            }}
            secondaryAction={
                <Button variant="text"  aria-label="comment" onClick={() =>setStatus(1)}>
                    Reportar
                </Button>}
            >
            <ListItemText
                primary={title}
            />
        </ListItem>
    </div>);
}

function IncidentOpen({title, setStatus, changeIncidencias, incidentData, withPosition, incidenciasPredeterminadas, isManual, setIsManual}){
    const expandLess = () => {
        setStatus(
            isIncomplete(incidentData) ? 2 :
            isEmpty(incidentData)      ? 0 :
                                        3
        );
    }

    const levels = [ 
        {color:"success", label:"Verde"},
        {color: "warning", label: "Amarillo"},
        {color: "error", label:"Rojo"}]

    const handleChange = (field) => (event, value) => {
        const setValue = (field === 'nivel' && 
                         value === incidentData.nivel) ? 
                         "" : value 
        const newIncidentData = {...incidentData, 
            [field]: setValue ?? event?.target?.value ?? "",
        }
        changeIncidencias({incident:newIncidentData, 
                           filled: !isEmpty(newIncidentData)})
    };

    const handleObjectChange = (value) =>{
        const newIncidentData = {...incidentData, 
            ...value
        }
        changeIncidencias({incident:newIncidentData, 
                           filled: !isEmpty(newIncidentData)})
    }

    return (
    <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer mb-4 rounded-lg border border-gray-300">
        <CardContent >
            <Stack gap={2} alignItems="flex-start">
                <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                    <p className="text-l text-navy-900 font-medium"> {title}</p>
                    <IconButton className="p-0" onClick={() => expandLess()}>
                        <ExpandLessOutlinedIcon/>
                    </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                    <p className="flex-1 text-s text-gray-600">
                        Nivel
                    </p>
                    <Stack direction="row" gap={2} justifyContent="flex-end">
                    {levels.map((level) => (
                            <Chip
                                key={level.label}
                                label={level.label}
                                size="small"
                                onClick={()=>handleChange("nivel")(null, level.label)}
                                color={level.color}
                                variant={level.label === incidentData.nivel ?  "filled":"outlined"}
                            />
                            ))}
                    </Stack>
                </Stack>
                {!isManual ? (
                <Autocomplete
                    options={incidenciasPredeterminadas}
                    getOptionLabel={(option) => option.descripcion}
                    value={incidenciasPredeterminadas.find(inc =>
                        incidentData.idPredeterminada === inc.id
                    ) || null}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            handleObjectChange({
                                               descripcion:newValue.descripcion,
                                               medida: newValue.medida
                            })
                        }
                        else{
                            handleObjectChange( {descripcion:"",
                                                 medida:""})
                        }
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Tipo Incidencia" />
                    )}
                    color='primary'
                    className="w-full"
                    sx = {{
                        borderColor: 'primary.main'
                    }}
                />):( 
                <>
                <TextField
                    label="Descripción de la incidencia"
                    value={incidentData.descripcion}
                    onChange={handleChange("descripcion")}
                    required
                    color='primary'
                    className="w-full"
                    sx = {{ 
                        boxShadow: 1,
                        borderColor: 'primary.main'
                    }}
                />
                <TextField
                    label="Medida correctiva"
                    value={incidentData.medida}
                    onChange={handleChange("medida")}
                    required
                    color='primary'
                    className="w-full"
                    sx = {{ 
                        boxShadow: 1,
                        borderColor: 'primary.main'
                    }}
                /></>)             
                }
                {withPosition && (<TextField
                    label="Posición"
                    value={incidentData.posicion}
                    onChange={handleChange("posicion")}
                    required
                    color='primary'
                    className="w-full"
                    sx = {{ 
                        boxShadow: 1,
                        borderColor: 'primary.main'
                    }}
                />)}
                <UploadPhotoButton
                    uploadedPhotos={incidentData.idFotos}
                    setPhotos={handleChange("idFotos")}
                />
                <Button variant="text" color="gray"  aria-label="comment" startIcon={<ChangeCircleOutlinedIcon />} onClick={()=> setIsManual(!isManual)}>
                {!isManual ? "Incidencia manual" : "Incidencia predefinida"}
                </Button>
            </Stack>
        </CardContent>
    </Card>);
}

function IncidentReport({title, withPosition, formData, changeIncidencias, incidenciasPredeterminadas, defaultOpen=true}){
    const [isManual, setIsManual] = useState(false);
    const [innitialized, setIsInnitialized] = useState(false);

    const incidentData = formData ?? emptyIncident;

    const updateIncidencia = (field) => (newValue) =>{
        const newIncidentData = {...incidentData, 
            [field]: newValue
        }
        changeIncidencias({incident:newIncidentData, 
                           filled: true})
    }

    useEffect(() => {
        if (incidenciasPredeterminadas){
            const existePredeterminada = incidenciasPredeterminadas.find(inc =>
                            inc.descripcion === incidentData.descripcion &&
                            inc.medida === incidentData.medida
                        );

            // Solo actualizar si hay una coincidencia y es diferente a la actual
            if (existePredeterminada && existePredeterminada.id !== incidentData.idPredeterminada){
                updateIncidencia("idPredeterminada")(existePredeterminada.id)
            }
            // Limpiar idPredeterminada si no hay coincidencia
            else if (!existePredeterminada && incidentData.idPredeterminada !== null) {
                updateIncidencia("idPredeterminada")(null)
            }
        }
    }, [incidentData.descripcion, incidentData.medida, incidentData.idPredeterminada, incidenciasPredeterminadas]);

    useEffect(()=>{
        if(!innitialized && formData && !defaultOpen){
            setIsInnitialized(true)
            setIsManual(incidentData.idPredeterminada==null)
        }
    }, [formData?.idPredeterminada]);

    const statusMap = {
        0: <NoIncidentReport title={title} setStatus={updateIncidencia("status")}/>,
        1: <IncidentOpen title={title} 
                         setStatus={updateIncidencia("status")} 
                         changeIncidencias={changeIncidencias} 
                         incidentData={incidentData}
                         withPosition={withPosition}
                         incidenciasPredeterminadas={incidenciasPredeterminadas}
                         isManual = {isManual}
                         setIsManual = {setIsManual}
                         />,
        2: <IncidentReported title={title} setStatus={updateIncidencia("status")}/>,
        3: <IncidentIncomplete title={title} setStatus={updateIncidencia("status")}/>
    }; 
    return statusMap[incidentData.status];

}

export default IncidentReport;