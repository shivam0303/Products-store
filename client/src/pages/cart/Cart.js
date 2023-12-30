import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import './cart.css';
import MyNavbar from '../../components/navbar/Navbar';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const username = user.username;

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCartData = async () => {
    try {
      const res = await axios.get(`/cart/${username}`);
      if(res.data[0]){
        setCartItems(res.data[0].products);

        const totalres = await axios.get(`/cart/total/${username}`);
        setTotal(totalres.data.total);
      }
      // console.log(res.data[0].products);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const emptyCart = async () => {
    const confirmEmpty = window.confirm('Are you sure you want to empty your cart?');

    if (confirmEmpty) {
      try {
        const res = await axios.delete(`/cart/${username}`);
        setCartItems([]);
        setTotal(0);
        alert('Cart emptied');
      } catch (error) {
        console.error('Error emptying cart:', error);
      }
    }
  }

  const placeOrder = async () => {
    try {
      const order = { username : username, product :  cartItems, total : total }
      // console.log(order);
      const res = await axios.post(`http://localhost:8080/order`, order, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
      setCartItems([]);
      alert('Order placed');

      const res2 = await axios.delete(`/cart/${username}`)
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div>
      <MyNavbar />

      <div className="cart-container">
        <h2>Your Cart</h2>
        <ul className="cart-list">
          {cartItems &&
            cartItems.map((item) => (
              <li key={item.pid} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">Quantity: {item.quantity}</span>
                <span className="item-total">Price: ₹{item.price}</span>
                <span className="item-total">Total: ₹{item.price * item.quantity}</span>
              </li>
            ))}
        </ul>

        {
          total > 0 && <hr /> &&
          <span className='grand-total'>Grand Total : {total}</span> &&
          <div className="cart-actions">
          <button className="empty-cart-button" onClick={emptyCart} disabled={total === 0}>Empty Cart</button>
          <button className="place-order-button" onClick={placeOrder} disabled={cartItems.length === 0}>Place Order</button>
        </div>
        }
        

        
      </div>
    </div>
  );
};

export default Cart;
