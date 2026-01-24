import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Filters from '@/components/Filter';
import InspectionList from '@/components/InspectionList';
import { useOutletContext } from "react-router-dom";

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
  const { setNavLink } = useOutletContext();

  useEffect(() => {
    setNavLink("/new-inspection");
    return () => setNavLink(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Inspecciones" />
      <div className="pt-6 bg-white">
        <Navbar onTabChange={setActiveTab} />
        <Filters onFilterChange={setFilters} />
        <InspectionList inspections={inspections} />
      </div>

      {/* Bottom Navigation */}

    </div>
  );
}

export default ListadoInspecciones2;