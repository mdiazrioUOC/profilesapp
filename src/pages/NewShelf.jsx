import {useState } from "react";
import client from "@/aws.js";

import CustomForm from '@/components/CustomForm';
import NewShelfForm from '@/components/NewShelfForm';
import {useLocation, useNavigate } from 'react-router-dom';

function NewShelf () {
    const { state } = useLocation();
    const navigate = useNavigate();
    const inspeccion = state.inspection;
    
    const [formData, setFormData] = useState({
        idExterno: "",
        tipo: "",
        nivelCarga: 0,
        modulos:[{
            'numero':0,
            'longitud':0,
            'fondo':0,
            'altura':0
        }],
        incidencias:{}
    });

    const saveForm = async (dataToSave) =>{
        const { incidencias, ...sinIncidencias } = dataToSave;

        // guardar la estantería
        const estanteria = {
            ...sinIncidencias,
            idInspeccion: inspeccion.id
        }
        console.log(estanteria)
        const {data: estanteriaCreada, errors} = await client.models.Estanteria.create(estanteria)

        if (errors) {
            console.error("Error creando estantería:", errors);
            return;
        }

        console.log(estanteriaCreada)
        // guardar las incidencias
        Object.entries(incidencias).forEach(([tipo, item]) => {
            const incidencia = {
                ...item,
                idEstanteria: estanteriaCreada.id,
                idInspeccion: inspeccion.id,
                tipo: tipo.toUpperCase(), 
            }
            console.log(incidencia)
            client.models.Incidencia.create(incidencia)
        })        
    }

    //idInspeccion, 
    return (
        <CustomForm 
            titulo="Nueva Estantería" 
            saveFunction={saveForm}
            formData = {formData}
            setFormData = {setFormData}  > 
            <NewShelfForm 
                formData = {formData}
                setFormData = {setFormData}/>
        </CustomForm>  
    );
}

export default NewShelf;