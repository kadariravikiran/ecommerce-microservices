import { useEffect, useMemo, useState } from "react";

const API = {
  products: "/product/api/v1/products/list?page=1&limit=12",
  customer: "/customer/api/v1/customers/1",
  order: "/order/api/v1/orders/1"
};

function App() {
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [order, setOrder] = useState(null);

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

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

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        product.name
          ?.toLowerCase()
          .includes(activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="brand">
          <div className="brand-icon">E</div>

          <div>
            <h1>E-Commerce</h1>
            <span>Online Store</span>
          </div>
        </a>

        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#customer">Account</a>
          <a href="#orders">Orders</a>
        </nav>

        <div className="nav-actions">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            type="button"
            aria-label="Open shopping cart"
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="hero-label">
              NEW COLLECTION
            </span>

            <h2>
              Find something
              <br />
              <span>you'll love.</span>
            </h2>

            <p>
              Discover quality products at prices you'll love.
              Shop our latest collection today.
            </p>

            <a href="#products" className="hero-button">
              Shop Now →
            </a>
          </div>

          <div className="hero-visual">
            <div className="hero-product">
              <span>✨</span>
              <strong>Fresh arrivals</strong>
              <small>Explore our collection</small>
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="category-header">
            <h2>Shop by category</h2>
          </div>

          <div className="category-list">
            {[
              "All",
              "Clothing",
              "Shoes",
              "Home",
              "Electronics"
            ].map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="section-label">
                OUR COLLECTION
              </span>
              <h2>Featured Products</h2>
            </div>

            <button
              className="refresh-button"
              onClick={loadProducts}
              type="button"
            >
              ↻ Refresh
            </button>
          </div>

          <div className="search-box">
            <span>🔍</span>

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
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

              <button
                type="button"
                onClick={loadProducts}
              >
                Try Again
              </button>
            </div>
          )}

          {!loadingProducts &&
            !productError &&
            filteredProducts.length === 0 && (
              <div className="message">
                No products found.
              </div>
            )}

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
              >
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
                  <span className="product-category">
                    COLLECTION
                  </span>

                  <h3>
                    {product.name || "Unnamed Product"}
                  </h3>

                  <div className="product-rating">
                    ★★★★★
                    <span>4.8</span>
                  </div>

                  <div className="product-bottom">
                    <strong>
                      ${Number(product.price || 0).toFixed(2)}
                    </strong>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="account-section">
          <div className="section-heading">
            <div>
              <span className="section-label">
                YOUR ACCOUNT
              </span>
              <h2>Account & Orders</h2>
            </div>
          </div>

          <div className="account-grid">
            <div className="account-card" id="customer">
              <div className="account-card-icon">👤</div>

              <div>
                <span className="card-label">
                  CUSTOMER PROFILE
                </span>

                {loadingCustomer && (
                  <p>Loading account...</p>
                )}

                {customerError && (
                  <p className="error-text">
                    {customerError}
                  </p>
                )}

                {!loadingCustomer &&
                  !customerError &&
                  customer && (
                    <>
                      <h3>{customer.name}</h3>
                      <p>{customer.email}</p>
                      <p>{customer.phone}</p>
                      <p>{customer.address}</p>
                    </>
                  )}
              </div>
            </div>

            <div className="account-card" id="orders">
              <div className="account-card-icon">📦</div>

              <div>
                <span className="card-label">
                  RECENT ORDER
                </span>

                {loadingOrder && (
                  <p>Loading order...</p>
                )}

                {orderError && (
                  <p className="error-text">
                    {orderError}
                  </p>
                )}

                {!loadingOrder &&
                  !orderError &&
                  order && (
                    <>
                      <h3>Order #{order.id}</h3>
                      <p>
                        Customer ID: {order.customerId}
                      </p>
                      <p>
                        Product ID: {order.productId}
                      </p>
                      <p>
                        Amount: $
                        {Number(order.amount || 0).toFixed(2)}
                      </p>
                      <p>
                        {order.createAt
                          ? new Date(
                              order.createAt
                            ).toLocaleString()
                          : "Date unavailable"}
                      </p>
                    </>
                  )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="section-label">
                  YOUR SHOPPING BAG
                </span>
                <h2>Cart ({cartCount})</h2>
              </div>

              <button
                type="button"
                className="close-cart"
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>
                  Add some products to get started.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById("products")
                      ?.scrollIntoView({
                        behavior: "smooth"
                      });
                  }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.id}
                    >
                      <img
                        src={
                          item.image ||
                          `https://picsum.photos/seed/cart-${item.id}/120/120`
                        }
                        alt={item.name}
                      />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        <strong>
                          $
                          {Number(item.price || 0).toFixed(2)}
                        </strong>

                        <div className="quantity-controls">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>

                          <button
                            type="button"
                            className="remove-button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      ${cartTotal.toFixed(2)}
                    </strong>
                  </div>

                  <div>
                    <span>Shipping</span>
                    <strong>Free</strong>
                  </div>

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>
                      ${cartTotal.toFixed(2)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="checkout-button"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
