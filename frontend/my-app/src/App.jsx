import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from './components/Home'
import Products from './components/Products'
import Product from './components/Product'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
        </Routes>
    )
}

export default App