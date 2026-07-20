import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import axios from 'axios';

export function OrderHeader({ order, setOrders }) {

  async function deleteOrder(orderId) {
    await axios.delete(`/api/orders/${orderId}`);

    setOrders(prevOrders =>
      prevOrders.filter(order => order.id !== orderId)
    );
  }

  return (
    <div className="order-header">
      <div className="order-header-left-section">
        <div className="order-date">
          <div className="order-header-label">Order Placed:</div>
          <div>
            {dayjs(order.orderTimeMs).format('MMMM D')}
          </div>
        </div>
        <div className="order-total">
          <div className="order-header-label">Total:</div>
          <div>
            {formatMoney(order.totalCostCents)}
          </div>
        </div>
      </div>
      <div className="order-header-right-section">
        <div className="order-header-label">Order ID:</div>
        <div>
          {order.id}
        </div>
      </div>
      <button className='delete-button'
        onClick={() => deleteOrder(order.id)}>
        Delete
      </button>
    </div>
  );
}