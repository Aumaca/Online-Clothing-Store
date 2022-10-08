import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import '../styles/Product.css'

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
    function fetchProduct() {
        fetch(`${process.env.REACT_APP_BASEURL}/api/product-details/${id}`)
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
                {/* For large */}
                <div className="product__container">
                    <div className='product__overview'>
                        <div className="product__overview__first">
                            <div className="product__overview__first__images">
                                <img src={product.image1} alt="" />
                                <img className='second_image' src={product.image2} alt="" />
                            </div>
                            <div className="product__overview__first__info">
                                <div className="product__overview__first__info__name_price">
                                    <h1>{product.name}</h1>
                                    <h1>${product.price}</h1>
                                </div>

                                <div className="product__overview__first__moreinfo">
                                    <h2 className='description__title'>Description</h2>
                                    <p>{product.description}</p>
                                    <h2 className='composition__title'>Composition</h2>
                                    <p>{product.composition}</p>
                                </div>

                                <div className="product__overview__first__buttons__large">
                                    <div className="dropdown">
                                        <button onClick={() => toOpenDropdown()}><p>{size ? size : 'Select size'}</p><i className="fa-sharp fa-solid fa-caret-down"></i></button>
                                        <div className="dropdown__menu__container">
                                            <div className={openDropdown ? "dropdown__menu active" : "dropdown__menu"}>
                                                <ul>
                                                    {product.has_small ? <li onClick={() => selectSize('S')}>S</li> : ""}
                                                    {product.has_medium ? <li onClick={() => selectSize('M')}>M</li> : ""}
                                                    {product.has_large ? <li onClick={() => selectSize('L')}>L</li> : ""}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="add__button">Add to bag</button>
                                </div>
                            </div>
                        </div>
                        <div className="product__overview__second">
                            <img src={product.image2} alt="" />
                        </div>
                    </div>
                </div>
                {/* Sticky buttons container for small screens */}
                <div className="sticky__buttons">
                    <div className="dropdown">
                        <button onClick={() => toOpenDropdown()}>
                            <p>{size ? size : 'Select size'}</p>
                            <i class="fa-sharp fa-solid fa-caret-down"></i>
                        </button>
                        <div className="dropdown__menu__container">
                            <div className={openDropdown ? "dropdown__menu active" : "dropdown__menu"}>
                                <ul>
                                    {product.has_small ? <li onClick={() => selectSize('S')}>S</li> : ""}
                                    {product.has_medium ? <li onClick={() => selectSize('M')}>M</li> : ""}
                                    {product.has_large ? <li onClick={() => selectSize('L')}>L</li> : ""}
                                </ul>
                            </div>
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