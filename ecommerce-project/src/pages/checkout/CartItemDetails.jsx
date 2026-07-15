import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from 'axios';

export function CartItemDetails({ cartItem, loadCart }) {
  const [inputUpdate, setInputUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);


  const updateInput = async () => {
    if (!inputUpdate) {
      setInputUpdate(true);
      return;
    }

    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity
    });

    loadCart();
    setInputUpdate(false);
  };

  const quantityKeys = (event) => {
    if (event.key === 'Enter') {
      updateInput();
    }

    if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setInputUpdate(false);
    }
  }

  const updateQuantity = (event) => {
    const value = Number(event.target.value);

    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  }

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    
    await loadCart();
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: <input className="update-input"
            type="number"
            style={{display: inputUpdate ? "inline" : "none"}}
            value={quantity}
            onChange={updateQuantity}
            onKeyDown={quantityKeys}

             /> <span className="quantity-label"
              style={{display: inputUpdate ? "none" : "inline"}}
             >{cartItem.quantity}</span>
          </span>

          <span className="update-quantity-link link-primary"
            onClick={updateInput}
          >
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}