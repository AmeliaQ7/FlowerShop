import { useState, useEffect } from "react";
import axios from "axios";
import OrderCreate from "./components/OrderCreate";
import OrderList from "./components/OrderList";
import OrderSearch from "./components/OrderSearch";
import LoginForm from "./components/LoginForm";
import "./index.css";

axios.defaults.baseURL = "https://localhost:7066";

function App() {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Usuń token z localStorage przy załadowaniu aplikacji,
    // żeby wymusić logowanie za każdym razem
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchOrders();
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      setAllOrders(response.data);
    } catch (error) {
      console.error("Błąd przy pobieraniu zamówień:", error);
    }
  };

  const createOrder = async (orderName, price, client, imageOfOrder) => {
    try {
      const response = await axios.post("/api/orders", {
        orderName,
        price,
        client,
        imageOfOrder,
      });
      const newOrders = [...orders, response.data];
      setOrders(newOrders);
      setAllOrders(newOrders);
    } catch (error) {
      console.error("Błąd przy tworzeniu zamówienia:", error);
    }
  };

  const deleteOrderById = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      const updatedOrders = orders.filter((order) => order.id !== id);
      setOrders(updatedOrders);
      setAllOrders(updatedOrders);
    } catch (error) {
      console.error("Błąd przy usuwaniu zamówienia:", error);
    }
  };

  const editOrderById = async (
    id,
    newOrderName,
    newPrice,
    newClient,
    newImageOfOrder
  ) => {
    try {
      const response = await axios.put(`/api/orders/${id}`, {
        id,
        orderName: newOrderName,
        price: newPrice,
        client: newClient,
        imageOfOrder: newImageOfOrder,
      });
      const updatedOrders = orders.map((order) =>
        order.id === id ? response.data : order
      );
      setOrders(updatedOrders);
      setAllOrders(updatedOrders);
    } catch (error) {
      console.error("Błąd przy edycji zamówienia:", error);
    }
  };

  const searchOrdersByClient = (clientName) => {
    const filtered = allOrders.filter((order) =>
      order.client.toLowerCase().includes(clientName.toLowerCase())
    );
    setOrders(filtered);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <OrderSearch onSearch={searchOrdersByClient} />
      <OrderList
        orders={orders}
        onDelete={deleteOrderById}
        onEdit={editOrderById}
      />
      <OrderCreate onCreate={createOrder} />
    </div>
  );
}

export default App;
