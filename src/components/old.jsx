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