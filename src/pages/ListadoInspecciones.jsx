import { useNavigate } from "react-router-dom";
import InspectionHeader from "./InspectionHeader";
import FloatingActionButton from "./FloatingActionButton";
import InspectionCard from "./InspectionCard";

const iconColors = [
  "bg-pink-100 text-pink-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
];

const clients = [
  { id: 1, name: "Cliente 1", date: "10/01/2025", status: "done"},
  { id: 2, name: "Cliente 2", date: "11/07/2025", status: "in-progress"},
  {
    id: 3,
    name: "Cliente 3",
    date: "12/02/2025",
    status: "to-do",
    description: "Uber Eats redesign challenge",
  },
  {
    id: 4,
    name: "Cliente 3",
    date: "13/02/2026",
    status: "to-do",
    description: "About design sprint",
  },
];

export default function ListadoInspecciones({}) {

  const navigate = useNavigate();

  const newInspection = () => {
    // Navigate to another page
    navigate("/new-inspection");
  };
  return (
    <div className="min-h-screen bg-background pb-24">
      <InspectionHeader />
      <main className="px-6">
        {clients.map((client, index) => (
          <InspectionCard
            key={client.id}
            {...client}
            iconColor={iconColors[index % iconColors.length]}
          />
        ))}
      </main>
      <FloatingActionButton onClick={newInspection} />
    </div>
  );
}
