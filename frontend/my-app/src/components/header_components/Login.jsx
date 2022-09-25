import React, { useState } from 'react'

import '../../styles/header_styles/RegisterLogin.css'

export default function Login(props) {
    let { openLogin, showLogin, openRegister } = props;

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [emailValidation, setEmailValidation] = useState({
        is_valid: true,
        message: '',
    })
    const [passwordValidation, setPasswordValidation] = useState({
        is_valid: true,
        message: '',
    })
    const [loginWasSuccessful, setLoginWasSuccessful] = useState(false);

    // Handle Changes //
    function handleChange(e) {
        setValues({ ...values, [e.target.id]: e.target.value });
    }

    // Handle Submits //
    function handleSubmit(e) {
        e.preventDefault();
        let headers = {
            method: 'POST',
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        let status_code;
        fetch('http://127.0.0.1:8000/api/validation-to-login/', headers)
            .then((response) => status_code = response.status);
        if (status_code === 400) {
            setEmailValidation({ is_valid: false, message: 'Email not registered or wrong password' })
            setPasswordValidation({ is_valid: false, message: '' })
        } else {
            setEmailValidation({ is_valid: true, message: '' })
            setPasswordValidation({ is_valid: true, message: '' })
            setLoginWasSuccessful(true);
        }
    }

    return (
        <div className={`login__background ${showLogin ? "active" : ""}`}>
            <div className="login">
                <div className='login__container'>
                    <div className="login__header">
                        <h1>LOGIN</h1>
                        <i onClick={() => openLogin(false)} className="fa-solid fa-x close-login-icon"></i>
                    </div>
                    <form className="login__form" action=''>
                        <div className="input__email">
                            <label>E-mail</label>
                            <input type="email" id='email' className={emailValidation.is_valid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="input__password">
                            <label>Password</label>
                            <input type="password" id='password' className={passwordValidation.is_valid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                            <p>{passwordValidation.message}</p>
                        </div>
                        <p><a href="/"><u>I forgot my password</u></a></p>
                        <button type='submit' onClick={(e) => handleSubmit(e)}>Login</button>
                    </form>
                    <div className='login__separator'><span>OR</span></div>
                    <div className='to__register__container'>
                        <button className='register__button' onClick={() => openRegister()}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}