import { useState, useEffect} from "react";
import { useLocation,useOutletContext } from "react-router-dom";
import client from "@/aws.js";
import CustomForm from "@/components/CustomForm";
import NewShelfForm from "@/components/NewShelfForm";

export default function Shelf(){
    const { state } = useLocation();
    const [formData, setFormData] = useState({
        id: "",
        idExterno: "",
        tipo: "",
        nivelCarga: 0,
        modulos: [],
        incidencias: []
    });

    const [originalData, setOriginalData] = useState();

    const { _, setHeader, setGoBack } = useOutletContext();

    useEffect(() => {
        setHeader("Estantería");
        setGoBack(true)
        return () => {
          setHeader(null)
          setGoBack(null)
        };
      }, []);

    const selectionSet = ["id", "idExterno", "tipo", "nivelCarga", "modulos.*", "incidencias.*"];

    const fetchEstanteria = async () => {
        try {
            const {data, errors} = await client.models.Estanteria.get(
                {id: state.estanteria.id},{selectionSet});
            const newData = {
            ...data,
            incidencias: data.incidencias.reduce((acc, item) => {
                acc[item.tipo.toLowerCase()] = {
                    ...item,
                    status: 2
                };
                return acc;
            }, {})
            };
            setFormData(newData);
            setOriginalData(newData);
            } catch (err) {
            console.error("Error fetching estantería:", err);
        }
    };

   useEffect(() => {
        fetchEstanteria();
    }, []);
    
    const  updateEstanteria = async (dataToSave) =>{
        const { incidencias, ...sinIncidencias } = dataToSave;

        const {data: estanteriaCreada, errors} = await client.models.Estanteria.update(sinIncidencias)

        // guardar las incidencias
        Object.entries(incidencias).forEach(([tipo, item]) => {
            const incidencia = {
                ...item,
                tipo: tipo.toUpperCase(), 
            }
            client.models.Incidencia.update(incidencia)
        })        
    }

    return (<CustomForm 
        titulo="Editar Estantería" 
        saveFunction={updateEstanteria}
        formData = {formData}
        setFormData = {setFormData} 
        new = {false} 
        originalData = {originalData}> 
        <NewShelfForm 
            formData = {formData}
            setFormData = {setFormData}
            defaultOpen = {false}/>
    </CustomForm> );
}