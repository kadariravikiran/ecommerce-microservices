import { useEffect, useState } from "react";

const API = {
  products: "/product/api/v1/products/list?page=1&limit=12",
  customer: "/customer/api/v1/customers/1",
  order: "/order/api/v1/orders/1"
};

function App() {
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [order, setOrder] = useState(null);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const [productError, setProductError] = useState("");
  const [customerError, setCustomerError] = useState("");
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    loadProducts();
    loadCustomer();
    loadOrder();
  }, []);

  async function loadProducts() {
    try {
      setLoadingProducts(true);
      setProductError("");

      const response = await fetch(API.products, {
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Product API returned ${response.status}`);
      }

      const data = await response.json();

      const productList = Array.isArray(data)
        ? data
        : Array.isArray(data.content)
          ? data.content
          : Array.isArray(data.products)
            ? data.products
            : [];

      setProducts(productList);
    } catch (error) {
      console.error("Product API error:", error);
      setProductError(error.message);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function loadCustomer() {
    try {
      setLoadingCustomer(true);
      setCustomerError("");

      const response = await fetch(API.customer, {
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Customer API returned ${response.status}`);
      }

      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error("Customer API error:", error);
      setCustomerError(error.message);
    } finally {
      setLoadingCustomer(false);
    }
  }

  async function loadOrder() {
    try {
      setLoadingOrder(true);
      setOrderError("");

      const response = await fetch(API.order, {
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Order API returned ${response.status}`);
      }

      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error("Order API error:", error);
      setOrderError(error.message);
    } finally {
      setLoadingOrder(false);
    }
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">E</div>
          <div>
            <h1>E-Commerce</h1>
            <span>Microservices Store</span>
          </div>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#customer">Customer</a>
          <a href="#orders">Orders</a>
        </nav>

        <div className="cart">
          🛒 <span>{products.length}</span>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">CLOUD-NATIVE E-COMMERCE</p>

            <h2>
              Shop smarter.
              <br />
              <span>Built for scale.</span>
            </h2>

            <p className="hero-text">
              A modern e-commerce experience powered by Spring Boot
              microservices, Docker, Kubernetes and Google Cloud.
            </p>

            <a href="#products" className="hero-button">
              Explore Products →
            </a>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <span>☁️</span>
              <span>GKE</span>
            </div>

            <div className="architecture-mini">
              <div>GitHub</div>
              <span>→</span>
              <div>CI/CD</div>
              <span>→</span>
              <div>GKE</div>
            </div>

            <div className="status">
              <span className="status-dot"></span>
              All systems operational
            </div>
          </div>
        </section>

        <section className="stats">
          <div>
            <strong>{products.length || "—"}</strong>
            <span>Products Loaded</span>
          </div>

          <div>
            <strong>7</strong>
            <span>Microservices</span>
          </div>

          <div>
            <strong>GKE</strong>
            <span>Cloud Platform</span>
          </div>

          <div>
            <strong>CI/CD</strong>
            <span>Automated Delivery</span>
          </div>
        </section>

        <section className="section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR COLLECTION</p>
              <h2>Featured Products</h2>
            </div>

            <button onClick={loadProducts} className="refresh-button">
              ↻ Refresh
            </button>
          </div>

          {loadingProducts && (
            <div className="message">
              <div className="spinner"></div>
              Loading products...
            </div>
          )}

          {productError && (
            <div className="error-box">
              <strong>Unable to load products</strong>
              <p>{productError}</p>
              <small>
                The Product microservice or database may currently be
                unavailable.
              </small>
            </div>
          )}

          {!loadingProducts && !productError && products.length === 0 && (
            <div className="message">
              No products were returned by the Product service.
            </div>
          )}

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img
                    src={
                      product.image ||
                      `https://picsum.photos/seed/product-${product.id}/500/400`
                    }
                    alt={product.name || "Product"}
                  />
                </div>

                <div className="product-info">
                  <span className="product-category">PRODUCT</span>

                  <h3>{product.name || "Unnamed Product"}</h3>

                  <div className="product-bottom">
                    <strong>
                      ${Number(product.price || 0).toFixed(2)}
                    </strong>

                    <button type="button">View →</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ACCOUNT</p>
              <h2>Customer Dashboard</h2>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card" id="customer">
              <div className="card-icon">👤</div>

              <div>
                <p className="card-label">CUSTOMER PROFILE</p>

                {loadingCustomer && <p>Loading customer...</p>}

                {customerError && (
                  <p className="error-text">{customerError}</p>
                )}

                {!loadingCustomer && !customerError && customer && (
                  <>
                    <h3>{customer.name}</h3>

                    <p>{customer.email}</p>

                    <p>{customer.phone}</p>

                    <p>{customer.address}</p>
                  </>
                )}
              </div>
            </div>

            <div className="dashboard-card" id="orders">
              <div className="card-icon">📦</div>

              <div>
                <p className="card-label">RECENT ORDER</p>

                {loadingOrder && <p>Loading order...</p>}

                {orderError && (
                  <p className="error-text">{orderError}</p>
                )}

                {!loadingOrder && !orderError && order && (
                  <>
                    <h3>Order #{order.id}</h3>

                    <p>
                      Customer ID: {order.customerId}
                    </p>

                    <p>
                      Product ID: {order.productId}
                    </p>

                    <p>
                      Amount: ${Number(order.amount || 0).toFixed(2)}
                    </p>

                    <p>
                      {order.createAt
                        ? new Date(order.createAt).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="technology">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ENGINEERING</p>
              <h2>Built with Modern DevOps</h2>
            </div>
          </div>

          <div className="technology-grid">
            <div className="technology-card">
              <div className="tech-icon">☁️</div>
              <h3>Google Cloud</h3>
              <p>
                Application infrastructure deployed on Google Kubernetes
                Engine.
              </p>
            </div>

            <div className="technology-card">
              <div className="tech-icon">🐳</div>
              <h3>Docker</h3>
              <p>
                Each microservice is packaged as an independent container
                image.
              </p>
            </div>

            <div className="technology-card">
              <div className="tech-icon">⚙️</div>
              <h3>CI/CD</h3>
              <p>
                GitHub Actions automates build, quality checks, image
                publishing and deployment.
              </p>
            </div>

            <div className="technology-card">
              <div className="tech-icon">☸️</div>
              <h3>Kubernetes</h3>
              <p>
                Services are deployed and managed using Kubernetes
                workloads and services.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <div className="brand-icon">E</div>
          <div>
            <strong>E-Commerce Microservices</strong>
            <span>Cloud-Native Application</span>
          </div>
        </div>

        <p>
          Built with Spring Boot · React · Docker · Kubernetes · Google Cloud
        </p>
      </footer>
    </div>
  );
}

export default App;
