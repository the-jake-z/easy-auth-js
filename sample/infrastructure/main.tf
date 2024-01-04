data "azuread_client_config" "current" {}

resource "azurerm_resource_group" "easy_auth_sample" {
  name     = "rg-easy-auth-js-sample"
  location = var.geography
}

resource "azurerm_service_plan" "easy_auth_sample" {
  name                = "asp-easy-auth-js-sample"
  resource_group_name = azurerm_resource_group.easy_auth_sample.name
  location            = azurerm_resource_group.easy_auth_sample.location
  sku_name            = "P1v2"
  os_type             = "Windows"
}

resource "azurerm_windows_web_app" "easy_auth_sample" {
  name                = var.app_service_name
  resource_group_name = azurerm_resource_group.easy_auth_sample.name
  location            = azurerm_service_plan.easy_auth_sample.location
  service_plan_id     = azurerm_service_plan.easy_auth_sample.id

  site_config {
  }

  app_settings = {
    aad_secret = azuread_application_password.spa_host_secret.value
  }

  auth_settings_v2 {
    auth_enabled = true
    require_authentication = true
    unauthenticated_action = "RedirectToLoginPage"
    default_provider = "azureactivedirectory"

    active_directory_v2 {
      client_id = azuread_application.easy_auth_sample.application_id
      tenant_auth_endpoint = "https://login.microsoftonline.com/${var.azure_tenant_id}/v2.0"
      client_secret_setting_name = "aad_secret"
    }

    login {
        token_store_enabled = true
    }
  }
}

data "azuread_application_published_app_ids" "well_known" {}

resource "azuread_service_principal" "msgraph" {
  client_id = data.azuread_application_published_app_ids.well_known.result["MicrosoftGraph"]
  use_existing = true
}

resource "azuread_application" "easy_auth_sample" {
  display_name     = "Easy Authentication Sample"
  identifier_uris  = ["api://jakez-easy-auth-sample"]
  owners           = [data.azuread_client_config.current.object_id]
  sign_in_audience = "AzureADMyOrg"

  api {
    mapped_claims_enabled          = true
    requested_access_token_version = 2
  }

  app_role {
    allowed_member_types = ["User"]
    description          = "ReadOnly roles have limited query access"
    display_name         = "ReadOnly"
    enabled              = true
    id                   = "497406e4-012a-4267-bf18-45a1cb148a01"
    value                = "User"
  }


  required_resource_access {
    resource_app_id = data.azuread_application_published_app_ids.well_known.result["MicrosoftGraph"]

    resource_access {
      id   = azuread_service_principal.msgraph.oauth2_permission_scope_ids["User.Read"]
      type = "Scope"
    }

    resource_access {
      id   = azuread_service_principal.msgraph.oauth2_permission_scope_ids["openid"]
      type = "Scope"
    }


    resource_access {
      id   = azuread_service_principal.msgraph.oauth2_permission_scope_ids["profile"]
      type = "Scope"
    }

    resource_access {
      id   = azuread_service_principal.msgraph.oauth2_permission_scope_ids["email"]
      type = "Scope"
    }
  }

  web {
    redirect_uris = ["https://${var.app_service_name}.azurewebsites.net/.auth/login/aad/callback"]

    implicit_grant {
      id_token_issuance_enabled     = true
    }
  }

  lifecycle {
    ignore_changes = [ 
        web[0].redirect_uris
     ]
  }
}

resource "azuread_application_password" "spa_host_secret" {
    application_id = azuread_application.easy_auth_sample.id
}