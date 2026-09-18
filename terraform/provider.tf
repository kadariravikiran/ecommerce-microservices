terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }

  required_version = ">= 1.5.0"

backend "gcs" {
    bucket = "ecommerce-terraform-state-887456464145"
    prefix = "gke"
  }
}

provider "google" {
  project = "project-b1401e3c-6c22-44e2-ba6"
  region  = "asia-south1"
}
