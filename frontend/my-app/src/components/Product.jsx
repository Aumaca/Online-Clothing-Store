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

    function selectSize(size) {
        setSize(size);
        toOpenDropdown();
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
                return ("Woman")
            }
            if (product.gender === 'M') {
                return ("Men")
            }
            return ("Unissex")
        }
        return (
            <>
                <Header messages={messages} categories={categories} />
                <div>{`cmstore.com/${gender()}/${product.type}`}</div>
                {/* For above large */}
                <div className="product__container">
                    <div className='product__overview'>
                        <div className="product__overview__large">
                            <div className="product__overview__images">
                                <img src={product.image1} alt="" />
                                <img className='second_image' src={product.image2} alt="" />
                            </div>
                            <div className="product__overview__info__large">
                                <div className="product__overview__name__price">
                                    <h1>{product.name}</h1>
                                    <h1>U${product.price}</h1>
                                </div>

                                <div className="product__overview__moreinfo">
                                    <h2 className='description__title'>Description</h2>
                                    <p>{product.description}</p>
                                    <h2 className='composition__title'>Composition</h2>
                                    <p>{product.composition}</p>
                                    <div className="buttons__small__devices__container large">
                                        <div className="dropdown">
                                            <button className="dropdown__button" onClick={() => toOpenDropdown()}><p>{size ? size : 'Select size'}</p><i class="fa-sharp fa-solid fa-caret-down"></i></button>
                                            <div className={openDropdown ? "dropdown__menu active" : "dropdown__menu"}>
                                                <ul>
                                                    {product.has_small ? <li onClick={() => selectSize('S')}>S</li> : ""}
                                                    {product.has_medium ? <li onClick={() => selectSize('M')}>M</li> : ""}
                                                    {product.has_large ? <li onClick={() => selectSize('L')}>L</li> : ""}
                                                </ul>
                                            </div>
                                        </div>
                                        <button className="add__button">Add to bag</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product__overview__moreimages">
                            <img src={product.image2} alt="" />
                        </div>
                    </div>
                </div>
                {/* For above large */}
                <div className="buttons__small__devices__container small">
                    <div className="dropdown">
                        <button className="dropdown__button" onClick={() => toOpenDropdown()}><p>{size ? size : 'Select size'}</p><i class="fa-sharp fa-solid fa-caret-down"></i></button>
                        <div className={openDropdown ? "dropdown__menu active" : "dropdown__menu"}>
                            <ul>
                                {product.has_small ? <li onClick={() => selectSize('S')}>S</li> : ""}
                                {product.has_medium ? <li onClick={() => selectSize('M')}>M</li> : ""}
                                {product.has_large ? <li onClick={() => selectSize('L')}>L</li> : ""}
                            </ul>
                        </div>
                    </div>
                    <button className="add__button">Add to bag</button>
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