import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from 'axios';

export function CartItemDetails({ cartItem, loadCart }) {
  const [inputUpdate, setInputUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);


  const updateInput = () => {
    setInputUpdate(!inputUpdate);
  }

  const updateQuantity = (event) => {
    setQuantity(event.target.value);
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
          ${cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: <input className="update-input"
            type="text"
            style={{display: inputUpdate ? "inline" : "none"}}
            value={quantity}
            onChange={updateQuantity}

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