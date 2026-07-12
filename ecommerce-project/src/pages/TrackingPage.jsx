import './TrackingPage.css';
import { Header } from '../components/Header';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {
  const [ order, setOrder ] = useState(null);
  const { orderId, productId } = useParams();

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);    
    };

    fetchOrdersData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  // Progress Bar
  const orderProduct = order.products.find((product) => {
    return productId === product.productId
  });
  
  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  const deliveryPercent = Math.min(
    (timePassedMs / totalDeliveryTimeMs) * 100,
    100
  );

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent <100;
  const isDelivered = deliveryPercent === 100;


  return (
    <>
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on " : "Arriiving on "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}