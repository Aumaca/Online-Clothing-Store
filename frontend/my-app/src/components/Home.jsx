import React, { useState, useEffect } from "react";

import Header from "./Header"
import Carousel from "./home_components/Carousel"
import HomeCards from "./home_components/HomeCards"
import Contact from "./home_components/Contact"
import Footer from "./Footer";

function Home() {
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

    // Fetch Slides
    function fetchSlides() {
        fetch(`${process.env.REACT_APP_BASEURL}/api/slides/`)
            .then(response => response.json())
            .then(data => setSlides(data))
            .finally(() => setIsLoadingSlides(false))
    };

    // Fetch Homecards
    function fetchHomeCards() {
        fetch(`${process.env.REACT_APP_BASEURL}/api/home-cards/`)
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
                <Footer />
            </>
        )
    } else {
        return (
            <h1>Carregando...</h1>
        )
    }
}

export default Home