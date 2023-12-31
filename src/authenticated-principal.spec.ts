import { AuthenticatedPrincipal, getClaimByName, getClaimsByName, getIdTokenExpiration, hasAnyRole } from "./authenticated-principal";

describe('Authenticated Principal', () => {
    
    describe('hasAnyRole', () => {
        const principal: AuthenticatedPrincipal = {
            user_claims: [
                {
                    typ: 'roles',
                    val: 'Reader'
                },
                {
                    typ: 'roles',
                    val: 'Writer'
                }
            ]
        } as unknown as AuthenticatedPrincipal;

        test('true when a role matches', () => {
           expect(hasAnyRole(principal, ['Writer'])).toBeTruthy();
        });

        test('false when a role does not match', () => {
            expect(hasAnyRole(principal, ['Admin'])).toBeFalsy();
        });
    });

    const claimBuilder = (typ: string, val: string) => ({typ, val})

    describe('getClaimByName', () => {
        const principal: AuthenticatedPrincipal = {
            user_claims: [
                claimBuilder('name', 'test user'),
                claimBuilder('color', 'red'),
                claimBuilder('color', 'blue')
            ]
        } as unknown as AuthenticatedPrincipal;

        test('undefined when claim does not exist', () => {
            expect(getClaimByName(principal, 'dne')).toBeUndefined();
        });

        test('to equal the claim when exists', () => {
            expect(getClaimByName(principal, 'name')).toStrictEqual(claimBuilder('name', 'test user'));
        });

        test('to be the first claim when multiple claims exist', () => {
            expect(getClaimByName(principal, 'color')).toStrictEqual(claimBuilder('color', 'red'));
        });

    });

    describe('getClaimsByName', () => {
        const principal: AuthenticatedPrincipal = {
            user_claims: [
                claimBuilder('color', 'red'),
                claimBuilder('color', 'blue'),
                claimBuilder('color', 'green'),
                claimBuilder('car', 'suv'),
                claimBuilder('car', 'sedan')
            ]
        } as unknown as AuthenticatedPrincipal;

        test('return empty array when none found', () => {
            expect(getClaimsByName(principal, 'dne')).toStrictEqual([]);
        });

        test('return array of matching claims', () => {
            expect(getClaimsByName(principal, 'color')).toStrictEqual([
                claimBuilder('color', 'red'),
                claimBuilder('color', 'blue'),
                claimBuilder('color', 'green')
            ]);
        });
    });

    describe('getIdTokenExpiration', () => {
        const date = new Date();
        const jwtPayload = {
            exp: date.getTime(),
        };

        const id_token = `h.${btoa(JSON.stringify(jwtPayload))}.s`;

        const principal: AuthenticatedPrincipal = {
            id_token
        } as unknown as AuthenticatedPrincipal;

        test('should parse exp date', () => {
            expect(getIdTokenExpiration(principal)).toStrictEqual(date);
        });

        test('returns undefined when id_token is undefined', () => {
            expect(getIdTokenExpiration({ } as unknown as AuthenticatedPrincipal)).toBeUndefined();
        });
    });
});