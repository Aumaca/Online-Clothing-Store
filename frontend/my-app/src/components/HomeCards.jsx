import React from 'react'

function HomeCards(props) {
    const { homeCards } = props;

    return (
        <div className="homecards">
            {homeCards.map((homecard, index) => {
                return (
                    <div className="homecard__container" key={index}>
                        <img className='homecard__image' src={homecard.image} />
                        <div className="homecard__content">
                            <h1>{homecard.title}</h1>
                            <h2>{homecard.subtitle}</h2>
                            <div>
                                <a href={homecard.url} className='homecard__content__button'>
                                    Check out <i className="fa-solid fa-arrow-right-long"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HomeCards