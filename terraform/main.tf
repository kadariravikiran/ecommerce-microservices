resource "google_container_cluster" "ecommerce" {
  name     = var.cluster_name
  location = var.region
  project  = var.project_id

  network    = "default"
  subnetwork = "default"

  remove_default_node_pool = true
  initial_node_count       = 1

  deletion_protection = false
}

resource "google_container_node_pool" "ecommerce_nodes" {
  name     = "ecommerce-node-pool"
  location = var.region
  cluster  = google_container_cluster.ecommerce.name
  project  = var.project_id

  node_count = 1

  node_config {
    machine_type = "e2-medium"

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}
