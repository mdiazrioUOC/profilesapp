import { dateToCloudFormation } from 'aws-cdk-lib';
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/

const schema = a.schema({
  Modulo: a.customType({
    numero: a.integer(),
    longitud: a.integer(),
    fondo: a.integer(),
    altura: a.integer(),
  }),

  CamposIncidencia: a.customType({
    descripcion: a.string(),
    medida: a.string()
  }),

  DimCliente: a
    .model({
      id: a.id().required(),
      nombre: a.string(),
      direccion: a.string(),
      nif: a.string(),
      fotos: a.boolean(),
      perioricidad: a.integer(),
      inspecciones: a.hasMany("DimInspeccion", "idCliente"),
    })
    .authorization((allow) => [allow.authenticated()]),

  DimInspeccion: a.model({
      id: a.id().required(),
      idCliente: a.id(),
      cliente: a.belongsTo("DimCliente", "idCliente"),
      tecnico: a.string(),
      nombrePlanta: a.string(),
      direccion: a.string(),
      provincia: a.string(),
      numeroInforme: a.string(),
      fecha: a.date(),
      estado: a.string(),
      estanterias: a.hasMany("Estanteria", "idInspeccion"),
      incidencias: a.hasMany("Incidencia", "idInspeccion")
    }).authorization((allow) => [allow.authenticated()]),

  Estanteria: a.model({
      id: a.id().required(),
      idInspeccion: a.id(),
      inspeccion: a.belongsTo("DimInspeccion", "idInspeccion"),
      idExterno: a.string(),
      tipo: a.string(),
      nivelCarga: a.integer(),
      modulos: a.ref('Modulo').array(),
      incidencias: a.hasMany("Incidencia", "idEstanteria")
  }).authorization((allow) => [allow.authenticated()]),

  Incidencia: a.model({
      id: a.id().required(),
      idEstanteria: a.id(),
      estanteria: a.belongsTo("Estanteria", "idEstanteria"),
      idInspeccion: a.id(),
      inspeccion: a.belongsTo("DimInspeccion", "idInspeccion"),
      nivel: a.enum(["Rojo", "Amarillo", "Verde"]),
      tipo: a.enum(["ESTATICA", "CARGA", "MONTAJE", "DOCUMENTAL"]),
      idPredeterminada: a.id(),
      tipoPredeterminado: a.belongsTo("IncidenciaPredeterminada", "idPredeterminada"),
      posicion: a.string(),
      idFotos:a.string().array(),
      descripcion: a.string(),
      medida:a.string()
  }).authorization((allow) => [allow.authenticated()]),

  IncidenciaPredeterminada: a.model({
    id: a.id(),
    tipo: a.enum(["ESTATICA", "CARGA", "MONTAJE", "DOCUMENTAL"]),
    incidencias: a.hasMany("Incidencia", "idPredeterminada"),
    descripcion: a.string(),
    medida: a.string()
  }).authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
