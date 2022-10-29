import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCarousel from './UserCarousel';

import '../../styles/header_styles/User.css'

export default function User(props) {
    const { userData, openUser, showUser } = props;

    return (
        <div className={`user__background ${showUser ? "active" : ""}`}>
            <div className="user">
                <div className='user__container'>
                    <div className="user__header">
                        <h1>USER</h1>
                        <i onClick={() => openUser()} className="fa-solid fa-x close-login-icon"></i>
                    </div>
                    <div className="user__info">
                        <div className="user__info__data">
                            <h1 className='user__info__title'>Your name:</h1>
                            <h1 className='user__info__subtitle'>{`${userData.first_name} ${userData.last_name}`}</h1>
                            <h1 className='user__info__title'>Your email:</h1>
                            <h1 className='user__info__subtitle'>{userData.email}</h1>
                        </div>
                        <h1 className='user__info__title'>Products that you have seen:</h1>
                        <UserCarousel last_seen_products={userData.last_seen_products} />
                    </div>
                </div>
            </div>
        </div>
    )
}