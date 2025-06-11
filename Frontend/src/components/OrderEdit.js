import { useState } from "react";

function OrderEdit({ order, onEdit, onSubmit }) {
  const [orderName, setOrderName] = useState(order.orderName);
  const [price, setPrice] = useState(order.price);
  const [client, setClient] = useState(order.client);
  const [imageOfOrder, setImageOfOrder] = useState(order.imageOfOrder || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!orderName.trim() || !price.toString().trim() || !client.trim()) {
      alert("Pola z gwiazką muszą być wypełnione.");
      return;
    }
    onEdit(order.id, orderName, price, client, imageOfOrder);
    onSubmit();
  };

  return (
    <form className="order-edit" onSubmit={handleSubmit}>
      <label>Link do zdjęcia zamówienia:</label>
      <input
        type="url"
        value={imageOfOrder}
        onChange={(e) => setImageOfOrder(e.target.value)}
      />
      <label>Zamówienie:*</label>
      <input onChange={(e) => setOrderName(e.target.value)} value={orderName} />
      <label>Cena:*</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Klient:*</label>
      <input value={client} onChange={(e) => setClient(e.target.value)} />
      <button className="button">Zmień zamówienie</button>
    </form>
  );
}

export default OrderEdit;
