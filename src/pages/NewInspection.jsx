import { useState } from "react";
import client from "@/aws.js";
import CustomForm from "@/components/CustomForm";
import NewInspectionForm from "@/components/NewInspectionForm";

export default function NewInspection() {

  const [formData, setFormData] = useState({
    tecnico: "",
    idCliente: "",
    nombrePlanta: "",
    direccion: "",
    provincia: "",
    numeroInforme: "",
    fecha: null,
    estado: "programada"
  });


  return (
    <CustomForm 
        titulo="Nueva Inspección" 
        saveFunction={client.models.DimInspeccion.create}
        formData = {formData}
        setFormData = {setFormData}  > 
        <NewInspectionForm 
            formData = {formData}
            setFormData = {setFormData}/>
    </CustomForm>  
  );
}