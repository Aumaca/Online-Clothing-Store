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
        email_login: "",
        password_login: "",
    });
    const [showLogin, setShowLogin] = useState(false);

    // Register
    const [registerValues, setRegisterValues] = useState({
        email_register: "",
        password_register: "",
    });
    const [showRegister, setShowRegister] = useState(false);

    // Submenus
    let submenus;
    let categories_with_submenus = [];

    function handleChange(e) {
        setLoginValues({ ...loginValues, [e.target.id]: e.target.value });
    }

    function openSubmenu(index) { // function to be activated by category element
        setShowSubMenu(index);
    };

    function openSearchbox() {
        showSearch ? setShowSearch(false) : setShowSearch(true);
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
                            <i onClick={() => setShowRegister(false)} className="fa-solid fa-arrow-left left"></i>
                            <h1>REGISTER</h1>
                            <i onClick={() => (setShowRegister(false), setShowLogin(false))} className="fa-solid fa-x close-login-icon"></i>
                        </div>
                        <form className="register__form" action=''>
                            <div className="input__firstname">
                                <label>First Name</label>
                                <input type="text" id='first_name_register' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input__lastname">
                                <label>Last Name</label>
                                <input type="text" id='last_name_register' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input__email">
                                <label>E-mail</label>
                                <input type="email" id='email_register' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input__password">
                                <label>Password</label>
                                <input type="password" id='password_register' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input__password">
                                <label>Password Confirmation</label>
                                <input type="password" id='password_register' onChange={(e) => handleChange(e)} />
                            </div>
                            <p><a href="/"><u>I forgot my password</u></a></p>
                            <button type='submit'>Register</button>
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
                                <input type="email" id='email_login' onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input__password">
                                <label>Password</label>
                                <input type="password" id='password_login' onChange={(e) => handleChange(e)} />
                            </div>
                            <p><a href="/"><u>I forgot my password</u></a></p>
                            <button type='submit'>Login</button>
                        </form>
                        <div className='login__separator'><span>OR</span></div>
                        <div className='to__register__container'>
                            <button className='register__button' onClick={() => setShowRegister(true)}>Register</button>
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