import { useState } from "react";

function OrderCreate({ onCreate }) {
  const [orderName, setOrderName] = useState("");
  const [price, setPrice] = useState("");
  const [client, setClient] = useState("");
  const [imageOfOrder, setImageOfOrder] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!orderName.trim() || !price.trim() || !client.trim()) {
      alert("Pola z gwiazdką muszą być wypełnione.");
      return;
    }
    onCreate(orderName, price, client, imageOfOrder);
    setOrderName("");
    setPrice("");
    setClient("");
    setImageOfOrder("");
  };

  return (
    <div className="order-create">
      <h3>Dodaj zamówienie:</h3>
      <form onSubmit={handleSubmit}>
        <label>Link do zdjęcia zamówienia:</label>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={imageOfOrder}
          onChange={(e) => setImageOfOrder(e.target.value)}
        />
        <label>Zamówienie:*</label>
        <input
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)}
        />
        <label>Cena:*</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Klient:*</label>
        <input value={client} onChange={(e) => setClient(e.target.value)} />
        <button className="button">Dodaj zamówienie</button>
      </form>
    </div>
  );
}

export default OrderCreate;
