import React, { useState } from 'react'

import '../../styles/header_styles/RegisterLogin.css'

export default function Register(props) {
    let { openRegister, showRegister, closeLoginAndRegister } = props;
    
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    const [firstNameValidation, setFirstNameValidation] = useState({
        isValid: true,
        message: '',
    });
    const [lastNameValidation, setLastNameValidation] = useState({
        isValid: true,
        message: '',
    });
    const [emailValidation, setEmailValidation] = useState({
        isValid: true,
        message: '',
    });
    const [passwordValidation, setPasswordValidation] = useState({
        isValid: true,
        message: '',
    });
    const [passwordConfirmationValidation, setPasswordConfirmationValidation] = useState({
        isValid: true,
        message: '',
    });
    const [registerWasSuccessful, setRegisterWasSuccessful] = useState(false);

    function handleChange(e) {
        setValues({ ...values, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validation()) {
            return
        };
        let headers = {
            method: 'POST',
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        let status_code;
        fetch('http://127.0.0.1:8000/api/validation-to-register/', headers)
            .then((response) => status_code = response.status);

        if (status_code === 400) {
            setEmailValidation({ isValid: false, message: 'Email already registered.' })
        } else {
            setEmailValidation({ isValid: true, message: '' });
            setRegisterWasSuccessful(true);
        }
    };

    function validation() {
        // FirstName
        if (values.firstName.length < 2) {
            setFirstNameValidation({ isValid: false, message: 'First name is invalid' })
            return false
        } else {
            setFirstNameValidation({ isValid: true, message: '' })
        }
        // LastName
        if (values.lastName.length < 2) {
            setLastNameValidation({ isValid: false, message: 'Last name is invalid.' })
            return false
        } else {
            setLastNameValidation({ isValid: true, message: '' })
        }
        // Email
        let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email_regex.test(values.email)) {
            setEmailValidation({ isValid: false, message: 'Email is invalid.' })
            return false
        } else {
            setEmailValidation({ isValid: true, message: '' })
        }
        // Password
        if (values.password.length < 8) {
            setPasswordValidation({ isValid: false, message: 'Password must have more than 8 characters.' })
            return false
        } else {
            setPasswordValidation({ isValid: true, message: '' })
        }
        // Password confirmation
        if (values.password !== values.password_confirmation) {
            setPasswordConfirmationValidation({ isValid: false, message: 'The passwords doesn\'t match.' })
            return false
        } else {
            setPasswordConfirmationValidation({ isValid: true, message: '' })
        }
        return true
    }

    const REGISTER_FORM = (
        <form className="register__form">
            <div className="input__firstname">
                <label>First Name</label>
                <input type="text" id='firstName' className={firstNameValidation.isValid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                <p>{firstNameValidation.message}</p>
            </div>
            <div className="input__lastname">
                <label>Last Name</label>
                <input type="text" id='lastName' className={lastNameValidation.isValid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                <p>{lastNameValidation.message}</p>
            </div>
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
            <div className="input__password">
                <label>Password Confirmation</label>
                <input type="password" id='passwordConfirmation' className={passwordConfirmationValidation.isValid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                <p>{passwordConfirmationValidation.message}</p>
            </div>
            <p><a href="/"><u>I forgot my password</u></a></p>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Register</button>
        </form>
    )

    const SUCCESS_MESSAGE = (
        <div className='register__success'>
            <i className="fa-solid fa-check check"></i>
            <h1>Your register was successful!</h1>
        </div>
    );

    return (
        <div className={`register__background ${showRegister ? "active" : ""}`}>
            <div className="register">
                <div className="register__container">
                    <div className="register__header">
                        <i onClick={() => openRegister()} className="fa-solid fa-arrow-left left"></i>
                        <h1>REGISTER</h1>
                        <i onClick={() => closeLoginAndRegister()} className="fa-solid fa-x close-login-icon"></i>
                    </div>
                    {registerWasSuccessful ? SUCCESS_MESSAGE : REGISTER_FORM}
                </div>
            </div>
        </div >
    )
}