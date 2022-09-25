import React, { useState } from 'react'

import '../../styles/header_styles/RegisterLogin.css'

export default function Register(props) {
    let { openRegister, showRegister, closeLoginAndRegister } = props;

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [firstNameValidation, setFirstNameValidation] = useState({
        is_valid: true,
        message: '',
    });
    const [lastNameValidation, setLastNameValidation] = useState({
        is_valid: true,
        message: '',
    });
    const [emailValidation, setEmailValidation] = useState({
        is_valid: true,
        message: '',
    });
    const [passwordValidation, setPasswordValidation] = useState({
        is_valid: true,
        message: '',
    });
    const [passwordConfirmationValidation, setPasswordConfirmationValidation] = useState({
        is_valid: true,
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
            setEmailValidation({ is_valid: false, message: 'Email already registered.' })
        } else {
            setEmailValidation({ is_valid: true, message: '' });
            setRegisterWasSuccessful(true);
        }
    };

    function validation() {
        // First_name
        if (values.first_name.length < 2) {
            setFirstNameValidation({ is_valid: false, message: 'First name is invalid' })
            return false
        } else {
            setFirstNameValidation({ is_valid: true, message: '' })
        }
        // Last_name
        if (values.last_name.length < 2) {
            setLastNameValidation({ is_valid: false, message: 'Last name is invalid.' })
            return false
        } else {
            setLastNameValidation({ is_valid: true, message: '' })
        }
        // Email
        let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email_regex.test(values.email)) {
            setEmailValidation({ is_valid: false, message: 'Email is invalid.' })
            return false
        } else {
            setEmailValidation({ is_valid: true, message: '' })
        }
        // Password
        if (values.password.length < 8) {
            setPasswordValidation({ is_valid: false, message: 'Password must have more than 8 characters.' })
            return false
        } else {
            setPasswordValidation({ is_valid: true, message: '' })
        }
        // Password confirmation
        if (values.password !== values.password_confirmation) {
            setPasswordConfirmationValidation({ is_valid: false, message: 'The passwords doesn\'t match.' })
            return false
        } else {
            setPasswordConfirmationValidation({ is_valid: true, message: '' })
        }
        return true
    }

    let form_or_success_message = (
        <form className="register__form">
            <div className="input__firstname">
                <label>First Name</label>
                <input type="text" id='first_name' className={firstNameValidation.is_valid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                <p>{firstNameValidation.message}</p>
            </div>
            <div className="input__lastname">
                <label>Last Name</label>
                <input type="text" id='last_name' className={lastNameValidation.is_valid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                <p>{lastNameValidation.message}</p>
            </div>
            <div className="input__email">
                <label>E-mail</label>
                <input type="email" id='email' className={emailValidation.is_valid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                <p>{emailValidation.message}</p>
            </div>
            <div className="input__password">
                <label>Password</label>
                <input type="password" id='password' className={passwordValidation.is_valid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                <p>{passwordValidation.message}</p>
            </div>
            <div className="input__password">
                <label>Password Confirmation</label>
                <input type="password" id='password_confirmation' className={passwordConfirmationValidation.is_valid ? '' : 'error'} onChange={(e) => handleChange(e)} />
                <p>{passwordConfirmationValidation.message}</p>
            </div>
            <p><a href="/"><u>I forgot my password</u></a></p>
            <button type='submit' onClick={(e) => handleSubmit(e)}>Register</button>
        </form>
    );
    if (registerWasSuccessful) {
        form_or_success_message = (
            <h1>Boa!!!</h1>
        )
    }

    return (
        <div className={`register__background ${showRegister ? "active" : ""}`}>
            <div className="register">
                <div className="register__container">
                    <div className="register__header">
                        <i onClick={() => openRegister()} className="fa-solid fa-arrow-left left"></i>
                        <h1>REGISTER</h1>
                        <i onClick={() => closeLoginAndRegister()} className="fa-solid fa-x close-login-icon"></i>
                    </div>
                    {form_or_success_message}
                </div>
            </div>
        </div >
    )
}