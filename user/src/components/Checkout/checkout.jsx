import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Checkout.css';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    let nav = useNavigate()
    const [details, setDetails] = useState({
        name: "",
        phone: "",
        address: "",
        pin_code: "",
        payment_type: "",
        total: localStorage.getItem('total')
    });

    const submitForm = (e) => {
        e.preventDefault();
        let token = JSON.parse(localStorage.getItem('token'));
        Axios.post("http://localhost:7000/api/user/shipping", details, {
            headers: { 'auth-token': token }
        })
            .then((res) => {
                console.log(res);
                alert('Your Order has Been Placed.')
                nav('/')
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };
   
    console.log(details, 111111)

    return (
        <div className="checkout">
            <div className="checkout-content">
                <h2>Checkout</h2>
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input required type="text" onChange={handleChange} id="name" name="name" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input required type="text" onChange={handleChange} id="phone" name="phone" placeholder="Your Phone" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input required type="text" onChange={handleChange} id="address" name="address" placeholder="Your Address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pincode">Pin Code:</label>
                        <input required type="text" onChange={handleChange} id="pincode" name="pin_code" placeholder="Your Pin Code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="total">Grand Total:</label>
                        <input required type="text" id="total" name="total" disabled value={localStorage.getItem('total')} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment">Payment Type:</label>
                        <select required id="payment" name="payment_type" onChange={handleChange} className="select-big">
                            <option selected disabled value="">Select Payment Type</option>
                            <option value="COD">COD</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
