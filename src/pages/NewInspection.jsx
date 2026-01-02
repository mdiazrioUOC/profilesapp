import { useState, useEffect } from "react";
import { generateClient } from 'aws-amplify/data'
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

const client = generateClient()

export default function NewInspectionForm() {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [showNewClienteForm, setShowNewClienteForm] = useState(false);
  const [newClienteName, setNewClienteName] = useState("");
  const [date, setDate] = useState("");

  const fetchClientes = async () => {
    try {
      const result = await client.models.DimCliente.list();
      console.log(result)
      setClientes(result.data);
    } catch (err) {
      console.error("Error fetching clientes:", err);
    }
  };
  useEffect(() => {
    fetchClientes();
  }, []);

  const handleCreateCliente = async () => {
    if (!newClienteName) return;
    try {
      const cliente = await client.models.DimCliente.create({
        name: newClienteName
      });
      console.log(cliente)
      fetchClientes()
      setClientes([...clientes, cliente.data]);
      setSelectedCliente(cliente.data.id);
      setNewClienteName("");
      setShowNewClienteForm(false);
    } catch (err) {
      console.error("Error creating cliente:", err);
    }
  };

  const handleCreateInspeccion = async (e) => {
    e.preventDefault();
    if (!selectedCliente || !date) return;

    try {
      await client.models.DimInspeccion.create({
        id_client: selectedCliente,
        date: date
      });
      alert("Inspección creada con éxito ✅");
      setSelectedCliente("");
      setDate("");
    } catch (err) {
      console.error("Error creando inspección:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Nueva Inspección</h2>

      <form onSubmit={handleCreateInspeccion} className="space-y-4">
        {/* Selección de cliente */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Cliente
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
            <option value="new">+ Nuevo Cliente</option>
          </select>
        </div>

        {/* Formulario desplegable para nuevo cliente */}
        {selectedCliente === "new" && (
          <div className="border p-4 rounded bg-gray-50 space-y-2">
            <label className="block text-gray-600 font-medium mb-1">
              Nombre del nuevo cliente
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={newClienteName}
              onChange={(e) => setNewClienteName(e.target.value)}
            />
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={handleCreateCliente}
            >
              Crear Cliente
            </button>
          </div>
        )}

        {/* Fecha de inspección */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Fecha de inspección
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Crear Inspección
        </button>
      </form>
    </div>
  );
}


// // import { Schema } from '../amplify/data/resource'
// import { generateClient } from 'aws-amplify/data'
// import { Amplify } from 'aws-amplify';
// import outputs from '../../amplify_outputs.json';
// import { useState, useEffect } from "react";

// Amplify.configure(outputs);

// const client = generateClient()


// export default function NewInspection ({onClick}) {

//   const [todos, setTodos] = useState([]);

//   const fetchTodos = async () => {
//     const { data: items, errors } = await client.models.DimInspeccion.list();
//     console.log(errors)
//     setTodos(items);
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const createInspeccion = async () => {
//     console.log(new Date().toISOString().split("T")[0])
//     const a = await client.models.DimInspeccion.create({
//       date: new Date().toISOString().split("T")[0],
//     })
//     console.log(a)
//     fetchTodos();
//   }

//   console.log(todos)
//   return <div>
//     <button onClick={createInspeccion}>Nueva Inspeccion</button>
//     <ul>
//           {todos.map(({ id, date }) => (
//             <li key={id}>{date}</li>
//           ))}
//     </ul>
//   </div>
// };
