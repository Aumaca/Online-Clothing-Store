import React, { useState } from 'react'
import axios from 'axios';

import '../../styles/header_styles/RegisterLogin.css'

export default function Login(props) {
    let { openLogin, showLogin, openRegister } = props;

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [emailValidation, setEmailValidation] = useState({
        isValid: true,
        message: '',
    });

    const [passwordValidation, setPasswordValidation] = useState({
        isValid: true,
        message: '',
    });
    
    const [loginWasSuccessful, setLoginWasSuccessful] = useState(false);

    // Handle Changes //
    function handleChange(e) {
        setValues({ ...values, [e.target.id]: e.target.value });
    };

    // Handle Submit //
    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BASEURL}/api/user/login/`, values, { withCredentials: true })
            .then((response) => {
                setEmailValidation({ isValid: true, message: '' });
                setPasswordValidation({ isValid: true, message: '' });
                setLoginWasSuccessful(true);
            })
            .catch((error) => {
                setEmailValidation({ isValid: false, message: 'Email not registered or wrong password' });
                setPasswordValidation({ isValid: false, message: '' });
                console.log(error);
            })
    };

    const LOGIN_FORM = (
        <>
            <form className="login__form" action=''>
                <div className="input__email">
                    <label>E-mail</label>
                    <input type="email" id='email' className={emailValidation.isValid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                    <p>{emailValidation.message}</p>
                </div>
                <div className="input__password">
                    <label>Password</label>
                    <input type="password" id='password' className={passwordValidation.isValid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                    <p>{passwordValidation.message}</p>
                </div>
                <p><a href="/"><u>I forgot my password</u></a></p>
                <button type='submit' onClick={(e) => handleSubmit(e)}>Login</button>
            </form>
            <div className='login__separator'><span>OR</span></div>
            <div className='to__register__container'>
                <button className='register__button' onClick={() => openRegister()}>Register</button>
            </div>
        </>
    )

    const SUCCESS_MESSAGE = (
        <div className='register__success'>
            <i className="fa-solid fa-check check"></i>
            <h1>Your login was successful!</h1>
        </div>
    )

    return (
        <div className={`login__background ${showLogin ? "active" : ""}`}>
            <div className="login">
                <div className='login__container'>
                    <div className="login__header">
                        <h1>LOGIN</h1>
                        <i onClick={() => openLogin(false)} className="fa-solid fa-x close-login-icon"></i>
                    </div>
                    {loginWasSuccessful ? SUCCESS_MESSAGE : LOGIN_FORM}
                </div>
            </div>
        </div>
    )
}