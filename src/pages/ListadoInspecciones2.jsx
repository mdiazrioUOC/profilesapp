import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

import BadgeFilter from '@/components/BadgeFilter';
import Filters from '@/components/Filter';
import InspectionList from '@/components/InspectionList';
import { Badge } from 'lucide-react';

function ListadoInspecciones2() {
  const [activeTab, setActiveTab] = useState('Todas');
  const [filters, setFilters] = useState({});

  // Sample data
  const inspections = [
    {
      id: 1,
      clientName: 'Cliente 1',
      date: '13/09/2025',
      status: 'pending'
    },
    {
      id: 2,
      clientName: 'Cliente 2',
      date: '10/09/2025',
      status: 'completed'
    },
    {
      id: 3,
      clientName: 'Cliente 3',
      date: '11/08/2025',
      status: 'scheduled'
    },
    {
      id: 4,
      clientName: 'Cliente 4',
      date: '04/08/2025',
      status: 'to-schedule'
    },
    {
      id: 5,
      clientName: 'Cliente 5',
      date: '25/07/2025',
      status: 'report'
    }
  ];
  const { setNavLink, setHeader, setGoBack } = useOutletContext();

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
        <BadgeFilter onTabChange={setActiveTab} />
        <Filters onFilterChange={setFilters} />
        <InspectionList inspections={inspections} />
    </div>
  );
}

export default ListadoInspecciones2;