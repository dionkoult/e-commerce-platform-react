import dayjs from "dayjs";
import buyAgain from '../../assets/images/icons/buy-again.png';
import { Fragment, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import checkMark from '../../assets/images/icons/checkmark.png';

export function OrderDetailsGrid({ order, loadCart }) {
  const [addedProductId, setAddedProductId] = useState(null);

  const ordersAddToCart = async (orderProductId) => {
    await axios.post('/api/cart-items', {
      productId: orderProductId,
      quantity: 1
    });

    await loadCart();

    setAddedProductId(orderProductId);

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {

        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <div className="buy-again-container">
                <button className="buy-again-button button-primary"
                  onClick={() => ordersAddToCart(orderProduct.product.id)}>
                  <img className="buy-again-icon" src={buyAgain} />
                  <span className="buy-again-message">
                    Add to Cart</span>
                </button>
                <div className="added-to-cart" style={{
                    display: addedProductId === orderProduct.product.id
                      ? 'flex'
                      : 'none'
                  }}>
                    <img src={checkMark} />
                    Added
                  </div>
                </div>
            </div>

            <div className="product-actions">
                <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </Link>    
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}