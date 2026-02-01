import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'incidentPhotos',
  access: (allow) => ({
    'incident-photos/*': [
      allow.guest.to(['read', 'write', 'delete']),
    ],
  })
});
