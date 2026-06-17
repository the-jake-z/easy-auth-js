# Easy Auth JS

A pure JavaScript/TypeScript library that allows browser based applications
running on Azure App Service to fetch claims information about the
authenticated user.

## Why?

Libraries like [Microsoft's Auth Library](https://github.com/AzureAD/microsoft-authentication-library-for-js)
require that the entire application runtime be downloaded prior to performing
the authentication flow, usually using a Public Client Authorization Code
flow with (PKCE) exchange.

App Service has a much better way of performing authentication: offload
it to built in middleware, dubbed "Azure Easy Auth". Azure Easy Auth
acts as an application middleware included by default in Azure App
Service, and configured in the "Authentication" tab in the Azure portal.

The Azure Easy Auth middleware adds several endpoints to your application
under the `/.auth/**` path. It supports popular identity providers like
Azure Active Directory and Okta, and can work with any OpenID Connect
compliant browser.

**Azure Easy Auth allows you to offload all authentication to the middleware,**
**letting you focus on your business logic.**

This library allows applications deployed behind Azure Easy Auth to
interface with the endpoints provided by Azure App Service.

## Installation

```bash
npm install @easy-auth-js/easy-auth
```

## Usage

### Fetch the authenticated user

```typescript
import { getAuthenticatedUser } from '@easy-auth-js/easy-auth';

const [principal] = await getAuthenticatedUser() ?? [];

if (!principal) {
  // user is not authenticated
}
```

### Read claims

```typescript
import { getClaimByName, getClaimsByName } from '@easy-auth-js/easy-auth';

const email = getClaimByName(principal, 'preferred_username')?.val;

// get all values for a claim type
const roles = getClaimsByName(principal, 'roles').map(c => c.val);
```

### Check roles

```typescript
import { hasAnyRole } from '@easy-auth-js/easy-auth';

if (hasAnyRole(principal, ['Admin', 'Editor'])) {
  // user has at least one of the specified roles
}
```

### Read claims from the access token

```typescript
import { getAccessTokenClaim } from '@easy-auth-js/easy-auth';

const roles = getAccessTokenClaim<string[]>(principal, 'roles');
```

### Get the ID token expiration

```typescript
import { getIdTokenExpiration } from '@easy-auth-js/easy-auth';

const expiresAt = getIdTokenExpiration(principal);
```

### Refresh authentication

```typescript
import { refreshAuthentication } from '@easy-auth-js/easy-auth';

const ok = await refreshAuthentication();
```

## Contributing

This library is still a work in progress. If you are interested in
contributing or have suggestions for improvements, please open an issue
or pull request on GitHub.
