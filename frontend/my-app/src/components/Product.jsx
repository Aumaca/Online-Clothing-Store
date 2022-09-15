import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';

function Product() {
    let { id } = useParams();

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    // Messages
    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);

    // Categories
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    // Product
    const [product, setProduct] = useState([]);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);

    // Dropdown menu
    const [openDropdown, setOpenDropdown] = useState(false);

    // Size
    const [size, setSize] = useState('')

    const isLoadingList = [isLoadingMessages, isLoadingCategories, isLoadingProduct];

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
    function fetchProduct() {
        fetch(`http://127.0.0.1:8000/api/product-details/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .finally(() => setIsLoadingProduct(false))
    };

    function toOpenDropdown() {
        if (openDropdown === true) {
            setOpenDropdown(false);
        } else {
            setOpenDropdown(true);
        };
    }

    useEffect(() => {
        fetchMessages();
        fetchCategories();
        fetchProduct();
    }, []);

    useEffect(() => {
        if (isLoadingList.every(l => l === false)) {
            setIsLoading(false);
        };
    }, [isLoadingList]);

    if (!isLoading) {
        function gender() {
            if (product.gender === 'W') {
                return("Woman")
            }
            if (product.gender === 'M') {
                return ("Men")
            }
            return("Unissex")
        }
        return (
            <>
                <Header messages={messages} categories={categories} />
                <div>{`cmstore.com/${gender()}/${product.type}`}</div>
                <div className="product__container">
                    <div className='product__overview'>
                        <div className="product__overview__images">
                            <img src={product.image1} alt="" />
                            <img src={product.image2} alt="" />
                        </div>
                        <div className="product__overview__info">
                            <h1>{product.name}</h1>
                            <h1>U${product.price}</h1>
                            <div className="dropdown">
                                <button className="dropdown__button" onClick={() => toOpenDropdown()}><p>{size ? size : 'Select size'}</p><i class="fa-sharp fa-solid fa-caret-down"></i></button>
                                <div className={openDropdown ? "dropdown__menu active" : "dropdown__menu"}>
                                    <ul>
                                        {product.has_small ? <li onClick={() => setSize('S')}>S</li> : ""}
                                        {product.has_medium ? <li onClick={() => setSize('M')}>M</li> : ""}
                                        {product.has_large ? <li onClick={() => setSize('L')}>L</li> : ""}
                                    </ul>
                                </div>
                            </div>
                            <button className="add__button">Add to bag</button>
                        </div>
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

export default Product