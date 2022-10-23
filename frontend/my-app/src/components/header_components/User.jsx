import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                    <h1>Your name: {`${userData.first_name} ${userData.last_name}`}</h1>
                    <h1>Your email: {userData.email}</h1>
                </div>
            </div>
        </div>
    )
}