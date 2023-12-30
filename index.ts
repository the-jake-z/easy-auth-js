import { AuthenticatedPrincipal } from "./models/authenticated-principal";

export const getAuthenticatedUser = (path: string = "/.auth/me") => fetch(path)
    .then(r => r.json() as Promise<AuthenticatedPrincipal>)

export const refreshAuthentication = (path: string = "/.auth/aad/refresh") => fetch(path)
    .then(r => r.ok);