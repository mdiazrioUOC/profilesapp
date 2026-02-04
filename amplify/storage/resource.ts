import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'incidentPhotos',
  access: (allow) => ({
    'incident-photos/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
  })
});
