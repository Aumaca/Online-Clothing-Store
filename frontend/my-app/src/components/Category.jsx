import React from 'react';

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
        let href = `${(category.name).toLowerCase()}/`;
        return (
            <a href={href} className="nav__link">
                <p>{category.name}</p>
            </a>
        )
    }
};

export default Category