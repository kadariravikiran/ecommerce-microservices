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

