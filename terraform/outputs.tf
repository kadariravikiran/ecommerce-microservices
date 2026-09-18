output "cluster_name" {
  description = "Name of the GKE cluster"
  value       = google_container_cluster.ecommerce.name
}

output "cluster_location" {
  description = "Location of the GKE cluster"
  value       = google_container_cluster.ecommerce.location
}

output "cluster_endpoint" {
  description = "Endpoint of the GKE cluster"
  value       = google_container_cluster.ecommerce.endpoint
}
