import type { PreSignUpTriggerHandler } from "aws-lambda"; 
export const handler: PreSignUpTriggerHandler = async (event) => { 
  const allowedDomain = "uoc.edu";
  const email = event.request.userAttributes.email || "";
  const userDomain = email.split("@")[1];

  if (userDomain !== allowedDomain) {
    throw new Error(`El proceso de registro solo está disponible para emails del dominio @${allowedDomain}`);
  }

  // Auto-confirm user if valid domain
  event.response.autoConfirmUser = true;
  return event;
};