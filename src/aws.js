import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data'

// Configura Amplify solo una vez
Amplify.configure(outputs);

// Genera el cliente una vez
const client = generateClient();

export default client;