import React, { useState, useEffect } from "react";

import Header from "./components/Header"
import Carousel from "./components/Carousel"
import HomeCards from "./components/HomeCards"
import Contact from "./components/Contact";

function App() {
    // Loading
    const [isLoading, setIsLoading] = useState(true);

    // Messages
    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);

    // Categories
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    // Slides
    const [slides, setSlides] = useState([]);
    const [isLoadingSlides, setIsLoadingSlides] = useState(true);

    // Homecards
    const [homeCards, setHomeCards] = useState([]);
    const [isLoadingHomeCards, setIsLoadingHomeCards] = useState(true);

    const isLoadingList = [isLoadingMessages, isLoadingCategories, isLoadingSlides, isLoadingHomeCards];

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

    // Fetch Slides
    function fetchSlides() {
        fetch('http://127.0.0.1:8000/api/slides/')
            .then(response => response.json())
            .then(data => setSlides(data))
            .finally(() => setIsLoadingSlides(false))
    };

    // Fetch Homecards
    function fetchHomeCards() {
        fetch('http://127.0.0.1:8000/api/home-cards/')
            .then(response => response.json())
            .then(data => setHomeCards(data))
            .finally(() => setIsLoadingHomeCards(false))
    };

    useEffect(() => {
        fetchMessages();
        fetchCategories();
        fetchSlides();
        fetchHomeCards();
    }, []);

    // If some boolean in the array isLoadingList changes the value 
    useEffect(() => {
        if (isLoadingList.every(l => l === false)) {
            setIsLoading(false);
        };
    }, [isLoadingList]);

    if (!isLoading) {
        return (
            <>
                <Header messages={messages} categories={categories} />
                <main>
                    <Carousel slides={slides} />
                    <HomeCards homeCards={homeCards} />
                </main>
                <section>
                    <Contact />
                </section>
            </>
        )
    } else {
        return (
            <h1>Carregando...</h1>
        )
    }
}

export default App