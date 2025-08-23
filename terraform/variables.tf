variable "resource_group_name" {
  description = "Azure Resource Group Name"
  type        = string
}

variable "resource_group_location" {
  description = "Azure Location Name"
  type        = string
  default = "East US 2"
}

variable "static_web_app_name" {
  description = "Static web app name"
  type        = string
}

variable "environment" {
  description = "Deoployment Environment Name"
  type        = string
}