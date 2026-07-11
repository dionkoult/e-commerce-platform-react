import '../pages/checkout/CheckoutHeader.css';
import { NavLink } from 'react-router';
import logo from "../assets/images/logo.png";
import mobileLogo from "../assets/images/mobile-logo.png";
import checkoutLockIcon from '../assets/images/icons/checkout-lock-icon.png';


export function CheckoutHeader({ cart }) {
  let cartQuantity = 0;

  cart.map((cartItem) => {
    cartQuantity += cartItem.quantity}
  );

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <NavLink to="/">
            <img className="logo" src={logo} />
            <img className="mobile-logo" src={mobileLogo} />
          </NavLink>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<NavLink className="return-to-home-link"
            to="/">{cartQuantity} {cartQuantity === 1 ? 'Item' : 'Items'}</NavLink>)
        </div>

        <div className="checkout-header-right-section">
          <img src={checkoutLockIcon} />
        </div>
      </div>
    </div>
  );
}