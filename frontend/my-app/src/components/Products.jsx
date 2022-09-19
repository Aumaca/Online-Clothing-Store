import React, { useState, useEffect } from 'react'

import Header from './Header';
import Footer from './Footer';

function Products() {
    // Loading
    const [isLoading, setIsLoading] = useState(true);

    // Messages
    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);

    // Categories
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    // Products
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    const isLoadingList = [isLoadingMessages, isLoadingCategories, isLoadingProducts];

    // Fetch Messages
    function fetchMessages() {
        fetch('http://127.0.0.1:8000/api/messages/')
            .then(response => response.json())
            .then(data => setMessages(data))
            .finally(() => setIsLoadingMessages(false))
    };

    // Fetch Categories
    function fetchCategories() {
        fetch('http://127.0.0.1:8000/api/categories/')
            .then(response => response.json())
            .then(data => setCategories(data))
            .finally(() => setIsLoadingCategories(false))
    };

    // Fetch Product
    function fetchProducts() {
        fetch(`http://127.0.0.1:8000/api/products/`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .finally(() => setIsLoadingProducts(false))
    };

    useEffect(() => {
        fetchMessages();
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (isLoadingList.every(l => l === false)) {
            setIsLoading(false);
        };
    }, [isLoadingList]);

    if (!isLoading) {
        return (
            <>
                <Header messages={messages} categories={categories} />
                <div className="products">
                    <div className="products__grid">
                        {products.map((product) => {
                            return (
                                <a href={`/product/${product.id}`} className="product">
                                    <img src={product.image1} alt="" />
                                    <p className='product__name'>{product.name}</p>
                                    <p className='product__price'>U${product.price}</p>
                                    <p className='product__sizes'>{product.has_small ? "S" : ""} {product.has_medium ? "M" : ""} {product.has_large ? "L" : ""}</p>
                                </a>
                            )
                        })}
                    </div>
                </div>
                <Footer />
            </>
        )
    } else {
        return (
            <h1>Carregando...</h1>
        )
    }
}

export default Products