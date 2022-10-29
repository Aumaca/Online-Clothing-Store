import React, { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'

import '../styles/Header.css'

import Messages from './header_components/Messages'
import Category from './header_components/Category'
import Login from './header_components/Login'
import Register from './header_components/Register'
import User from './header_components/User'
import Cart from './Cart'

import LogoRenner from '../images/cm_store.png'

function Header(props) {
    const { userData, messages, categories } = props;

    // Menu
    const [showMenu, setShowMenu] = useState(false);

    // Submenu
    const [showSubMenu, setShowSubMenu] = useState(false);

    // Search
    const [showSearch, setShowSearch] = useState(false);

    // Cart
    const [showCart, setShowCart] = useState(false);

    // Login
    const [showLoginOrUser, setShowLoginOrUser] = useState(false);

    // Register
    const [showRegister, setShowRegister] = useState(false);

    // Submenus
    let submenus;
    let categories_with_submenus = [];

    // To Open //
    function openLoginOrUser() {
        if (showLoginOrUser) {
            setShowLoginOrUser(false);
        } else {
            setShowLoginOrUser(true);
        }
    }

    // If user is logged, User component is returned.
    // If user is not logged, Login component is returned.
    function loginOrUserComponent() {
        if (userData) {
            let Profile = <User userData={userData} openUser={openLoginOrUser} showUser={showLoginOrUser} />;
            return Profile
        } else {
            let Profile = <Login openLogin={openLoginOrUser} openRegister={openRegister} showLogin={showLoginOrUser} />;
            return Profile
        };
    };

    // When register button or back from register is clicked.
    function openRegister() {
        if (showRegister) {
            setShowRegister(false);
            setShowLoginOrUser(true);
        } else {
            setShowLoginOrUser(false);
            setShowRegister(true);
        }
    };

    function openSubmenu(index) { // function to be activated by category element
        setShowSubMenu(index);
    };

    function openSearchbox() {
        showSearch ? setShowSearch(false) : setShowSearch(true);
    };

    // To Close //
    function closeLoginAndRegister() {
        setShowLoginOrUser(false);
        setShowRegister(false);
    }

    function closeCart() {
        setShowCart(false);
    };

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
            <Cart showCart={showCart} closeCart={closeCart} />
            <Register openRegister={openRegister} showRegister={showRegister} closeLoginAndRegister={closeLoginAndRegister} />
            {/* To login */}
            {loginOrUserComponent()}
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
                        <li onClick={() => setShowCart(true)}><i className="fa-solid fa-bag-shopping"></i></li>
                        <li onClick={() => setShowLoginOrUser(true)} className='user-icon'><i className="fa-solid fa-user"></i></li>
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