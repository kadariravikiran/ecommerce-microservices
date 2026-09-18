variable "project_id" {
  description = "GCP project ID"
  type        = string
  default     = "project-b1401e3c-6c22-44e2-ba6"
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "asia-south1"
}

variable "cluster_name" {
  description = "GKE cluster name"
  type        = string
  default     = "ecommerce-terraform-cluster"
}
