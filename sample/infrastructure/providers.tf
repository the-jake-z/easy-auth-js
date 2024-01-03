

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.67"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.41"
    }
  }
}

provider "azurerm" {
    client_id = var.azure_client_id
    client_secret = var.azure_client_secret
    tenant_id = var.azure_tenant_id
    subscription_id =  var.azure_subscription_id
    features {
      
    }
}

provider "azuread" {
  tenant_id = var.azure_tenant_id
  client_id = var.azure_client_id
  client_secret = var.azure_client_secret
}

