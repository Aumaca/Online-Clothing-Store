import Home from './components/Home'
import Products from './components/Products'
import Product from './components/Product'
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
require('dotenv').config()


function App() {
    return (
        <CookiesProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
            </Routes>
        </CookiesProvider>
    )
}

export default App