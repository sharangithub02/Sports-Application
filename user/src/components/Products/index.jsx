// Products
import React, { useEffect, useState } from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import Axios from 'axios'

export default function Products() {
  const [products, setProducts] = useState([])
  let token = localStorage.getItem('token');
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      return console.log('No token ')
    }

    Axios.get('http://localhost:7000/api/user/product', {
      headers: {
        'auth-token': JSON.parse(token)
      }
    }).then((res) => {
      console.log(res.data.product,222222222)
      setProducts(res.data.product)

    }).catch((err) => {
      console.log(err)
    })
  }, [token])

  function handleCart(product_id, price) {
  let token = localStorage.getItem('token');
  let quantity = 1;
  console.log(JSON.parse(token), 44444444);
  if (!token) {
    return console.log('No token');
  }
  Axios.post(
    `http://localhost:7000/api/user/insert-cart`,
    { product_id, quantity, price },
    {
      headers: { 'auth-token': JSON.parse(token) },
    }
  )
    .then((res) => {
      console.log(res);
      Axios.get('http://localhost:7000/api/user/view-cart', {
        headers: { 'auth-token': JSON.parse(token) },
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("pop", JSON.stringify(false));
          setCart(res.data.cart);
          setPopupCart(res.data.cart);
          setPopupOpen(true);
        })
        .catch((err) => {
          console.log(err, 111);
        });
        alert("added successfully")
    })
    .catch((err) => {
      console.log(err, 111);
    });
}
console.log(products[0]?.image,11111111111111111111111111111)
  SwiperCore.use([Autoplay]);
  return (
    <section className="products" id="products">
      <h1 className="heading">
        our
        {' '}
        <span>products</span>
      </h1>
      <div className="products-slider slider">
        <div className="wrapper swiper-wrapper">
          <Swiper
            loop
            spaceBetween={20}
            autoplay={{ delay: 7500, disableOnInteraction: false }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            centeredSlides
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: { slidesPerView: 3 },
            }}
            style={{ padding: '1rem',width:'100%'}}
          >
            {
              products.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="box">
                    {/* <img src={require(`../../../../server2/uploads/${item.image}`)} alt={product.image} /> */}
                    <img src={product?.image} alt="no image" />
                    <h3>{product?.name}</h3>
                    <div className="price">{product?.description}</div>
                    <div className="price">₹{product?.price}</div>
                    <div className="stars">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalfAlt} />
                    </div>
                    <button onClick={() => {
                      handleCart(product?._id,product?.price)
                    }} type="button" className="btn">
                      add to cart
                    </button>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>

    </section>
  );
}
