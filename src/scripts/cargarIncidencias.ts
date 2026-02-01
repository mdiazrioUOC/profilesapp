// se ejecuta mediante el comando npx tsx src/scripts/cargarIncidencias.ts
import client from "../aws.js";
import {INCIDENCIAS} from '../data/incidencias.js';
 
async function seed() {
  for (const item of INCIDENCIAS) {
    await client.models.IncidenciaPredeterminada.create(item);
    console.log("Creada incidencia:", item.tipo);
  }

  console.log("✅ Seed completado");
}

seed().catch(console.error);