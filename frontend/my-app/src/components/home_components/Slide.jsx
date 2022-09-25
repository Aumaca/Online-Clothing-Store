import React from 'react'

function Slide(props) {
    const { slide_data, slide_width, slide_ref, index } = props;

    if (index === 0) {
        return (
            <div
                className="carousel__slide"
                style={{ left: index * slide_width + 'px' }}
                ref={slide_ref}
            >
                <a href={slide_data.url}>
                    <img src={slide_data.image} alt='' />
                    <div className="carousel__slide__text">
                        <div className="carousel__slide__text__title">
                            <h4 style={{ color: slide_data.title_color }}>{slide_data.title}</h4>
                        </div>
                        <div className="carousel__slide__text__subtitle">
                            <h5 style={{ color: slide_data.subtitle_color }}>{slide_data.subtitle}</h5>
                        </div>
                    </div>
                </a>
            </div>
        )
    } else {
        return (
            <div
                className="carousel__slide"
                style={{ left: index * slide_width + 'px' }}
            >
                <a href={slide_data.url}>
                    <div className="carousel__slide__image">
                        <img src={slide_data.image} alt='' />
                    </div>
                    <div className="carousel__slide__text">
                        <div className="carousel__slide__text__title">
                            <h4>{slide_data.title}</h4>
                        </div>
                        <div className="carousel__slide__text__subtitle">
                            <h5>{slide_data.subtitle}</h5>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default Slide