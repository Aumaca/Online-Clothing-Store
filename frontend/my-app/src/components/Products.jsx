import React, { useState, useEffect } from 'react'
import axios from 'axios';
import uuid from 'react-uuid';

import '../styles/Products.css'

import Header from './Header';
import Footer from './Footer';

function Products() {
    // Url Query
    const [urlQuery, setUrlQuery] = useState('');

    // Filter options
    const [filterOptionsIsOpen, setfilterOptionsIsOpen] = useState(false);

    const [genderFilter, setGenderFilter] = useState({
        isOpen: false,
        option: '',
    });

    const [sizeFilter, setSizeFilter] = useState({
        isOpen: false,
        option: '',
    });

    const [typeFilter, setTypeFilter] = useState({
        isOpen: false,
        option: '',
    });

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    // Messages
    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);

    // Categories
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    // Categories
    const [productsType, setProductsType] = useState([]);
    const [isLoadingProductsType, setIsLoadingProductsType] = useState(true);

    // Products
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    const isLoadingList = [isLoadingMessages, isLoadingCategories, isLoadingProducts, isLoadingProductsType];

    function forQueryUrl() {
        // GENDER FILTER
        let query = new URLSearchParams(urlQuery);
        console.log(query);
        if (genderFilter.option) {
            if (query.has('gender')) {
                query.set('gender', genderFilter.option[0]);
                setUrlQuery(query.toString());
            } else {
                query.append('gender', genderFilter.option[0]);
                setUrlQuery(query.toString());
            }
        } else {
            if (query.has('gender')) {
                query.set('gender', '');
                setUrlQuery(query.toString());
            }
        };

        // SIZE FILTER
        if (sizeFilter.option) {
            if (query.has('size')) {
                query.set('size', sizeFilter.option[0]);
                setUrlQuery(query.toString());
            } else {
                query.append('size', sizeFilter.option[0]);
                setUrlQuery(query.toString());
            }
        } else {
            if (query.has('size')) {
                query.set('size', '');
                setUrlQuery(query.toString());
            }
        };

        // TYPE FILTER
        if (typeFilter.option) {
            if (query.has('type')) {
                query.set('type', typeFilter.option);
                setUrlQuery(query.toString());
            } else {
                query.append('type', typeFilter.option);
                setUrlQuery(query.toString());
            }
        } else {
            if (query.has('type')) {
                query.set('type', '');
                setUrlQuery(query.toString());
            }
        };
    }

    // Fetch Messages
    function fetchMessages() {
        fetch(`${process.env.REACT_APP_BASEURL}/api/messages/`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .finally(() => setIsLoadingMessages(false))
    };

    // Fetch Categories
    function fetchCategories() {
        let url = `${process.env.REACT_APP_BASEURL}/api/categories/`;
        axios.get(url)
            .then(response => setCategories(response.data))
            .finally(() => setIsLoadingCategories(false))
    };

    // Fetch products type
    function fetchProductsType() {
        let url = `${process.env.REACT_APP_BASEURL}/api/products-type/`;
        axios.get(url)
            .then(response => setProductsType(response.data))
            .finally(() => setIsLoadingProductsType(false))
    }

    // Fetch Product
    function fetchProducts() {
        forQueryUrl();
        let url = `${process.env.REACT_APP_BASEURL}/api/products/`;
        if (urlQuery !== '') {
            url = `${process.env.REACT_APP_BASEURL}/api/products?${urlQuery}`;
        }
        console.log(url);
        axios.get(url)
            .then(response => setProducts(response.data))
            .finally(() => setIsLoadingProducts(false))
    };

    useEffect(() => {
        fetchMessages();
        fetchCategories();
        fetchProducts();
        fetchProductsType();
    }, []);

    useEffect(() => {
        forQueryUrl();
    }, [genderFilter, sizeFilter, typeFilter]);

    useEffect(() => {
        if (isLoadingList.every(l => l === false)) {
            setIsLoading(false);
        };
    }, [isLoadingList]);

    if (!isLoading) {
        return (
            <>
                <Header messages={messages} categories={categories} />
                {/* BEGIN FILTER */}
                <div className="products__filter">
                    <div className={filterOptionsIsOpen ? 'products__filter__options__container active' : 'products__filter__options__container'}>
                        <div className="products__filter__options">
                            {/* BEGIN FILTER OPTION */}
                            <div className="filter">
                                <h2>Gender:</h2>
                                <button onClick={() => genderFilter.isOpen ? setGenderFilter({ ...genderFilter, isOpen: false }) : setGenderFilter({ ...genderFilter, isOpen: true })}>
                                    <div>
                                        {genderFilter.option ? genderFilter.option : '-'}
                                    </div>
                                    <div>
                                        {genderFilter.isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                                    </div>
                                </button>
                                <div className="dropdown" style={{ display: genderFilter.isOpen ? 'block' : 'none' }}>
                                    <div className="dropdown list">
                                        <h3 onClick={() => setGenderFilter({ ...genderFilter, option: 'Women', isOpen: false })}>
                                            Women
                                        </h3>
                                        <h3 onClick={() => setGenderFilter({ ...genderFilter, option: 'Men', isOpen: false })}>
                                            Men
                                        </h3>
                                        <h3 onClick={() => setGenderFilter({ ...genderFilter, option: 'Unissex', isOpen: false })}>
                                            Unissex
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            {/* END FILTER OPTION */}

                            {/* BEGIN FILTER OPTION */}
                            <div className="filter">
                                <h2>Size:</h2>
                                <button onClick={() => sizeFilter.isOpen ? setSizeFilter({ ...sizeFilter, isOpen: false }) : setSizeFilter({ ...sizeFilter, isOpen: true })}>
                                    <div>
                                        {sizeFilter.option ? sizeFilter.option : '-'}
                                    </div>
                                    <div>
                                        {genderFilter.isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                                    </div>
                                </button>
                                <div className="dropdown" style={{ display: sizeFilter.isOpen ? 'block' : 'none' }}>
                                    <div className="dropdown list">
                                        <h3 onClick={() => setSizeFilter({ ...sizeFilter, option: 'Small', isOpen: false })}>
                                            Small
                                        </h3>
                                        <h3 onClick={() => setSizeFilter({ ...sizeFilter, option: 'Medium', isOpen: false })}>
                                            Medium
                                        </h3>
                                        <h3 onClick={() => setSizeFilter({ ...sizeFilter, option: 'Large', isOpen: false })}>
                                            Large
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            {/* END FILTER OPTION */}

                            {/* BEGIN FILTER OPTION */}
                            <div className="filter">
                                <h2>Type:</h2>
                                <button onClick={() => typeFilter.isOpen ? setTypeFilter({ ...typeFilter, isOpen: false }) : setTypeFilter({ ...typeFilter, isOpen: true })}>
                                    <div>
                                        {typeFilter.option ? typeFilter.option : '-'}
                                    </div>
                                    <div>
                                        {typeFilter.isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                                    </div>
                                </button>
                                <div className="dropdown" style={{ display: typeFilter.isOpen ? 'block' : 'none' }}>
                                    <div className="dropdown list">
                                        {productsType.map((type) => {
                                            return(
                                                <h3 onClick={() => setTypeFilter({ ...typeFilter, option: `${type.name}`, isOpen: false })}>
                                                    {type.name}
                                                </h3>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* END FILTER OPTION */}
                        </div>
                        <div className="products__filter__options__search" onClick={() => fetchProducts()}>
                            <button>
                                <h3>Filter</h3>
                            </button>
                        </div>
                    </div>

                    {/* BEGIN FILTER COVER */}
                    <div className="products__cover" onClick={() => filterOptionsIsOpen ? setfilterOptionsIsOpen(false) : setfilterOptionsIsOpen(true)}>
                        <h2>{filterOptionsIsOpen ? 'Hide' : 'Show'} Filters</h2>
                        <h2>{filterOptionsIsOpen ? <i className="fa-sharp fa-solid fa-arrow-up"></i> : <i className="fa-sharp fa-solid fa-arrow-down"></i>}</h2>
                    </div>
                    {/* END FILTER COVER */}
                </div>
                {/* END FILTER */}
                <div className="products">
                    <div className="products__grid">
                        {products.map((product) => {
                            return (
                                <a href={`product/${product.id}/`} className="product" key={uuid()}>
                                    <div className="product__image__container">
                                        <img src={product.image1} onMouseOver={e => e.currentTarget.src = product.image2} onMouseLeave={e => e.currentTarget.src = product.image1} alt="" />
                                    </div>
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