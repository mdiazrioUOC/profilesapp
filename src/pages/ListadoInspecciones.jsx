import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

import BadgeFilter from '@/components/BadgeFilter';
import Filters from '@/components/Filter';
import InspectionList from '@/components/InspectionList';
import { Badge } from 'lucide-react';
import client from "@/aws.js";

function ListadoInspecciones() {
  const [filters, setFilters] = useState({
      estados: ['Programada','P. Presupuesto',],
      clientes: [],
      provincias: [],
      fechas: null,
    });
  const [inspecciones, setInspecciones] = useState([]);
  const [inspeccionesFiltradas, setInspeccionesFiltradas] = useState([]);

  const { setNavLink, setHeader, setGoBack } = useOutletContext();

  const selectionSet = ["id", "idCliente", "cliente.nombre", "fecha", "estado", "provincia" ];

  const updateFilters = (filters) =>{
    const resultados = inspecciones.filter((item) => {
      const { estados, clientes, provincias, fechas } = filters;
      console.log(filters)
      // ESTADOS
      const pasaEstados = 
        estados.length === 0 ||
        estados.some((e) => e.toLowerCase() === item.estado)

      // CLIENTES
      const pasaCliente =
        clientes.length === 0 ||
        clientes.some((c) => c.id === item.idCliente);

      // PROVINCIAS
      const pasaProvincia =
        provincias.length === 0 ||
        provincias.some((p) => p.nombre === item.provincia);

      // FECHAS
      const pasaFecha =
        !fechas ||
        (
          (!fechas[0] || item.fecha >= fechas[0]) &&
          (!fechas[1] || item.fecha <= fechas[1])
        );

      return pasaEstados && pasaCliente && pasaProvincia && pasaFecha;
      });

    setFilters(filters)
    setInspeccionesFiltradas(resultados)
  }

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split("-");
    return new Date(Number(y), Number(m) - 1, Number(d));
  };

  const fetchInspecciones = async () => {
      try {
          const {data, errors} = await    client.models.DimInspeccion.list({selectionSet});
          const dataConFechas = data.map((item) => ({
            ...item,
            fecha: parseDate(item.fecha)
          }));
          setInspecciones(dataConFechas);
          console.log(dataConFechas)
          setInspeccionesFiltradas(dataConFechas);
          } catch (err) {
          console.error("Error fetching inspecciones:", err);
      }
  };

  useEffect(() => {
      fetchInspecciones();
  }, []);

  useEffect(() => {
    setNavLink("/new-inspection");
    setHeader("Inspecciones");
    setGoBack(false)
    return () => {
      setNavLink(null)
      setHeader(null)
      setGoBack(null)
    };
  }, []);

  return (
    <div>
        <BadgeFilter filters={filters}  setFilters={updateFilters}/>
        <Filters filters={filters} setFilters={updateFilters}/>
        <InspectionList inspections={inspeccionesFiltradas} />
    </div>
  );
}

export default ListadoInspecciones;