import OrderShow from "./OrderShow";

function OrderList({ orders, onDelete, onEdit }) {
  const renderedOrders = orders.map((order) => (
    <OrderShow
      key={order.id}
      order={order}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  ));

  return <div className="order-list">{renderedOrders}</div>;
}

export default OrderList;
