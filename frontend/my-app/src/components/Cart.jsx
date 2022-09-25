import React, { useState, useEffect } from "react";

import '../styles/Cart.css'

export default function Cart(props) {
    const { showCart, closeCart } = props;

    const [products, setProducts] = useState([])

    // Fetch Product
    function fetchProducts() {
        fetch(`http://127.0.0.1:8000/api/products/`)
            .then(response => response.json())
            .then(data => setProducts(data))
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
                        <div className="cart__product">
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