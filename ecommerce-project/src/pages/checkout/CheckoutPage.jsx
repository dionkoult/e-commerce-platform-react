import axios from 'axios';
import { useState, useEffect } from 'react';
import './CheckoutPage.css';
import { CheckoutHeader } from '../../components/CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const reloadPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    };

    reloadPaymentSummary();
  }, [cart]);

  async function clearCart() {
    for (const product of cart) {
      await axios.delete(`/api/cart-items/${product.productId}`);
    }

    await loadCart();
  }

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">
          Review your order
          <button className={cart.length > 0 ? 'clear-button-cp' : 'hidden-clear-button-cp'}
            onClick={clearCart}>
            Clear
          </button>
        </div>

        <div className="checkout-grid">
          {cart.length > 0 ? (
            <OrderSummary
              cart={cart}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
          ) : (
            <div className="empty-cart">
              Your cart is empty.
            </div>
          )}

          <PaymentSummary
            paymentSummary={paymentSummary}
            loadCart={loadCart}
          />
        </div>
      </div>
    </>
  );
}