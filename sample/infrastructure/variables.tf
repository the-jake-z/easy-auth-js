
variable "azure_tenant_id" {
    type = string
}

variable "azure_client_id" {
    type = string
}

variable "azure_client_secret" {
    type = string
}

variable "azure_subscription_id" {
    type = string
}

variable "geography" {
    type = string
    default = "East US"
}

variable "app_service_name" {
    type = string
    default = "easy-auth-js-sample"
}