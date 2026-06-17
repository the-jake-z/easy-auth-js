import { Claim, getClaimType, getClaimValue } from "./claim";

describe('Claim', () => {
   const claim: Claim = {
    typ: 'type',
    val: 'value'
   };

   test('getClaimType', () => {
    expect(getClaimType(claim)).toBe('type');
   });

   test('getClaimValue', () => {
    expect(getClaimValue(claim)).toBe('value');
   });
});