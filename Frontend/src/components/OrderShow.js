import { useState } from "react";
import OrderEdit from "./OrderEdit";

function OrderShow({ order, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleDeleteClick = () => {
    onDelete(order.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = () => {
    setShowEdit(false);
  };

  let content = (
    <div>
      {order.imageOfOrder && (
        <img
          src={order.imageOfOrder}
          alt={`Zdjęcie zamówienia ${order.orderName}`}
          style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "10px" }}
        />
      )}
      <h3>{order.orderName}</h3>
      <p>Cena: {order.price} zł</p>
      <p>Klient: {order.client}</p>
    </div>
  );

  if (showEdit) {
    content = (
      <OrderEdit order={order} onEdit={onEdit} onSubmit={handleSubmit} />
    );
  }

  return (
    <div className="order-show">
      {content}
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Zmień
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Usuń
        </button>
      </div>
    </div>
  );
}

export default OrderShow;
