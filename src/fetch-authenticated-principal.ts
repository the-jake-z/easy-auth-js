import { AuthenticatedPrincipal } from "./authenticated-principal";

export const getAuthenticatedUser = (path: string = "/.auth/me") => fetch(path)
    .then(r => r.json() as Promise<AuthenticatedPrincipal[]>)
    .catch(() => undefined);

export const refreshAuthentication = (path: string = "/.auth/aad/refresh") => fetch(path)
    .then(r => r.ok)
    .catch(() => false);