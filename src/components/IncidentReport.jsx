import { useState} from "react";
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

function IncidentOpen({title, setStatus, setFormData, formData, withPosition}){
    const expandLess = () =>{
        if (formData.nivel !=="" && ((!formData.isManual && formData.tipo !== "") ||
           (formData.isManual && (formData.descripcion !== "" && formData.medida !== "")))){
            setStatus(2)
        }
        else{
            if (formData.nivel === "" && ((!formData.isManual && formData.tipo == "") ||
           (formData.isManual && (formData.descripcion == "" && formData.medida == "")))){
            setStatus(0)
            }
            else{
                setStatus(3)
            }
        }
    }
    const levels = [ 
        {color:"success", label:"Verde"},
        {color: "warning", label: "Amarillo"},
        {color: "error", label:"Rojo"}]

    const handleChange = (field) => (event, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value ?? event?.target?.value ?? "",
        }));
    };

    const handleChipChange = (level) =>{
        console.log(level)
        if (formData.nivel === level.label){
            setFormData({...formData, nivel: ""})
        }
        else{
            setFormData({...formData, nivel: level.label})
        }
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
                                onClick={() => handleChipChange(level)}
                                color={level.color}
                                variant={level.label === formData.nivel ?  "filled":"outlined"}
                            />
                            ))}
                    </Stack>
                </Stack>
                {!formData.isManual ? (
                <Autocomplete
                    options={["A", "B"]}
                    inputValue={formData.tipo}
                    onInputChange={handleChange("tipo")}
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
                    value={formData.descripcion}
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
                    value={formData.medida}
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
                    value={formData.posicion}
                    onChange={handleChange("posicion")}
                    required
                    color='primary'
                    className="w-full"
                    sx = {{ 
                        boxShadow: 1,
                        borderColor: 'primary.main'
                    }}
                />)}
                <UploadPhotoButton/>
                <Button variant="text" color="gray"  aria-label="comment" startIcon={<ChangeCircleOutlinedIcon />} onClick={()=> handleChange("isManual")(null, !formData.isManual)}>
                {!formData.isManual ? "Incidencia manual" : "Incidencia predefinida"}
                </Button>
            </Stack>
        </CardContent>
    </Card>);
}

function IncidentReport({title, withPosition}){
    const [status, setStatus] = useState(0);
    const [formData, setFormData] = useState({
        'nivel':"",
        'tipo':"",
        'isManual': false,
        'descripcion': "",
        'medida': "",
        'posicion': "",
    });

    const statusMap = {
        0: <NoIncidentReport title={title} setStatus={setStatus}/>,
        1: <IncidentOpen title={title} 
                         setStatus={setStatus} 
                        setFormData={setFormData} 
                        formData={formData}
                        withPosition={withPosition}/>,
        2: <IncidentReported title={title} setStatus={setStatus}/>,
        3: <IncidentIncomplete title={title} setStatus={setStatus}/>
    }; 
    return statusMap[status];

}

export default IncidentReport;