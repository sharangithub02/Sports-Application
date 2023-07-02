// Sopping Cart
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ShoppingCart.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function ShoppingCart(props) {
  const [cart, setCart] = useState([]);
  const [tot, setTot] = useState(0);
  console.log(tot);
  const { active } = props;

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));
    Axios.get(`http://localhost:7000/api/user/view-cart`, {
      headers: { 'auth-token': token }
    })
      .then((res) => {
        console.log(res);
        setCart(res.data.cart);
        const total = calculateTotal(res.data.cart); // Calculate the total
        localStorage.setItem('total',total)
        setTot(total);
      })
      .catch((err) => {
        console.log(err, 111);
      });
  }, [active]);

  function calculateTotal(items) {
    let total = 0;
    items.forEach((item) => {
      const price = item.product_id.price;
      const quantity = item.quantity;
      total += price * quantity;
    });
    return total;
  }

  function Delete(id) {
    let token = JSON.parse(localStorage.getItem('token'));
    Axios.delete(`http://localhost:7000/api/user/delete-cart/${id}`, {
      headers: { 'auth-token': token }
    })
      .then((res) => {
        console.log(res);
        // Remove the deleted item from the cart state
        setCart(prevCart => prevCart.filter(item => item._id !== id));
      })
      .catch((err) => {
        console.log(err, 222);
      });
  }
  
  useEffect(() => {
    
    let token = JSON.parse(localStorage.getItem('token'));
    Axios.get(`http://localhost:7000/api/user/view-cart`, {
      headers: { 'auth-token': token }
    })
      .then((res) => {
        console.log(res);
        setCart(res.data.cart);
      })
      .catch((err) => {
        console.log(err, 111);
      });
  }, []);
  
  useEffect(() => {
    const total = calculateTotal(cart);
    setTot(total);
    localStorage.setItem('total',total)
  }, [cart]);
  

  return (
    <div className={`shopping-cart ${active ? 'active' : ''}`}>
      {cart.map((item, index) => {
        return (
          <div key={index} className="box">
            <FontAwesomeIcon className="trash-icon" onClick={() => Delete(item._id)} icon={faTrash} />
            <img src={item.product_id.image} height={100} width={100} alt="Product" />
            <div className="content">
              <h3>{item.product_id.name}</h3>
              <span className="price">Rs {item.product_id.price}</span>
              <span className="quantity">qty: {item.quantity}</span>
            </div>
          </div>
        );
      })}
      <Link to="/checkout" type="button" className="btn">
        Check out (Total: {tot})
      </Link>
    </div>
  );
}

ShoppingCart.propTypes = {
  activeShoppingCart: PropTypes.bool,
}.isRequired;
