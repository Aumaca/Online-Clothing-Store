import React, { useState, useEffect, useRef } from 'react'

import Slide from './Slide'

function Carousel(props) {
    const { slides } = props;
    const [slideWidth, setSlideWidth] = useState(100);
    const [slideIndex, setSlideIndex] = useState(0);
    const [indicatorIndex, setIndicatorIndex] = useState(0);
    const slide_ref = useRef();

    function moveSlide(indexToMove) {
        if (slideIndex + indexToMove > slides.length - 1) {
            setSlideIndex(0);
            setIndicatorIndex(0);
        } else if (slideIndex + indexToMove < 0) {
            setSlideIndex(slides.length - 1);
            setIndicatorIndex(slides.length - 1);
        } else {
            setSlideIndex(slideIndex + indexToMove);
            setIndicatorIndex(slideIndex + indexToMove);
        }
    };

    function moveSlideByIndicators(indexToMove) {
        setSlideIndex(indexToMove);
        setIndicatorIndex(indexToMove);
    };

    // The slideWidth is just set when slide_ref.current is created.
    useEffect(() => {
        function changeSlideWidth() {
            setSlideWidth(slide_ref.current.getBoundingClientRect().width);
        };

        window.addEventListener("resize", changeSlideWidth);

        changeSlideWidth();

        return () => {
            window.removeEventListener("resize", changeSlideWidth);
        }
    }, [slide_ref]);

    // Changes the slide automatically.
    useEffect(() => {
        const change_slide_automatically = setInterval(() => {
            moveSlide(+1);
        }, 8000);

        return () => clearInterval(change_slide_automatically);
    });

    return (
        <div className="carousel">

            <div className="carousel__track__container">

                <div className="carousel__button__left">
                    <i className="fa-solid fa-angle-left" onClick={() => moveSlide(-1)}></i>
                </div>
                <div className="carousel__button__right">
                    <i className="fa-solid fa-angle-right" onClick={() => moveSlide(+1)}></i>
                </div>

                <div className="carousel__track" id='carousel-track' style={{ transform: `translateX(-${slideWidth * slideIndex}px)` }}>
                    {slides.map((slide, index) => {
                        if (index === 0) {
                            return (
                                <Slide slide_width={slideWidth} index={index} slide_ref={slide_ref} slide_data={slide} key={`slide-${index}`} />
                            )
                        } else {
                            return (
                                <Slide slide_width={slideWidth} index={index} slide_data={slide} key={`slide-${index}`} />
                            )
                        }
                    })};
                </div>

                <div className="carousel__nav__container">
                    <div className="carousel__nav">
                        {slides.map((slide, index) => {
                            return (
                                <div className={`carousel__indicator ${index === indicatorIndex ? 'current-slide' : ''}`} key={`indicator-${index}`} onClick={() => moveSlideByIndicators(index)} />
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="carousel__bottom__divisor"></div>
        </div>
    )
}

export default Carousel