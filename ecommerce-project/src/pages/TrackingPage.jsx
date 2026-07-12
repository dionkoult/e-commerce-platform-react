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

  const productOrder = order.products.find((product) => {
    return productId === product.productId
  });
  

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
            Arriving on {dayjs(productOrder.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {productOrder.product.name}
          </div>

          <div className="product-info">
            Quantity: {productOrder.quantity}
          </div>

          <img className="product-image" src={productOrder.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}