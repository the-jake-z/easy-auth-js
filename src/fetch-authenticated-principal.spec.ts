import { getAuthenticatedUser, refreshAuthentication } from "./fetch-authenticated-principal";

describe('Fetch Authenticated Principal', () => {

    const setupSuccessFetch = (expectedResponse: unknown) => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(expectedResponse),
            ok: true,
        })) as any;
    }

    const setupFailureFetch = (expectedError: unknown) => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.reject(expectedError),
            ok: false,
        })) as any;
    }

    const sampleResponse = [
        {
            "access_token": "h.p.s",
            "expires_on": "2023-12-30T17:31:16.1436141Z",
            "id_token": "h.p.s",
            "provider_name": "aad",
            "user_claims": [
                {
                    "typ": "aud",
                    "val": "00000000-0000-0000-0000-000000000000"
                },
                {
                    "typ": "iss",
                    "val": "https:\/\/login.microsoftonline.com\/00000000-0000-0000-0000-000000000000\/v2.0"
                },
                {
                    "typ": "iat",
                    "val": "1703953301"
                },
                {
                    "typ": "nbf",
                    "val": "1703953301"
                },
                {
                    "typ": "exp",
                    "val": "1703957201"
                },
                {
                    "typ": "aio",
                    "val": "AaQAW\/8VAAAAeWvh5aXOJpr7TCw1LhXV4FGY929HPTOltaUDHaub1x\/St6XJcBC5yLHBjukka+5m8DJ\/ZCi4+R3613UK621mZNoNDv859QiRaJ4XIODTZZgjSwtdDkbFAPoIXN8y4t7UH1e3xILtHvgoaWuiIRsWp+yVDG9uHSBu8AmyeR06KON107uO8CpSIXpNzi9j4paeH8tPaxv\/cK9QkOgUxA9GXg=="
                },
                {
                    "typ": "c_hash",
                    "val": "HqOL5vdbdLS8Qs4bIAHuZA"
                },
                {
                    "typ": "http:\/\/schemas.xmlsoap.org\/ws\/2005\/05\/identity\/claims\/emailaddress",
                    "val": "email@test.com"
                },
                {
                    "typ": "http:\/\/schemas.microsoft.com\/identity\/claims\/identityprovider",
                    "val": "https:\/\/sts.windows.net\/00000000-0000-0000-0000-000000000000\/"
                },
                {
                    "typ": "name",
                    "val": "Test User"
                },
                {
                    "typ": "nonce",
                    "val": "208a911682f44e8fa7a193fff9176d7a_20231230163141"
                },
                {
                    "typ": "http:\/\/schemas.microsoft.com\/identity\/claims\/objectidentifier",
                    "val": "00000000-0000-0000-0000-000000000000"
                },
                {
                    "typ": "preferred_username",
                    "val": "email@test.com"
                },
                {
                    "typ": "rh",
                    "val": "0.AbcAS0Q2D9aP5k6aqBDVjxkofIL082h7t9ZPsN2g4TUl3jm3ALg."
                },
                {
                    "typ": "http:\/\/schemas.xmlsoap.org\/ws\/2005\/05\/identity\/claims\/nameidentifier",
                    "val": "DN2YxMf5L3lo3B2elJAtTTnkflga1QABONEaN9DvodM"
                },
                {
                    "typ": "http:\/\/schemas.microsoft.com\/identity\/claims\/tenantid",
                    "val": "00000000-0000-0000-0000-000000000000"
                },
                {
                    "typ": "uti",
                    "val": "cL5fmOIEXEGtgzCSKB1BAg"
                },
                {
                    "typ": "ver",
                    "val": "2.0"
                }
            ],
            "user_id": "email@test.com"
        }
    ]

    describe('getAuthenticatedUser', () => {
        test('when auth me is success', async () => {
            setupSuccessFetch(sampleResponse);
            var user = await getAuthenticatedUser();
            expect(user).toStrictEqual(sampleResponse);
        });

        test('when fetch is fail', async () => {
            setupFailureFetch("User is not authorized to access this page");
            var user = await getAuthenticatedUser();
            expect(user).toBeUndefined();
        });
    });

    describe('refreshAuthentication', () => {
        test('when is success', async () => {
            setupSuccessFetch("success");
            var result = await refreshAuthentication();
            expect(result).toBeTruthy();
        });

        test('when is failuure', async () => {
            setupFailureFetch("failure");
            var result = await refreshAuthentication();
            expect(result).toBeFalsy();
        });
    });
});