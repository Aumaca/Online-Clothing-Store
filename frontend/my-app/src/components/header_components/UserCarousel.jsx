import React, { useState } from 'react';

import Arrow from '../../images/arrow.png'

export default function UserCarousel(props) {
    const { last_seen_products } = props;
    const [amountToMove, setAmountToMove] = useState(0);

    function moveSlider(direction) {
        if (direction === 'right') {
            if ((amountToMove + 1) * 150 < 1500) {
                setAmountToMove(amountToMove + 1);
            }
        }
        if (direction === 'left') {
            if ((amountToMove - 1) * 150 < 0) {
                setAmountToMove(0);
                console.log(amountToMove);
            } else {
                setAmountToMove(amountToMove - 1);
                console.log(amountToMove);
            }
        }
    }

    return (
        <div className="user__carousel">
            <div className="user__carousel__container">
                <div className="user__carousel__left__button" onClick={() => moveSlider('left')}>
                    <img src={Arrow} alt="" />
                </div>
                <div className="user__carousel__right__button" onClick={() => moveSlider('right')}>
                    <img src={Arrow} alt="" />
                </div>
                <div className="user__carousel__track" style={{ transform: `translateX(-${150 * amountToMove}px` }}>
                    {last_seen_products.map((product) => {
                        return (
                            <div className="user__carousel__card">
                                <img src={product.image1} alt="" />
                                <h2>{product.name}</h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}