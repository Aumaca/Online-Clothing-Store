import React, { useState, useEffect } from "react"
import axios from 'axios'

import '../styles/Cart.css'

export default function Cart(props) {
    const { showCart, closeCart } = props;

    const [products, setProducts] = useState([])

    // Fetch Products
    function fetchProducts() {
        axios(`http://127.0.0.1:8000/api/products/`)
            .then(response => setProducts(response.data))
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className={showCart ? "cart show-cart" : "cart"}>
            <div className="cart__header">
                <h1>CART</h1>
                <i onClick={() => closeCart()} className="fa-solid fa-x close-login-icon"></i>
            </div>
            <div className="cart__products__container">
                {products.map((product) => {
                    return(
                        <div className="cart__product" key={product.id}>
                            <img src={product.image1} alt="" />
                            <div className="info">
                                <h1>{product.name}</h1>
                                <h2>U${product.price}</h2>
                                <h2>Quantity: 2</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}