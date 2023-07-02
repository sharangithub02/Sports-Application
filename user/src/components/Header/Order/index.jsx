// Sopping Cart
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Order.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function ShoppingCart(props) {


    const { active } = props;
    const [order, setOrder] = useState([])

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('token'));
        Axios.get(`http://localhost:7000/api/user/view-order`, {
            headers: { 'auth-token': token }
        })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    const uniqueData = (res.data.order).filter((item, index, array) => {
                        return index === (res.data.order).findIndex(obj => obj.order_no === item.order_no);
                    });
                    setOrder(uniqueData)
                }

            })
            .catch((err) => {
                console.log(err, 111);
            });
    }, [active]);

    console.log(order, 1111111111111)


    return (
        <div className={`shopping-cart ${active ? 'active' : ''}`}>
            <table width={300} height={100}>
                <tr>
                    <th>Sl No.</th>
                    <th>Order No.</th>
                    <th>Status</th>
                </tr>
                {order.map((item,index) => {
                    return (
                        <tr>
                            <td>{index+1}</td>
                            <td>{item?.order_no}</td>
                            <td>{item?.status}</td>
                        </tr>
                    )
                })}

            </table>


        </div>
    );
}

ShoppingCart.propTypes = {
    activeShoppingCart: PropTypes.bool,
}.isRequired;
