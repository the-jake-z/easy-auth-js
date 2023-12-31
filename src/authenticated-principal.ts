import { Claim, getClaimValue } from "./claim";

export interface AuthenticatedPrincipal {
    provider_name: string;
    access_token: string;
    id_token?: string;
    expires_on: string;
    user_id: string;
    user_claims?: Claim[];
}

/**
 * 
 * @param principal The principal object from the /.auth/me endpoint.
 * @param name The name of the claim to find
 * @returns An array of claims that have a typ === `name`
 */
export const getClaimsByName = (principal: AuthenticatedPrincipal, name: string) => {
    return principal.user_claims?.filter(x => x.typ === name) ?? [];
}

export const getClaimByName = (principal: AuthenticatedPrincipal, name: string) => {
    return principal.user_claims?.find(x => x.typ === name);
}

export const hasAnyRole = (principal: AuthenticatedPrincipal, rolesToCheck: string[]) => 
    getClaimsByName(principal, 'role').map(getClaimValue).some(userRole => rolesToCheck.indexOf(userRole) > -1);

export const getIdTokenExpiration = (principal: AuthenticatedPrincipal) => {
    const jwtParts = principal.id_token?.split(".");

    if(!jwtParts) {
        return undefined;
    }

    return new Date(JSON.parse(atob(jwtParts[1]))['exp']);
}