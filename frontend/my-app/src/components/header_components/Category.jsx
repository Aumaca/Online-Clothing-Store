import React from 'react';

import '../../styles/header_styles/Category.css'

function Category(props) {
    const { category, openSubmenu, index } = props;

    if (category.products.length > 0) {
        return (
            <a className="nav__link" onClick={() => openSubmenu(index)}>
                <p>{category.name}</p>
                <i className="fa-solid fa-arrow-right-long"></i>
            </a>
        )
    } else {
        return (
            <a href={`/${category.link}`} className="nav__link">
                <p>{category.name}</p>
            </a>
        )
    }
};

export default Category