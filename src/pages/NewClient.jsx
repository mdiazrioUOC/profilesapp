import { useState } from "react";
import client from "@/aws.js";
import  NewClientForm  from "@/components/NewClientForm";
import  CustomForm  from "@/components/CustomForm";

function NewClient(){
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        nif: "",
        fotos: true, 
        perioricidad: 12
    });

    return (
        <CustomForm 
            titulo="Nuevo Cliente" 
            saveFunction={client.models.DimCliente.create}
            formData = {formData}
            setFormData = {setFormData}  > 
            <NewClientForm 
                formData = {formData}
                setFormData = {setFormData}/>
        </CustomForm>        
        );
}

export default NewClient;