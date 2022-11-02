import React, { useState, useEffect } from 'react'

import '../styles/Products.css'

import Header from './Header';
import Footer from './Footer';
import { useParams } from 'react-router-dom';

function Products() {
    const params = useParams();

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
        fetch(`${process.env.REACT_APP_BASEURL}/api/messages/`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .finally(() => setIsLoadingMessages(false))
    };

    // Fetch Categories
    function fetchCategories() {
        fetch(`${process.env.REACT_APP_BASEURL}/api/categories/`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .finally(() => setIsLoadingCategories(false))
    };

    // Fetch Product
    function fetchProducts() {
        fetch(`${process.env.REACT_APP_BASEURL}/api/search_products/${params.type}`)
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
                                <a href={`${process.env.REACT_APP_URL}/product/${product.id}`} className="product">
                                    <img src={product.image1} onMouseOver={e => e.currentTarget.src = product.image2} onMouseLeave={e => e.currentTarget.src = product.image1} alt="" />
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