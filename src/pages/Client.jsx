import { useState, useEffect} from "react";
import { useLocation,useOutletContext } from "react-router-dom";
import client from "@/aws.js";
import CustomForm from "@/components/CustomForm";
import NewClientForm from "@/components/NewClientForm";

export default function Client(){
    const { state } = useLocation();
    const [formData, setFormData] = useState({
        id: "",
        nombre: "",
        direccion: "",
        nif: "",
        fotos: true,
        perioricidad: 12
    });

    const [originalData, setOriginalData] = useState();

    const { _, setHeader, setGoBack } = useOutletContext();

    useEffect(() => {
        setHeader("Cliente");
        setGoBack(true)
        return () => {
          setHeader(null)
          setGoBack(null)
        };
      }, []);

    const selectionSet = ["id", "nombre", "direccion", "nif", "fotos", "perioricidad"];

    const fetchCliente = async () => {
        try {
            const {data, errors} = await client.models.DimCliente.get(
                {id: state.client.id},{selectionSet});
            setFormData(data);
            setOriginalData(data);
            } catch (err) {
            console.error("Error fetching cliente:", err);
        }
    };

   useEffect(() => {
        fetchCliente();
    }, []);
    
    return (<CustomForm 
        titulo="Editar Cliente" 
        saveFunction={client.models.DimCliente.update}
        formData = {formData}
        setFormData = {setFormData} 
        new = {false} 
        originalData = {originalData}> 
        <NewClientForm 
            formData = {formData}
            setFormData = {setFormData}/>
    </CustomForm> );
}