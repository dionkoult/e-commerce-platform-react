import { OrderHeader } from './OrderHeader';
import { OrderDetailsGrid } from './OrderDetailsGrid';

export function OrdersGrid({ orders, loadCart, setOrders }) {
  if (orders.length === 0) {
    return (
      <div className='no-orders-found'>
        No orders found.
      </div>
    )
  }

  return (
    <div className="orders-grid">
      {orders.map((order) => {

        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} setOrders={setOrders} />
            <OrderDetailsGrid order={order} loadCart={loadCart} />
          </div>
        );
      })}
    </div>
  );
}