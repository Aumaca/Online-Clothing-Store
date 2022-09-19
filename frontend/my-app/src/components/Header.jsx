import React, { useState } from 'react'

import Messages from './Messages'
import Category from './Category'

import LogoRenner from '../images/cm_store.png'

function Header(props) {
    // Messages
    const { messages } = props;

    // Categories
    const { categories } = props;

    // Menu
    const [showMenu, setShowMenu] = useState(false);

    // Submenu
    const [showSubMenu, setShowSubMenu] = useState(false);

    // Search
    const [showSearch, setShowSearch] = useState(false);

    // Login
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });
    const [showLogin, setShowLogin] = useState(false);
    const [loginWasSuccessful, setLoginWasSuccessful] = useState(false);

    // Register
    const [registerValues, setRegisterValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [firstNameRegisterValidation, setFirstNameRegisterValidation] = useState({
        is_valid: true,
        message: '',
    })
    const [lastNameRegisterValidation, setLastNameRegisterValidation] = useState({
        is_valid: true,
        message: '',
    })
    const [emailRegisterValidation, setEmailRegisterValidation] = useState({
        is_valid: true,
        message: '',
    })
    const [passwordRegisterValidation, setPasswordRegisterValidation] = useState({
        is_valid: true,
        message: '',
    })
    const [passwordConfirmationRegisterValidation, setPasswordConfirmationRegisterValidation] = useState({
        is_valid: true,
        message: '',
    })
    const [showRegister, setShowRegister] = useState(false);
    const [registerWasSuccessful, setRegisterWasSuccessful] = useState(false);

    // Submenus
    let submenus;
    let categories_with_submenus = [];

    function handleChangeLogin(e) {
        setLoginValues({ ...loginValues, [e.target.id]: e.target.value });
    }

    function handleChangeRegister(e) {
        setRegisterValues({ ...registerValues, [e.target.id]: e.target.value });
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        if (!loginValidation()) {
            return
        };
        let headers = {
            method: 'POST',
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(loginValues),
        };
        fetch('http://127.0.0.1:8000/api/validation-to-login/', headers)
            .then((response) => response.status === 201 ? setLoginWasSuccessful(true) : '');
    }

    function handleRegisterSubmit(e) {
        e.preventDefault();
        if (!registerValidation()) {
            return
        };
        let headers = {
            method: 'POST',
            headers: { Accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(registerValues),
        };
        fetch('http://127.0.0.1:8000/api/validation-to-register/', headers)
            .then((response) => response.status === 201 ? setRegisterWasSuccessful(true) : '');
    }

    function loginValidation() {
        ''
    }

    // Validate fields of register form when submitted.
    function registerValidation() {
        // First_name
        if (registerValues.first_name.length < 2) {
            setFirstNameRegisterValidation({ is_valid: false, message: 'First name is invalid' })
            return false
        } else {
            setFirstNameRegisterValidation({ is_valid: true, message: '' })
        }
        // Last_name
        if (registerValues.last_name.length < 2) {
            setLastNameRegisterValidation({ is_valid: false, message: 'Last name is invalid.' })
            return false
        } else {
            setLastNameRegisterValidation({ is_valid: true, message: '' })
        }
        // Email
        let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email_regex.test(registerValues.email)) {
            setEmailRegisterValidation({ is_valid: false, message: 'Email is invalid.' })
            return false
        } else {
            setEmailRegisterValidation({ is_valid: true, message: '' })
        }
        // Password
        if (registerValues.password.length < 8) {
            setPasswordRegisterValidation({ is_valid: false, message: 'Password must have more than 8 characters.' })
            return false
        } else {
            setPasswordRegisterValidation({ is_valid: true, message: '' })
        }
        // Password confirmation
        if (registerValues.password !== registerValues.password_confirmation) {
            setPasswordConfirmationRegisterValidation({ is_valid: false, message: 'The passwords doesn\'t match.' })
            return false
        } else {
            setPasswordConfirmationRegisterValidation({ is_valid: true, message: '' })
        }
        return true
    }

    function openSubmenu(index) { // function to be activated by category element
        setShowSubMenu(index);
    };

    function openSearchbox() {
        showSearch ? setShowSearch(false) : setShowSearch(true);
    }

    function openRegisterBox() {
        if (showRegister) {
            setShowRegister(false);
            setShowLogin(true);
        } else {
            setShowRegister(true);
            setShowLogin(false);
        }
    }

    // The page will have a submenu for each categorie that has submenu
    submenus = Array.from(categories.map((category) => {
        if (category.products.length > 0) {
            categories_with_submenus.push(category); // If category has submenu, is added to the array of categories_with_submenus
            let submenu_index = categories_with_submenus.indexOf(category);
            return (
                <div key={submenu_index} className={showSubMenu === submenu_index ? "nav__submenu show-submenu" : "nav__submenu"}>
                    <div className="nav__menu__container">
                        <div className='nav__menu__header'>
                            <i className="fa-solid fa-x" onClick={() => setShowSubMenu(false)}></i>
                            <img src={LogoRenner} alt="Logo Lojas Renner" />
                        </div>

                        <div className="nav__menu__first">
                            {category.products.map((product) => {
                                return (
                                    <a href={product.link} key={product.id} className="nav__link">
                                        <p>{product.name}</p>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        };
    }));

    return (
        <header>
            {/* To register */}
            <div className={`register__background ${showRegister ? "active" : ""}`}>
                <div className="register">
                    <div className="register__container">
                        <div className="register__header">
                            <i onClick={() => openRegisterBox()} className="fa-solid fa-arrow-left left"></i>
                            <h1>REGISTER</h1>
                            <i onClick={() => (setShowRegister(false), setShowLogin(false))} className="fa-solid fa-x close-login-icon"></i>
                        </div>
                        <form className="register__form">
                            <div className="input__firstname">
                                <label>First Name</label>
                                <input type="text" id='first_name' className={firstNameRegisterValidation.is_valid ? '' : 'error'} onChange={(e) => handleChangeRegister(e)} />
                                <p>{firstNameRegisterValidation.message}</p>
                            </div>
                            <div className="input__lastname">
                                <label>Last Name</label>
                                <input type="text" id='last_name' className={lastNameRegisterValidation.is_valid ? '' : 'error'} onChange={(e) => handleChangeRegister(e)} />
                                <p>{lastNameRegisterValidation.message}</p>
                            </div>
                            <div className="input__email">
                                <label>E-mail</label>
                                <input type="email" id='email' className={emailRegisterValidation.is_valid ? '' : 'error'} onChange={(e) => handleChangeRegister(e)} />
                                <p>{emailRegisterValidation.message}</p>
                            </div>
                            <div className="input__password">
                                <label>Password</label>
                                <input type="password" id='password' className={passwordRegisterValidation.is_valid ? '' : 'error'} onChange={(e) => handleChangeRegister(e)} />
                                <p>{passwordRegisterValidation.message}</p>
                            </div>
                            <div className="input__password">
                                <label>Password Confirmation</label>
                                <input type="password" id='password_confirmation' className={passwordConfirmationRegisterValidation.is_valid ? '' : 'error'} onChange={(e) => handleChangeRegister(e)} />
                                <p>{passwordConfirmationRegisterValidation.message}</p>
                            </div>
                            <p><a href="/"><u>I forgot my password</u></a></p>
                            <button type='submit' onClick={(e) => handleRegisterSubmit(e)}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
            {/* To login */}
            <div className={`login__background ${showLogin ? "active" : ""}`}>
                <div className="login">
                    <div className='login__container'>
                        <div className="login__header">
                            <h1>LOGIN</h1>
                            <i onClick={() => setShowLogin(false)} className="fa-solid fa-x close-login-icon"></i>
                        </div>
                        <form className="login__form" action=''>
                            <div className="input__email">
                                <label>E-mail</label>
                                <input type="email" id='email' onChange={(e) => handleChangeLogin(e)} />
                            </div>
                            <div className="input__password">
                                <label>Password</label>
                                <input type="password" id='password' onChange={(e) => handleChangeLogin(e)} />
                            </div>
                            <p><a href="/"><u>I forgot my password</u></a></p>
                            <button type='submit' onClick={(e) => handleLoginSubmit(e)}>Login</button>
                        </form>
                        <div className='login__separator'><span>OR</span></div>
                        <div className='to__register__container'>
                            <button className='register__button' onClick={() => openRegisterBox()}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
            <Messages messages={messages} />
            <nav>
                {/* Menu icon and Search icon */}
                <div className="nav__left__icons">
                    <ul>
                        <li className='toggle__icon' onClick={() => setShowMenu(true)}><i className="fa-solid fa-bars"></i></li>
                        <li onClick={() => openSearchbox()}><i className="fa-solid fa-magnifying-glass"></i></li>
                    </ul>
                </div>

                {/* Logo */}
                <div className="nav__logo">
                    <a href="/">
                        <img className="img__logo" src={LogoRenner} alt="Logo CM Store" />
                    </a>
                </div>

                {/* Bag and User */}
                <div className="nav__right__icons">
                    <ul>
                        <li><i className="fa-solid fa-bag-shopping"></i></li>
                        <li onClick={() => setShowLogin(true)} className='user-icon'><i className="fa-solid fa-user"></i></li>
                    </ul>
                </div>
            </nav>

            {/* categories above nav */}
            <div className="large__categories">
                {categories.map((category) => {
                    if (categories_with_submenus.includes(category)) {
                        let index = categories_with_submenus.indexOf(category); // index is the index of the category in the array.
                        return (
                            <p key={category.id} onClick={() => openSubmenu(index)}>{category.name}</p>
                        )
                    } else {
                        return (
                            <p key={category.id}>{category.name}</p>
                        )
                    }
                }
                )}
            </div>

            {/* Search */}
            <div className={showSearch ? "nav__searchbox show-searchbox" : "nav__searchbox"}>
                <div>
                    <form action="">
                        <input type="text" id="" placeholder='Pesquise produtos' />
                        <button>Pesquisar</button>
                    </form>
                </div>
            </div>

            {/* Submenus */}
            {submenus}

            {/* Menu for small screens */}
            <div className={showMenu ? "nav__menu show-menu" : "nav__menu"}>
                <div className="nav__menu__container">
                    <div className='nav__menu__header'>
                        <i className="fa-solid fa-x" onClick={() => setShowMenu(false)}></i>
                        <img src={LogoRenner} alt="Logo Lojas Renner" />
                    </div>

                    {/* begin first part menu */}
                    <div className="nav__menu__first">
                        {categories.map((category) => {
                            if (categories_with_submenus.includes(category)) {
                                let index = categories_with_submenus.indexOf(category); // index is the index of the category in the array.
                                return (
                                    <Category key={category.id} category={category} logo={LogoRenner} index={index} openSubmenu={openSubmenu} />
                                )
                            } else {
                                return (
                                    <Category key={category.id} category={category} logo={LogoRenner} />
                                )
                            }
                        }
                        )}
                    </div>
                    {/* end first part menu */}

                    {/* begin second part menu */}
                    <div className="nav__menu__second">
                        <div className="nav__link">
                            <a href="/contact/">
                                <i className="fa-solid fa-headset"></i>
                                <p>Contact</p>
                            </a>
                        </div>

                        <div className="nav__link">
                            <a href="/localization/">
                                <i className="fa-solid fa-location-pin"></i>
                                <p>Localization</p>
                            </a>
                        </div>

                        <div className="nav__link">
                            <a href="/about_us/">
                                <i className="fa-solid fa-timeline"></i>
                                <p>About us</p>
                            </a>
                        </div>
                    </div>
                    {/* end second part menu */}
                </div>
            </div>
        </header>
    )
}

export default Header