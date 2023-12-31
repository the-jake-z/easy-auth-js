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

**Azure Easy Auth allows you to offload all authentication to the middlware,**
**letting you focus on your business logic.**

This library allows applications deployed behind Azure Easy Auth to
interface with the endpoints provided by Azure App Service.

# Contributing
This library is still a work in progress, if you are interested in
contributing or improvements, please open an issue or pull request
on Github.

# TODO List:

- Unit Tests
- Sample library w/ IaC support 
- 