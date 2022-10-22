import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import axios from 'axios';

import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';

require('dotenv').config();


function App() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASEURL}/api/user/me/`, { withCredentials: true })
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => console.log("User is not logged."))
    }, [])

    return (
        <CookiesProvider>
            <Routes>
                <Route path="/" element={<Home userData={userData} />} />
                <Route path="/products" element={<Products userData={userData} />} />
                <Route path="/product/:id" element={<Product userData={userData} />} />
            </Routes>
        </CookiesProvider>
    )
}

export default App