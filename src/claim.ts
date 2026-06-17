export interface Claim {
    typ: string;
    val: string;
}

export const getClaimValue = (c: Claim) => c.val;
export const getClaimType = (c: Claim) => c.typ;